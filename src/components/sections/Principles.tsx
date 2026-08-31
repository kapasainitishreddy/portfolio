import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { principles } from "@/data/site";

export default function Principles() {
  return (
    <Section id="principles" label="Build Philosophy" className="portfolio-principles-section">
      <Reveal>
        <h2 className="max-w-4xl text-rice" style={{ fontSize: "clamp(2.1rem, 4.5vw, 4.4rem)" }}>
          {principles.heading}
        </h2>
      </Reveal>

      <div
        className="mt-12 grid gap-px overflow-hidden border md:grid-cols-2 xl:grid-cols-4"
        style={{
          borderColor: "color-mix(in srgb, var(--color-silver) 18%, transparent)",
          background: "color-mix(in srgb, var(--color-silver) 15%, transparent)",
        }}
      >
        {principles.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04}>
            <article
              className="h-full min-h-60 p-7 md:p-8"
              style={{ background: "color-mix(in srgb, var(--color-charcoal) 72%, transparent)" }}
            >
              <span
                className="font-mono text-xs tracking-[0.18em]"
                style={{ color: "var(--color-copper)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 font-serif text-2xl text-rice">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver md:text-base">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
