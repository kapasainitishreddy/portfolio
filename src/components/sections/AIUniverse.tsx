import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { aiUniverseGroups } from "@/data/aiUniverse";

export default function AIUniverse() {
  return (
    <Section id="ai-universe" label="AI Universe">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="text-rice" style={{ fontSize: "clamp(2.4rem, 5.6vw, 5.3rem)", lineHeight: 0.98 }}>
            I do not think in isolated repos. I think in systems, patterns, and products.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-silver md:text-lg md:leading-8">
            My work spans agents, developer tools, consumer AI, computer vision, language, evaluation, governance, climate, and product infrastructure. This is the map of how those pieces connect.
          </p>
        </div>
      </Reveal>

      <div className="ai-universe-list mt-12">
        {aiUniverseGroups.map((group, index) => (
          <Reveal key={group.id} delay={Math.min(index * 0.035, 0.16)}>
            <article className={`ai-universe-row ${index % 2 === 1 ? "ai-universe-row--offset" : ""}`}>
              <div className="ai-universe-row__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="ai-universe-row__main">
                <div className="ai-universe-row__heading">
                  <h3 className="font-serif text-2xl text-rice md:text-3xl">{group.title}</h3>
                  <span className="font-mono-label" style={{ color: "var(--color-copper)" }}>
                    {group.focus}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl leading-7 text-silver">{group.description}</p>
                <div className="ai-universe-projects" aria-label={`${group.title} projects`}>
                  {group.projects.map((project) => (
                    <span key={project}>{project}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
