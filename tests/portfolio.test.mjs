import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

test("portfolio has no personal-photo assets or references", () => {
  assert.equal(fs.existsSync("public/profile.webp"), false);
  const source = [
    read("src/app/page.tsx"),
    read("src/app/layout.tsx"),
    read("src/components/portfolio/Hero.tsx"),
    read("src/components/portfolio/Header.tsx"),
  ].join("\n");
  assert.doesNotMatch(source, /portrait|profile\.webp|headshot|avatar/i);
});

test("documentation shell preserves portfolio content and page navigation", () => {
  const site = read("src/data/site.ts");
  const page = read("src/app/page.tsx");
  const hero = read("src/components/portfolio/DocsHero.tsx");
  const header = read("src/components/portfolio/Header.tsx");
  const contents = read("src/components/portfolio/DocsContents.tsx");
  const docsArticle = read("src/components/portfolio/DocsArticle.tsx");
  const docsCss = read("src/app/docs.css");
  assert.match(site, /From ambiguous problem to working system\./);
  assert.match(hero, /Explore selected work/);
  assert.match(hero, /hero\.proof\.map/);
  assert.match(page, /SelectedWork/);
  assert.match(page, /DocsContents/);
  assert.match(header, /Filter documentation navigation/);
  assert.match(header, /Experience/);
  assert.match(contents, /aria-label="On this page"/);
  assert.match(contents, /"Contact", "contact"/);
  assert.match(docsArticle, /hashchange/);
  assert.match(docsCss, /data-current-page="overview"/);
  assert.match(docsCss, /data-current-page="contact"/);
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
  const css = read("src/app/globals.css");
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /max-width: 720px/);
  assert.match(css, /overflow-x: hidden/);
  assert.match(css, /focus-visible/);
});
