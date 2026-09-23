import { hero, site } from "@/data/site";
import { DocumentIcon, ArrowIcon } from "./icons";
import { withBasePath } from "@/lib/basePath";

export default function DocsHero() {
  return (
    <section className="docs-hero" id="overview" aria-labelledby="overview-title">
      <p className="docs-kicker">PORTFOLIO / 001</p>
      <h1 id="overview-title">{hero.headline}</h1>
      <p className="docs-lede">{hero.supporting}</p>
      <div className="docs-actions">
        <a href="#work">Explore selected work <ArrowIcon /></a>
        <a href={withBasePath(site.resumeUrl)}><DocumentIcon /> Résumé <ArrowIcon /></a>
      </div>
      <div className="evidence-strip" aria-label="Selected outcomes">
        {hero.proof.map((proof) => (
          <div className="evidence-item" key={proof.label}>
            <strong>{proof.value}</strong>
            <span>{proof.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
