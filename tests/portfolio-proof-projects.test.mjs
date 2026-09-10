import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";
const exists = (path) => fs.existsSync(path);

test("featured case studies keep real roles, periods, outcomes, and privacy boundaries", () => {
  const cases = read("src/data/roleCaseStudies.ts");
  const featured = read("src/components/sections/FeaturedWork.tsx");

  for (const role of [
    "Forward Deployed Engineer (Freelance)",
    "Business Data Analyst",
    "AI Model Trainer / Evaluation Analyst",
    "Operations Data Analyst",
  ]) assert.match(cases, new RegExp(role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

  for (const proof of ["~60%", "~20 hrs/week", "99.5%", "2M", "25+", "65+", "28%", "1,800+", "30%"]){
    assert.match(cases, new RegExp(proof.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(cases, /Outlier AI/);
  assert.match(cases, /intentionally private|intentionally anonymized/i);
  assert.match(featured, /roleCaseStudies/);
  assert.doesNotMatch(featured, /from "@\/data\/projects"/);
});

test("named public project dataset is intentionally empty", () => {
  const projects = read("src/data/projects.ts");
  assert.match(projects, /export const projects: Project\[\] = \[\];/);
  assert.doesNotMatch(projects, /github\.com\/kapasainitishreddy/i);
});

test("homepage exposes private builds after case studies instead of public repositories", () => {
  const page = read("src/app/page.tsx");
  const privateBuilds = read("src/components/sections/PrivateBuilds.tsx");

  assert.equal(exists("src/data/githubProjects.ts"), false);
  assert.equal(exists("src/components/sections/GitHubProjects.tsx"), false);
  assert.match(page, /import PrivateBuilds/);
  assert.match(page, /<FeaturedWork \/>\s*<PrivateBuilds \/>/);
  assert.match(privateBuilds, /Private while scaling/);
  assert.match(privateBuilds, /product names, repositories, unreleased features, roadmaps/i);
  assert.doesNotMatch(privateBuilds, /View repository|github\.com/i);
});
