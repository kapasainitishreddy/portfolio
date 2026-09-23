"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  MagneticDock,
  DockIconFolder,
  DockIconHome,
  DockIconMail,
  DockIconSettings,
  type DockItemData,
} from "@/components/ui/magnetic-dock";
import { site } from "@/data/site";
import { withBasePath } from "@/lib/basePath";

const sections = [
  "overview", "work", "experience", "systems", "method",
  "lab", "writing", "about", "contact",
] as const;

type SectionId = (typeof sections)[number];

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden="true">
      {children}
    </svg>
  );
}

function BriefcaseIcon() {
  return <Glyph><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></Glyph>;
}
function RouteIcon() {
  return <Glyph><circle cx="5" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 5h4a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4H9a4 4 0 0 0-4 4v1M14 19h3" /></Glyph>;
}
function FlaskIcon() {
  return <Glyph><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.75 3h10.5A2 2 0 0 0 19 18l-5-9V3" /><path d="M8 15h8" /></Glyph>;
}
function BookIcon() {
  return <Glyph><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" /></Glyph>;
}
function PersonIcon() {
  return <Glyph><circle cx="12" cy="8" r="3.25" /><path d="M5 21a7 7 0 0 1 14 0" /></Glyph>;
}
function DocumentIcon() {
  return <Glyph><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></Glyph>;
}

function getHashSection(): SectionId {
  if (typeof window === "undefined") return "overview";
  const hash = window.location.hash.slice(1) as SectionId;
  return sections.includes(hash) ? hash : "overview";
}

export default function PortfolioDock() {
  const [activeId, setActiveId] = useState<SectionId>("overview");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const syncCompact = () => setCompact(media.matches);
    syncCompact();
    media.addEventListener("change", syncCompact);
    setActiveId(getHashSection());

    const observed = sections
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id && sections.includes(visible.target.id as SectionId)) {
        setActiveId(visible.target.id as SectionId);
      }
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.1, 0.35, 0.6] });

    observed.forEach((node) => observer.observe(node));
    const syncHash = () => setActiveId(getHashSection());
    window.addEventListener("hashchange", syncHash);

    return () => {
      media.removeEventListener("change", syncCompact);
      window.removeEventListener("hashchange", syncHash);
      observer.disconnect();
    };
  }, []);

  const items = useMemo<DockItemData[]>(() => {
    const go = (id: SectionId) => () => {
      const element = document.getElementById(id);
      if (!element) return;
      window.history.replaceState(null, "", `#${id}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    };

    const sectionItem = (id: SectionId, label: string, icon: ReactNode): DockItemData => ({
      id, label, icon, onClick: go(id), isActive: activeId === id,
    });

    return [
      sectionItem("overview", "Overview", <DockIconHome />),
      sectionItem("work", "Selected work", <DockIconFolder />),
      sectionItem("experience", "Experience", <BriefcaseIcon />),
      sectionItem("systems", "Systems", <DockIconSettings />),
      sectionItem("method", "How I work", <RouteIcon />),
      sectionItem("lab", "Lab", <FlaskIcon />),
      sectionItem("writing", "Writing", <BookIcon />),
      sectionItem("about", "About", <PersonIcon />),
      {
        id: "resume",
        label: "Résumé",
        icon: <DocumentIcon />,
        onClick: () => window.location.assign(withBasePath(site.resumeUrl)),
      },
      sectionItem("contact", "Contact", <DockIconMail />),
    ];
  }, [activeId]);

  const visibleItems = compact
    ? items.filter((item) => ["overview", "work", "experience", "systems", "resume", "contact"].includes(item.id))
    : items;

  return (
    <div className="portfolio-dock-shell">
      <nav aria-label="Portfolio navigation">
        <MagneticDock
          items={visibleItems}
          iconSize={compact ? 42 : 46}
          maxScale={compact ? 1.18 : 1.5}
          magneticDistance={compact ? 80 : 135}
          showLabels={!compact}
          position="bottom"
          variant="glass"
          className="portfolio-magnetic-dock"
        />
      </nav>
    </div>
  );
}
