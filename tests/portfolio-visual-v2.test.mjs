import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (path) => readFileSync(join(process.cwd(), path), "utf8");

test("desktop navigation is a compact dock that can morph into labeled navigation", () => {
  const navigation = read("src/components/layout/Navigation.tsx");
  const css = `${read("src/app/portfolio-redesign.css")}\n${read("src/app/navigation-motion.css")}`;
  assert.match(navigation, /portfolio-dock/);
  assert.match(navigation, /portfolio-dock__label/);
  assert.match(navigation, /portfolio-dock__active-pill/);
  assert.match(navigation, /portfolio-command/);
  assert.match(navigation, /portfolio-mobile-dock/);
  assert.match(navigation, /metaKey|ctrlKey/);
  assert.match(css, /portfolio-dock\[data-expanded="true"\]/);
  assert.doesNotMatch(navigation, /portfolio-rail__nav/);
  assert.doesNotMatch(css, /portfolio-rail__nav/);
});

test("hero is image-led and uses real visual media rather than a giant initials fallback", () => {
  const hero = read("src/components/sections/Hero.tsx");
  assert.match(hero, /visualMedia/);
  assert.match(hero, /visualMedia\.portrait/);
  assert.match(hero, /visualMedia\.portraitCollage/);
  assert.match(hero, /hero-gallery/);
  assert.match(hero, /hero-proof-strip/);
  assert.doesNotMatch(hero, /hero-portrait__fallback/);
});

test("primary homepage removes redundant text-heavy role sections", () => {
  const page = read("src/app/page.tsx");
  assert.doesNotMatch(page, /<IdentityRail \/>/);
  assert.doesNotMatch(page, /<ProofLens \/>/);
  assert.match(page, /<FeaturedWork \/>/);
  assert.match(page, /<Novels \/>/);
});

test("novels section is an interactive visual book stage", () => {
  const novels = read("src/components/sections/Novels.tsx");
  assert.match(novels, /useState/);
  assert.match(novels, /activeNovel/);
  assert.match(novels, /novel-stage/);
  assert.match(novels, /novel-cover-rail/);
  assert.match(novels, /aria-live/);
  assert.match(novels, /bookCovers/);
});

test("portfolio includes the additional Asta covers already present in the user's library", () => {
  const data = read("src/data/novels.ts");
  assert.match(data, /The Girl Who Drew a Dead Man/);
  assert.match(data, /When the City Stopped Drinking/);
});

test("AI universe is visually scannable without paragraph-heavy rows", () => {
  const section = read("src/components/sections/AIUniverse.tsx");
  assert.match(section, /ai-universe-visual/);
  assert.doesNotMatch(section, /group\.description/);
});
