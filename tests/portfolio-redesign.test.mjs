import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd());
const featuredPath = join(root, "src/data/featuredPortfolio.ts");
const sitePath = join(root, "src/data/site.ts");
const pagePath = join(root, "src/app/page.tsx");
const layoutPath = join(root, "src/app/layout.tsx");
const globalsPath = join(root, "src/app/globals.css");
const portfolioCssPath = join(root, "src/app/portfolio.css");
const inkVisibilityCssPath = join(root, "src/app/ink-visibility.css");
const navigationPath = join(root, "src/components/layout/Navigation.tsx");
const footerPath = join(root, "src/components/layout/Footer.tsx");
const assistantKnowledgePath = join(root, "public/assistant/knowledge.json");

const featuredNames = ["Vakya", "Circuit", "AppGraft", "Edge", "Unsaid"];

test("portfolio redesign exposes the five requested featured products", () => {
  assert.equal(existsSync(featuredPath), true, "featuredPortfolio.ts should exist");
  const source = readFileSync(featuredPath, "utf8");
  for (const name of featuredNames) {
    assert.match(source, new RegExp(`name:\\s*[\"']${name}[\"']`), `${name} should be featured`);
  }
});

test("portfolio positioning names builder, founder, and thriller writer identities", () => {
  assert.equal(existsSync(sitePath), true, "site.ts should exist");
  const source = readFileSync(sitePath, "utf8");
  for (const label of ["AI Builder", "Product Founder", "Thriller Writer"]) {
    assert.match(source, new RegExp(label), `${label} should appear in site positioning`);
  }
});

test("home page includes a dedicated writing section", () => {
  assert.equal(existsSync(pagePath), true, "page.tsx should exist");
  const source = readFileSync(pagePath, "utf8");
  assert.match(source, /import Writing from [\"']@\/components\/sections\/Writing[\"']/);
  assert.match(source, /<Writing\s*\/>/);
});

test("layout loads the Syrava assistant without a synchronous external script", () => {
  assert.equal(existsSync(layoutPath), true, "layout.tsx should exist");
  const source = readFileSync(layoutPath, "utf8");
  assert.match(source, /from [\"']next\/script[\"']/, "layout should use next/script");
  assert.doesNotMatch(
    source,
    /<script\s+type=[\"']module[\"']\s+src=/,
    "bare synchronous module script should be removed",
  );
});

test("Suminagashi background is painted above the page base and below portfolio content", () => {
  const css = [globalsPath, portfolioCssPath, inkVisibilityCssPath]
    .filter(existsSync)
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  assert.match(css, /html\s*\{[^}]*background-color:\s*var\(--color-ink\)/s);
  assert.match(css, /body\s*\{[^}]*background-color:\s*transparent/s);
  assert.match(css, /\.ink-bg\s*\{[^}]*z-index:\s*0/s);
  assert.match(css, /\.portfolio-page\s*\{[^}]*z-index:\s*1/s);
  assert.match(css, /\.portfolio-hero\s*\{[^}]*background:\s*color-mix\(in srgb, var\(--color-ink\) 5[0-9]%, transparent\)/s);
});

test("public portfolio contains no LinkedIn link or metadata", () => {
  for (const path of [sitePath, layoutPath, navigationPath, footerPath, assistantKnowledgePath]) {
    const source = readFileSync(path, "utf8");
    assert.doesNotMatch(source, /linkedin/i, `${path} should not expose LinkedIn`);
  }
});
