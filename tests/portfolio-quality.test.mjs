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
  "src/data/aiUniverse.ts",
  "src/data/askNitish.ts",
  "src/data/crossFunctional.ts",
  "src/data/flagshipCaseStudies.ts",
  "src/data/novels.ts",
  "src/components/sections/Hero.tsx",
  "src/components/sections/Skills.tsx",
  "src/components/sections/StartupCaseStudies.tsx",
  "src/components/sections/Experience.tsx",
  "src/components/sections/IdentityRail.tsx",
  "src/components/sections/AskNitish.tsx",
  "src/components/sections/AIUniverse.tsx",
  "src/components/sections/AISafetyTeaching.tsx",
  "src/components/sections/CrossFunctional.tsx",
  "src/components/sections/ProofLens.tsx",
  "src/components/sections/FlagshipCaseStudies.tsx",
  "src/components/sections/Novels.tsx",
  "src/components/sections/WhyHireMe.tsx",
  "src/components/sections/Contact.tsx",
  "src/components/contact/ContactForm.tsx",
  "src/components/theme/ThemeSwitcher.tsx",
];

test("homepage tells the engineer-writer story in the intended order", () => {
  const page = read("src/app/page.tsx");
  const markers = [
    "<Hero />",
    "<FeaturedWork />",
    "<Novels />",
    "<AIUniverse />",
    "<AISafetyTeaching />",
    "<Experience />",
    "<About />",
    "<Contact />",
  ];
  const positions = markers.map((marker) => page.indexOf(marker));
  assert.ok(positions.every((value) => value >= 0), `Missing primary portfolio section: ${markers.filter((_, i) => positions[i] < 0).join(", ")}`);
  for (let i = 1; i < positions.length; i++) assert.ok(positions[i - 1] < positions[i], `${markers[i - 1]} must appear before ${markers[i]}`);
  assert.equal(page.includes("<IdentityRail />"), false, "Role summary should not duplicate the visual hero");
  assert.equal(page.includes("<ProofLens />"), false, "Proof lens should not interrupt the primary visual story");
  assert.equal(page.includes("<Loader />"), false, "Homepage should not block first paint with an intro loader");
});

test("homepage keeps deeper proof focused while promoting Ask Sai", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /<Hero \/>\s*<AskNitish \/>/, "Ask Sai should sit directly after the hero");
  for (const marker of ["<CrossFunctional />", "<StartupCaseStudies />", "<Projects />", "<WhyHireMe />"]) {
    assert.equal(page.includes(marker), false, `${marker} should stay out of the primary homepage flow`);
  }
  for (const retained of ["src/components/sections/CrossFunctional.tsx", "src/components/sections/AskNitish.tsx", "src/components/sections/StartupCaseStudies.tsx", "src/components/sections/FlagshipCaseStudies.tsx", "src/components/sections/ProofLens.tsx"]) {
    assert.equal(exists(retained), true, `Deep-proof component should remain available: ${retained}`);
  }
});

test("portrait media is durable, visual, and independent of external avatar services", () => {
  const media = read("src/data/visualMedia.ts");
  const hero = read("src/components/sections/Hero.tsx");
  const nav = read("src/components/layout/Navigation.tsx");
  const layout = read("src/app/layout.tsx");
  const manifest = read("src/app/manifest.ts");
  assert.equal(exists("public/profile.webp"), true, "Local profile icon must exist");
  const profile = bytes("public/profile.webp");
  assert.equal(profile.subarray(0, 4).toString("ascii"), "RIFF", "Profile asset must start with RIFF");
  assert.equal(profile.subarray(8, 12).toString("ascii"), "WEBP", "Profile asset must be a valid WebP container");
  assert.match(media, /data:image\/webp;base64,/);
  assert.doesNotMatch(media, /avatars\.githubusercontent\.com/);
  assert.match(hero, /visualMedia\.portrait/);
  assert.match(nav, /visualMedia\.portrait/);
  assert.match(layout, /profile\.webp/);
  assert.match(manifest, /profile\.webp/);
});

