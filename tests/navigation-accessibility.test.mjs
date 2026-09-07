import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/components/layout/Navigation.tsx", import.meta.url), "utf8");
const footer = await readFile(new URL("../src/components/layout/Footer.tsx", import.meta.url), "utf8");

test("mobile navigation exposes an accessible modal relationship", () => {
  assert.match(source, /aria-controls="mobile-primary-menu"/);
  assert.match(source, /aria-haspopup="dialog"/);
  assert.match(source, /id="mobile-primary-menu"/);
  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /aria-label="Site navigation"/);
});

test("mobile navigation manages keyboard entry, escape recovery, and focus containment", () => {
  assert.match(source, /firstMenuLinkRef\.current\?\.focus\(\)/);
  assert.match(source, /event\.key === "Escape"/);
  assert.match(source, /event\.key !== "Tab"/);
  assert.match(source, /menuButtonRef\.current\?\.focus\(\)/);
  assert.match(source, /last\.focus\(\)/);
  assert.match(source, /first\.focus\(\)/);
});

test("navigation keeps minimum touch targets and descriptive external-link names", () => {
  assert.match(source, /h-11 w-11/);
  assert.match(source, /min-h-14/);
  assert.match(source, /h-12 w-12/);
  assert.match(source, /GitHub, opens in a new tab/);
  assert.match(source, /LinkedIn, opens in a new tab/);
});

test("mobile navigation respects reduced-motion preference", () => {
  assert.match(source, /useReducedMotion/);
  assert.match(source, /initial=\{reduceMotion \? false : \{ opacity: 0 \}\}/);
  assert.match(source, /transition=\{reduceMotion \? \{ duration: 0 \}/);
});

test("footer links remain comfortably tappable and identify new-tab destinations", () => {
  assert.match(footer, /min-h-11/);
  assert.match(footer, /GitHub, opens in a new tab/);
  assert.match(footer, /LinkedIn, opens in a new tab/);
  assert.match(footer, /aria-label="Footer"/);
});
