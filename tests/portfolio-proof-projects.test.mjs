import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const exists = (path) => fs.existsSync(path);

test("featured FDE case studies show the actual role, period, and structured outcomes", () => {
  const projects = read("src/data/projects.ts");
  const card = read("src/components/projects/ProjectCard.tsx");
  const modal = read("src/components/projects/ProjectModal.tsx");

  assert.match(projects, /jobTitle:\s*"Forward Deployed Engineer \(Freelance\)"/);
  assert.match(projects, /jobPeriod:\s*"2024 - Present"/);
  assert.match(projects, /outcomes:\s*\[/);
  assert.match(projects, /value:\s*"~60%"/);
  assert.match(projects, /value:\s*"~20 hrs\/week"/);
  assert.match(projects, /value:\s*"~4 days"/);
  assert.match(card, /project\.outcomes/);
  assert.match(card, /project\.jobTitle/);
  assert.match(modal, /Measured outcomes/);
  assert.match(modal, /project\.outcomes/);
});

test("case study capabilities no longer mix proof labels into the feature list", () => {
  const projects = read("src/data/projects.ts");
  const featuredBlock = projects.split("// ── Public technical projects")[0];
  assert.doesNotMatch(featuredBlock, /"Proof:/);
});

test("homepage includes a curated GitHub-backed project section after case studies", () => {
  const page = read("src/app/page.tsx");
  assert.equal(exists("src/data/githubProjects.ts"), true);
  assert.equal(exists("src/components/sections/GitHubProjects.tsx"), true);
  assert.match(page, /import GitHubProjects/);
  assert.match(page, /<FeaturedWork \/>\s*<GitHubProjects \/>/);
});

test("GitHub project section uses verified public repositories and concrete build facts", () => {
  const data = read("src/data/githubProjects.ts");
  const section = read("src/components/sections/GitHubProjects.tsx");

  for (const name of ["Scribe Studio", "ViralEdit AI", "ProofTimeline", "Still"]) {
    assert.match(data, new RegExp(name));
  }
  for (const repo of ["scribe-studio", "videoediting", "PoT", "still-hack-for-humanity-2026"]) {
    assert.match(data, new RegExp(`github\\.com/kapasainitishreddy/${repo}`, "i"));
  }
  for (const fact of ["12 transitions", "SHA-256", "August 7–September 4, 2026", "React Three Fiber"]) {
    assert.match(data, new RegExp(fact));
  }
  assert.match(section, /githubProjects/);
  assert.match(section, /View repository/);
  assert.match(section, /target="_blank"/);
});
