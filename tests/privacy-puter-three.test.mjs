import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";

const experience = read("src/data/experience.ts");
const cases = read("src/data/roleCaseStudies.ts");
const site = read("src/data/site.ts");
const page = read("src/app/page.tsx");
const ask = read("src/components/sections/AskNitish.tsx");
const askData = read("src/data/askNitish.ts");
const aiUniverse = read("src/data/aiUniverse.ts");
const projects = read("src/data/projects.ts");
const building = read("src/data/building.ts");
const privateBuilds = read("src/components/sections/PrivateBuilds.tsx");
const threeLayer = read("src/components/three/PortfolioThreeLayer.tsx");

test("public work data uses private employer labels except Outlier AI", () => {
  const organizationValues = [...`${experience}\n${cases}`.matchAll(/organization:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.ok(organizationValues.length >= 8);
  assert.ok(organizationValues.every((value) => value.includes("Private") || value.startsWith("Outlier AI")));
  assert.match(`${experience}\n${cases}`, /Outlier AI/);
  assert.match(`${experience}\n${cases}\n${site}`, /Private AI|Private product|anonymized/i);
});

test("homepage replaces public project exposure with private builds", () => {
  assert.match(page, /import PrivateBuilds from "@\/components\/sections\/PrivateBuilds"/);
  assert.match(page, /<PrivateBuilds \/>/);
  assert.doesNotMatch(page, /GitHubProjects/);
  assert.match(site, /\{ label: "Private builds", href: "#private-builds" \}/);
  assert.doesNotMatch(site, /\{ label: "Projects", href: "#projects" \}/);
  assert.match(privateBuilds, /private while (?:I am )?scal(?:e|ing)/i);
  assert.doesNotMatch(privateBuilds, /github\.com\/kapasainitishreddy/i);
});

test("current product data exposes capability categories rather than product identities", () => {
  assert.match(aiUniverse, /signals:\s*string\[\]/);
  assert.doesNotMatch(aiUniverse, /projects:\s*string\[\]/);
  assert.match(aiUniverse, /Private product studio/);
  assert.match(askData, /private product|private systems/i);
  assert.match(projects, /export const projects: Project\[\] = \[\];/);
  assert.doesNotMatch(projects, /github\.com\/kapasainitishreddy/i);
  assert.match(building, /Private governance system/);
  assert.match(building, /Private evaluation system/);
});

test("Puter guide has a privacy-first private systems mode", () => {
  assert.match(ask, /type GuideMode = "portfolio" \| "recruiter" \| "private" \| "writer"/);
  assert.match(ask, /label: "Private systems"/);
  assert.match(ask, /Never reveal hidden employer names/i);
  assert.match(ask, /private product names/i);
  assert.match(ask, /repository names|repository URLs|repo URLs/i);
  assert.doesNotMatch(ask, /label: "Projects"/);
});

test("portfolio uses one section-aware Three.js interaction layer", () => {
  assert.match(page, /PortfolioThreeLayer/);
  assert.match(page, /<PortfolioThreeLayer \/>/);
  assert.match(threeLayer, /@react-three\/fiber/);
  assert.match(threeLayer, /Canvas/);
  assert.match(threeLayer, /useFrame/);
  assert.match(threeLayer, /IntersectionObserver/);
  assert.match(threeLayer, /useReducedMotion/);
  assert.match(threeLayer, /aria-hidden/);
});

test("Three.js section changes damp spatial targets instead of snapping geometry", () => {
  assert.match(threeLayer, /MathUtils/);
  assert.match(threeLayer, /const phaseRef = useRef\(0\)/);
  assert.match(threeLayer, /const targetPhase = \(activeIndex % 5\) \* 0\.37/);
  assert.match(threeLayer, /phaseRef\.current = MathUtils\.damp\(/);
  assert.match(threeLayer, /group\.current\.rotation\.y = MathUtils\.damp\(/);
  assert.match(threeLayer, /group\.current\.scale\.setScalar\(nextScale\)/);
  assert.doesNotMatch(threeLayer, /const spread = .*activeIndex/);
});

test("reduced-motion visitors get the lightweight visual fallback without mounting WebGL", () => {
  assert.match(threeLayer, /if \(reduceMotion\)\s*\{[\s\S]*?portfolio-three-layer__fallback/);
  assert.match(threeLayer, /if \(reduceMotion\)[\s\S]*?return \([\s\S]*?portfolio-three-layer/);
  assert.doesNotMatch(threeLayer, /frameloop=\{reduceMotion \? "demand" : "always"\}/);
});

test("Three.js pauses continuous rendering while the browser tab is hidden", () => {
  assert.match(threeLayer, /const \[pageVisible, setPageVisible\] = useState\(true\)/);
  assert.match(threeLayer, /document\.visibilityState !== "hidden"/);
  assert.match(threeLayer, /addEventListener\("visibilitychange"/);
  assert.match(threeLayer, /removeEventListener\("visibilitychange"/);
  assert.match(threeLayer, /frameloop=\{pageVisible \? "always" : "never"\}/);
});

test("public GitHub project data files are removed from the current tree", () => {
  assert.equal(fs.existsSync("src/data/githubProjects.ts"), false);
  assert.equal(fs.existsSync("src/components/sections/GitHubProjects.tsx"), false);
});
