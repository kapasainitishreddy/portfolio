"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { hero } from "@/data/site";
import { ArrowIcon } from "@/components/layout/icons";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

const NeuralVisual = dynamic(() => import("./NeuralVisual"), { ssr: false });

export default function Hero() {
  const reduced = useReducedMotion();
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="home"
      className="content-pad relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center pt-28 pb-16"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item} className="mb-6 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              {!reduced && (
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: "var(--color-copper)" }}
                />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-copper)" }} />
            </span>
            <span className="font-mono-label">{hero.status}</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-rice"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.6rem)", lineHeight: 1.04 }}
          >
            {hero.headline}
          </motion.h1>

          <motion.div variants={item} className="mt-8 max-w-xl space-y-4 text-silver">
            {hero.supporting.map((p) => (
              <p key={p} className="text-base leading-relaxed md:text-lg">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            {hero.actions.map((action) => {
              const primary = action.kind === "primary";
              return (
                <a
                  key={action.label}
                  href={action.href}
                  {...("external" in action && action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-all ${
                    primary
                      ? "font-medium text-ink"
                      : "border text-rice hover:bg-[color-mix(in_srgb,var(--color-silver)_10%,transparent)]"
                  }`}
                  style={
                    primary
                      ? { background: "var(--color-soft)" }
                      : { borderColor: "color-mix(in srgb, var(--color-silver) 26%, transparent)" }
                  }
                >
                  {action.label}
                  <ArrowIcon
                    width={16}
                    height={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* node-network visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden aspect-square w-full lg:block"
        >
          <div className="surface absolute inset-0 overflow-hidden rounded-2xl">
            <NeuralVisual />
          </div>
          <span className="font-mono-label absolute bottom-4 left-4 z-10">embed · ship · govern</span>
        </motion.div>
      </div>

      {/* scroll cue */}
      {!reduced && (
        <a
          href="#about"
          aria-label="Scroll to about"
          className="font-mono-label absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-silver md:flex"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="inline-block h-8 w-px"
            style={{ background: "var(--color-silver)" }}
          />
          Scroll
        </a>
      )}
    </section>
  );
}
