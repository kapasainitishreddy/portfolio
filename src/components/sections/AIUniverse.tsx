import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { aiUniverseGroups } from "@/data/aiUniverse";

export default function AIUniverse() {
  return (
    <Section id="ai-universe" label="AI Universe">
      <Reveal>
        <div className="ai-universe-visual__intro">
          <div>
            <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>Built across the stack</p>
            <h2 className="text-rice">A map of the things I make.</h2>
          </div>
          <p>Agents, developer tools, consumer AI, evaluation, voice, research, and public-good systems.</p>
        </div>
      </Reveal>

      <div className="ai-universe-visual mt-10">
        {aiUniverseGroups.map((group, index) => (
          <Reveal key={group.id} delay={Math.min(index * 0.03, 0.15)}>
            <article className="ai-universe-visual__card">
              <div className="ai-universe-visual__topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{group.focus}</span>
              </div>
              <h3>{group.title}</h3>
              <div className="ai-universe-visual__projects" aria-label={`${group.title} projects`}>
                {group.projects.map((project, projectIndex) => (
                  <span key={project} style={{ "--project-index": projectIndex } as React.CSSProperties}>
                    {project}
                  </span>
                ))}
              </div>
              <div className="ai-universe-visual__orbit" aria-hidden="true"><i /><i /><i /></div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
