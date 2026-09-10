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
const privateBuilds = read("src/components/sections/PrivateBuilds.tsx");
const threeLayer = read("src/components/three/PortfolioThreeLayer.tsx");

test("public work data anonymizes employers except Outlier AI", () => {
  const publicWork = `${experience}\n${cases}\n${site}`;
  assert.doesNotMatch(publicWork, /Augmentare(?: Inc\.)?/i);
  assert.doesNotMatch(publicWork, /VN Technologies/i);
  assert.doesNotMatch(publicWork, /Syrava/i);
  assert.match(publicWork, /Outlier AI/);
  assert.match(publicWork, /Private AI|Private product|Confidential|anonymized/i);
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

test("AI universe and local guide do not expose private product identities", () => {
  const privateCopy = `${aiUniverse}\n${askData}`;
  for (const name of [
    "Syrava",
    "Scribe Studio",
    "Scythe",
    "Future OS",
    "Nevra",
    "AI Browser",
    "AppGraft",
    "Extforge",
    "Lunyra",
    "Gathered",
    "Choices",
    "Become",
    "Noxly",
    "Gympose",
    "GymLens",
    "Actra",
    "Chisel",
    "Vakya",
    "Slango",
    "Murmur",
    "Circuit",
    "AI Atlas",
    "ProofTimeline",
    "Harvestly",
    "Karmakaryam",
  ]) assert.doesNotMatch(privateCopy, new RegExp(name, "i"), `Private identity leaked: ${name}`);
  assert.match(privateCopy, /private|confidential|scal/i);
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

test("public GitHub project data files are removed from the current tree", () => {
  assert.equal(fs.existsSync("src/data/githubProjects.ts"), false);
  assert.equal(fs.existsSync("src/components/sections/GitHubProjects.tsx"), false);
});
