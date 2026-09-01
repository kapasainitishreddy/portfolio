import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { about } from "@/data/site";

export default function About() {
  return (
    <Section id="about" label="How I work">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <h2 className="max-w-xl text-rice" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>{about.heading}</h2>
        </Reveal>
        <div>
          {about.paragraphs.map((paragraph, index) => <Reveal key={paragraph} delay={index * 0.04}><p className={index === 0 ? "text-lg leading-8 text-rice" : "mt-5 leading-7 text-silver"}>{paragraph}</p></Reveal>)}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.keywords.map((item) => (
              <div key={item.word} className="rounded-xl border p-4" style={{ background: "color-mix(in srgb, var(--color-charcoal) 58%, transparent)" }}>
                <strong className="text-sm text-rice">{item.word}</strong>
                <p className="mt-1 text-sm leading-6 text-silver">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
