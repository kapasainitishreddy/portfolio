import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const page = fs.readFileSync("src/app/page.tsx", "utf8");
const deferred = fs.readFileSync("src/components/three/DeferredPortfolioThreeLayer.tsx", "utf8");

test("decorative Three.js work is deferred without delaying semantic portfolio content", () => {
  assert.match(page, /import DeferredPortfolioThreeLayer from "@\/components\/three\/DeferredPortfolioThreeLayer"/);
  assert.match(page, /<DeferredPortfolioThreeLayer \/>/);
  assert.doesNotMatch(page, /import PortfolioThreeLayer from "@\/components\/three\/PortfolioThreeLayer"/);

  assert.match(deferred, /dynamic\(\(\) => import\("\.\/PortfolioThreeLayer"\)/);
  assert.match(deferred, /ssr:\s*false/);
  assert.match(deferred, /loading:\s*StaticThreeLayer/);
  assert.match(deferred, /"requestIdleCallback" in window/);
  assert.match(deferred, /requestIdleCallback\(\(\) => setReady\(true\), \{ timeout: 1200 \}\)/);
  assert.match(deferred, /setTimeout\(\(\) => setReady\(true\), 220\)/);
  assert.match(deferred, /aria-hidden="true" role="presentation"/);
});
