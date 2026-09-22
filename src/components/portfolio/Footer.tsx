import { footer, site, socials } from "@/data/site";
import { withBasePath } from "@/lib/basePath";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <a className="wordmark" href={withBasePath("/")}>SN <span aria-hidden="true">/ 01</span></a>
        <p>{footer.signature}</p>
        <nav aria-label="Footer navigation">
          <a href={socials.github}>GitHub</a>
          <a href={socials.linkedin}>LinkedIn</a>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={withBasePath(site.resumeUrl)}>Résumé</a>
          <a href={withBasePath("/privacy/")}>Privacy</a>
          <a href={withBasePath("/terms/")}>Terms</a>
        </nav>
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="footer-motto">{footer.motto}</p>
      </div>
    </footer>
  );
}
