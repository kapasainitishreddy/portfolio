"use client";

import { motion } from "framer-motion";
import { about } from "@/data/site";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { useInk } from "@/components/ink/InkProvider";
import type { InkPattern } from "@/data/projects";

const KEYWORD_PATTERN: Record<string, InkPattern> = {
  Intelligence: "network",
  Data: "streams",
  Networks: "graph",
  Products: "typography",
};

export default function About() {
  const { setPattern } = useInk();

  return (
    <Section id="about" label="About">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <h2 className="text-rice" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
            {about.heading}
          </h2>
        </Reveal>

        <div className="space-y-5 text-silver">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-base leading-relaxed md:text-lg">{p}</p>
            </Reveal>
          ))}

          <Reveal>
            <ul className="mt-8 flex flex-wrap gap-3" aria-label="Focus areas">
              {about.keywords.map((k) => (
                <li key={k.word}>
                  <motion.button
                    type="button"
                    onMouseEnter={() => setPattern(KEYWORD_PATTERN[k.word] ?? "default")}
                    onMouseLeave={() => setPattern("default")}
                    onFocus={() => setPattern(KEYWORD_PATTERN[k.word] ?? "default")}
                    onBlur={() => setPattern("default")}
                    whileHover={{ y: -2 }}
                    className="group surface flex flex-col items-start gap-1 rounded-xl px-5 py-3 text-left"
                    aria-label={`${k.word}: ${k.note}`}
                  >
                    <span className="font-serif text-xl text-rice">{k.word}</span>
                    <span className="font-mono-label opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {k.note}
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
