import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { crossFunctionalDomains, crossFunctionalIntro } from "@/data/crossFunctional";

export default function CrossFunctional() {
  return (
    <Section id="cross-functional" label="Range, not randomness">
      <div className="cross-functional">
        <Reveal>
          <div className="cross-functional__intro">
            <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>{crossFunctionalIntro.eyebrow}</p>
            <h2 className="mt-4 max-w-5xl text-rice" style={{ fontSize: "clamp(2.4rem, 5.7vw, 5.25rem)", lineHeight: 1 }}>
              {crossFunctionalIntro.heading}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-silver md:text-lg md:leading-8">{crossFunctionalIntro.body}</p>
            <p className="mt-5 max-w-3xl font-serif text-xl leading-8 text-rice md:text-2xl">{crossFunctionalIntro.closer}</p>
          </div>
        </Reveal>

        <div className="cross-functional__rail mt-12">
          {crossFunctionalDomains.map((domain, index) => (
            <Reveal key={domain.id} delay={Math.min(index * 0.04, 0.16)}>
              <article className="cross-functional__row">
                <div className="cross-functional__index">
                  <span className="font-mono-label" style={{ color: "var(--color-copper)" }}>{domain.label}</span>
                </div>
                <div className="cross-functional__story">
                  <h3 className="font-serif text-2xl text-rice md:text-3xl">{domain.title}</h3>
                  <p className="mt-3 max-w-3xl leading-7 text-silver">{domain.body}</p>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-rice"><strong>What AI changed:</strong> {domain.aiEdge}</p>
                </div>
                <p className="cross-functional__proof text-sm leading-6 text-silver">{domain.proof}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
