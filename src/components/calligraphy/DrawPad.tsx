"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrushIcon, CloseIcon, TrashIcon } from "@/components/layout/icons";

/**
 * A floating sumi-e drawing pad. Visitors paint tapered brush strokes on rice
 * paper with mouse or touch. Speed controls stroke weight, so quick flicks go
 * thin like a real brush. Available in the Shodō theme.
 */
export default function DrawPad() {
  const [open, setOpen] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintPaper(ctx, rect.width, rect.height);

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const down = (e: PointerEvent) => {
      drawing.current = true;
      last.current = pos(e);
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drawing.current || !last.current) return;
      const p = pos(e);
      const speed = Math.hypot(p.x - last.current.x, p.y - last.current.y);
      const w = Math.max(1.5, 11 - speed * 0.35);
      ctx.strokeStyle = "#12100c";
      ctx.lineWidth = w;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last.current = p;
      if (!hasDrawn) setHasDrawn(true);
    };
    const up = () => {
      drawing.current = false;
      last.current = null;
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [open, hasDrawn]);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    paintPaper(ctx, rect.width, rect.height);
    setHasDrawn(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close drawing pad" : "Open drawing pad"}
        aria-expanded={open}
        className="fixed bottom-6 left-6 z-[120] flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
        style={{ background: "var(--color-accent)", color: "var(--color-ink)" }}
      >
        {open ? <CloseIcon /> : <BrushIcon />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="surface fixed bottom-24 left-6 z-[120] w-[min(20rem,calc(100vw-3rem))] p-3"
            role="dialog"
            aria-label="Drawing pad"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="font-mono-label">Paint a stroke</span>
              <button
                type="button"
                onClick={clear}
                aria-label="Clear drawing"
                className="flex h-7 w-7 items-center justify-center rounded-md text-silver transition-colors hover:text-rice"
              >
                <TrashIcon width={15} height={15} />
              </button>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <canvas
                ref={canvasRef}
                className="block h-56 w-full touch-none"
                style={{ cursor: "crosshair" }}
                aria-label="Drawing canvas. Use your pointer or finger to paint ink strokes."
              />
              {!hasDrawn && (
                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-sm"
                  style={{ color: "color-mix(in srgb, #12100c 45%, transparent)" }}
                >
                  Drag to paint your own ink
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function paintPaper(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // warm rice-paper base with a faint speckle
  ctx.fillStyle = "#efe9dd";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(120, 100, 70, 0.05)";
  for (let i = 0; i < 60; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
}
