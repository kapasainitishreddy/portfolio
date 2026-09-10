import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";

const boundaries = [
  {
    label: "What is public",
    body: "Architecture patterns, engineering judgment, safety boundaries, selected stacks, and measured outcomes that can be shared without exposing product identity.",
  },
  {
    label: "What stays private",
    body: "Product names, repositories, unreleased features, roadmaps, customer identities, and implementation details that would expose work I am still developing.",
  },
  {
    label: "Why",
    body: "I am keeping the products private while scaling them. The portfolio should prove how I think and build without turning active product work into a public blueprint.",
  },
] as const;

export default function PrivateBuilds() {
  return (
    <Section id="private-builds" label="Private builds">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,.8fr)] lg:items-end">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-rice" style={{ borderColor: "color-mix(in srgb, var(--color-copper) 34%, transparent)", background: "color-mix(in srgb, var(--color-copper) 8%, transparent)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-copper)" }} aria-hidden="true" />
              Private while scaling
            </div>
            <h2 className="mt-5 text-rice" style={{ fontSize: "clamp(2.35rem, 5vw, 4.8rem)", lineHeight: 0.98 }}>
              The products are real. The identities are intentionally not public.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-silver md:text-lg md:leading-8">
              I am actively developing and scaling private product systems across AI, automation, multimodal interfaces, developer workflows, and privacy-aware experiences. I would rather show defensible engineering evidence than publish names or repositories before the products are ready for that exposure.
            </p>
          </div>
          <p className="font-mono-label lg:text-right">Private IP · public engineering judgment</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {boundaries.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.04}>
            <article className="surface h-full p-5 md:p-6">
              <span className="font-mono-label" style={{ color: "var(--color-copper)" }}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-2xl font-normal text-rice">{item.label}</h3>
              <p className="mt-3 text-sm leading-6 text-silver">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="mt-6 rounded-2xl border p-5 md:flex md:items-center md:justify-between md:gap-6" style={{ borderColor: "color-mix(in srgb, var(--color-silver) 13%, transparent)", background: "color-mix(in srgb, var(--color-charcoal) 34%, transparent)" }}>
          <p className="max-w-3xl text-sm leading-6 text-silver">
            For hiring conversations, I can discuss system design, evaluation strategy, deployment tradeoffs, privacy boundaries, and how I decide what should stay deterministic versus AI-driven without disclosing private product IP.
          </p>
          <a href="#ask-nitish" className="mt-4 inline-flex text-sm text-rice md:mt-0">Ask about the systems <span className="ml-2" aria-hidden="true">↗</span></a>
        </div>
      </Reveal>
    </Section>
  );
}
