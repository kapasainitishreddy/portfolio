"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

/**
 * Shodō (calligraphy) background. The cursor becomes a sumi brush that paints
 * tapered, speed-sensitive ink trails which slowly dry and fade. When the
 * visitor is idle, a "ghost brush" paints a flowing demonstration stroke with a
 * directional arrowhead at its tip. Reduced-motion users get a still composition.
 */
export default function CalligraphyBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintBase();
    };

    const paintBase = () => {
      ctx.fillStyle = "#0a0c0e";
      ctx.fillRect(0, 0, width, height);
    };

    // pointer state
    let px = -999;
    let py = -999;
    let lpx = -999;
    let lpy = -999;
    let hasPointer = false;

    const onMove = (x: number, y: number) => {
      lpx = px === -999 ? x : px;
      lpy = py === -999 ? y : py;
      px = x;
      py = y;
      hasPointer = true;
    };
    const onPointerMove = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const onPointerLeave = () => (hasPointer = false);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    // brush dab: a tapered stroke between two points, width by speed
    const dab = (
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      color: string,
      base: number,
      alpha: number,
    ) => {
      const speed = Math.hypot(x1 - x0, y1 - y0);
      const w = Math.max(1.4, base - speed * 0.18);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = w;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      // dry-brush speckle for texture at speed
      if (speed > 6) {
        ctx.globalAlpha = alpha * 0.4;
        ctx.beginPath();
        ctx.arc(x1 + (Math.random() - 0.5) * w, y1 + (Math.random() - 0.5) * w, w * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    // ghost demonstration stroke
    const strokes: { x: number; y: number }[][] = [];
    const buildStrokes = () => {
      strokes.length = 0;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const s = Math.min(width, height) * 0.34;
      // a few flowing S / sweep paths in normalized space
      const paths = [
        [[-0.9, -0.5], [-0.3, -0.7], [0.2, -0.1], [-0.1, 0.4], [0.6, 0.7]],
        [[-0.7, 0.6], [0.0, 0.2], [0.3, -0.4], [0.9, -0.6]],
        [[0.6, -0.7], [0.2, -0.2], [-0.2, 0.3], [-0.7, 0.6]],
        [[-0.8, 0.0], [-0.2, -0.2], [0.4, 0.1], [0.85, -0.1]],
      ];
      for (const p of paths) {
        strokes.push(p.map(([nx, ny]) => ({ x: cx + nx * s * (width > height ? 1.3 : 0.9), y: cy + ny * s })));
      }
    };
    buildStrokes();

    // catmull-rom point sampling for smooth ghost path
    const sample = (pts: { x: number; y: number }[], t: number) => {
      const n = pts.length - 1;
      const i = Math.min(n - 1, Math.floor(t * n));
      const lt = t * n - i;
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[Math.min(n, i + 1)];
      const p3 = pts[Math.min(n, i + 2)];
      const t2 = lt * lt;
      const t3 = t2 * lt;
      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * lt +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * lt +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
      return { x, y };
    };

    let strokeIdx = 0;
    let strokeT = 0;
    let strokePrev = { x: 0, y: 0 };
    let idle = 0; // frames since last pointer move
    let lastPointer = { x: px, y: py };

    const bone = "#efe9dd";
    let accentColor = "#c2a35f";
    try {
      accentColor =
        getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || accentColor;
    } catch {
      /* noop */
    }

    const frame = () => {
      // gentle dry: fade the whole canvas toward ink so strokes evaporate
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(10, 12, 14, 0.045)";
      ctx.fillRect(0, 0, width, height);

      // pointer brush
      if (hasPointer && (px !== lastPointer.x || py !== lastPointer.y)) {
        dab(lpx, lpy, px, py, bone, 10, 0.55);
        idle = 0;
      } else {
        idle++;
      }
      lastPointer = { x: px, y: py };

      // ghost demonstration brush when idle
      if (!reduced && idle > 60) {
        const pts = strokes[strokeIdx];
        if (strokeT === 0) strokePrev = sample(pts, 0);
        strokeT += 0.012;
        const cur = sample(pts, Math.min(1, strokeT));
        dab(strokePrev.x, strokePrev.y, cur.x, cur.y, bone, 13, 0.5);

        // arrowhead at the tip indicating stroke direction
        const dx = cur.x - strokePrev.x;
        const dy = cur.y - strokePrev.y;
        const ang = Math.atan2(dy, dx);
        if (strokeT < 1 && Math.hypot(dx, dy) > 0.2) {
          ctx.save();
          ctx.translate(cur.x, cur.y);
          ctx.rotate(ang);
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = 0.95;
          ctx.beginPath();
          ctx.moveTo(10, 0);
          ctx.lineTo(-4, -5);
          ctx.lineTo(-4, 5);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.restore();
        }

        strokePrev = cur;
        if (strokeT >= 1) {
          strokeT = 0;
          strokeIdx = (strokeIdx + 1) % strokes.length;
          idle = 30; // brief pause before next stroke
        }
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      resize();
      buildStrokes();
    };

    resize();

    if (reduced) {
      // still composition: paint each demo stroke once
      for (const pts of strokes) {
        let prev = sample(pts, 0);
        for (let t = 0; t <= 1; t += 0.02) {
          const cur = sample(pts, t);
          dab(prev.x, prev.y, cur.x, cur.y, bone, 12, 0.5);
          prev = cur;
        }
      }
    } else {
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas ref={ref} className="h-full w-full" aria-hidden />;
}