test("cross-functional section communicates real domain range enabled by AI", () => {
  const data = read("src/data/crossFunctional.ts");
  const section = read("src/components/sections/CrossFunctional.tsx");
  for (const keyword of ["HR", "recruit", "support", "CX", "operations", "data", "engineer", "governance"]) {
    assert.match(data + section, new RegExp(keyword, "i"), `Missing cross-functional signal: ${keyword}`);
  }
  assert.match(section, /AI/i);
  assert.match(section, /range|different rooms|different functions|cross-functional/i);
});

test("proof lens has four recruiter views and accessible controls", () => {
  const section = read("src/components/sections/ProofLens.tsx");
  for (const mode of ["AI Engineer", "Forward Deployed", "Founder", "AI Safety"]) assert.match(section, new RegExp(mode));
  assert.match(section, /aria-pressed|role="tab"|role="tablist"/);
  assert.match(section, /useState/);
});

test("flagship case studies expose system anatomy and engineering judgment", () => {
  const data = read("src/data/flagshipCaseStudies.ts");
  const section = read("src/components/sections/FlagshipCaseStudies.tsx");
  const ids = [...data.matchAll(/\bid:\s*"/g)];
  assert.ok(ids.length >= 5, `Expected at least 5 flagship case studies, found ${ids.length}`);
  for (const keyword of ["Problem", "Discovery", "System anatomy", "Controls", "Proof", "Why not let the model do everything"]) {
    assert.match(data + section, new RegExp(keyword, "i"), `Missing flagship case-study element: ${keyword}`);
  }
  for (const domain of ["Support", "Data", "Onboarding", "Multi-Agent", "Governance"]) assert.match(data, new RegExp(domain, "i"));
  assert.match(data, /~60%/);
  assert.match(data, /~20/);
  assert.match(data, /~4 days/);
});

test("responsive navigation has compact desktop and mobile dock surfaces", () => {
  const nav = read("src/components/layout/Navigation.tsx");
  const css = read("src/app/portfolio-redesign.css");
  assert.match(nav, /portfolio-dock/);
  assert.match(nav, /portfolio-command/);
  assert.match(nav, /portfolio-mobile-dock/);
  assert.match(nav, /portfolio-mobile-sheet/);
  assert.match(css, /\.portfolio-dock/);
  assert.match(css, /\.portfolio-mobile-dock/);
  assert.match(css, /backdrop-filter/i);
  assert.doesNotMatch(nav, /portfolio-rail__nav/);
});

test("multi-client startup section covers basic to advanced delivery", () => {
  const data = read("src/data/startupCaseStudies.ts");
  const section = read("src/components/sections/StartupCaseStudies.tsx");
  const ids = [...data.matchAll(/\bid:\s*"/g)];
  assert.ok(ids.length >= 8, `Expected at least 8 case studies, found ${ids.length}`);
  for (const keyword of ["Chatbot", "Financial", "Workflow", "Agent", "Multi-client", "Multi-agent", "Analytics"]) assert.match(data, new RegExp(keyword, "i"), `Missing ${keyword} case study coverage`);
  assert.match(data, /Client names are withheld/i);
  assert.match(section, /Basic to advanced/i);
  assert.match(section, /startupCaseStudies/);
});

test("portfolio states undergraduate AI safety teaching clearly", () => {
  const teaching = read("src/components/sections/AISafetyTeaching.tsx");
  assert.match(teaching, /undergraduate/i);
  assert.match(teaching, /jailbreak/i);
  assert.match(teaching, /AI safety/i);
  assert.match(teaching, /AI governance/i);
  assert.match(teaching, /evaluations|guardrails|oversight/i);
});

test("Ask Sai uses Puter while preserving portfolio grounding and a local fallback", () => {
  const guide = read("src/data/askNitish.ts");
  const section = read("src/components/sections/AskNitish.tsx");
  assert.match(guide, /findGroundedAnswer/);
  assert.match(section, /Ask the portfolio/i);
  assert.match(section, /js\.puter\.com\/v2/);
  assert.match(section, /openai\/gpt-5\.6-luna/);
  assert.match(section, /Use ONLY the PORTFOLIO CONTEXT/);
  assert.match(section, /findGroundedAnswer/);
  assert.match(section, /Using local fallback/);
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
