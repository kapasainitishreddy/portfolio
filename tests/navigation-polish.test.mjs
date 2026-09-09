import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const nav = fs.readFileSync("src/components/layout/Navigation.tsx", "utf8");
const css = fs.readFileSync("src/app/portfolio-redesign.css", "utf8");

test("desktop navigation exposes a moving active rail indicator", () => {
  assert.match(nav, /portfolio-dock__active-rail/);
  assert.match(css, /\.portfolio-dock__active-rail/);
  assert.match(css, /transform:translateY\(/);
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
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /portfolio-dock__active-rail/);
  assert.match(css, /portfolio-mobile-dock__indicator/);
});
