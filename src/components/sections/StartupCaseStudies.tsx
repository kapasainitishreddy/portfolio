import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { startupCaseStudies, startupCaseStudyNote } from "@/data/startupCaseStudies";

export default function StartupCaseStudies() {
  return (
    <Section id="startup-case-studies" label="Multi-Client Startup Delivery">
      <Reveal>
        <div className="max-w-4xl">
          <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>
            Basic to advanced
          </p>
          <h2 className="mt-4 text-rice" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            How I adapted AI systems across different startup and client workflows.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-silver md:text-lg md:leading-8">
            The pattern changed with the risk and complexity. A support chatbot needed grounded answers. A financial workflow needed deterministic rules and human review. Tool-using agents needed permissions and idempotency. Multi-client systems needed configuration and isolation instead of copied codebases.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap gap-2" aria-label="Delivery progression">
          {["Chatbot", "Workflow", "Financial", "Agent", "Onboarding", "Multi-client", "Multi-agent", "Analytics"].map((stage, index) => (
            <span
              key={stage}
              className="rounded-full border px-3 py-1.5 text-xs text-rice"
              style={{ background: "color-mix(in srgb, var(--color-charcoal) 72%, transparent)" }}
            >
              {String(index + 1).padStart(2, "0")} {stage}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 space-y-3">
        {startupCaseStudies.map((caseStudy, index) => (
          <Reveal key={caseStudy.id} delay={Math.min(index * 0.025, 0.15)}>
            <details className="surface group overflow-hidden">
              <summary className="cursor-pointer list-none p-5 marker:hidden md:p-6">
                <div className="grid items-start gap-4 md:grid-cols-[5rem_1fr_auto] md:gap-6">
                  <div>
                    <span className="font-serif text-3xl" style={{ color: "var(--color-copper)" }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-mono-label mt-1" style={{ textTransform: "none", letterSpacing: "0.06em" }}>
                      {caseStudy.level}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border px-2.5 py-1 text-xs text-silver">{caseStudy.domain}</span>
                      <span className="text-xs text-silver">Anonymized client work</span>
                    </div>
                    <h3 className="mt-3 font-serif text-xl text-rice md:text-2xl">{caseStudy.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-silver">{caseStudy.clientContext}</p>
                  </div>
                  <span className="text-sm text-rice transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </div>
              </summary>

              <div className="hairline px-5 pb-6 pt-5 md:px-6 md:pb-7">
                <div className="grid gap-6 lg:grid-cols-3">
                  <CaseField label="Client problem" body={caseStudy.problem} />
                  <CaseField label="What I discovered" body={caseStudy.discovery} />
                  <CaseField label="What I built" body={caseStudy.build} />
                </div>

                <div className="mt-7 grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="font-mono-label mb-3">Production controls</p>
                    <ul className="space-y-2">
                      {caseStudy.controls.map((control) => (
                        <li key={control} className="flex gap-3 text-sm leading-6 text-silver">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-copper)" }} />
                          {control}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono-label mb-3">Delivery proof</p>
                    <ul className="space-y-2">
                      {caseStudy.proof.map((proof) => (
                        <li key={proof} className="flex gap-3 text-sm leading-6 text-silver">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-copper)" }} />
                          {proof}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {caseStudy.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full px-2.5 py-1 text-xs text-silver"
                      style={{ border: "1px solid color-mix(in srgb, var(--color-silver) 22%, transparent)" }}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-7 max-w-4xl text-sm leading-6 text-silver" role="note">
          {startupCaseStudyNote}
        </p>
      </Reveal>
    </Section>
  );
}

function CaseField({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="font-mono-label mb-2">{label}</p>
      <p className="text-sm leading-6 text-silver">{body}</p>
    </div>
  );
}
