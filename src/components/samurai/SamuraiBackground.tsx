"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";
import { useTheme } from "@/components/theme/ThemeProvider";

interface Slash {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  age: number;
  hue: number; // 0 = crimson core, 1 = cyan core (alternates for variety)
}
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  cyan: boolean;
}
interface Mote {
  x: number;
  y: number;
  vy: number;
  r: number;
  cyan: boolean;
}

// read a CSS custom property, falling back to a default
function cssVar(name: string, fallback: string) {
  try {
    return (
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
    );
  } catch {
    return fallback;
  }
}

// #rrggbb -> "r, g, b"
function rgbTriplet(hex: string, fallback: string) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return fallback;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return fallback;
  return `${r}, ${g}, ${b}`;
}

/**
 * Bushidō — futuristic HUD. A neon dojo grid drifts beneath the content while a
 * scroll-progress rail glows down the right edge. As the visitor scrolls DOWN,
 * the page is "cut": crimson/cyan katana slashes tear diagonally across the
 * viewport with a burst of sparks, faster scrolling throwing more heat. Clicks
 * also slash. Reduced-motion visitors get a still composition of resting cuts.
 */
export default function SamuraiBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { mode } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const light = mode === "light";

    // neon palette pulled from the active theme tokens
    const crimson = rgbTriplet(cssVar("--color-accent", light ? "#e11d48" : "#ff2f52"), "255, 47, 82");
    const cyan = rgbTriplet(cssVar("--color-accent-2", light ? "#0aa3c2" : "#38e8ff"), "56, 232, 255");
    const bgInner = light ? "#e9eef6" : "#070a12";
    const bgOuter = light ? "#d3dae8" : "#01020a";
    const bladeCore = light ? "#12202e" : "#f2fbff";
    const gridColor = light ? `rgba(20, 90, 120, 0.12)` : `rgba(${cyan}, 0.14)`;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let t = 0; // global tick for drifting grid
    let sinceSlash = 0;

    const slashes: Slash[] = [];
    const sparks: Spark[] = [];
    const motes: Mote[] = [];

    // scroll bookkeeping
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollAccum = 0; // downward distance accumulated toward the next cut
    let scrollProgress = 0; // 0..1 for the HUD rail
    let cutIndex = 0; // walks slashes down the viewport as you descend

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedMotes();
    };

    const seedMotes = () => {
      motes.length = 0;
      const count = width < 600 ? 26 : 52;
      for (let i = 0; i < count; i++) {
        motes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vy: -0.08 - Math.random() * 0.22,
          r: Math.random() * 1.6 + 0.4,
          cyan: Math.random() < 0.7,
        });
      }
    };

    const spawnSlash = (cx: number, cy: number, intensity = 1) => {
      const angle = (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 4 + (Math.random() - 0.5) * 0.4);
      const len = Math.hypot(width, height);
      const dx = Math.cos(angle) * len;
      const dy = Math.sin(angle) * len;
      const hue = Math.random() < 0.5 ? 0 : 1;
      slashes.push({ x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy, age: 0, hue });

      const perp = angle + Math.PI / 2;
      const count = Math.round((18 + Math.random() * 16) * Math.min(2, intensity));
      for (let i = 0; i < count; i++) {
        const sp = (Math.random() - 0.5) * 6;
        const dir = perp + (Math.random() - 0.5) * 1.3;
        const speed = (1 + Math.random() * 4) * Math.min(1.8, intensity);
        sparks.push({
          x: cx + Math.cos(angle) * sp * 14,
          y: cy + Math.sin(angle) * sp * 14,
          vx: Math.cos(dir) * speed,
          vy: Math.sin(dir) * speed,
          life: 0,
          max: 26 + Math.random() * 30,
          cyan: Math.random() < 0.5,
        });
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (reduced) return;
      spawnSlash(e.clientX, e.clientY, 1);
      sinceSlash = 0;
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    // scroll drives the slashing — descending "cuts" the page
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY;
      lastScrollY = y;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(1, Math.max(0, y / max));
      if (reduced || delta <= 0) return;
      scrollAccum += delta;
      const threshold = 340; // ~a cut every third of a screen scrolled
      if (scrollAccum >= threshold) {
        scrollAccum -= threshold;
        // walk the cut position down the viewport as the reader descends
        cutIndex++;
        const cy = height * (0.24 + ((cutIndex * 0.27) % 0.55));
        const cx = width * (0.3 + Math.random() * 0.4);
        const velocity = Math.min(2, 1 + Math.abs(delta) / 60);
        spawnSlash(cx, cy, velocity);
        sinceSlash = 0;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const drawBase = () => {
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.28,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85,
      );
      g.addColorStop(0, bgInner);
      g.addColorStop(1, bgOuter);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const drawGrid = () => {
      // faint drifting overhead grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      const cell = width < 600 ? 46 : 62;
      const offset = (t * 0.25) % cell;
      ctx.beginPath();
      for (let x = -offset; x < width; x += cell) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height * 0.55);
      }
      for (let y = -offset; y < height * 0.55; y += cell) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // perspective floor grid converging to a vanishing point
      const horizon = height * 0.62;
      const vpx = width * 0.5;
      ctx.strokeStyle = light ? `rgba(20, 90, 120, 0.14)` : `rgba(${cyan}, 0.14)`;
      ctx.beginPath();
      // radiating verticals
      const cols = 14;
      for (let i = 0; i <= cols; i++) {
        const fx = (i / cols) * width * 2 - width * 0.5;
        ctx.moveTo(vpx, horizon);
        ctx.lineTo(fx, height);
      }
      // receding horizontals (spacing tightens toward the horizon), scrolling in
      const rows = 12;
      const drift = (t * 0.6) % 1;
      for (let i = 0; i < rows; i++) {
        const p = (i + drift) / rows;
        const y = horizon + Math.pow(p, 2.2) * (height - horizon);
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // horizon glow line
      const hg = ctx.createLinearGradient(0, horizon - 2, 0, horizon + 2);
      hg.addColorStop(0, `rgba(${cyan}, 0)`);
      hg.addColorStop(0.5, `rgba(${cyan}, ${light ? 0.25 : 0.4})`);
      hg.addColorStop(1, `rgba(${cyan}, 0)`);
      ctx.fillStyle = hg;
      ctx.fillRect(0, horizon - 2, width, 4);
    };

    const drawHud = () => {
      // corner brackets
      const m = 22;
      const s = 26;
      ctx.strokeStyle = `rgba(${cyan}, ${light ? 0.4 : 0.55})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // top-left
      ctx.moveTo(m, m + s); ctx.lineTo(m, m); ctx.lineTo(m + s, m);
      // top-right
      ctx.moveTo(width - m - s, m); ctx.lineTo(width - m, m); ctx.lineTo(width - m, m + s);
      // bottom-left
      ctx.moveTo(m, height - m - s); ctx.lineTo(m, height - m); ctx.lineTo(m + s, height - m);
      // bottom-right
      ctx.moveTo(width - m - s, height - m); ctx.lineTo(width - m, height - m); ctx.lineTo(width - m, height - m - s);
      ctx.stroke();

      // right-edge scroll-progress rail
      const railX = width - 30;
      const top = 90;
      const bottom = height - 90;
      ctx.strokeStyle = `rgba(${cyan}, ${light ? 0.18 : 0.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(railX, top);
      ctx.lineTo(railX, bottom);
      ctx.stroke();
      // ticks
      for (let i = 0; i <= 10; i++) {
        const y = top + ((bottom - top) * i) / 10;
        ctx.beginPath();
        ctx.moveTo(railX - 3, y);
        ctx.lineTo(railX + 3, y);
        ctx.stroke();
      }
      // filled progress + node
      const nodeY = top + (bottom - top) * scrollProgress;
      ctx.strokeStyle = `rgba(${crimson}, 0.85)`;
      ctx.lineWidth = 2;
      ctx.shadowColor = `rgba(${crimson}, 0.9)`;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(railX, top);
      ctx.lineTo(railX, nodeY);
      ctx.stroke();
      ctx.fillStyle = bladeCore;
      ctx.beginPath();
      ctx.arc(railX, nodeY, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawSlash = (s: Slash) => {
      const draw = Math.min(1, s.age / 5); // fast unsheath
      const fade = Math.max(0, 1 - (s.age - 5) / 52);
      const ex = s.x1 + (s.x2 - s.x1) * draw;
      const ey = s.y1 + (s.y2 - s.y1) * draw;
      const edge = s.hue === 0 ? crimson : cyan;
      const glow = s.hue === 0 ? cyan : crimson;

      // outer neon glow
      ctx.globalAlpha = fade * 0.45;
      ctx.strokeStyle = `rgba(${glow}, 0.6)`;
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.shadowColor = `rgba(${edge}, 0.9)`;
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      // edge colour
      ctx.globalAlpha = fade * 0.8;
      ctx.strokeStyle = `rgba(${edge}, 1)`;
      ctx.lineWidth = 5;
      ctx.shadowBlur = 18;
      ctx.stroke();

      // bright hot core
      ctx.globalAlpha = fade;
      ctx.strokeStyle = bladeCore;
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 8;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const frame = () => {
      t++;
      drawBase();
      drawGrid();

      // idle auto-slash keeps the katana alive when the reader pauses
      sinceSlash++;
      if (!reduced && sinceSlash > 110 && slashes.length < 2) {
        spawnSlash(width * (0.3 + Math.random() * 0.4), height * (0.3 + Math.random() * 0.4), 0.8);
        sinceSlash = 0;
      }

      // rising data motes
      for (const mo of motes) {
        mo.y += mo.vy;
        mo.x += Math.sin((t + mo.y) * 0.01) * 0.12;
        if (mo.y < -5) {
          mo.y = height + 5;
          mo.x = Math.random() * width;
        }
        ctx.fillStyle = mo.cyan ? `rgba(${cyan}, 0.5)` : `rgba(${crimson}, 0.45)`;
        ctx.beginPath();
        ctx.arc(mo.x, mo.y, mo.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // slashes
      for (let i = slashes.length - 1; i >= 0; i--) {
        const s = slashes[i];
        s.age++;
        drawSlash(s);
        if (s.age > 58) slashes.splice(i, 1);
      }

      // sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.vx *= 0.98;
        const a = 1 - p.life / p.max;
        if (a <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = a;
        ctx.fillStyle = p.cyan ? `rgba(${cyan}, 1)` : `rgba(${crimson}, 1)`;
        ctx.shadowColor = p.cyan ? `rgba(${cyan}, 1)` : `rgba(${crimson}, 1)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.1 * a + 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      drawHud();

      if (running) raf = requestAnimationFrame(frame);
    };

    const onResize = () => resize();
    resize();

    if (reduced) {
      drawBase();
      drawGrid();
      spawnSlash(width * 0.32, height * 0.38, 0.6);
      spawnSlash(width * 0.68, height * 0.6, 0.6);
      slashes.forEach((s) => (s.age = 6));
      slashes.forEach(drawSlash);
      sparks.length = 0;
      drawHud();
    } else {
      spawnSlash(width * 0.42, height * 0.4, 1.2);
      sinceSlash = 40; // first ambient slash follows shortly after the opener
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
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, mode]);

  return <canvas ref={ref} className="h-full w-full" aria-hidden />;
}
