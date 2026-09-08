"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { flagshipCaseStudies, flagshipNote } from "@/data/flagshipCaseStudies";

export default function FlagshipCaseStudies() {
  const [activeId, setActiveId] = useState(flagshipCaseStudies[0].id);
  const active = flagshipCaseStudies.find((item) => item.id === activeId) ?? flagshipCaseStudies[0];

  return (
    <Section id="flagship-case-studies" label="Flagship case studies">
      <Reveal>
        <div className="max-w-5xl">
          <h2 className="text-rice" style={{ fontSize: "clamp(2.5rem, 5.7vw, 5.25rem)", lineHeight: 0.98 }}>
            The interesting part is not that AI was involved. It is where I refused to use it.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-silver md:text-lg md:leading-8">
            Five systems, told as engineering decisions. Problem, Discovery, System anatomy, Controls, Proof, and the boundary between probabilistic AI and deterministic software.
          </p>
        </div>
      </Reveal>

      <div className="flagship mt-10">
        <Reveal>
          <nav className="flagship__nav" aria-label="Flagship case studies">
            {flagshipCaseStudies.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className="flagship__nav-item"
                aria-pressed={active.id === item.id}
              >
                <span className="font-mono-label">{String(index + 1).padStart(2, "0")}</span>
                <span className="flagship__nav-copy">
                  <strong>{item.short}</strong>
                  <small>{item.domain}</small>
                </span>
              </button>
            ))}
          </nav>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="flagship__story" aria-live="polite">
            <header className="flagship__story-header">
              <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>{active.domain}</p>
              <h3 className="mt-3 max-w-4xl font-serif text-3xl text-rice md:text-5xl">{active.title}</h3>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-silver">{active.oneLiner}</p>
            </header>

            <div className="flagship__brief mt-9">
              <CaseField label="Problem" body={active.problem} />
              <CaseField label="Discovery" body={active.discovery} />
            </div>

            <section className="mt-10" aria-labelledby={`anatomy-${active.id}`}>
              <p className="font-mono-label" id={`anatomy-${active.id}`}>System anatomy</p>
              <div className="flagship__anatomy mt-4">
                {active.systemAnatomy.map((step, index) => (
                  <div className="flagship__step" key={`${active.id}-${step.kind}-${step.title}`}>
                    <div className="flagship__step-top">
                      <span className="flagship__step-number">{String(index + 1).padStart(2, "0")}</span>
                      <span className={`flagship__step-kind flagship__step-kind--${step.kind.toLowerCase()}`}>{step.kind}</span>
                    </div>
                    <h4 className="mt-3 font-serif text-xl text-rice">{step.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-silver">{step.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="flagship__decision mt-10">
              <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>Engineering judgment</p>
              <h4 className="mt-3 font-serif text-2xl text-rice md:text-3xl">Why not let the model do everything?</h4>
              <p className="mt-4 max-w-4xl leading-7 text-silver">{active.whyNotEverything}</p>
            </div>

            <div className="flagship__evidence mt-10">
              <div>
                <p className="font-mono-label">Controls</p>
                <ul className="mt-4 space-y-2">
                  {active.controls.map((control) => <li key={control}>{control}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-mono-label">Proof</p>
                <ul className="mt-4 space-y-2">
                  {active.proof.map((proof) => <li key={proof}>{proof}</li>)}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
              {active.stack.map((technology) => (
                <span className="rounded-full border px-2.5 py-1 text-xs text-silver" key={technology}>{technology}</span>
              ))}
            </div>
          </article>
        </Reveal>
      </div>

      <p className="mt-7 max-w-4xl text-sm leading-6 text-silver" role="note">{flagshipNote}</p>
    </Section>
  );
}

function CaseField({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="font-mono-label">{label}</p>
      <p className="mt-3 text-sm leading-7 text-silver md:text-base">{body}</p>
    </div>
  );
}
