import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(join(root, file), "utf8");

test("uploaded portrait is the canonical hero and avatar source", () => {
  assert.equal(existsSync(join(root, "public/profile-main.webp")), true, "hero portrait asset must exist");
  assert.equal(existsSync(join(root, "public/profile-avatar.png")), true, "circular avatar/favicon asset must exist");
  const media = read("src/data/visualMedia.ts");
  const site = read("src/data/site.ts");
  assert.match(media, /profile-main\.webp/);
  assert.match(media, /profile-avatar\.png/);
  assert.match(site, /portraitUrl:\s*"\/profile-main\.webp"/);
  assert.match(site, /avatarUrl:\s*"\/profile-avatar\.png"/);
});

test("desktop navigation is a premium expandable glass rail with spatial motion", () => {
  const nav = read("src/components/layout/Navigation.tsx");
  const css = read("src/app/portfolio-redesign.css");
  assert.match(nav, /portfolio-premium-rail/);
  assert.match(nav, /useMotionValue/);
  assert.match(nav, /useSpring/);
  assert.match(nav, /useTransform/);
  assert.match(nav, /aria-label="Portfolio navigation"/);
  assert.match(css, /\.portfolio-premium-rail/);
  assert.match(css, /backdrop-filter:blur\(/i);
  assert.match(css, /perspective:/i);
});

test("profile avatar is used in navigation and metadata icons", () => {
  const nav = read("src/components/layout/Navigation.tsx");
  const layout = read("src/app/layout.tsx");
  const manifest = read("src/app/manifest.ts");
  assert.match(nav, /visualMedia\.avatar/);
  assert.match(layout, /profile-avatar\.png/);
  assert.match(manifest, /profile-avatar\.png/);
});

test("hero uses restrained depth motion rather than a static collage", () => {
  const hero = read("src/components/sections/Hero.tsx");
  assert.match(hero, /hero-dimensional/);
  assert.match(hero, /useMotionValue/);
  assert.match(hero, /useTransform/);
  assert.match(hero, /visualMedia\.portrait/);
});
