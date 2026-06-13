"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

interface Slash {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  age: number;
}
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

/**
 * Bushidō background. Clicking or tapping unsheaths a katana slash across the
 * screen with a burst of sparks. Ambient dust drifts through a dark dojo.
 * Reduced-motion visitors get a still composition of resting slash marks.
 */
export default function SamuraiBackground() {
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

    const slashes: Slash[] = [];
    const sparks: Spark[] = [];
    const dust: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    let accent = "#b3472f";
    try {
      accent =
        getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || accent;
    } catch {
      /* noop */
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedDust();
    };

    const seedDust = () => {
      dust.length = 0;
      const count = width < 600 ? 22 : 44;
      for (let i = 0; i < count; i++) {
        dust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.05 - Math.random() * 0.12,
          r: Math.random() * 1.6 + 0.4,
        });
      }
    };

    const spawnSlash = (cx: number, cy: number) => {
      // diagonal through the click point, spanning the viewport
      const angle = (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 4 + (Math.random() - 0.5) * 0.5);
      const len = Math.hypot(width, height);
      const dx = Math.cos(angle) * len;
      const dy = Math.sin(angle) * len;
      slashes.push({ x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy, age: 0 });

      // sparks burst perpendicular to the blade
      const perp = angle + Math.PI / 2;
      for (let i = 0; i < 26; i++) {
        const sp = (Math.random() - 0.5) * 6;
        const dir = perp + (Math.random() - 0.5) * 1.2;
        sparks.push({
          x: cx + Math.cos(angle) * sp * 14,
          y: cy + Math.sin(angle) * sp * 14,
          vx: Math.cos(dir) * (1 + Math.random() * 4),
          vy: Math.sin(dir) * (1 + Math.random() * 4),
          life: 0,
          max: 30 + Math.random() * 30,
        });
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (reduced) return;
      spawnSlash(e.clientX, e.clientY);
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    const drawBase = () => {
      // dark dojo gradient
      const g = ctx.createRadialGradient(width * 0.5, height * 0.35, 0, width * 0.5, height * 0.5, Math.max(width, height) * 0.8);
      g.addColorStop(0, "#15100f");
      g.addColorStop(1, "#080606");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // faint vertical bamboo / shoji lines
      ctx.strokeStyle = "rgba(179, 71, 47, 0.05)";
      ctx.lineWidth = 1;
      const step = width < 600 ? 90 : 130;
      for (let x = step; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    };

    const drawSlash = (s: Slash) => {
      const draw = Math.min(1, s.age / 6); // quick unsheath
      const fade = Math.max(0, 1 - (s.age - 6) / 56);
      const ex = s.x1 + (s.x2 - s.x1) * draw;
      const ey = s.y1 + (s.y2 - s.y1) * draw;

      // bright blade core
      ctx.globalAlpha = fade;
      ctx.strokeStyle = "#fdece4";
      ctx.lineWidth = 3.2;
      ctx.lineCap = "round";
      ctx.shadowColor = accent;
      ctx.shadowBlur = 26;
      ctx.beginPath();
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      // crimson after-glow
      ctx.shadowBlur = 0;
      ctx.globalAlpha = fade * 0.5;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 9;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const frame = () => {
      drawBase();

      // dust
      ctx.fillStyle = "rgba(220, 200, 180, 0.18)";
      for (const d of dust) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -5) {
          d.y = height + 5;
          d.x = Math.random() * width;
        }
        if (d.x < -5) d.x = width + 5;
        if (d.x > width + 5) d.x = -5;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // slashes
      for (let i = slashes.length - 1; i >= 0; i--) {
        const s = slashes[i];
        s.age++;
        drawSlash(s);
        if (s.age > 62) slashes.splice(i, 1);
      }

      // sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.vx *= 0.98;
        const a = 1 - p.life / p.max;
        if (a <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = a;
        ctx.fillStyle = Math.random() < 0.5 ? "#ffebcc" : accent;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2 * a + 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = accent;
        ctx.shadowBlur = 12;
        ctx.globalAlpha = 1;
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    const onResize = () => resize();
    resize();

    if (reduced) {
      drawBase();
      // a couple of resting slash marks
      spawnSlash(width * 0.32, height * 0.4);
      spawnSlash(width * 0.7, height * 0.62);
      slashes.forEach((s) => (s.age = 7));
      slashes.forEach(drawSlash);
      sparks.length = 0;
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
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas ref={ref} className="h-full w-full" aria-hidden />;
}
