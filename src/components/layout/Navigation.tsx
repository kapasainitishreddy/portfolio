"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, site, socials } from "@/data/site";
import { FileIcon, MenuIcon, CloseIcon, GitHubIcon, LinkedInIcon, ArrowIcon } from "./icons";
import InkControl from "@/components/ink/InkControl";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import ModeToggle from "@/components/theme/ModeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { withBasePath } from "@/lib/basePath";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const { theme } = useTheme();

  const railItems = useMemo(() => [{ label: "Home", href: "#home" }, ...navItems], []);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      setShowTop(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = railItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -58% 0px", threshold: [0.01, 0.15, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [railItems]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <aside className="portfolio-rail" aria-label="Portfolio sections">
        <a href="#home" className="portfolio-rail__brand" aria-label={`${site.name}, home`}>
          <span className="portfolio-rail__monogram" aria-hidden="true">{site.initials}</span>
          <span>{site.shortName}</span>
          <small>Build · Write</small>
        </a>

        <nav className="portfolio-rail__nav" aria-label="Primary">
          {railItems.map((item, index) => {
            const active = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className="portfolio-rail__link"
                data-active={active ? "true" : "false"}
                aria-current={active ? "location" : undefined}
              >
                <span className="portfolio-rail__index">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
          <a href={withBasePath(site.resumeUrl)} className="portfolio-rail__link portfolio-rail__resume">
            <FileIcon width={14} height={14} aria-hidden="true" />
            <span>Résumé</span>
          </a>
        </nav>

        <div className="portfolio-rail__utility">
          <ThemeSwitcher />
          <div className="portfolio-rail__utility-row">
            <ModeToggle />
            {theme === "ink" && <InkControl />}
          </div>
        </div>

        <div className="portfolio-rail__progress" aria-hidden="true">
          <span style={{ height: `${progress * 100}%` }} />
        </div>

        <a href="#home" className="portfolio-rail__top" data-visible={showTop ? "true" : "false"}>
          <ArrowIcon width={14} height={14} aria-hidden="true" />
          Top
        </a>
      </aside>

      <header className="portfolio-mobile-nav">
        <nav aria-label="Mobile primary" className="portfolio-mobile-nav__bar">
          <a href="#home" className="portfolio-mobile-nav__brand" aria-label={`${site.name}, home`}>
            <span className="portfolio-mobile-nav__monogram" aria-hidden="true">{site.initials}</span>
            <span>{site.shortName}</span>
          </a>

          <div className="portfolio-mobile-nav__actions">
            <ModeToggle />
            <a href={withBasePath(site.resumeUrl)} className="portfolio-mobile-nav__resume" aria-label="Open résumé">
              <FileIcon width={16} height={16} />
            </a>
            <button
              type="button"
              className="portfolio-mobile-nav__menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="portfolio-mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="portfolio-mobile-menu__inner">
                <p className="font-mono-label">Navigate</p>
                <ul className="portfolio-mobile-menu__links">
                  {railItems.map((item, index) => (
                    <li key={item.href}>
                      <a href={item.href} onClick={() => setMenuOpen(false)}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="portfolio-mobile-menu__themes">
                  <ThemeSwitcher />
                  {theme === "ink" && <InkControl />}
                </div>

                <div className="portfolio-mobile-menu__meta">
                  <a href={withBasePath(site.resumeUrl)} onClick={() => setMenuOpen(false)}>
                    <FileIcon width={16} height={16} /> Résumé
                  </a>
                  <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <GitHubIcon width={20} height={20} />
                  </a>
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <LinkedInIcon width={20} height={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
