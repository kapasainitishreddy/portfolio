import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { novels } from "@/data/novels";

export default function Novels() {
  return (
    <Section id="novels" label="Novels">
      <Reveal>
        <div className="novels-intro">
          <div className="max-w-4xl">
            <h2 className="text-rice" style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.2rem)", lineHeight: 0.98 }}>
              I write to understand the humans inside the system.
            </h2>
          </div>
          <div className="novels-intro__aside">
            <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>Fiction by Asta</p>
            <p className="mt-3 max-w-xl leading-7 text-silver">
              Engineering asks what a system does. Fiction lets me ask what it does to people. Different medium, same curiosity about incentives, choices, consequences, and care.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="novel-shelf mt-10" aria-label="Selected novels">
        {novels.map((novel, index) => (
          <Reveal key={novel.id} delay={Math.min(index * 0.04, 0.2)}>
            <article className="novel-card">
              <div className={`novel-cover novel-cover--${novel.accent}`} aria-hidden="true">
                <span className="novel-cover__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="novel-cover__title">{novel.title}</span>
                <span className="novel-cover__mark">ASTA</span>
              </div>
              <div className="novel-card__copy">
                <p className="font-mono-label">{novel.genre}</p>
                <h3 className="mt-2 font-serif text-2xl text-rice">{novel.title}</h3>
                <p className="mt-3 text-sm leading-6 text-silver">{novel.premise}</p>
                <p className="novel-card__tone mt-5">{novel.tone}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
