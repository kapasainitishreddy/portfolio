import Reveal from "@/components/layout/Reveal";

const themes = ["Tension", "Motive", "Consequence", "Moral ambiguity"];

export default function Writing() {
  return (
    <section id="writing" className="portfolio-writing content-pad mx-auto w-full max-w-[1500px] scroll-mt-24">
      <Reveal>
        <div className="portfolio-writing__lead">
          <p className="font-mono-label">Writing</p>
          <h2>Psychological thrillers. Ideas in the dark.</h2>
          <p>
            I write stories about pressure, hidden motives, fractured relationships, and the decisions people make
            when every comfortable option disappears.
          </p>
          <a href="#contact" className="portfolio-inline-link">
            Talk stories <span aria-hidden="true">→</span>
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="portfolio-writing__manuscript">
          <div className="portfolio-writing__seal" aria-hidden="true">書</div>
          <p className="font-mono-label">Thriller Writer</p>
          <blockquote>
            “I build products the way I write thrillers: with tension, clarity, pacing, and intent.”
          </blockquote>
          <div className="portfolio-writing__themes" aria-label="Writing themes">
            {themes.map((theme) => (
              <span key={theme}>{theme}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
