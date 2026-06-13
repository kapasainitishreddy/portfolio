"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

/**
 * Dispersing ink particles for the 404 page. Particles drift outward and fade,
 * suggesting ink scattering in water. Static for reduced-motion visitors.
 */
export default function DispersedInk() {
  const reduced = useReducedMotion();
  const dots = Array.from({ length: 28 });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      {dots.map((_, i) => {
        const angle = (i / dots.length) * Math.PI * 2;
        const dist = 120 + (i % 5) * 60;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        const size = 6 + (i % 4) * 10;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background:
                i % 3 === 0
                  ? "color-mix(in srgb, var(--color-indigo) 70%, transparent)"
                  : "color-mix(in srgb, var(--color-silver) 30%, transparent)",
              filter: "blur(2px)",
            }}
            initial={{ x: 0, y: 0, opacity: 0.8, scale: 0.6 }}
            animate={
              reduced
                ? { x, y, opacity: 0.4 }
                : { x: [0, x], y: [0, y], opacity: [0.8, 0], scale: [0.6, 1.6] }
            }
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 4 + (i % 4), repeat: Infinity, ease: "easeOut", delay: (i % 6) * 0.3 }
            }
          />
        );
      })}
    </div>
  );
}
