import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const bytes = (file) => fs.readFileSync(path.join(root, file));

const visibleCopyFiles = [
  "src/data/site.ts",
  "src/data/experience.ts",
  "src/data/skills.ts",
  "src/data/certifications.ts",
  "src/data/building.ts",
  "src/data/startupCaseStudies.ts",
  "src/components/sections/Hero.tsx",
  "src/components/sections/Skills.tsx",
  "src/components/sections/StartupCaseStudies.tsx",
  "src/components/sections/Experience.tsx",
  "src/components/sections/WhyHireMe.tsx",
  "src/components/sections/Contact.tsx",
  "src/components/contact/ContactForm.tsx",
  "src/components/theme/ThemeSwitcher.tsx",
];

test("homepage tells the recruiter story in the intended order", () => {
  const page = read("src/app/page.tsx");
  const markers = ["<Hero />", "<Skills />", "<FeaturedWork />", "<StartupCaseStudies />", "<Experience />", "<Projects />"];
  const positions = markers.map((marker) => page.indexOf(marker));
  assert.ok(positions.every((value) => value >= 0), `Missing recruiter-first section: ${markers.filter((_, i) => positions[i] < 0).join(", ")}`);
  for (let i = 1; i < positions.length; i++) {
    assert.ok(positions[i - 1] < positions[i], `${markers[i - 1]} must appear before ${markers[i]}`);
  }
  assert.equal(page.includes("<Loader />"), false, "Homepage should not block first paint with an intro loader");
});

test("profile photo is a valid WebP and is used for hero, nav, and favicon", () => {
  const hero = read("src/components/sections/Hero.tsx");
  const nav = read("src/components/layout/Navigation.tsx");
  const layout = read("src/app/layout.tsx");
  const manifest = read("src/app/manifest.ts");
  assert.equal(exists("public/profile.webp"), true, "Optimized real profile photo must exist");
  const profile = bytes("public/profile.webp");
  assert.equal(profile.subarray(0, 4).toString("ascii"), "RIFF", "Profile asset must start with RIFF");
  assert.equal(profile.subarray(8, 12).toString("ascii"), "WEBP", "Profile asset must be a valid WebP container");
  assert.ok(profile.length > 3000, "Profile asset is unexpectedly small");
  assert.match(hero, /profile\.webp/);
  assert.match(nav, /profile\.webp/);
  assert.doesNotMatch(nav, /site\.initials/);
  assert.match(layout, /profile\.webp/);
  assert.match(manifest, /profile\.webp/);
  assert.equal(exists("public/profile.jpg"), false, "Corrupt legacy JPEG must be removed");
  assert.equal(exists("public/favicon.png"), false, "Corrupt legacy favicon must be removed");
});

test("mobile navigation uses a dedicated readable surface", () => {
  const nav = read("src/components/layout/Navigation.tsx");
  const css = read("src/app/polish.css");
  assert.match(nav, /portfolio-nav/);
  assert.match(css, /\.portfolio-nav/);
  assert.match(css, /backdrop-filter/i);
  assert.match(css, /color-mix\(in srgb,var\(--color-ink\) 9[0-9]%/i);
});

test("multi-client startup section covers basic to advanced delivery", () => {
  const data = read("src/data/startupCaseStudies.ts");
  const section = read("src/components/sections/StartupCaseStudies.tsx");
  const ids = [...data.matchAll(/\bid:\s*"/g)];
  assert.ok(ids.length >= 8, `Expected at least 8 case studies, found ${ids.length}`);
  for (const keyword of ["Chatbot", "Financial", "Workflow", "Agent", "Multi-client", "Multi-agent", "Analytics"]) {
    assert.match(data, new RegExp(keyword, "i"), `Missing ${keyword} case study coverage`);
  }
  assert.match(data, /Client names are withheld/i);
  assert.match(section, /Basic to advanced/i);
  assert.match(section, /startupCaseStudies/);
});

test("three visual themes use three independent background engines", () => {
  const themed = read("src/components/theme/ThemedBackground.tsx");
  assert.match(themed, /SuminagashiBackground/);
  assert.match(themed, /CalligraphyBackground/);
  assert.match(themed, /SamuraiBackground/);
  assert.doesNotMatch(themed, /ink-bg__veil/);

  const sumi = read("src/components/suminagashi/SuminagashiBackground.tsx");
  assert.match(sumi, /dropWarp/);
  assert.match(sumi, /MacCormack|mcc/);
  assert.match(sumi, /pointermove/);

  const shodo = read("src/components/calligraphy/CalligraphyBackground.tsx");
  assert.match(shodo, /pressure/);
  assert.match(shodo, /bristle/i);
  assert.doesNotMatch(shodo, /arrowhead/i);

  const bushido = read("src/components/samurai/SamuraiBackground.tsx");
  assert.match(bushido, /pointerdown/);
  assert.match(bushido, /pointerup/);
  assert.match(bushido, /scar/i);
});

test("Suminagashi runtime errors are isolated from the portfolio", () => {
  const themed = read("src/components/theme/ThemedBackground.tsx");
  const boundary = read("src/components/theme/BackgroundErrorBoundary.tsx");
  assert.match(themed, /BackgroundErrorBoundary/);
  assert.match(themed, /StaticFallback/);
  assert.match(boundary, /getDerivedStateFromError/);
  assert.match(boundary, /componentDidCatch/);
});

test("visible portfolio copy does not use em dashes", () => {
  const offenders = visibleCopyFiles.filter((file) => read(file).includes("—"));
  assert.deepEqual(offenders, [], `Em dash found in visible-copy sources: ${offenders.join(", ")}`);

  const projectCard = read("src/components/projects/ProjectCard.tsx");
  const projectModal = read("src/components/projects/ProjectModal.tsx");
  assert.match(projectCard, /cleanVisibleCopy/);
  assert.match(projectModal, /cleanVisibleCopy/);
});
