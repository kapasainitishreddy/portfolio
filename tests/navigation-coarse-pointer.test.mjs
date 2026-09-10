import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const motionCss = fs.readFileSync("src/app/navigation-motion.css", "utf8");

test("desktop-width coarse pointers keep the morphing dock readable without hover", () => {
  assert.match(motionCss, /@media \(min-width: 1024px\) and \(hover: none\)/);
  assert.match(motionCss, /\(min-width: 1024px\) and \(pointer: coarse\)/);
  assert.match(motionCss, /\.portfolio-dock\[data-expanded="false"\][\s\S]*?width:\s*12\.25rem/);
  assert.match(motionCss, /\.portfolio-dock__identity-copy,[\s\S]*?\.portfolio-dock__label[\s\S]*?opacity:\s*1 !important/);
});

test("coarse-pointer mode avoids the decorative sweep and keeps the quick menu aligned", () => {
  const coarsePointerBlock = motionCss.split("Landscape tablets and other coarse-pointer")[1] ?? "";
  assert.match(coarsePointerBlock, /\.portfolio-dock::before[\s\S]*?display:\s*none/);
  assert.match(coarsePointerBlock, /\.portfolio-command,[\s\S]*?left:\s*14rem/);
  assert.match(coarsePointerBlock, /will-change:\s*auto/);
});
