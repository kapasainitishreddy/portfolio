import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const nav = fs.readFileSync("src/components/layout/Navigation.tsx", "utf8");
const baseCss = fs.readFileSync("src/app/portfolio-redesign.css", "utf8");
const polishCss = fs.existsSync("src/app/navigation-polish.css")
  ? fs.readFileSync("src/app/navigation-polish.css", "utf8")
  : "";
const css = `${baseCss}\n${polishCss}`;

test("desktop dock morphs between compact and expanded navigation", () => {
  assert.match(nav, /dockExpanded/);
  assert.match(nav, /data-expanded=\{dockExpanded \? "true" : "false"\}/);
  assert.match(nav, /portfolio-dock__label/);
  assert.match(css, /\.portfolio-dock\[data-expanded="true"\]/);
  assert.match(css, /width:\s*(?:11|12|13)(?:\.\d+)?rem/);
});

test("desktop navigation uses a shared animated active pill instead of a thin rail", () => {
  assert.match(nav, /portfolio-dock__active-pill/);
  assert.match(nav, /layoutId="portfolio-desktop-active-pill"/);
  assert.match(css, /\.portfolio-dock__active-pill/);
  assert.doesNotMatch(nav, /portfolio-dock__active-rail/);
});

test("expanded dock reveals identity context beside the portrait", () => {
  assert.match(nav, /portfolio-dock__identity-copy/);
  assert.match(nav, /Engineer · Writer/);
  assert.match(css, /\.portfolio-dock__identity-copy/);
});

test("command palette responds to the dock expansion state", () => {
  assert.match(nav, /data-dock-expanded=\{dockExpanded \? "true" : "false"\}/);
  assert.match(css, /\.portfolio-command\[data-dock-expanded="true"\]/);
});

test("mobile dock uses a moving glass active pill", () => {
  assert.match(nav, /portfolio-mobile-dock__active-pill/);
  assert.match(nav, /layoutId="portfolio-mobile-active-pill"/);
  assert.match(css, /\.portfolio-mobile-dock__active-pill/);
});

test("navigation polish keeps reduced-motion coverage for morphing surfaces", () => {
  const reducedMotion = css.split("@media (prefers-reduced-motion: reduce)").pop() ?? "";
  assert.match(reducedMotion, /portfolio-dock/);
  assert.match(reducedMotion, /portfolio-dock__label/);
  assert.match(reducedMotion, /portfolio-dock__active-pill/);
  assert.match(reducedMotion, /portfolio-mobile-dock__active-pill/);
});
