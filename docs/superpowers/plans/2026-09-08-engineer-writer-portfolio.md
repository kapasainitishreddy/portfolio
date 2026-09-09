# Engineer + Writer Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing long-form AI portfolio into a more navigable, personal Engineer + Writer portfolio with reliable portrait rendering, meaningful case-study previews, and a dedicated Novels section.

**Architecture:** Keep the existing Next.js 15 App Router structure, site data modules, section components, theme providers, and CSS variables. Add one focused novels data module/section and one focused project-preview component, replace desktop navigation with a fixed rail while preserving the mobile sheet, and update homepage composition rather than deleting existing proof components.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind utility classes, existing `polish.css`, Framer Motion, existing theme/accessibility helpers.

**Spec:** `docs/superpowers/specs/2026-09-08-engineer-writer-portfolio-design.md`

## Global Constraints

- Hero headline is exactly `Engineer with heart of a Writer.`
- No fabricated publication status, dates, reviews, sales, ISBNs, or other novel claims.
- No new npm dependencies.
- GitHub Pages static export must continue to work under `/portfolio`.
- Desktop side navigation begins at 1100px; mobile/tablet retain top navigation.
- Existing theme controls and reduced-motion behavior remain available.

---

### Task 1: Reframe site copy and homepage order

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: existing `hero`, `site`, `navItems` exports.
- Produces: navigation destinations including `#novels`; hero copy used by `Hero.tsx`; shorter homepage composition.

- [ ] **Step 1: Update site navigation and hero copy**

Set `navItems` to AI, Case studies, Novels, Safety, Experience, About, Contact. Set `hero.headline` exactly to `Engineer with heart of a Writer.`. Set supporting copy to `I build AI systems, products, and agents, and write stories about the people technology is supposed to serve.` and identity to `Forward Deployed Engineer · Applied AI · Product Builder · Writer`.

- [ ] **Step 2: Update homepage composition**

Keep `Hero`, `IdentityRail`, `ProofLens`, `FeaturedWork`, add `Novels`, then `AIUniverse`, `AISafetyTeaching`, `Experience`, `About`, `Contact`. Remove the other section imports from this page only.

- [ ] **Step 3: Run PR quality workflow after all implementation tasks**

Expected final workflow commands: `npm test` and static `npm run build` with the existing export env vars.

---

### Task 2: Build responsive navigation rail

**Files:**
- Modify: `src/components/layout/Navigation.tsx`
- Modify: `src/app/polish.css`
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `navItems`, `site`, `socials`, theme controls, `withBasePath`.
- Produces: desktop fixed `.portfolio-rail`, mobile `.portfolio-mobile-nav`, active section state, scroll progress state.

- [ ] **Step 1: Add active-section and scroll state**

Use `IntersectionObserver` against each hash destination with `rootMargin: "-30% 0px -58% 0px"`. Update `activeHref` when an observed section intersects. Add a passive `scroll` handler that computes `progress = scrollY / (scrollHeight - innerHeight)` and `showTop = scrollY > innerHeight * 0.7`.

- [ ] **Step 2: Render desktop rail**

At desktop, render profile/name, anchor list, resume link, utility controls, progress bar, and Back to top. Add `aria-current="location"` to the active destination.

- [ ] **Step 3: Preserve mobile menu**

Retain the existing top bar and full-screen menu under 1100px, including the new Novels destination.

- [ ] **Step 4: Shift main/footer on desktop**

Add `.portfolio-main` to the homepage `main` and `.portfolio-footer` to the footer. CSS at `min-width:1100px` adds left padding matching the rail width, while section max widths and gutters remain centered in the available content area.

- [ ] **Step 5: Add focus and responsive CSS**

Define selected, hover, focus-visible, scroll-progress, label, and compact utility states without adding a new dependency.

---

