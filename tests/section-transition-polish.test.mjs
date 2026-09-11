import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const layout = fs.readFileSync("src/app/layout.tsx", "utf8");
const transitions = fs.readFileSync("src/app/section-transitions.css", "utf8");

test("semantic anchor navigation scrolls smoothly without overriding reduced-motion preferences", () => {
  assert.match(layout, /import "\.\/section-transitions\.css"/);
  assert.match(transitions, /html\s*\{[^}]*scroll-behavior:\s*smooth;/s);

  const reducedMotion = transitions.split("@media (prefers-reduced-motion: reduce)").pop() ?? "";
  assert.match(reducedMotion, /html\s*\{[^}]*scroll-behavior:\s*auto;/s);
});

test("section anchor destinations keep comfortable arrival spacing", () => {
  assert.match(
    transitions,
    /\.portfolio-main\s+section\[id\]\s*\{[^}]*scroll-margin-block-start:\s*clamp\(1\.5rem,\s*6vh,\s*4rem\);/s,
  );
});
