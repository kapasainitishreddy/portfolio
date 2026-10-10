import Image from "next/image";
import { about, hero, site, socials } from "@/data/site";
import { experience } from "@/data/experience";
import { flagshipCaseStudies } from "@/data/flagshipCaseStudies";
import { novels } from "@/data/novels";
import { buildingItems } from "@/data/building";
import { withBasePath } from "@/lib/basePath";

const coverByKey: Record<string, string> = {
  stillFiguringItOut: "/book-covers/still-figuring-it-out.webp",
  bareMinimum: "/book-covers/bare-minimum.webp",
  regret: "/book-covers/regret.webp",
  catWhoStayed: "/book-covers/the-cat-who-stayed.webp",
  wolfOneRedMonsoon: "/book-covers/wolf-one-red-monsoon.webp",
};

const featuredBooks = novels
  .filter((book) => book.coverKey && coverByKey[book.coverKey])
  .slice(0, 4);

const stackGroups = [
  { label: "Build", items: ["TypeScript", "React", "Next.js", "React Native"] },
  { label: "Serve", items: ["Python", "FastAPI", "Node.js", "REST APIs"] },
  { label: "Data", items: ["PostgreSQL", "SQL", "Pandas", "Data pipelines"] },
  { label: "AI systems", items: ["Agents", "RAG", "Tool calling", "Evaluations"] },
] as const;

