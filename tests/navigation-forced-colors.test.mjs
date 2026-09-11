import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const layout = fs.readFileSync("src/app/layout.tsx", "utf8");
const forcedColors = fs.existsSync("src/app/navigation-forced-colors.css")
  ? fs.readFileSync("src/app/navigation-forced-colors.css", "utf8")
  : "";

test("morphing navigation keeps active location and controls visible in forced-colors mode", () => {
  assert.match(layout, /import "\.\/navigation-forced-colors\.css"/);
  assert.match(forcedColors, /@media\s*\(forced-colors:\s*active\)/);
  assert.match(forcedColors, /\.portfolio-dock__item\[data-active="true"\]/);
  assert.match(forcedColors, /\.portfolio-command__grid a\[data-active="true"\]/);
  assert.match(forcedColors, /\.portfolio-mobile-dock a\[data-active="true"\]/);
  assert.match(forcedColors, /\.portfolio-mobile-sheet__links a\[data-active="true"\]/);
  assert.match(forcedColors, /outline:\s*2px solid Highlight/);
  assert.match(forcedColors, /border-color:\s*CanvasText/);
  assert.match(forcedColors, /backdrop-filter:\s*none/);
});
