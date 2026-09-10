import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";

const cases = read("src/data/roleCaseStudies.ts");
const featured = read("src/components/sections/FeaturedWork.tsx");
const privateBuilds = read("src/components/sections/PrivateBuilds.tsx");
const site = read("src/data/site.ts");

test("featured work is anchored to four real roles while employer identities stay private", () => {
  for (const role of [
    "Forward Deployed Engineer (Freelance)",
    "Business Data Analyst",
    "AI Model Trainer / Evaluation Analyst",
    "Operations Data Analyst",
  ]) assert.match(cases, new RegExp(role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

  assert.match(cases, /Outlier AI/);
  assert.doesNotMatch(cases, /Augmentare(?: Inc\.)?/i);
  assert.doesNotMatch(cases, /VN Technologies/i);
  assert.match(cases, /Private data & automation work/);
  assert.match(cases, /Private operations analytics work/);

  for (const proof of ["~60%", "~20 hrs/week", "99.5%", "2M", "25+", "65+", "28%", "1,800+", "30+"]) {
    assert.match(cases, new RegExp(proof.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(featured, /roleCaseStudies/);
  assert.doesNotMatch(featured, /from "@\/data\/projects"/);
});

test("private builds replace public repository proof while products are being scaled", () => {
  assert.match(privateBuilds, /Private while scaling/);
  assert.match(privateBuilds, /identities are intentionally not public/i);
  assert.match(privateBuilds, /private product IP/i);
  assert.doesNotMatch(privateBuilds, /github\.com|View repository/i);
  assert.match(site, /\{ label: "Private builds", href: "#private-builds" \}/);
  assert.doesNotMatch(site, /\{ label: "Projects", href: "#projects" \}/);
});
