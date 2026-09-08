import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { teachingTopics } from "@/data/aiUniverse";

export default function AISafetyTeaching() {
  return (
    <Section id="ai-safety" label="AI Safety · Teaching">
      <div className="ai-safety-teaching">
        <Reveal>
          <div className="ai-safety-teaching__lead">
            <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>
              Safety belongs in the build loop
            </p>
            <h2 className="mt-4 max-w-4xl text-rice" style={{ fontSize: "clamp(2.3rem, 5.2vw, 4.9rem)", lineHeight: 1 }}>
              I teach the failure modes, not just the happy path.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-silver md:text-lg md:leading-8">
              I teach undergraduate sessions on AI jailbreaks, AI safety, and AI governance. The goal is to help students understand how AI systems fail, how misuse happens, and how evaluations, guardrails, human oversight, and governance reduce risk in real deployments.
            </p>
          </div>
        </Reveal>

        <div className="ai-safety-teaching__topics">
          {teachingTopics.map((topic, index) => (
            <Reveal key={topic.title} delay={index * 0.05}>
              <article className="ai-safety-teaching__topic">
                <span className="font-serif text-2xl" style={{ color: "var(--color-copper)" }} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-rice">{topic.title}</h3>
                  <p className="mt-3 leading-7 text-silver">{topic.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <p className="ai-safety-teaching__note">
            I approach jailbreaks as a defensive learning topic: understand the failure mechanism, test responsibly, document the risk, and design stronger controls around the system.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
