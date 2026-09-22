import Image from "next/image";
import { about, site, socials } from "@/data/site";
import { buildingItems } from "@/data/building";
import { experience } from "@/data/experience";
import { novels } from "@/data/novels";
import { withBasePath } from "@/lib/basePath";
import { ArrowIcon, ExternalIcon } from "./icons";
import SystemExplorer from "./SystemExplorer";

const method = about.keywords;

const systems = [
  { label: "Languages", value: "TypeScript · Python · SQL" },
  { label: "Frontend", value: "React · Next.js · React Native" },
  { label: "Backend", value: "FastAPI · Node.js · REST APIs" },
  { label: "Data", value: "PostgreSQL · Pandas · vector databases" },
  { label: "Infrastructure", value: "AWS · Docker · GitHub Actions" },
  { label: "AI systems", value: "Agents · RAG · tool calling · evaluations" },
] as const;

const coverByKey: Partial<Record<NonNullable<(typeof novels)[number]["coverKey"]>, string>> = {
  stillFiguringItOut: "/book-covers/still-figuring-it-out.webp",
  bareMinimum: "/book-covers/bare-minimum.webp",
  regret: "/book-covers/regret.webp",
  catWhoStayed: "/book-covers/the-cat-who-stayed.webp",
  wolfOneRedMonsoon: "/book-covers/wolf-one-red-monsoon.webp",
};

const featuredBooks = novels.filter((novel) => novel.coverKey && coverByKey[novel.coverKey]).slice(0, 3);

export default function StorySections() {
  return (
    <>
      <section className="technical section-rule" aria-labelledby="technical-title">
        <div className="shell section-pad technical-layout">
          <div>
            <p className="section-index">04 / White archive</p>
            <h2 id="technical-title">Tools, technologies, and systems I work with.</h2>
          </div>
          <p>A focused view of the stack I use across product, infrastructure, data, and applied AI.</p>
          <div className="technical-matrix">
            {systems.map((item) => (
              <div key={item.label}><h3>{item.label}</h3><p>{item.value}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="experience section-rule" id="experience">
        <div className="shell section-pad">
          <div className="section-intro">
            <div><p className="section-index">05 / Experience</p><h2>Work history with the evidence left in.</h2></div>
            <p>A selective view of the roles that shaped how I work across customers, data, product, and production systems.</p>
          </div>
          <div className="timeline">
            {experience.map((role, index) => (
              <article key={`${role.title}-${role.period}`}>
                <span className="timeline-point" aria-hidden="true" />
                <p className="timeline-period">{role.period}</p>
                <h3>{role.title}</h3>
                <p className="timeline-org">{role.organization}</p>
                <p>{role.summary}</p>
                <details>
                  <summary>Selected evidence</summary>
                  <ul>{role.bullets.slice(0, index === 0 ? 4 : 2).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SystemExplorer />

      <section className="method section-rule" id="method">
        <div className="shell section-pad method-layout">
          <div className="method-heading">
            <p className="section-index">06 / How I work</p>
            <h2>One repeatable way to ship.</h2>
          </div>
          <div className="method-steps">
            {method.map((item, index) => (
              <article key={item.word}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.word}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lab section-rule" aria-labelledby="lab-title">
        <div className="shell section-pad lab-layout">
          <div>
            <p className="section-index">05 / Lab</p>
            <h2 id="lab-title">Experiments and what&apos;s next.</h2>
          </div>
          <p className="lab-copy">A living view of the systems, evaluation patterns, and deployment ideas I am actively testing.</p>
          <div className="lab-rail">
            {buildingItems.slice(0, 4).map((item) => (
              <article key={item.name}>
                <span aria-hidden="true" />
                <div><h3>{item.name}</h3><p>{item.blurb}</p></div>
                <small>{item.phase}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="writing section-rule" id="writing">
        <div className="shell section-pad writing-layout">
          <div className="writing-heading">
            <p className="section-index">06 / Writing</p>
            <h2>Asta Books</h2>
            <p>Software is how I build systems. Fiction is how I study people, incentives, and ambiguity.</p>
          </div>
          <div className="book-rail">
            {featuredBooks.map((book) => (
              <article className="book" key={book.id}>
                <Image
                  src={withBasePath(coverByKey[book.coverKey!]!)}
                  alt={`Cover of ${book.title}`}
                  width={170}
                  height={255}
                  sizes="(max-width: 720px) 86px, 70px"
                  loading="lazy"
                  unoptimized
                />
                <div><p>{book.genre}</p><h3>{book.title}</h3><span>{book.tone}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about section-rule" id="about">
        <div className="shell section-pad about-layout">
          <div><p className="section-index">08 / About</p><h2>Same curiosity. Bigger problems.</h2></div>
          <div className="about-copy">
            <p>{about.paragraphs[0]}</p>
            <p>{about.paragraphs[1]}</p>
          </div>
          <p className="about-motto">Systems for<br />a brighter tomorrow.</p>
        </div>
      </section>

      <section className="contact section-rule" id="contact">
        <div className="shell contact-layout">
          <div>
            <p className="section-index">09 / Contact</p>
            <h2>Let&apos;s build something difficult.</h2>
            <p>I&apos;m interested in forward-deployed, product engineering, applied AI, and technical integration work.</p>
          </div>
          <div className="contact-links">
            <a className="button button-primary" href={`mailto:${site.email}`}>Email Sai <ArrowIcon /></a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a>
            <a href={socials.github} target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a>
          </div>
        </div>
      </section>
    </>
  );
}
