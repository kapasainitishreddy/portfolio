"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, site, socials } from "@/data/site";
import { visualMedia } from "@/data/visualMedia";
import { FileIcon, GitHubIcon, LinkedInIcon, CloseIcon } from "./icons";
import InkControl from "@/components/ink/InkControl";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import ModeToggle from "@/components/theme/ModeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { withBasePath } from "@/lib/basePath";

type GlyphName = "home" | "ai" | "work" | "book" | "shield" | "timeline" | "person" | "mail" | "more";

type DockItem = {
  label: string;
  href: string;
  icon: GlyphName;
  short?: string;
};

const iconByHref: Record<string, GlyphName> = {
  "#home": "home",
  "#ai-universe": "ai",
  "#featured-work": "work",
  "#novels": "book",
  "#ai-safety": "shield",
  "#experience": "timeline",
  "#about": "person",
  "#contact": "mail",
};

const dockItems: DockItem[] = [
  { label: "Home", href: "#home", icon: "home" },
  ...navItems.map((item) => ({ ...item, icon: iconByHref[item.href] ?? "more" })),
];

const mobileItems = dockItems.filter((item) => ["#home", "#featured-work", "#novels", "#ai-safety"].includes(item.href));

function DockGlyph({ name }: { name: GlyphName }) {
  const common = {
    width: 19,
    height: 19,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "home") return <svg {...common}><path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9Z" /></svg>;
  if (name === "ai") return <svg {...common}><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.7 5.7l2.1 2.1m8.4 8.4 2.1 2.1m0-12.6-2.1 2.1m-8.4 8.4-2.1 2.1" /><circle cx="12" cy="12" r="4" /></svg>;
  if (name === "work") return <svg {...common}><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M9 6V4h6v2m-12 5h18m-10 0v2h2v-2" /></svg>;
  if (name === "book") return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Zm16 0A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" /></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></svg>;
  if (name === "timeline") return <svg {...common}><path d="M7 4v16" /><circle cx="7" cy="7" r="2" /><circle cx="7" cy="16" r="2" /><path d="M10 7h9M10 16h7" /></svg>;
  if (name === "person") return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></svg>;
  if (name === "mail") return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  return <svg {...common}><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></svg>;
}

export default function Navigation() {
  const [activeHref, setActiveHref] = useState("#home");
  const [progress, setProgress] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();

  const activeLabel = useMemo(
    () => dockItems.find((item) => item.href === activeHref)?.label ?? "Home",
    [activeHref],
  );

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = dockItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: [0.01, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeOverlays = () => {
    setCommandOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <aside className="portfolio-dock" aria-label="Portfolio navigation">
        <a href="#home" className="portfolio-dock__avatar" aria-label={`${site.name}, home`}>
          <img src={visualMedia.portrait} alt="" />
          <span className="portfolio-dock__presence" aria-hidden="true" />
          <span className="portfolio-dock__tooltip portfolio-dock__tooltip--brand">Sai Nitish</span>
        </a>

        <div className="portfolio-dock__divider" />

        <nav className="portfolio-dock__nav" aria-label="Primary">
          {dockItems.map((item) => {
            const active = activeHref === item.href;
            return (
              <motion.a
                key={item.href}
                href={item.href}
                className="portfolio-dock__item"
                data-active={active ? "true" : "false"}
                aria-current={active ? "location" : undefined}
                whileHover={{ x: 5, scale: 1.08 }}
                whileFocus={{ x: 3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 440, damping: 28 }}
              >
                <DockGlyph name={item.icon} />
                <span className="portfolio-dock__active-dot" aria-hidden="true" />
                <span className="portfolio-dock__tooltip">{item.label}</span>
              </motion.a>
            );
          })}
        </nav>

        <div className="portfolio-dock__divider" />

        <button
          type="button"
          className="portfolio-dock__item portfolio-dock__command-button"
          aria-label="Open command menu"
          aria-expanded={commandOpen}
          onClick={() => setCommandOpen((open) => !open)}
        >
          <DockGlyph name="more" />
          <span className="portfolio-dock__tooltip">Menu · ⌘K</span>
        </button>

        <div className="portfolio-dock__progress" aria-hidden="true">
          <span style={{ transform: `scaleY(${progress})` }} />
        </div>
      </aside>

      <AnimatePresence>
        {commandOpen && (
          <motion.div
            className="portfolio-command"
            role="dialog"
            aria-modal="false"
            aria-label="Portfolio command menu"
            initial={{ opacity: 0, x: -12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            <div className="portfolio-command__header">
              <div>
                <span className="font-mono-label">Now viewing</span>
                <strong>{activeLabel}</strong>
              </div>
              <button type="button" onClick={() => setCommandOpen(false)} aria-label="Close command menu">
                <CloseIcon width={17} height={17} />
              </button>
            </div>

            <div className="portfolio-command__grid">
              {dockItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeOverlays} data-active={activeHref === item.href ? "true" : "false"}>
                  <DockGlyph name={item.icon} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <div className="portfolio-command__utility">
              <ThemeSwitcher />
              <ModeToggle />
              {theme === "ink" && <InkControl />}
            </div>

            <div className="portfolio-command__footer">
              <a href={withBasePath(site.resumeUrl)}><FileIcon width={15} height={15} /> Résumé</a>
              <a href={socials.github} target="_blank" rel="noopener noreferrer"><GitHubIcon width={16} height={16} /> GitHub</a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon width={16} height={16} /> LinkedIn</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="portfolio-mobile-dock" aria-label="Mobile primary">
        {mobileItems.map((item) => (
          <a key={item.href} href={item.href} data-active={activeHref === item.href ? "true" : "false"} aria-current={activeHref === item.href ? "location" : undefined}>
            <DockGlyph name={item.icon} />
            <span>{item.label === "Case studies" ? "Work" : item.label}</span>
          </a>
        ))}
        <button type="button" onClick={() => setMobileOpen(true)} aria-label="More navigation options" aria-expanded={mobileOpen}>
          <DockGlyph name="more" />
          <span>More</span>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="portfolio-mobile-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="More portfolio navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="portfolio-mobile-sheet__backdrop" type="button" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
            <motion.div
              className="portfolio-mobile-sheet__panel"
              initial={{ y: 38 }}
              animate={{ y: 0 }}
              exit={{ y: 38 }}
              transition={{ type: "spring", stiffness: 360, damping: 32 }}
            >
              <div className="portfolio-mobile-sheet__handle" aria-hidden="true" />
              <div className="portfolio-mobile-sheet__profile">
                <img src={visualMedia.portrait} alt="" />
                <div><strong>{site.shortName}</strong><span>Engineer · Writer</span></div>
                <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><CloseIcon width={18} height={18} /></button>
              </div>

              <div className="portfolio-mobile-sheet__links">
                {dockItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeOverlays} data-active={activeHref === item.href ? "true" : "false"}>
                    <DockGlyph name={item.icon} />
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>

              <div className="portfolio-mobile-sheet__utility">
                <ThemeSwitcher />
                <ModeToggle />
                {theme === "ink" && <InkControl />}
              </div>

              <div className="portfolio-mobile-sheet__footer">
                <a href={withBasePath(site.resumeUrl)} onClick={closeOverlays}><FileIcon width={16} height={16} /> Résumé</a>
                <a href={socials.github} target="_blank" rel="noopener noreferrer"><GitHubIcon width={17} height={17} /> GitHub</a>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon width={17} height={17} /> LinkedIn</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
