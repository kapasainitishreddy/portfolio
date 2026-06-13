"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { experience } from "@/data/experience";
import { viewportOnce } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

export default function Experience() {
  const reduced = useReducedMotion();

  return (
    <Section id="experience" label="Experience">
      <Reveal>
        <h2 className="max-w-3xl text-rice" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
          A path across data, AI evaluation, research and operations.
        </h2>
      </Reveal>

      <ol className="relative mt-14 ml-3 border-l pl-8 md:ml-5" style={{ borderColor: "color-mix(in srgb, var(--color-silver) 22%, transparent)" }}>
        {experience.map((role, i) => (
          <motion.li
            key={`${role.title}-${role.org}`}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, delay: i * 0.04 }}
            className="relative mb-12 last:mb-0"
          >
            <span
              className="absolute -left-[2.35rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full"
              style={{ background: "var(--color-indigo)", boxShadow: "0 0 0 4px var(--color-ink)" }}
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-soft)" }} />
            </span>

            <h3 className="font-serif text-2xl text-rice">{role.title}</h3>
            <p className="font-mono-label mt-1" style={{ textTransform: "none", letterSpacing: "0.04em" }}>
              {role.org}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {role.focus.map((f) => (
                <li
                  key={f}
                  className="rounded-full px-3 py-1 text-sm text-silver"
                  style={{ border: "1px solid color-mix(in srgb, var(--color-silver) 18%, transparent)" }}
                >
                  {f}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
