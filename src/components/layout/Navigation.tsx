"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, site, socials } from "@/data/site";
import { GitHubIcon, LinkedInIcon, FileIcon, MenuIcon, CloseIcon } from "./icons";
import InkControl from "@/components/ink/InkControl";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import ModeToggle from "@/components/theme/ModeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => firstMenuLinkRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMenuOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center">
      <nav
        aria-label="Primary"
        className={`content-pad relative z-[102] mt-3 flex w-full max-w-7xl items-center justify-between rounded-full transition-all duration-500 ${
          scrolled ? "surface py-2" : "py-4"
        }`}
        style={scrolled ? { paddingInline: "clamp(1rem, 4vw, 2rem)" } : undefined}
      >
        <a href="#home" className="group flex min-h-11 items-center gap-2" aria-label={`${site.name}, home`}>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full font-serif text-sm"
            style={{ background: "var(--color-indigo)", color: "var(--color-soft)" }}
          >
            {site.initials}
          </span>
          <span className={`font-serif text-rice transition-all ${scrolled ? "text-base" : "text-lg"}`}>
            {site.shortName}
          </span>
        </a>

        <ul className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-quiet inline-flex min-h-11 items-center px-1 text-sm text-silver hover:text-rice">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={site.resumeUrl}
            className="hidden min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm text-rice transition-colors hover:bg-[color-mix(in_srgb,var(--color-silver)_10%,transparent)] md:flex"
            style={{ borderColor: "color-mix(in srgb, var(--color-silver) 24%, transparent)" }}
          >
            <FileIcon width={16} height={16} />
            Résumé
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub, opens in a new tab"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-silver transition-colors hover:text-rice sm:flex"
          >
            <GitHubIcon />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn, opens in a new tab"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-silver transition-colors hover:text-rice sm:flex"
          >
            <LinkedInIcon />
          </a>
          <ThemeSwitcher />
          <ModeToggle />
          {theme === "ink" && <InkControl />}
          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-rice lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-primary-menu"
            aria-haspopup="dialog"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-primary-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center gap-8 px-6 lg:hidden"
            style={{ background: "color-mix(in srgb, var(--color-ink) 97%, transparent)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="flex w-full max-w-sm flex-col items-center gap-2">
              {navItems.map((item, index) => (
                <li key={item.href} className="w-full">
                  <a
                    ref={index === 0 ? firstMenuLinkRef : undefined}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-14 w-full items-center justify-center rounded-lg px-4 font-serif text-2xl text-rice transition-colors hover:bg-[color-mix(in_srgb,var(--color-silver)_8%,transparent)] focus-visible:bg-[color-mix(in_srgb,var(--color-silver)_8%,transparent)] md:text-3xl"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <a href={site.resumeUrl} onClick={closeMenu} className="link-quiet flex min-h-12 items-center gap-2 rounded-full px-4 text-silver">
                <FileIcon width={16} height={16} /> Résumé
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub, opens in a new tab"
                className="flex h-12 w-12 items-center justify-center rounded-full text-silver"
              >
                <GitHubIcon width={22} height={22} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn, opens in a new tab"
                className="flex h-12 w-12 items-center justify-center rounded-full text-silver"
              >
                <LinkedInIcon width={22} height={22} />
              </a>
            </div>
            <p className="font-mono-label text-center text-silver">Press Esc to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
