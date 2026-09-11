import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const layout = fs.readFileSync("src/app/layout.tsx", "utf8");
const sheetCss = fs.existsSync("src/app/mobile-sheet-scroll-lock.css")
  ? fs.readFileSync("src/app/mobile-sheet-scroll-lock.css", "utf8")
  : "";

test("mobile navigation modal locks the page behind it without changing sheet scrolling", () => {
  assert.match(layout, /import "\.\/mobile-sheet-scroll-lock\.css"/);
  assert.match(
    sheetCss,
    /body:has\(\.portfolio-mobile-sheet\[aria-modal="true"\]\)\s*\{[^}]*overflow:\s*hidden;[^}]*overscroll-behavior:\s*none;/s,
  );
  assert.match(
    sheetCss,
    /\.portfolio-mobile-sheet__panel\s*\{[^}]*overscroll-behavior:\s*contain;/s,
  );
});
