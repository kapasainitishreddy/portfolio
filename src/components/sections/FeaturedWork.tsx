"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { roleCaseStudies } from "@/data/roleCaseStudies";

export default function FeaturedWork() {
  const [activeId, setActiveId] = useState(roleCaseStudies[0]?.id ?? "fde-freelance");
  const reduceMotion = useReducedMotion();
  const active = roleCaseStudies.find((item) => item.id === activeId) ?? roleCaseStudies[0]!;

  return (
    <Section id="featured-work" label="Case studies">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>Actual roles · documented outcomes</p>
            <h2 className="mt-3 text-rice" style={{ fontSize: "clamp(2.2rem, 4.6vw, 4.25rem)", lineHeight: 0.98 }}>
              Work, with the job and evidence attached.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-silver">
              No invented client personas. Pick a role to see the measured outcomes already documented in my experience history, what I owned, and the implementation stack behind it.
            </p>
          </div>
          <p className="font-mono-label lg:text-right">Role → ownership → measured result</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(14rem,0.7fr)_minmax(0,1.55fr)]">
        <Reveal>
          <div className="grid gap-2" role="tablist" aria-label="Role case studies">
            {roleCaseStudies.map((item) => {
              const selected = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`role-case-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className="rounded-2xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: selected ? "color-mix(in srgb, var(--color-copper) 48%, transparent)" : "color-mix(in srgb, var(--color-silver) 12%, transparent)",
                    background: selected ? "color-mix(in srgb, var(--color-copper) 8%, var(--color-charcoal))" : "color-mix(in srgb, var(--color-charcoal) 36%, transparent)",
                    outlineColor: "var(--color-copper)",
                  }}
                >
                  <span className="font-mono-label">{item.period}</span>
                  <strong className="mt-2 block font-serif text-xl font-normal text-rice">{item.role}</strong>
                  <span className="mt-1 block text-sm text-silver">{item.organization}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={active.id}
              id={`role-case-${active.id}`}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
              className="surface overflow-hidden p-5 md:p-8"
            >
              <header className="border-b pb-6" style={{ borderColor: "color-mix(in srgb, var(--color-silver) 12%, transparent)" }}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>{active.organization}</p>
                  <span className="rounded-full border px-3 py-1 text-xs text-silver">{active.period}</span>
                </div>
                <h3 className="mt-3 font-serif text-3xl font-normal text-rice md:text-5xl">{active.role}</h3>
                <p className="mt-4 max-w-3xl leading-7 text-silver">{active.summary}</p>
              </header>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Measured outcomes">
                {active.metrics.map((metric) => (
                  <div
                    key={`${metric.value}-${metric.label}`}
                    className="rounded-2xl border p-4"
                    style={{
                      borderColor: "color-mix(in srgb, var(--color-copper) 20%, transparent)",
                      background: "linear-gradient(145deg, color-mix(in srgb, var(--color-copper) 7%, transparent), color-mix(in srgb, var(--color-charcoal) 42%, transparent))",
                    }}
                  >
                    <strong className="block font-serif text-3xl font-normal text-rice">{metric.value}</strong>
                    <span className="mt-1 block text-sm leading-5 text-silver">{metric.label}</span>
                    {metric.detail && <small className="mt-2 block text-xs leading-5 text-silver opacity-70">{metric.detail}</small>}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <p className="font-mono-label">What I owned</p>
                  <ul className="mt-4 space-y-3">
                    {active.work.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-silver md:text-base">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-copper)" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border p-5" style={{ borderColor: "color-mix(in srgb, var(--color-silver) 12%, transparent)", background: "color-mix(in srgb, var(--color-charcoal) 32%, transparent)" }}>
                  <p className="font-mono-label">Result</p>
                  <p className="mt-3 leading-7 text-rice">{active.outcome}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {active.stack.map((item) => <span key={item} className="rounded-full border px-2.5 py-1 text-xs text-silver">{item}</span>)}
                  </div>
                </div>
              </div>

              {active.note && (
                <p className="mt-7 border-t pt-5 text-xs leading-5 text-silver" style={{ borderColor: "color-mix(in srgb, var(--color-silver) 12%, transparent)" }}>
                  {active.note}
                </p>
              )}
            </motion.article>
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  );
}
