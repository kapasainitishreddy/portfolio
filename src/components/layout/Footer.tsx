import Link from "next/link";
import { footer, site, socials } from "@/data/site";
import { GitHubIcon, MailIcon, FileIcon } from "./icons";

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

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-5">
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="link-quiet flex items-center gap-2 text-sm text-silver">
              <GitHubIcon width={16} height={16} /> GitHub
            </a>
            <a href={`mailto:${site.email}`} className="link-quiet flex items-center gap-2 text-sm text-silver">
              <MailIcon width={16} height={16} /> Email
            </a>
            <a href={site.resumeUrl} className="link-quiet flex items-center gap-2 text-sm text-silver">
              <FileIcon width={16} height={16} /> Résumé
            </a>
            <Link href="/privacy" className="link-quiet flex items-center gap-2 text-sm text-silver">
              Privacy
            </Link>
            <Link href="/terms" className="link-quiet flex items-center gap-2 text-sm text-silver">
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
