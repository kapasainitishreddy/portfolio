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
  assert.match(deferred, /requestIdleCallback\(enableThreeLayer, \{ timeout: 1200 \}\)/);
  assert.match(deferred, /setTimeout\(enableThreeLayer, 220\)/);
  assert.match(deferred, /aria-hidden="true" role="presentation"/);
});

test("reduced-motion visitors stay on the lightweight fallback without mounting the Three.js scene", () => {
  assert.match(deferred, /window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
  assert.match(deferred, /if \(motionPreference\.matches\) \{\s*setReady\(false\);\s*return;/s);
  assert.match(deferred, /motionPreference\.addEventListener\("change", scheduleThreeLayer\)/);
  assert.match(deferred, /motionPreference\.removeEventListener\("change", scheduleThreeLayer\)/);
});

test("data-saver visitors avoid decorative Three.js loading and keep the lightweight fallback", () => {
  assert.match(deferred, /type NavigatorWithConnection = Navigator & \{ connection\?: \{ saveData\?: boolean \} \}/);
  assert.match(deferred, /const saveData = \(navigator as NavigatorWithConnection\)\.connection\?\.saveData === true/);
  assert.match(deferred, /if \(saveData\) \{\s*setReady\(false\);\s*return;/s);
});

test("browsers without a usable WebGL context never mount the decorative Three.js bundle", () => {
  assert.match(deferred, /function supportsWebGL\(\)/);
  assert.match(deferred, /document\.createElement\("canvas"\)/);
  assert.match(deferred, /canvas\.getContext\("webgl2"\) \?\? canvas\.getContext\("webgl"\)/);
  assert.match(deferred, /catch \{\s*return false;\s*\}/s);
  assert.match(deferred, /const enableThreeLayer = \(\) => \{\s*setReady\(supportsWebGL\(\)\);\s*\};/s);
});
