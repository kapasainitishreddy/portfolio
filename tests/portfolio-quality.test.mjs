import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const visibleCopyFiles = [
  "src/data/site.ts",
  "src/data/experience.ts",
  "src/data/skills.ts",
  "src/data/certifications.ts",
  "src/data/building.ts",
  "src/components/sections/Hero.tsx",
  "src/components/sections/Skills.tsx",
  "src/components/sections/Experience.tsx",
  "src/components/sections/WhyHireMe.tsx",
  "src/components/sections/Contact.tsx",
  "src/components/contact/ContactForm.tsx",
  "src/components/theme/ThemeSwitcher.tsx",
];

test("homepage tells the recruiter story in the intended order", () => {
  const page = read("src/app/page.tsx");
  const markers = ["<Hero />", "<Skills />", "<FeaturedWork />", "<Experience />", "<Projects />"];
  const positions = markers.map((marker) => page.indexOf(marker));
  assert.ok(positions.every((value) => value >= 0), `Missing recruiter-first section: ${markers.filter((_, i) => positions[i] < 0).join(", ")}`);
  for (let i = 1; i < positions.length; i++) {
    assert.ok(positions[i - 1] < positions[i], `${markers[i - 1]} must appear before ${markers[i]}`);
  }
  assert.equal(page.includes("<Loader />"), false, "Homepage should not block first paint with an intro loader");
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

test("visible portfolio copy does not use em dashes", () => {
  const offenders = visibleCopyFiles.filter((file) => read(file).includes("—"));
  assert.deepEqual(offenders, [], `Em dash found in visible-copy sources: ${offenders.join(", ")}`);

  const projectCard = read("src/components/projects/ProjectCard.tsx");
  const projectModal = read("src/components/projects/ProjectModal.tsx");
  assert.match(projectCard, /cleanVisibleCopy/);
  assert.match(projectModal, /cleanVisibleCopy/);
});