export default function PortfolioV4() {
  return (
    <div className="portfolio-v4">
      <a className="v4-skip" href="#main">Skip to content</a>

      <header className="v4-header">
        <div className="retro-window-caption">
          <span className="retro-win-icon" aria-hidden="true">▣</span>
          <strong>NITISH.EXE - PERSONAL PORTFOLIO</strong>
          <span className="retro-caption-glyphs" aria-hidden="true">_ □ ×</span>
        </div>
        <div className="v4-shell v4-header-inner">
          <a className="v4-brand" href="#home" aria-label="Sai Nitish portfolio home">
            <span className="v4-brand-mark">SN</span>
            <span className="v4-brand-copy">
              <strong>{site.shortName}</strong>
              <small>Forward Deployed Engineer</small>
            </span>
          </a>

          <nav className="v4-nav" aria-label="Portfolio">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#systems">Systems</a>
            <a href="#writing">Writing</a>
          </nav>

          <div className="v4-header-actions">
            <a className="v4-link" href={withBasePath(site.resumeUrl)}>Résumé ↗</a>
            <a className="v4-pill v4-pill-dark" href={`mailto:${site.email}`}>Contact</a>
          </div>
        </div>
      </header>

      <div className="retro-marquee-bar">
        <span className="sr-only">Welcome to my engineering portfolio. Explore selected projects, experience, and my résumé.</span>
        <div className="retro-marquee-track" aria-hidden="true">
          <span>★ WELCOME TO MY CORNER OF THE INTERNET ★ FORWARD DEPLOYED ENGINEERING ★ AI SYSTEMS ★ WRITING ★</span>
          <span>★ WELCOME TO MY CORNER OF THE INTERNET ★ FORWARD DEPLOYED ENGINEERING ★ AI SYSTEMS ★ WRITING ★</span>
        </div>
      </div>

      <nav className="retro-desktop-shortcuts" aria-label="Desktop shortcuts">
        <a href="#work"><span aria-hidden="true">▤</span>MY WORK</a>
        <a href="#experience"><span aria-hidden="true">▣</span>EXPERIENCE</a>
        <a href="#systems"><span aria-hidden="true">⌘</span>SKILLS</a>
        <a href="#writing"><span aria-hidden="true">✎</span>WRITING</a>
        <a href={withBasePath(site.resumeUrl)}><span aria-hidden="true">▧</span>RESUME.PDF</a>
        <a href="#contact"><span aria-hidden="true">✉</span>CONTACT</a>
      </nav>

      <main id="main">
        <section className="v4-shell v4-hero" id="home">
          <div className="retro-hero-titlebar">
            <span aria-hidden="true">▣</span>
            <strong>WELCOME.EXE</strong>
            <span className="retro-chrome-buttons" aria-hidden="true">_ □ ×</span>
          </div>
          <div className="v4-hero-copy">
            <p className="v4-eyebrow">{site.name} · United States</p>
            <h1>
              <span>Engineer</span>
              <em>with heart of writer.</em>
            </h1>
            <p className="v4-hero-lede">{hero.supporting}</p>
            <p className="retro-intro-status"><span aria-hidden="true">●</span> {hero.status}</p>
            <div className="v4-hero-actions">
              <a className="v4-pill v4-pill-blue" href="#work">See selected work</a>
              <a className="v4-link-arrow" href={withBasePath(site.resumeUrl)}>Open résumé <span>↗</span></a>
            </div>
            <div className="retro-hit-counter">
              <span>CASE FILES</span>
              <strong>{String(flagshipCaseStudies.length).padStart(7, "0")}</strong>
              <small>NO FAKE COUNTERS. REAL WORK.</small>
            </div>
          </div>

          <aside className="v4-hero-panel" aria-label="Selected outcomes">
            <div className="v4-panel-top">
              <span>Selected outcomes</span>
              <span className="v4-status"><i /> Available</span>
            </div>
            <div className="v4-metric-grid">
              {hero.proof.map((item) => (
                <div className="v4-metric" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <small>{item.detail}</small>
                </div>
              ))}
            </div>
            <div className="v4-panel-note">
              <span>How I work</span>
              <p>Discover the real workflow. Build the smallest useful system. Integrate it. Prove it works.</p>
            </div>
          </aside>
        </section>

        <section className="v4-work" id="work">
          <div className="v4-shell">
            <div className="v4-section-head">
              <div>
                <p className="v4-section-label">01 · Selected work</p>
                <h2>Systems, not demos.</h2>
              </div>
              <p>Real operational problems, translated into software with clear boundaries, measurable outcomes, and human review where it matters.</p>
            </div>

            <div className="v4-project-grid">
              {flagshipCaseStudies.map((project, index) => (
                <article className={`v4-project v4-project-${index + 1}`} key={project.id}>
                  <div className="v4-project-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.domain}</span>
                  </div>
                  <h3>{project.short}</h3>
                  <p className="v4-project-line">{project.oneLiner}</p>

                  <div className="v4-flow" aria-label={`${project.short} architecture`}>
                    {project.systemAnatomy.map((step, stepIndex) => (
                      <div className="v4-flow-node" key={step.title}>
                        <small>{step.kind}</small>
                        <strong>{step.title}</strong>
                        {stepIndex < project.systemAnatomy.length - 1 && <span className="v4-flow-arrow" aria-hidden="true">→</span>}
                      </div>
                    ))}
                  </div>

                  <div className="v4-proof-list">
                    {project.proof.slice(0, 3).map((proof) => <span key={proof}>{proof}</span>)}
                  </div>

                  <div className="v4-stack-line">{project.stack.join(" · ")}</div>
                  <details className="retro-case-details">
                    <summary>OPEN FULL CASE FILE <span aria-hidden="true">▸</span></summary>
                    <div className="retro-case-body">
                      <h4>THE PROBLEM</h4>
                      <p>{project.problem}</p>
                      <h4>DISCOVERY</h4>
                      <p>{project.discovery}</p>
                      <h4>SAFEGUARDS</h4>
                      <ul>{project.controls.map((control) => <li key={control}>{control}</li>)}</ul>
                      <h4>WHY NOT AUTOMATE EVERYTHING?</h4>
                      <p>{project.whyNotEverything}</p>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v4-experience" id="experience">
          <div className="v4-shell">
            <div className="v4-section-head v4-section-head-light">
              <div>
                <p className="v4-section-label">02 · Experience</p>
                <h2>Work that crosses boundaries.</h2>
              </div>
              <p>Customer context, data, model behavior, software, and operations are usually part of the same problem.</p>
            </div>

            <div className="v4-role-list">
              {experience.map((role, index) => (
                <article className="v4-role" key={`${role.title}-${role.period}`}>
                  <div className="v4-role-index">{String(index + 1).padStart(2, "0")}</div>
                  <div className="v4-role-period">{role.period}</div>
                  <div className="v4-role-body">
                    <h3>{role.title}</h3>
                    <p className="v4-role-org">{role.organization}</p>
                    <p>{role.summary}</p>
                    <ul>
                      {role.bullets.slice(0, 3).map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v4-systems" id="systems">
          <div className="v4-shell">
            <div className="v4-section-head">
              <div>
                <p className="v4-section-label">03 · Systems</p>
                <h2>What I build with.</h2>
              </div>
              <p>Enough range to move from discovery to a working product without losing sight of reliability, ownership, or the last mile.</p>
            </div>

            <div className="v4-stack-grid">
              {stackGroups.map((group) => (
                <article key={group.label}>
                  <p>{group.label}</p>
                  <h3>{group.items.join(" / ")}</h3>
                </article>
              ))}
            </div>

            <div className="v4-building">
              <div>
                <p className="v4-section-label">Currently exploring</p>
                <h3>Applied AI that can survive production.</h3>
              </div>
              <div className="v4-building-list">
                {buildingItems.slice(0, 4).map((item) => (
                  <div key={item.name}>
                    <span>{item.phase}</span>
                    <strong>{item.name}</strong>
                    <p>{item.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="v4-writing" id="writing">
          <div className="v4-shell">
            <div className="v4-writing-intro">
              <p className="v4-section-label">04 · Writing</p>
              <h2>Engineering teaches me systems.<br />Fiction teaches me people.</h2>
              <p>Writing is not a side decoration here. It shapes how I think about ambiguity, incentives, conflict, attention, and what people actually do instead of what a spec says they will do.</p>
            </div>

            <div className="v4-book-grid">
              {featuredBooks.map((book) => (
                <article className="v4-book" key={book.id}>
                  <Image
                    src={withBasePath(coverByKey[book.coverKey!])}
                    alt={`Cover of ${book.title}`}
                    width={330}
                    height={495}
                    sizes="(max-width: 720px) 44vw, 220px"
                    unoptimized
                  />
                  <div>
                    <span>{book.genre}</span>
                    <h3>{book.title}</h3>
                    <p>{book.premise}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v4-about" id="about">
          <div className="v4-shell v4-about-grid">
            <div>
              <p className="v4-section-label">05 · About</p>
              <h2>{about.heading}</h2>
            </div>
            <div className="v4-about-copy">
              <p>{about.paragraphs[0]}</p>
              <p>{about.paragraphs[1]}</p>
            </div>
          </div>
        </section>

        <section className="v4-contact" id="contact">
          <div className="v4-shell v4-contact-grid">
            <div>
              <p className="v4-section-label">06 · Contact</p>
              <h2>Have a messy problem?</h2>
              <p>I like the problems that sit between product, customers, data, AI, and engineering.</p>
            </div>
            <div className="v4-contact-actions">
              <a className="v4-contact-primary" href={`mailto:${site.email}`}>Email me <span>↗</span></a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
              <a href={socials.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="v4-footer">
        <div className="v4-shell">
          <span>{site.name}</span>
          <span>Engineer with heart of writer.</span>
          <span>© 2026</span>
        </div>
      </footer>

      <nav className="retro-taskbar" aria-label="Desktop taskbar">
        <details className="retro-start-menu">
          <summary className="retro-start-button">▦ START</summary>
          <div className="retro-start-panel">
            <strong>SAI NITISH 98</strong>
            <a href="#home">⌂ Home</a>
            <a href="#work">▤ Selected work</a>
            <a href="#experience">▣ Experience</a>
            <a href="#systems">⌘ Systems</a>
            <a href="#writing">✎ Writing</a>
            <a href="#contact">✉ Contact</a>
            <a href={withBasePath(site.resumeUrl)}>▧ Open résumé</a>
          </div>
        </details>
        <a className="retro-task-button" href="#home">▣ PORTFOLIO.EXE</a>
        <a className="retro-task-button" href={withBasePath(site.resumeUrl)}>▤ RESUME.PDF</a>
        <span className="retro-task-clock">2026 <span aria-hidden="true">◆</span></span>
      </nav>
    </div>
  );
}
