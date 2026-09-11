import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const nav = fs.readFileSync("src/components/layout/Navigation.tsx", "utf8");
const page = fs.readFileSync("src/app/page.tsx", "utf8");
const site = fs.readFileSync("src/data/site.ts", "utf8");
const quickMenuKeyboard = fs.existsSync("src/components/layout/QuickMenuKeyboardNavigation.tsx")
  ? fs.readFileSync("src/components/layout/QuickMenuKeyboardNavigation.tsx", "utf8")
  : "";
const baseCss = fs.readFileSync("src/app/portfolio-redesign.css", "utf8");
const polishCss = fs.existsSync("src/app/navigation-polish.css")
  ? fs.readFileSync("src/app/navigation-polish.css", "utf8")
  : "";
const motionCss = fs.existsSync("src/app/navigation-motion.css")
  ? fs.readFileSync("src/app/navigation-motion.css", "utf8")
  : "";
const css = `${baseCss}\n${polishCss}\n${motionCss}`;

test("desktop dock morphs between compact and expanded navigation", () => {
  assert.match(nav, /dockExpanded/);
  assert.match(nav, /data-expanded=\{dockExpanded \? "true" : "false"\}/);
  assert.match(nav, /portfolio-dock__label/);
  assert.match(css, /\.portfolio-dock\[data-expanded="true"\]/);
  assert.match(css, /width:\s*(?:11|12|13)(?:\.\d+)?rem/);
});

test("desktop navigation uses a shared animated active pill instead of a thin rail", () => {
  assert.match(nav, /portfolio-dock__active-pill/);
  assert.match(nav, /layoutId="portfolio-desktop-active-pill"/);
  assert.match(css, /\.portfolio-dock__active-pill/);
  assert.doesNotMatch(nav, /portfolio-dock__active-rail/);
});

test("expanded dock reveals identity context beside the portrait", () => {
  assert.match(nav, /portfolio-dock__identity-copy/);
  assert.match(nav, /Engineer · Writer/);
  assert.match(css, /\.portfolio-dock__identity-copy/);
});

test("command palette responds to the dock expansion state", () => {
  assert.match(nav, /data-dock-expanded=\{dockExpanded \? "true" : "false"\}/);
  assert.match(css, /\.portfolio-command\[data-dock-expanded="true"\]/);
});

test("morphing navigation follows the homepage section order", () => {
  const orderedHrefs = [
    "#featured-work",
    "#private-builds",
    "#novels",
    "#ai-universe",
    "#ai-safety",
    "#experience",
    "#about",
    "#contact",
  ];

  let previousIndex = -1;
  for (const href of orderedHrefs) {
    const index = site.indexOf(`href: "${href}"`);
    assert.ok(index > previousIndex, `${href} should follow the same downward order as the homepage`);
    previousIndex = index;
  }
});

test("desktop quick menu focuses the active section action and restores the opener", () => {
  assert.match(nav, /commandTriggerRef = useRef<HTMLButtonElement>/);
  assert.match(nav, /commandMenuRef = useRef<HTMLDivElement>/);
  assert.match(nav, /const menu = commandMenuRef\.current/);
  assert.match(nav, /const activeAction = menu\.querySelector<HTMLElement>\('\.portfolio-command__grid a\[data-active="true"\]'\)/);
  assert.match(nav, /const firstAction = menu\.querySelector<HTMLElement>\("\.portfolio-command__grid a\[href\]"\)/);
  assert.match(nav, /window\.requestAnimationFrame\(\(\) => \(activeAction \?\? firstAction\)\?\.focus\(\)\)/);
  assert.match(nav, /if \(previousFocus\?\.isConnected\) previousFocus\.focus\(\)/);
  assert.match(nav, /ref=\{commandTriggerRef\}/);
  assert.match(nav, /ref=\{commandMenuRef\}/);
});

test("desktop quick menu supports arrow, Home, and End navigation without trapping Tab", () => {
  assert.match(page, /QuickMenuKeyboardNavigation/);
  assert.match(quickMenuKeyboard, /event\.key === "ArrowDown"/);
  assert.match(quickMenuKeyboard, /event\.key === "ArrowUp"/);
  assert.match(quickMenuKeyboard, /event\.key === "Home"/);
  assert.match(quickMenuKeyboard, /event\.key === "End"/);
  assert.match(quickMenuKeyboard, /closest\("\.portfolio-command__grid"\)/);
  assert.match(quickMenuKeyboard, /querySelectorAll<HTMLAnchorElement>\("a\[href\]"\)/);
  assert.match(quickMenuKeyboard, /actions\[nextIndex\]\?\.focus\(\)/);
  assert.match(quickMenuKeyboard, /document\.addEventListener\("keydown", onKeyDown\)/);
  assert.match(quickMenuKeyboard, /document\.removeEventListener\("keydown", onKeyDown\)/);
  assert.doesNotMatch(quickMenuKeyboard, /event\.key === "Tab"/);
});

