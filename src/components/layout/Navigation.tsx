"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navItems, site, socials } from "@/data/site";
import { FileIcon, MenuIcon, CloseIcon, GitHubIcon, LinkedInIcon } from "./icons";
import InkControl from "@/components/ink/InkControl";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import ModeToggle from "@/components/theme/ModeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { withBasePath } from "@/lib/basePath";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
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
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = menuDialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center">
      <nav
        aria-label="Primary"
        className={`portfolio-nav content-pad relative z-[102] mt-3 flex w-full max-w-7xl items-center justify-between rounded-2xl border sm:rounded-full ${scrolled ? "py-2" : "py-2.5"}`}
      >
        <a href="#home" className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-full" aria-label={`${site.name}, home`}>
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border">
            <Image
              src={withBasePath("/profile.webp")}
              alt=""
              fill
              unoptimized
              sizes="40px"
              className="object-cover"
            />
          </span>
          <span className="hidden truncate font-serif text-rice sm:inline">{site.shortName}</span>
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

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeSwitcher />
          <ModeToggle />
          <div className="hidden sm:block">{theme === "ink" && <InkControl />}</div>
          <a
            href={withBasePath(site.resumeUrl)}
            className="hidden min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm text-rice md:flex"
          >
            <FileIcon width={15} height={15} />
            Résumé
          </a>
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
            ref={menuDialogRef}
            id="mobile-primary-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center gap-8 px-6 lg:hidden"
            style={{ background: "color-mix(in srgb, var(--color-ink) 98%, transparent)", backdropFilter: "blur(14px)" }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
          >
            <ul className="flex w-full max-w-sm flex-col items-center gap-2">
              {navItems.map((item, index) => (
                <li key={item.href} className="w-full">
                  <a
                    ref={index === 0 ? firstMenuLinkRef : undefined}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-14 w-full items-center justify-center rounded-xl px-4 font-serif text-2xl text-rice transition-colors hover:bg-[color-mix(in_srgb,var(--color-silver)_8%,transparent)] focus-visible:bg-[color-mix(in_srgb,var(--color-silver)_8%,transparent)] sm:text-3xl"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href={withBasePath(site.resumeUrl)}
                onClick={closeMenu}
                className="link-quiet flex min-h-12 items-center gap-2 rounded-full px-4 text-silver"
              >
                <FileIcon width={16} height={16} />
                Résumé
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub, opens in a new tab"
                className="flex h-12 w-12 items-center justify-center rounded-full text-silver"
              >
                <GitHubIcon width={21} height={21} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn, opens in a new tab"
                className="flex h-12 w-12 items-center justify-center rounded-full text-silver"
              >
                <LinkedInIcon width={21} height={21} />
              </a>
            </div>
            <p className="font-mono-label text-center text-silver">Press Esc to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
