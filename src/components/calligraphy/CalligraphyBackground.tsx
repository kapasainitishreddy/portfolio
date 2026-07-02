"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";
import { useTheme } from "@/components/theme/ThemeProvider";

/**
 * Shodō (calligraphy) background. The cursor is a sumi brush that paints
 * tapered, speed-sensitive ink trails which slowly dry and fade away. A ghost
 * brush continuously demonstrates flowing strokes with a directional arrowhead
 * so the canvas is alive the moment it loads — even before you touch it. The
 * palette flips with light / dark mode. Reduced-motion users get a still piece.
 */
export default function CalligraphyBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { mode } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const light = mode === "light";
    const baseRGB = light ? "244, 240, 231" : "10, 12, 14";
    const bone = light ? "#211c16" : "#efe9dd"; // ink colour of the strokes
    let accentColor = light ? "#9a7a2e" : "#c2a35f";
    let sealColor = light ? "#b23a34" : "#d24b42"; // vermilion hanko
    try {
      const style = getComputedStyle(document.documentElement);
      accentColor = style.getPropertyValue("--color-accent").trim() || accentColor;
      sealColor = style.getPropertyValue("--color-accent-2").trim() || sealColor;
    } catch {
      /* noop */
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    const paintBase = () => {
      ctx.fillStyle = `rgb(${baseRGB})`;
      ctx.fillRect(0, 0, width, height);
      // soft handmade-paper vignette so the field reads as washi, not flat fill
      const vg = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        Math.min(width, height) * 0.15,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75,
      );
      vg.addColorStop(0, "rgba(0, 0, 0, 0)");
      vg.addColorStop(1, light ? "rgba(120, 100, 70, 0.10)" : "rgba(0, 0, 0, 0.34)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);
    };

    // vermilion seal stamp (hanko) anchored bottom-left; redrawn each frame so it
    // survives the drying fade and reads as a signature on the finished piece.
    const drawSeal = () => {
      const s = width < 600 ? 44 : 58;
      const x = width < 600 ? 26 : 54;
      const y = height - (width < 600 ? 26 : 54) - s;
      ctx.save();
      ctx.globalAlpha = light ? 0.82 : 0.9;
      ctx.strokeStyle = sealColor;
      ctx.lineWidth = Math.max(2.5, s * 0.06);
      // weathered outer square
      ctx.strokeRect(x, y, s, s);
      // stylised brush glyph inside
      ctx.lineWidth = Math.max(2, s * 0.05);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x + s * 0.24, y + s * 0.26);
      ctx.lineTo(x + s * 0.76, y + s * 0.26);
      ctx.moveTo(x + s * 0.5, y + s * 0.16);
      ctx.lineTo(x + s * 0.5, y + s * 0.84);
      ctx.moveTo(x + s * 0.28, y + s * 0.58);
      ctx.lineTo(x + s * 0.72, y + s * 0.58);
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = 1;
    };

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
      const w = Math.max(1.6, base - speed * 0.18);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // soft ink bleed: a wider, fainter halo under the stroke so the sumi feels
      // wet and absorbed into the paper rather than drawn with a hard pen
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha * 0.28;
      ctx.lineWidth = w * 2.1;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      // main stroke body
      ctx.globalAlpha = alpha;
      ctx.lineWidth = w;
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

    // ghost demonstration strokes
    const strokes: { x: number; y: number }[][] = [];
    const buildStrokes = () => {
      strokes.length = 0;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const s = Math.min(width, height) * 0.34;
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
    let idle = 80; // start mid-demonstration so the canvas is alive immediately
    let lastPointer = { x: px, y: py };

    const frame = () => {
      // gentle dry: fade the whole canvas toward the page colour so strokes evaporate
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(${baseRGB}, 0.045)`;
      ctx.fillRect(0, 0, width, height);

      // pointer brush
      if (hasPointer && (px !== lastPointer.x || py !== lastPointer.y)) {
        dab(lpx, lpy, px, py, bone, 11, 0.62);
        idle = 0;
      } else {
        idle++;
      }
      lastPointer = { x: px, y: py };

      // ghost demonstration brush — runs on load and whenever idle
      if (!reduced && idle > 24) {
        const pts = strokes[strokeIdx];
        if (strokeT === 0) strokePrev = sample(pts, 0);
        strokeT += 0.012;
        const cur = sample(pts, Math.min(1, strokeT));
        dab(strokePrev.x, strokePrev.y, cur.x, cur.y, bone, 14, 0.58);

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
          ctx.moveTo(11, 0);
          ctx.lineTo(-4, -6);
          ctx.lineTo(-4, 6);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.restore();
        }

        strokePrev = cur;
        if (strokeT >= 1) {
          strokeT = 0;
          strokeIdx = (strokeIdx + 1) % strokes.length;
          idle = 26; // brief pause, then keep demonstrating
        }
      }

      drawSeal();

      if (running) raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      resize();
      buildStrokes();
    };

    resize();
    buildStrokes();

    if (reduced) {
      for (const pts of strokes) {
        let prev = sample(pts, 0);
        for (let t = 0; t <= 1; t += 0.02) {
          const cur = sample(pts, t);
          dab(prev.x, prev.y, cur.x, cur.y, bone, 12, 0.5);
          prev = cur;
        }
      }
      drawSeal();
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
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, mode]);

  return <canvas ref={ref} className="h-full w-full" aria-hidden />;
}
