import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <Section id="skills" label="What I can do">
      <Reveal>
        <div className="max-w-3xl">
          <h2 className="text-rice" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>From unclear workflow to a system people can use.</h2>
          <p className="mt-5 max-w-2xl leading-7 text-silver">I can own the path between discovery and delivery, including the awkward integration and quality work that usually decides whether an AI project becomes useful.</p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.04}>
            <article className="capability-card h-full p-6 md:p-7">
              <span className="font-mono-label" style={{ color: "var(--color-copper)" }}>0{index + 1}</span>
              <h3 className="mt-3 font-serif text-2xl text-rice">{group.label}</h3>
              <p className="mt-3 leading-7 text-silver">{group.blurb}</p>
              <p className="mt-4 text-sm font-medium text-rice">{group.outcome}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => <span key={skill} className="rounded-full border px-2.5 py-1 text-xs text-silver">{skill}</span>)}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
