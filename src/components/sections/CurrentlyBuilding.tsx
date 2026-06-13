"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { buildingItems, phases } from "@/data/building";
import { viewportOnce } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

export default function CurrentlyBuilding() {
  const reduced = useReducedMotion();

  return (
    <Section id="building" label="Currently Building">
      <Reveal>
        <h2 className="max-w-3xl text-rice" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
          Work in motion across the product journey.
        </h2>
      </Reveal>

      {/* phase legend */}
      <Reveal delay={0.05}>
        <ol className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3 overflow-x-auto pb-2">
          {phases.map((phase, i) => (
            <li key={phase} className="flex items-center gap-2">
              <span className="font-mono-label" style={{ color: "var(--color-rice)" }}>
                {phase}
              </span>
              {i < phases.length - 1 && (
                <span className="inline-block h-px w-6" style={{ background: "var(--color-silver)" }} />
              )}
            </li>
          ))}
        </ol>
      </Reveal>

      {/* items */}
      <div className="mt-10 grid gap-4">
        {buildingItems.map((item, idx) => {
          const phaseIndex = phases.indexOf(item.phase);
          return (
            <motion.div
              key={item.name}
              initial={reduced ? false : { opacity: 0, x: -16 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="surface flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:w-64">
                <h3 className="font-serif text-xl text-rice">{item.name}</h3>
                <p className="text-sm text-silver">{item.blurb}</p>
              </div>

              <div className="flex flex-1 items-center gap-1.5">
                {phases.map((phase, i) => {
                  const reached = i <= phaseIndex;
                  const current = i === phaseIndex;
                  return (
                    <div key={phase} className="flex flex-1 flex-col items-center gap-1.5">
                      <div
                        className="h-1.5 w-full rounded-full"
                        style={{
                          background: reached
                            ? "var(--color-indigo)"
                            : "color-mix(in srgb, var(--color-silver) 16%, transparent)",
                        }}
                      />
                      {current && (
                        <span className="font-mono-label" style={{ color: "var(--color-copper)", fontSize: "0.6rem" }}>
                          {phase}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-6 text-sm text-silver">
        Phases show where each project is today. No completion percentages are shown by design.
      </p>
    </Section>
  );
}
