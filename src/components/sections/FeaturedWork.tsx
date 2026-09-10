"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { roleCaseStudies } from "@/data/roleCaseStudies";

export default function FeaturedWork() {
  const [activeId, setActiveId] = useState(roleCaseStudies[0].id);
  const active = roleCaseStudies.find((item) => item.id === activeId) ?? roleCaseStudies[0];

  return (
    <Section id="featured-work" label="Case studies">
      <Reveal>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>Actual roles. Actual measurements.</p>
            <h2 className="mt-3 text-rice" style={{ fontSize: "clamp(2.3rem, 4.8vw, 4.6rem)", lineHeight: 0.98 }}>
              Work, with receipts.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-silver md:text-lg">
              No invented client personas and no generic transformation stories. These are role-backed examples using the same scope and measurements documented in my experience history.
            </p>
          </div>
          <p className="max-w-sm text-sm leading-6 text-silver lg:text-right">
            Pick a role to see the work I owned, the measured result, and the tools behind it.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.6fr)]">
        <Reveal>
          <div className="grid gap-2" role="tablist" aria-label="Role case studies">
            {roleCaseStudies.map((item) => {
              const activeItem = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeItem}
                  aria-controls={`case-panel-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className="rounded-2xl border p-4 text-left transition-colors"
                  style={{
                    borderColor: activeItem ? "color-mix(in srgb, var(--color-copper) 48%, transparent)" : "color-mix(in srgb, var(--color-silver) 12%, transparent)",
                    background: activeItem ? "color-mix(in srgb, var(--color-copper) 8%, var(--color-charcoal))" : "color-mix(in srgb, var(--color-charcoal) 38%, transparent)",
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
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              id={`case-panel-${active.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
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
                    key={`${active.id}-${metric.value}-${metric.label}`}
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
                  <p className="font-mono-label">What I actually owned</p>
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
