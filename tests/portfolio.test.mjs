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

test("first viewport copy and primary routes are present", () => {
  const site = read("src/data/site.ts");
  const page = read("src/app/page.tsx");
  assert.match(site, /From ambiguous problem to working system\./);
  assert.match(site, /Explore selected work/);
  assert.match(site, /AI-native products/);
  assert.match(page, /SelectedWork/);
  assert.match(page, /SystemExplorer/);
});

test("selected work and explorer expose keyboard semantics", () => {
  const work = read("src/components/portfolio/SelectedWork.tsx");
  const explorer = read("src/components/portfolio/SystemExplorer.tsx");
  assert.match(work, /role="tablist"/);
  assert.match(work, /ArrowUp/);
  assert.match(work, /aria-live="polite"/);
  assert.match(explorer, /ArrowLeft/);
  assert.match(explorer, /aria-selected/);
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
