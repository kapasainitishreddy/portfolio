import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const layout = fs.readFileSync("src/app/layout.tsx", "utf8");
const clearance = fs.existsSync("src/app/mobile-dock-clearance.css")
  ? fs.readFileSync("src/app/mobile-dock-clearance.css", "utf8")
  : "";

test("mobile footer stays above the fixed dock and device safe area", () => {
  assert.match(layout, /import "\.\/mobile-dock-clearance\.css"/);
  assert.match(clearance, /@media\s*\(max-width:\s*1023px\)/);
  assert.match(
    clearance,
    /\.portfolio-footer\s*\{[^}]*padding-block-end:\s*calc\(6\.75rem\s*\+\s*env\(safe-area-inset-bottom\)\);/s,
  );
});
