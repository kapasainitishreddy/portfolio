import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { principles } from "@/data/site";

export default function Principles() {
  return (
    <Section id="principles" label="Principles & Approach">
      <Reveal>
        <h2 className="max-w-3xl text-rice" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
          {principles.heading}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl md:grid-cols-2" style={{ background: "color-mix(in srgb, var(--color-silver) 14%, transparent)" }}>
        {principles.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.04}>
            <div
              className="h-full p-8 md:p-10"
              style={{ background: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}
            >
              <span className="font-serif text-3xl" style={{ color: "var(--color-copper)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-2xl text-rice">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-silver">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
