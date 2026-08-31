import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd());
const featuredPath = join(root, "src/data/featuredPortfolio.ts");
const sitePath = join(root, "src/data/site.ts");
const pagePath = join(root, "src/app/page.tsx");
const layoutPath = join(root, "src/app/layout.tsx");

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