### Task 3: Make the hero portrait reliable and simplify the first viewport

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/app/polish.css`

**Interfaces:**
- Consumes: `hero` data, `withBasePath`, existing reduced-motion hook.
- Produces: reliable `<img src={withBasePath("/profile.webp")}>`, image-error fallback state, secondary novels CTA.

- [ ] **Step 1: Replace Next Image portrait with explicit `<img>`**

Use local `imageFailed` state. Render a fallback monogram/name block beneath the `<img>`, and hide the image after `onError` so a broken image never leaves an empty frame.

- [ ] **Step 2: Reduce competing hero UI**

Limit capability chips to the existing four but visually subordinate them. Keep proof metrics below the image. CTA order: `See how I build`, `Read my novels`, `Contact me`.

- [ ] **Step 3: Add hero-specific responsive CSS**

Constrain headline size so it does not clip on common 1366px-wide laptops, keep the portrait aspect around 4:5 on desktop, and collapse to a single column below large screens.

---

### Task 4: Replace abstract FDE placeholder graphics with meaningful previews

**Files:**
- Create: `src/components/projects/ProjectPreview.tsx`
- Modify: `src/components/projects/ProjectCard.tsx`
- Modify: `src/app/polish.css`

**Interfaces:**
- Consumes: `project.id`.
- Produces: `ProjectPreview({ projectId }: { projectId: string }): ReactNode | null`.

- [ ] **Step 1: Implement support-copilot preview**

Render compact code-native chat rows: grounded answer, citation chip, and `Escalate to human` action cue.

- [ ] **Step 2: Implement data-pipeline preview**

Render four labeled nodes: Sources → Transform → Validate → Dashboard, with status dots/checks.

- [ ] **Step 3: Implement onboarding-agent preview**

Render a three-step onboarding rail plus a guidance bubble and human-approval state.

- [ ] **Step 4: Integrate previews into cards**

`ProjectCard` uses `ProjectPreview` first; if it returns null, fall back to configured image, then `ProjectPlaceholder`.

- [ ] **Step 5: Style for card-scale readability**

Use CSS classes prefixed `project-preview__`; keep text between 10px and 13px at desktop card scale, avoid clipped labels, and preserve the existing card hover behavior.

---

### Task 5: Add a dedicated Novels section

**Files:**
- Create: `src/data/novels.ts`
- Create: `src/components/sections/Novels.tsx`
- Modify: `src/app/polish.css`

**Interfaces:**
- Produces: `novels` data array with `id`, `title`, `premise`, `genre`, `tone`, `accent`.
- `Novels.tsx` renders `<Section id="novels" label="Novels">`.

- [ ] **Step 1: Add truthful novel metadata**

Use the titles: Still Figuring It Out; Bare Minimum; You Always Come Back; REGRET; The Cat Who Stayed; Wolf One: Red Monsoon. Keep each premise short and descriptive without publication claims.

- [ ] **Step 2: Build editorial shelf**

Desktop uses a horizontally arranged shelf with varied cover-like panels and large serif titles. Smaller screens use horizontal snap scrolling so the section does not become six full-width stacked cards.

- [ ] **Step 3: Connect writing to engineering identity**

Section intro: writing is a different medium for the same curiosity about people, incentives, consequences, and systems. Do not over-explain or turn the section into a biography.

---

### Task 6: Add regression tests for portfolio structure

**Files:**
- Create: `tests/portfolio-redesign.test.mjs`

**Interfaces:**
- Consumes source files as text with Node `fs`.
- Produces regression protection for exact headline, novels anchor, side rail, and specialized project previews.

- [ ] **Step 1: Test exact hero headline and novels destination**

Read `src/data/site.ts`; assert it contains `Engineer with heart of a Writer.` and `{ label: "Novels", href: "#novels" }`.

- [ ] **Step 2: Test homepage includes Novels and shorter composition**

Read `src/app/page.tsx`; assert `<Novels />` is present and `<AskNitish />`, `<StartupCaseStudies />`, and `<WhyHireMe />` are absent.

- [ ] **Step 3: Test specialized project previews exist**

Read `src/components/projects/ProjectPreview.tsx`; assert all three project ids are present.

- [ ] **Step 4: Test navigation rail hook-up**

Read `src/components/layout/Navigation.tsx`; assert `IntersectionObserver`, `portfolio-rail`, and `aria-current` are present.

---

### Task 7: Verify through PR CI and production deployment

**Files:**
- No source changes unless verification finds an issue.

**Interfaces:**
- Consumes: PR head commit and GitHub Actions.
- Produces: evidence for tests and static build.

- [ ] **Step 1: Open PR from `chatgpt/engineer-writer-ux` to `main`**

PR summary lists navigation, hero, portrait fallback, project previews, novels, and homepage simplification.

- [ ] **Step 2: Inspect `Portfolio quality` workflow**

Require successful `npm test` and static production build before merge.

- [ ] **Step 3: Merge only after green quality checks**

Use squash or merge according to repository defaults; do not force merge over failing checks.

- [ ] **Step 4: Inspect Pages deployment after merge**

Verify the deployment workflow has completed successfully for `main` and inspect the live site for the expected headline and section anchors.
