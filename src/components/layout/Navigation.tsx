"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, site, socials } from "@/data/site";
import { GitHubIcon, LinkedInIcon, FileIcon, MenuIcon, CloseIcon } from "./icons";
import InkControl from "@/components/ink/InkControl";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import ModeToggle from "@/components/theme/ModeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { withBasePath } from "@/lib/basePath";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center">
      <nav
        aria-label="Primary"
        className={`content-pad mt-3 flex w-full max-w-7xl items-center justify-between rounded-full transition-all duration-500 ${
          scrolled ? "surface py-2" : "py-4"
        }`}
        style={scrolled ? { paddingInline: "clamp(1rem, 4vw, 2rem)" } : undefined}
      >
        <a href="#home" className="group flex items-center gap-2" aria-label={`${site.name}, home`}>
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

        {/* desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-quiet text-sm text-silver hover:text-rice">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={withBasePath(site.resumeUrl)}
            className="hidden items-center gap-2 rounded-full border px-4 py-2 text-sm text-rice transition-colors hover:bg-[color-mix(in_srgb,var(--color-silver)_10%,transparent)] md:flex"
            style={{ borderColor: "color-mix(in srgb, var(--color-silver) 24%, transparent)" }}
          >
            <FileIcon width={16} height={16} />
            Résumé
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-silver transition-colors hover:text-rice sm:flex"
          >
            <GitHubIcon />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-silver transition-colors hover:text-rice sm:flex"
          >
            <LinkedInIcon />
          </a>
          <ThemeSwitcher />
          <ModeToggle />
          {theme === "ink" && <InkControl />}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-rice lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-0 z-[-1] flex flex-col items-center justify-center gap-8 lg:hidden"
            style={{ background: "color-mix(in srgb, var(--color-ink) 96%, transparent)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="flex flex-col items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl text-rice"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-6">
              <a href={withBasePath(site.resumeUrl)} className="link-quiet flex items-center gap-2 text-silver">
                <FileIcon width={16} height={16} /> Résumé
              </a>
              <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-silver">
                <GitHubIcon width={22} height={22} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-silver">
                <LinkedInIcon width={22} height={22} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
