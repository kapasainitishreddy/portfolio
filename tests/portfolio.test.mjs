import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const read = (path) => fs.readFileSync(path, "utf8");

test("portfolio has no personal-photo assets or references", () => {
  assert.equal(fs.existsSync("public/profile.webp"), false);
  const source = [
    read("src/app/page.tsx"), read("src/app/layout.tsx"),
    read("src/components/portfolio/Hero.tsx"), read("src/components/portfolio/Header.tsx"),
  ].join("\n");
  assert.doesNotMatch(source, /portrait|profile\.webp|headshot|avatar/i);
});

test("hero uses the writer-engineer identity and real Three.js artwork", () => {
  const site = read("src/data/site.ts");
  const hero = read("src/components/portfolio/DocsHero.tsx");
  const artwork = read("src/components/portfolio/ProjectArtwork.tsx");
  const three = read("src/components/portfolio/ThreeArtifact.tsx");
  const pkg = read("package.json");

  assert.match(site, /Engineer with heart of writer\./);
  assert.match(hero, /hero-writer-line/);
  assert.match(hero, /ThreeArtifact/);
  assert.match(artwork, /ThreeArtifact/);
  assert.match(three, /WebGLRenderer/);
  assert.match(three, /prefers-reduced-motion/);
  assert.match(pkg, /"three": "\^0\.182\.0"/);
});

test("magnetic dock shell preserves portfolio content and navigation", () => {
  const site = read("src/data/site.ts");
  const page = read("src/app/page.tsx");
  const hero = read("src/components/portfolio/DocsHero.tsx");
  const header = read("src/components/portfolio/Header.tsx");
  const dock = read("src/components/portfolio/PortfolioDock.tsx");
  const magnetic = read("src/components/ui/magnetic-dock.tsx");
  const css = read("src/app/docs.css");
  const pkg = read("package.json");

  assert.match(site, /sai_resume_fde\.pdf/);
  assert.match(hero, /Explore selected work/);
  assert.match(hero, /hero\.proof\.map/);
  assert.match(page, /SelectedWork/);
  assert.match(page, /PortfolioDock/);
  assert.doesNotMatch(page, /DocsContents/);
  assert.match(header, /site\.resumeUrl/);
  assert.match(dock, /MagneticDock/);
  assert.match(dock, /Selected work/);
  assert.match(dock, /Experience/);
  assert.match(dock, /Résumé/);
  assert.match(magnetic, /useReducedMotion/);
  assert.match(magnetic, /useMotionValue/);
  assert.match(css, /portfolio-dock-shell/);
  assert.match(css, /grid-template-columns: 1fr !important/);
  assert.match(pkg, /framer-motion/);
});

test("selected work and explorer expose keyboard semantics", () => {
  const work = read("src/components/portfolio/SelectedWork.tsx");
  const explorer = read("src/components/portfolio/SystemExplorer.tsx");
  assert.match(work, /role="tablist"/);
  assert.match(work, /ArrowUp/);
  assert.match(work, /aria-live="polite"/);
  assert.match(work, /<details className="project-details">/);
  assert.match(explorer, /ArrowDown/);
  assert.match(explorer, /aria-selected/);
  assert.match(explorer, /role="tabpanel"/);
});

test("GitHub Pages static export remains configured", () => {
  const config = read("next.config.mjs");
  const workflow = read(".github/workflows/deploy-pages.yml");
  assert.match(config, /output: "export"/);
  assert.match(config, /basePath/);
  assert.match(workflow, /STATIC_EXPORT/);
  assert.match(workflow, /upload-pages-artifact/);
});

test("reduced motion and responsive guards are present", () => {
  const css = read("src/app/globals.css") + read("src/app/docs.css");
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /max-width: 720px/);
  assert.match(css, /overflow-x: hidden/);
  assert.match(css, /focus-visible/);
});
