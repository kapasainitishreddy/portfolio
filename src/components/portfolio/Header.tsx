"use client";

import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";
import { withBasePath } from "@/lib/basePath";
import { ArrowIcon, MenuIcon } from "./icons";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="wordmark" href={withBasePath("/")} aria-label={`${site.name}, home`}>
          SN <span aria-hidden="true">/ 01</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={withBasePath(`/${item.href}`)}>{item.label}</a>
          ))}
        </nav>
        <a className="nav-cta" href={`mailto:${site.email}`}>
          Let&apos;s talk <ArrowIcon />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon open={open} />
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-nav" data-open={open} aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a key={item.href} href={withBasePath(`/${item.href}`)} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
        <a href={`mailto:${site.email}`} onClick={() => setOpen(false)}>Let&apos;s talk</a>
      </nav>
    </header>
  );
}
