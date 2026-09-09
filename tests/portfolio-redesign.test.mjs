import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (path) => readFileSync(join(process.cwd(), path), "utf8");

test("hero copy and novels navigation stay intentional", () => {
  const site = read("src/data/site.ts");
  assert.match(site, /headline:\s*"Engineer with heart of a Writer\."/);
  assert.match(site, /\{ label: "Novels", href: "#novels" \}/);
  assert.match(site, /Read my novels/);
});

test("homepage keeps the shorter portfolio story", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /<Novels \/>/);
  assert.match(page, /<FeaturedWork \/>/);
  assert.doesNotMatch(page, /<IdentityRail \/>/);
  assert.doesNotMatch(page, /<ProofLens \/>/);
  assert.doesNotMatch(page, /<AskNitish \/>/);
  assert.doesNotMatch(page, /<StartupCaseStudies \/>/);
  assert.doesNotMatch(page, /<WhyHireMe \/>/);
});

test("the first three FDE cards have specific previews", () => {
  const preview = read("src/components/projects/ProjectPreview.tsx");
  assert.match(preview, /fde-support-copilot/);
  assert.match(preview, /fde-data-pipeline/);
  assert.match(preview, /fde-onboarding-agent/);
  assert.match(preview, /Human approval required/);
});

test("desktop dock provides active-section feedback and quick command access", () => {
  const navigation = read("src/components/layout/Navigation.tsx");
  assert.match(navigation, /IntersectionObserver/);
  assert.match(navigation, /portfolio-dock/);
  assert.match(navigation, /aria-current/);
  assert.match(navigation, /portfolio-dock__progress/);
  assert.match(navigation, /portfolio-command/);
  assert.match(navigation, /metaKey|ctrlKey/);
});

// Regression from production: never depend on a GitHub-generated identicon for the hero portrait.
test("hero portrait is embedded visual media and has no giant initials fallback", () => {
  const media = read("src/data/visualMedia.ts");
  const hero = read("src/components/sections/Hero.tsx");
  assert.match(media, /data:image\/webp;base64,/);
  assert.doesNotMatch(media, /avatars\.githubusercontent\.com/);
  assert.match(hero, /visualMedia\.portrait/);
  assert.match(hero, /hero-gallery/);
  assert.doesNotMatch(hero, /hero-portrait__fallback/);
});
