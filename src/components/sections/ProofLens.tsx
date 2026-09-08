"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";

const lenses = [
  {
    id: "ai-engineer",
    label: "AI Engineer",
    headline: "I do not stop at the model call.",
    body: "I work through orchestration, retrieval, APIs, state, evaluation, observability, and failure handling so the AI feature has a real operating shape.",
    proof: ["Agentic workflows", "RAG + structured outputs", "Evaluation harnesses", "Python + TypeScript", "Production integrations"],
    link: { label: "Explore AI systems", href: "#ai-universe" },
  },
  {
    id: "forward-deployed",
    label: "Forward Deployed",
    headline: "I like the problem before it becomes a ticket.",
    body: "I can sit with the user, map the actual workflow, ship the smallest useful slice, integrate it into the existing stack, and keep iterating from evidence.",
    proof: ["Customer discovery", "Ambiguous requirements", "API + data integration", "Human handoffs", "Runbooks + ownership"],
    link: { label: "Open flagship case studies", href: "#flagship-case-studies" },
  },
  {
    id: "founder",
    label: "Founder",
    headline: "I build enough products to have opinions about friction.",
    body: "Syrava and my product work keep me close to the ugly parts of shipping: onboarding, pricing decisions, product scope, support, deployment, QA, and what users actually understand.",
    proof: ["Syrava product ecosystem", "Consumer AI products", "Developer tools", "Rapid prototyping", "End-to-end ownership"],
    link: { label: "See product universe", href: "#ai-universe" },
  },
  {
    id: "ai-safety",
    label: "AI Safety",
    headline: "I want the system to be useful on its worst Tuesday too.",
    body: "I work with evaluations, jailbreak and failure-mode thinking, human approvals, audit trails, privacy checks, and governance patterns. I also teach undergraduate sessions on AI safety and AI governance.",
    proof: ["1,800+ outputs evaluated", "Guardrail thinking", "Human oversight", "Auditability", "Governance education"],
    link: { label: "See safety + governance", href: "#ai-safety" },
  },
] as const;

export default function ProofLens() {
  const [activeId, setActiveId] = useState<(typeof lenses)[number]["id"]>("ai-engineer");
  const active = lenses.find((lens) => lens.id === activeId) ?? lenses[0];

  return (
    <Section id="proof-lens" label="Pick the lens">
      <Reveal>
        <div className="proof-lens">
          <div className="proof-lens__header">
            <h2 className="max-w-4xl text-rice" style={{ fontSize: "clamp(2.25rem, 5vw, 4.75rem)", lineHeight: 1 }}>
              Same person. Different proof, depending on why you are here.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-silver">
              Recruiters should not need to reverse-engineer a portfolio. Choose the role-shaped view and I will surface the part of my work that matters most.
            </p>
          </div>

          <div className="proof-lens__tabs mt-9" role="tablist" aria-label="Portfolio proof lens">
            {lenses.map((lens) => (
              <button
                key={lens.id}
                type="button"
                role="tab"
                aria-selected={active.id === lens.id}
                aria-pressed={active.id === lens.id}
                onClick={() => setActiveId(lens.id)}
                className="proof-lens__tab"
              >
                {lens.label}
              </button>
            ))}
          </div>

          <div className="proof-lens__stage mt-6" role="tabpanel" aria-live="polite">
            <div>
              <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>{active.label}</p>
              <h3 className="mt-3 max-w-3xl font-serif text-3xl text-rice md:text-5xl">{active.headline}</h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-silver md:text-lg">{active.body}</p>
              <a href={active.link.href} className="portfolio-cta mt-7">{active.link.label}</a>
            </div>
            <ul className="proof-lens__proof" aria-label={`${active.label} proof points`}>
              {active.proof.map((item, index) => (
                <li key={item}>
                  <span className="font-serif text-xl" style={{ color: "var(--color-copper)" }}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
