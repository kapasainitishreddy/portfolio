import { hero, site } from "@/data/site";
import { DocumentIcon, ArrowIcon } from "./icons";
import { withBasePath } from "@/lib/basePath";
import ThreeArtifact from "./ThreeArtifact";

export default function DocsHero() {
  return (
    <section className="docs-hero" id="overview" aria-labelledby="overview-title">
      <div className="hero-main-grid">
        <div className="hero-copy-block">
          <div className="hero-eyebrow-row">
            <p className="docs-kicker">FORWARD DEPLOYED ENGINEER / AI SYSTEMS</p>
            <p className="docs-availability"><i aria-hidden="true" /> Available for high-impact engineering work</p>
          </div>

          <h1 id="overview-title" aria-label={hero.headline}>
            <span className="hero-engineer-line">Engineer with</span>
            <span className="hero-writer-line">heart of writer.</span>
          </h1>

          <p className="docs-lede">{hero.supporting}</p>
          <p className="docs-location">{site.location}</p>

          <div className="docs-actions">
            <a className="hero-primary-action" href="#work">Explore selected work <ArrowIcon /></a>
            <a href={withBasePath(site.resumeUrl)}><DocumentIcon /> Open résumé <ArrowIcon /></a>
          </div>
        </div>

        <div className="hero-three-card">
          <ThreeArtifact variant="writer-core" mode="hero" />
          <div className="hero-three-meta" aria-hidden="true">
            <span>ENGINEERING / SYSTEMS</span>
            <span>FICTION / PEOPLE</span>
          </div>
        </div>
      </div>

      <div className="evidence-strip" aria-label="Selected outcomes">
        {hero.proof.map((proof) => (
          <div className="evidence-item" key={proof.label}>
            <strong>{proof.value}</strong>
            <span>{proof.label}</span>
            <small>{proof.detail}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
