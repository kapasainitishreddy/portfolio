import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" label="Experience">
      <Reveal>
        <div className="max-w-3xl">
          <h2 className="text-rice" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>Work history with the evidence left in.</h2>
          <p className="mt-5 max-w-2xl leading-7 text-silver">I have worked across forward-deployed AI delivery, analytics, model evaluation, and operational data systems. These are the parts most relevant to how I work today.</p>
        </div>
      </Reveal>
      <div className="mt-10 space-y-5">
        {experience.map((role, index) => (
          <Reveal key={`${role.title}-${role.organization}`} delay={index * 0.03}>
            <article className="experience-card grid gap-5 p-6 md:grid-cols-[0.34fr_0.66fr] md:p-8">
              <div>
                <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>{role.period}</p>
                <h3 className="mt-3 font-serif text-2xl text-rice">{role.title}</h3>
                <p className="mt-2 text-sm text-silver">{role.organization}</p>
                <p className="mt-4 text-sm leading-6 text-silver">{role.summary}</p>
              </div>
              <ul className="space-y-3">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-6 text-silver">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-copper)" }} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
