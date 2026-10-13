import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

test("portfolio has no personal-photo assets or references", () => {
  assert.equal(fs.existsSync("public/profile.webp"), false);
  const source = [
    read("src/app/page.tsx"),
    read("src/app/layout.tsx"),
    read("src/components/portfolio/PortfolioV4.tsx"),
  ].join("\n");
  assert.doesNotMatch(source, /portrait|profile\.webp|headshot|avatar/i);
});

test("homepage is the retro recruiter portfolio, not docs or 3D UI", () => {
  const page = read("src/app/page.tsx");
  const portfolio = read("src/components/portfolio/PortfolioV4.tsx");
  const css = read("src/app/portfolio-v4.css");

  assert.match(page, /PortfolioV4/);
  assert.doesNotMatch(page, /PortfolioDock|ThreeArtifact|DocsArticle|DocsContents/);
  assert.match(portfolio, /Engineer/);
  assert.match(portfolio, /with heart of writer\./);
  assert.match(portfolio, /Systems, not demos\./);
  assert.match(css, /v4-project-grid/);
  assert.match(css, /v4-role-list/);
});

test("experience uses readable rows and never a four-column timeline", () => {
  const css = read("src/app/portfolio-v4.css");
  assert.match(css, /grid-template-columns: 54px 145px minmax\(0,1fr\)/);
  assert.doesNotMatch(css, /repeat\(4,\s*1fr\).*v4-role/s);
});

test("GitHub Pages static export remains configured", () => {
  const config = read("next.config.mjs");
  const workflow = read(".github/workflows/deploy-pages.yml");
  assert.match(config, /output: "export"/);
  assert.match(config, /basePath/);
  assert.match(workflow, /STATIC_EXPORT/);
  assert.match(workflow, /upload-pages-artifact/);
});

test("serverful build includes baseline security headers", () => {
  const config = read("next.config.mjs");
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /Strict-Transport-Security/);
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /Referrer-Policy/);
  assert.match(config, /Permissions-Policy/);
});

test("responsive and reduced-motion guards are present", () => {
  const css = read("src/app/globals.css") + read("src/app/portfolio-v4.css");
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /max-width: 720px/);
  assert.match(css, /overflow-x: hidden/);
  assert.match(css, /focus-visible/);
});

test("Windows 98 shell offers genuine navigation and accessible case files", () => {
  const source = read("src/components/portfolio/PortfolioV4.tsx");
  const css = read("src/app/portfolio-v4.css");
  assert.match(source, /retro-desktop-shortcuts/);
  assert.match(source, /<details className="retro-start-menu">/);
  assert.match(source, /<details className="retro-case-details">/);
  assert.match(source, /project\.problem/);
  assert.match(source, /project\.whyNotEverything/);
  assert.match(source, /withBasePath\(site\.resumeUrl\)/);
  assert.match(css, /--retro-face: #c0c0c0/);
  assert.match(css, /retro-window-caption/);
  assert.match(css, /retro-marquee/);
  assert.match(css, /retro-rainbow/);
  assert.match(css, /retro-hit-counter/);
  assert.match(css, /retro-start-panel/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.portfolio-v4 :focus-visible/);
});

test("legal pages match static portfolio data handling", () => {
  const privacy = read("src/app/privacy/page.tsx");
  const terms = read("src/app/terms/page.tsx");
  assert.match(privacy, /does not use visitor accounts/i);
  assert.match(privacy, /does not set non-essential cookies/i);
  assert.match(terms, /Draft — pending legal review/);
  assert.match(terms, /As-is disclaimer/);
  assert.match(terms, /\[GOVERNING LAW PLACEHOLDER\]/);
});
