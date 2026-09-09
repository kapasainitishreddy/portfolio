import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const nav = fs.readFileSync("src/components/layout/Navigation.tsx", "utf8");
const baseCss = fs.readFileSync("src/app/portfolio-redesign.css", "utf8");
const polishCss = fs.existsSync("src/app/navigation-polish.css")
  ? fs.readFileSync("src/app/navigation-polish.css", "utf8")
  : "";
const css = `${baseCss}\n${polishCss}`;

test("desktop navigation exposes a moving active rail indicator", () => {
  assert.match(nav, /portfolio-dock__active-rail/);
  assert.match(css, /\.portfolio-dock__active-rail/);
  assert.match(css, /transform:\s*translateY\(/);
});

test("desktop navigation includes an accessible current-section readout", () => {
  assert.match(nav, /portfolio-dock__current/);
  assert.match(nav, /aria-live="polite"/);
});

test("command palette presents a clear keyboard hint and section metadata", () => {
  assert.match(nav, /Quick jump/);
  assert.match(nav, /Ctrl\/⌘ K/);
  assert.match(nav, /portfolio-command__meta/);
});

test("mobile dock uses a dedicated animated active marker", () => {
  assert.match(nav, /portfolio-mobile-dock__indicator/);
  assert.match(css, /\.portfolio-mobile-dock__indicator/);
});

test("navigation polish keeps reduced-motion coverage for new animated surfaces", () => {
  const reducedMotion = css.split("@media (prefers-reduced-motion: reduce)").pop() ?? "";
  assert.match(reducedMotion, /portfolio-dock__active-rail/);
  assert.match(reducedMotion, /portfolio-mobile-dock__indicator/);
});
