import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";

const page = read("src/app/page.tsx");
const site = read("src/data/site.ts");
const featured = read("src/components/sections/FeaturedWork.tsx");
const projectsSection = read("src/components/sections/Projects.tsx");
const cases = read("src/data/roleCaseStudies.ts");
const githubProjects = read("src/data/githubProjects.ts");

test("homepage shows evidence-first case studies followed by a real project library", () => {
  assert.match(page, /import Projects from "@\/components\/sections\/Projects"/);
  assert.match(page, /<FeaturedWork \/>\s*<Projects \/>/);
  assert.match(site, /\{ label: "Projects", href: "#projects" \}/);
});

test("case studies are anchored to real roles and measured values", () => {
  for (const role of [
    "Forward Deployed Engineer (Freelance)",
    "Business Data Analyst",
    "AI Model Trainer / Evaluation Analyst",
    "Operations Data Analyst",
  ]) assert.match(cases, new RegExp(role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

  for (const organization of ["Augmentare Inc.", "Outlier AI", "VN Technologies"]) {
    assert.match(cases, new RegExp(organization.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const proof of ["~60%", "~20", "99.5%", "2M", "25+", "65+", "28%", "1,800+", "30+"]) {
    assert.match(cases, new RegExp(proof.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(featured, /roleCaseStudies/);
  assert.doesNotMatch(featured, /from "@\/data\/projects"/);
});

test("project library contains only verified public GitHub projects", () => {
  for (const name of ["Scribe Studio", "Chisel", "Still", "ViralEdit AI", "ProofTimeline"]) {
    assert.match(githubProjects, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  const urls = [...githubProjects.matchAll(/href:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(urls.length, 5);
  assert.ok(urls.every((url) => url.startsWith("https://github.com/kapasainitishreddy/")));
  assert.match(projectsSection, /githubProjects/);
  assert.match(projectsSection, /View repository/);
});
