"use client";

import { useEffect, useMemo, useRef, useState, type FocusEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [dockExpanded, setDockExpanded] = useState(false);
  const commandTriggerRef = useRef<HTMLButtonElement>(null);
  const commandMenuRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();

  const activeIndex = useMemo(
    () => Math.max(0, dockItems.findIndex((item) => item.href === activeHref)),
    [activeHref],
  );

  const activeLabel = useMemo(
    () => dockItems[activeIndex]?.label ?? "Home",
    [activeIndex],
  );

  const springTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 390, damping: 34, mass: 0.62 };

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
        setCommandOpen((open) => {
          const next = !open;
          setDockExpanded(next);
          return next;
        });
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setDockExpanded(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!commandOpen) return;

    const menu = commandMenuRef.current;
    if (!menu) return;

    const fallbackTrigger = commandTriggerRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : fallbackTrigger;
    const firstAction = menu.querySelector<HTMLElement>(".portfolio-command__grid a[href]");
    const commandFocusFrame = window.requestAnimationFrame(() => firstAction?.focus());

    return () => {
      window.cancelAnimationFrame(commandFocusFrame);
      window.requestAnimationFrame(() => {
        if (previousFocus?.isConnected) previousFocus.focus();
        else fallbackTrigger?.focus();
      });
    };
  }, [commandOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const panel = mobileSheetRef.current;
    if (!panel) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : mobileTriggerRef.current;
    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const focusFrame = window.requestAnimationFrame(() => first?.focus());

    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    panel.addEventListener("keydown", keepFocusInside);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      panel.removeEventListener("keydown", keepFocusInside);
      window.requestAnimationFrame(() => {
        if (previousFocus?.isConnected) previousFocus.focus();
        else mobileTriggerRef.current?.focus();
      });
    };
  }, [mobileOpen]);

  const closeOverlays = () => {
    setCommandOpen(false);
    setDockExpanded(false);
    setMobileOpen(false);
  };

  const handleDockBlur = (event: FocusEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return;
    if (!commandOpen) setDockExpanded(false);
  };

  return (
    <>
      <aside
        className="portfolio-dock"
        data-expanded={dockExpanded ? "true" : "false"}
        aria-label="Portfolio navigation"
        onMouseEnter={() => setDockExpanded(true)}
        onMouseLeave={() => {
          if (!commandOpen) setDockExpanded(false);
        }}
        onFocusCapture={() => setDockExpanded(true)}
        onBlurCapture={handleDockBlur}
      >
        <a href="#home" className="portfolio-dock__identity" aria-label={`${site.name}, home`}>
          <span className="portfolio-dock__avatar">
            <span className="portfolio-dock__avatar-ring" aria-hidden="true" />
            <img src={visualMedia.portrait} alt="" />
            <span className="portfolio-dock__presence" aria-hidden="true" />
          </span>
          <motion.span
            className="portfolio-dock__identity-copy"
            aria-hidden={!dockExpanded}
            animate={dockExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -7 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong>{site.shortName}</strong>
            <small>Engineer · Writer</small>
          </motion.span>
        </a>

        <div className="portfolio-dock__current" aria-live="polite" aria-atomic="true">
          <span>Viewing</span>
          <strong>{activeLabel}</strong>
        </div>

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
                aria-label={item.label}
                aria-current={active ? "location" : undefined}
                whileHover={reduceMotion ? undefined : { x: dockExpanded ? 2 : 1, scale: dockExpanded ? 1.012 : 1.035 }}
                whileFocus={reduceMotion ? undefined : { x: dockExpanded ? 2 : 1, scale: 1.012 }}
                transition={springTransition}
              >
                {active && (
                  <motion.span
                    className="portfolio-dock__active-pill"
                    layoutId="portfolio-desktop-active-pill"
                    transition={springTransition}
                    aria-hidden="true"
                  />
                )}
                <motion.span
                  className="portfolio-dock__icon"
                  animate={active && !reduceMotion ? { scale: [1, 1.12, 1], rotate: [0, -2, 0] } : { scale: 1, rotate: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DockGlyph name={item.icon} />
                </motion.span>
                <motion.span
                  className="portfolio-dock__label"
                  aria-hidden={!dockExpanded}
                  animate={dockExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -7 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.label}
                </motion.span>
              </motion.a>
            );
          })}
        </nav>

        <div className="portfolio-dock__divider" />

        <button
          ref={commandTriggerRef}
          type="button"
          className="portfolio-dock__item portfolio-dock__command-button"
          aria-label="Open quick menu"
          aria-expanded={commandOpen}
          onClick={() => {
            setCommandOpen((open) => {
              const next = !open;
              setDockExpanded(next);
              return next;
            });
          }}
        >
          <motion.span
            className="portfolio-dock__icon"
            animate={commandOpen && !reduceMotion ? { rotate: 90, scale: 1.05 } : { rotate: 0, scale: 1 }}
            transition={springTransition}
          >
            <DockGlyph name="more" />
          </motion.span>
          <motion.span
            className="portfolio-dock__label"
            aria-hidden={!dockExpanded}
            animate={dockExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -7 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
          >
            Quick menu
          </motion.span>
          <span className="portfolio-dock__shortcut" aria-hidden="true">⌘K</span>
        </button>

        <div className="portfolio-dock__progress" aria-hidden="true">
          <span style={{ transform: `scaleY(${progress})` }} />
        </div>
      </aside>

      <AnimatePresence>
        {commandOpen && (
          <motion.div
            ref={commandMenuRef}
            className="portfolio-command"
            data-dock-expanded={dockExpanded ? "true" : "false"}
            role="dialog"
            aria-modal="false"
            aria-label="Portfolio command menu"
            initial={reduceMotion ? false : { opacity: 0, x: -18, scale: 0.965 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 30, mass: 0.65 }}
          >
            <div className="portfolio-command__header">
              <div>
                <span className="portfolio-command__eyebrow">Quick jump</span>
                <strong>{activeLabel}</strong>
              </div>
              <div className="portfolio-command__header-actions">
                <span className="portfolio-command__kbd" aria-hidden="true">Ctrl/⌘ K</span>
                <button type="button" onClick={closeOverlays} aria-label="Close command menu">
                  <CloseIcon width={17} height={17} />
                </button>
              </div>
            </div>

            <div className="portfolio-command__grid">
              {dockItems.map((item) => {
                const active = activeHref === item.href;
                return (
                  <a key={item.href} href={item.href} onClick={closeOverlays} data-active={active ? "true" : "false"}>
                    <DockGlyph name={item.icon} />
                    <span className="portfolio-command__item-copy">
                      <strong>{item.label}</strong>
                      <small>{item.href === "#home" ? "Start here" : "Portfolio section"}</small>
                    </span>
                    <span className="portfolio-command__meta" aria-hidden="true">
                      <span>{active ? "Viewing" : "Jump"}</span>
                      <span>↗</span>
                    </span>
                  </a>
                );
              })}
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
        {mobileItems.map((item) => {
          const active = activeHref === item.href;
          return (
            <a key={item.href} href={item.href} data-active={active ? "true" : "false"} aria-current={active ? "location" : undefined}>
              {active && (
                <motion.span
                  className="portfolio-mobile-dock__active-pill"
                  layoutId="portfolio-mobile-active-pill"
                  transition={springTransition}
                  aria-hidden="true"
                />
              )}
              <motion.span
                className="portfolio-mobile-dock__icon"
                animate={active && !reduceMotion ? { y: -2, scale: 1.08 } : { y: 0, scale: 1 }}
                transition={springTransition}
              >
                <DockGlyph name={item.icon} />
              </motion.span>
              <span className="portfolio-mobile-dock__label">{item.label === "Case studies" ? "Work" : item.label}</span>
            </a>
          );
        })}
        <button
          ref={mobileTriggerRef}
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="More navigation options"
          aria-expanded={mobileOpen}
        >
          <span className="portfolio-mobile-dock__icon"><DockGlyph name="more" /></span>
          <span className="portfolio-mobile-dock__label">More</span>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="portfolio-mobile-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="More portfolio navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="portfolio-mobile-sheet__backdrop"
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              style={{ touchAction: "none" }}
            />
            <motion.div
              ref={mobileSheetRef}
              className="portfolio-mobile-sheet__panel"
              style={{
                overflowY: "auto",
                overscrollBehavior: "contain",
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch",
              }}
              initial={reduceMotion ? false : { y: 38 }}
              animate={{ y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { y: 38 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 32 }}
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