test("mobile dock uses a moving glass active pill", () => {
  assert.match(nav, /portfolio-mobile-dock__active-pill/);
  assert.match(nav, /layoutId="portfolio-mobile-active-pill"/);
  assert.match(css, /\.portfolio-mobile-dock__active-pill/);
});

test("mobile More inherits the active pill for sections outside the visible shortcuts", () => {
  assert.match(nav, /const mobileMoreActive = !mobileItems\.some\(\(item\) => item\.href === activeHref\)/);
  assert.match(nav, /data-active=\{mobileMoreActive \? "true" : "false"\}/);
  assert.match(nav, /current section: \$\{activeLabel\}/);
  assert.match(nav, /mobileMoreActive && !mobileOpen && \([\s\S]*?layoutId="portfolio-mobile-active-pill"/);
  assert.equal([...nav.matchAll(/layoutId="portfolio-mobile-active-pill"/g)].length, 2);
});

test("mobile More trigger visibly mirrors the open navigation sheet", () => {
  assert.match(nav, /aria-expanded=\{mobileOpen\}/);
  assert.match(motionCss, /\.portfolio-mobile-dock button::before\s*\{/);
  assert.match(motionCss, /\.portfolio-mobile-dock button\[aria-expanded="true"\]::before\s*\{/);
  assert.match(motionCss, /\.portfolio-mobile-dock button\[aria-expanded="true"\] svg\s*\{[^}]*rotate\(90deg\)/s);
});

test("mobile More sheet owns vertical touch scrolling without globally freezing the page", () => {
  assert.doesNotMatch(nav, /document\.body\.style\.overflow/);
  assert.match(nav, /overflowY:\s*"auto"/);
  assert.match(nav, /touchAction:\s*"pan-y"/);
  assert.match(nav, /overscrollBehavior:\s*"contain"/);
  assert.match(nav, /WebkitOverflowScrolling:\s*"touch"/);
  assert.match(nav, /portfolio-mobile-sheet__backdrop[\s\S]*touchAction:\s*"none"/);
});

test("mobile navigation sheet contains keyboard focus and returns it to the trigger", () => {
  assert.match(nav, /mobileTriggerRef = useRef<HTMLButtonElement>/);
  assert.match(nav, /mobileSheetRef = useRef<HTMLDivElement>/);
  assert.match(nav, /panel\.querySelectorAll<HTMLElement>/);
  assert.match(nav, /event\.key !== "Tab"/);
  assert.match(nav, /document\.activeElement === first/);
  assert.match(nav, /document\.activeElement === last/);
  assert.match(nav, /previousFocus\?\.isConnected/);
  assert.match(nav, /ref=\{mobileTriggerRef\}/);
  assert.match(nav, /ref=\{mobileSheetRef\}/);
});

test("navigation controls keep an explicit keyboard focus halo", () => {
  assert.match(motionCss, /\.portfolio-dock__identity:focus-visible/);
  assert.match(motionCss, /\.portfolio-dock__item:focus-visible/);
  assert.match(motionCss, /\.portfolio-command a:focus-visible/);
  assert.match(motionCss, /\.portfolio-mobile-dock a:focus-visible/);
  assert.match(motionCss, /\.portfolio-mobile-sheet button:focus-visible/);
  assert.match(motionCss, /outline:\s*2px solid/);
  assert.match(motionCss, /outline-offset:\s*2px/);
});

test("navigation polish keeps reduced-motion coverage for morphing surfaces", () => {
  const reducedMotion = css.split("@media (prefers-reduced-motion: reduce)").pop() ?? "";
  assert.match(reducedMotion, /portfolio-dock/);
  assert.match(reducedMotion, /portfolio-dock__label/);
  assert.match(reducedMotion, /portfolio-dock__active-pill/);
  assert.match(reducedMotion, /portfolio-mobile-dock__active-pill/);
  assert.match(reducedMotion, /portfolio-mobile-dock button::before/);
  assert.match(reducedMotion, /portfolio-mobile-dock button svg/);
});

test("dock portrait accent only pulses when the dock opens", () => {
  assert.match(motionCss, /\.portfolio-dock\[data-expanded="true"\] \.portfolio-dock__avatar-ring\s*\{/);
  assert.match(motionCss, /animation:\s*portfolio-dock-arrival/);
  assert.doesNotMatch(motionCss, /portfolio-dock-breathe/);
  assert.doesNotMatch(motionCss, /portfolio-dock__avatar-ring\s*\{[^}]*animation:[^;}]*infinite/s);
});
