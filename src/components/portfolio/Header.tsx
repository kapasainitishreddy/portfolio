import { hero, site } from "@/data/site";
import { withBasePath } from "@/lib/basePath";

export default function Header() {
  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <a href="#overview" className="portfolio-wordmark" aria-label="Sai Nitish portfolio home">
          <strong>{site.shortName}</strong>
          <span>FDE · AI SYSTEMS</span>
        </a>
        <p className="portfolio-availability"><i aria-hidden="true" /><span>{hero.status}</span></p>
        <div className="portfolio-header-actions">
          <a href={withBasePath(site.resumeUrl)}>Résumé <span aria-hidden="true">↗</span></a>
          <a className="portfolio-contact-cta" href={`mailto:${site.email}`}>Contact</a>
        </div>
      </div>
    </header>
  );
}
