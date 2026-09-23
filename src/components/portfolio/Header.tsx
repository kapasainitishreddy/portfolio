"use client";

import { useEffect, useMemo, useState } from "react";
import { site, socials } from "@/data/site";
import { withBasePath } from "@/lib/basePath";

const pages = [
  { label: "Overview", href: "#overview" },
  { label: "Selected work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Systems & tools", href: "#systems" },
  { label: "How I work", href: "#method" },
  { label: "Lab", href: "#lab" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#overview");
  const visiblePages = useMemo(() => pages.filter((page) => page.label.toLowerCase().includes(query.trim().toLowerCase())), [query]);
  const activePage = pages.find((page) => page.href === activeHref) ?? pages[0];

  useEffect(() => {
    const syncPage = () => {
      const nextPage = `#${window.location.hash.slice(1) || "overview"}`;
      setActiveHref(pages.some((page) => page.href === nextPage) ? nextPage : "#overview");
    };
    syncPage();
    window.addEventListener("hashchange", syncPage);
    window.addEventListener("popstate", syncPage);
    return () => {
      window.removeEventListener("hashchange", syncPage);
      window.removeEventListener("popstate", syncPage);
    };
  }, []);

  return (
    <>
      <aside className={`docs-sidebar${menuOpen ? " is-open" : ""}`} aria-label="Portfolio documentation navigation">
        <div className="docs-brand-row">
          <a href={withBasePath("/")} className="docs-brand"><strong>{site.shortName}</strong><span>PORTFOLIO DOCS</span></a>
          <button className="docs-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation">×</button>
        </div>
        <label className="docs-search">
          <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8"/><path d="m13.2 13.2 4 4"/></svg>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter docs…" aria-label="Filter documentation navigation" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear filter">×</button>}
        </label>
        <nav className="docs-nav" aria-label="Documentation sections">
          <p className="docs-nav-label">PORTFOLIO</p>
          {visiblePages.length ? visiblePages.map((page) => (
            <a key={page.href} href={page.href} className={page.href === activeHref ? "is-active" : ""} aria-current={page.href === activeHref ? "location" : undefined} onClick={() => { setActiveHref(page.href); setMenuOpen(false); }}>
              <span className="docs-nav-mark" aria-hidden="true">{String(pages.indexOf(page) + 1).padStart(2, "0")}</span>{page.label}
            </a>
          )) : <p className="docs-nav-empty">No sections match “{query}”.</p>}
        </nav>
        <div className="docs-sidebar-footer">
          <a href={socials.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${site.email}`}>Email</a>
        </div>
      </aside>
      {menuOpen && <button className="docs-backdrop" type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <header className="docs-topbar">
        <button className="docs-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-expanded={menuOpen}>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14"/></svg>
        </button>
        <p><a href={withBasePath("/")}>Portfolio</a><span>/</span>{activePage.label}</p>
        <a className="docs-contact-link" href={`mailto:${site.email}`}>Contact <span aria-hidden="true">↗</span></a>
      </header>
    </>
  );
}
