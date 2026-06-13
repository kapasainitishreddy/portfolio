"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  layer: number;
}

/**
 * Ink-into-data visual: drifting nodes and connections that read as a neural
 * network forming out of the surrounding ink. Pauses when off-screen and for
 * reduced-motion visitors (which get a single static frame).
 */
export default function NeuralVisual() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];

    const palette = {
      line: "rgba(169, 173, 180, 0.28)",
      lineWarm: "rgba(38, 52, 94, 0.5)",
      node: "rgba(242, 239, 232, 0.9)",
      nodeIndigo: "rgba(38, 52, 94, 0.95)",
    };

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      nodes.length = 0;
      const count = width < 500 ? 22 : 34;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 2 + 1.2,
          layer: Math.floor(Math.random() * 3),
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const maxDist = width < 500 ? 110 : 150;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist;
            ctx!.strokeStyle = a.layer === b.layer ? palette.lineWarm : palette.line;
            ctx!.globalAlpha = alpha * 0.7;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      ctx!.globalAlpha = 1;

      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.fillStyle = n.layer === 1 ? palette.nodeIndigo : palette.node;
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      if (running) raf = requestAnimationFrame(step);
    }

    resize();
    seed();
    draw();

    if (!reduced) {
      raf = requestAnimationFrame(step);
    }

    const onResize = () => {
      resize();
      seed();
      draw();
    };
    window.addEventListener("resize", onResize);

    // pause when scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !reduced;
        if (running) raf = requestAnimationFrame(step);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      className="h-full w-full"
      role="img"
      aria-label="An abstract neural network of connected nodes forming out of flowing ink, representing the link between art, data and technology."
    />
  );
}
