import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";

const cases = read("src/data/roleCaseStudies.ts");
const featured = read("src/components/sections/FeaturedWork.tsx");
const githubProjects = read("src/data/githubProjects.ts");
const site = read("src/data/site.ts");

test("featured work is anchored to four real roles and their documented metrics", () => {
  for (const role of [
    "Forward Deployed Engineer (Freelance)",
    "Business Data Analyst",
    "AI Model Trainer / Evaluation Analyst",
    "Operations Data Analyst",
  ]) assert.match(cases, new RegExp(role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

  for (const org of ["Augmentare Inc.", "Outlier AI", "VN Technologies"]) {
    assert.match(cases, new RegExp(org.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const proof of ["~60%", "~20 hrs/week", "99.5%", "2M", "25+", "65+", "28%", "1,800+", "30+"]) {
    assert.match(cases, new RegExp(proof.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(featured, /roleCaseStudies/);
  assert.doesNotMatch(featured, /from "@\/data\/projects"/);
});

test("public builds keep the concurrent GitHub work and add Chisel as verified proof", () => {
  for (const project of ["Scribe Studio", "ViralEdit AI", "ProofTimeline", "Still", "Chisel"]) {
    assert.match(githubProjects, new RegExp(project));
  }
  const urls = [...githubProjects.matchAll(/href:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(urls.length, 5);
  assert.ok(urls.every((url) => url.startsWith("https://github.com/kapasainitishreddy/")));
  assert.match(site, /\{ label: "Projects", href: "#projects" \}/);
});
