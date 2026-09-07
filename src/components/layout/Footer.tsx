import Link from "next/link";
import { footer, site, socials } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon, FileIcon } from "./icons";
import { withBasePath } from "@/lib/basePath";

const footerLinkClass = "link-quiet inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-sm text-silver";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="content-pad mx-auto w-full max-w-7xl py-16">
      <div className="hairline pt-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-2xl text-rice">{footer.motto}</p>
            <p className="mt-3 text-sm text-silver">{footer.signature}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub, opens in a new tab"
              className={footerLinkClass}
            >
              <GitHubIcon width={16} height={16} /> GitHub
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn, opens in a new tab"
              className={footerLinkClass}
            >
              <LinkedInIcon width={16} height={16} /> LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className={footerLinkClass}>
              <MailIcon width={16} height={16} /> Email
            </a>
            <a href={withBasePath(site.resumeUrl)} className={footerLinkClass}>
              <FileIcon width={16} height={16} /> Résumé
            </a>
            <Link href="/privacy" className={footerLinkClass}>
              Privacy
            </Link>
            <Link href="/terms" className={footerLinkClass}>
              Terms
            </Link>
          </nav>
        </div>

        <p className="font-mono-label mt-12" style={{ textTransform: "none", letterSpacing: "0.04em" }}>
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
