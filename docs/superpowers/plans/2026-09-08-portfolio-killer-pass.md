# Portfolio Killer Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the AI Ink Universe into a sharper, more distinctive portfolio with a high-quality real portrait, cross-functional AI positioning, visitor-selectable proof lenses, and flagship case studies that show engineering judgment rather than generic project summaries.

**Architecture:** Keep the existing Next.js 15 / React 19 / Framer Motion / ink-theme stack. Add one lightweight client-side proof-lens state, one cross-functional experience section, and one flagship case-study component backed by curated data already in the repository. Replace the compressed hero portrait with the original high-resolution personal photo and keep a separate lighter avatar asset if needed.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, existing Suminagashi/Shodo/Bushido themes, Node test runner.

**Spec:** Approved in chat on 2026-09-08.

## Global Constraints
- Keep the real user photo; do not synthesize a replacement face.
- Do not invent clients, metrics, revenue, credentials, outcomes, or employment history.
- State cross-functional experience truthfully across HR/recruiting, customer support/CX, operations, data, engineering, AI delivery, and governance.
- Preserve the visible-copy no-em-dash rule.
- Keep jailbreak material framed as defensive AI-safety education.
- Avoid generic neon-AI visuals and repetitive card grids.
- Reuse existing open-source stack where possible; do not add a dependency unless it materially improves the experience.

---

### Task 1: Protect the new behavior with tests
**Files:** Modify `tests/portfolio-quality.test.mjs`
- [ ] Add assertions for the cross-functional section and visitor proof-lens component.
- [ ] Assert flagship case studies expose Problem, Discovery, Architecture/Build, Controls, Proof, and "Why not let the model do everything?" judgment copy.
- [ ] Keep the photo-validity test and raise the minimum profile asset size so a tiny compressed portrait cannot regress.
- [ ] Run `npm test` and confirm RED before implementation.

### Task 2: Replace the compressed portrait
**Files:** Replace `public/profile.webp`; optionally add `public/profile-avatar.webp` and update nav/metadata consumers.
- [ ] Use the original 1536x1536 personal photo from the user's file library.
- [ ] Encode a high-quality WebP for hero use and a smaller avatar version for nav/favicon-sized surfaces.
- [ ] Preserve natural skin, glasses, hair, teeth, and sunset texture; no generative facial changes.

### Task 3: Add cross-functional AI positioning
**Files:** Create `src/data/crossFunctional.ts`; create `src/components/sections/CrossFunctional.tsx`; update `src/app/page.tsx` and `src/data/site.ts`.
- [ ] Add concise witty copy explaining that AI let Sai operate across HR/recruiting, support/CX, operations/data, engineering/integrations, and AI safety/governance.
- [ ] Keep copy recruiter-readable and grounded in real experience.
- [ ] Use an editorial progression, not a grid of identical cards.

### Task 4: Add Proof Lens
**Files:** Create `src/components/sections/ProofLens.tsx`; create/update supporting data; update `src/app/page.tsx` and `src/app/polish.css`.
- [ ] Four modes: AI Engineer, Forward Deployed, Founder, AI Safety.
- [ ] Each mode changes highlighted proof points and links to relevant existing sections.
- [ ] Keyboard accessible segmented control and responsive behavior.

### Task 5: Upgrade flagship case studies
**Files:** Create `src/data/flagshipCaseStudies.ts`; create `src/components/sections/FlagshipCaseStudies.tsx`; update `src/app/page.tsx` and styles.
- [ ] Feature Support Copilot, Production Data/Ops Pipeline, Customer Onboarding Agent, Multi-Agent Research, and Governance stack.
- [ ] Each story shows Problem, What I noticed, System anatomy, Human/AI boundary, Controls, Proof, and Why not let the model do everything.
- [ ] Use supported numeric metrics only for the case studies that already have them in `projects.ts`.
- [ ] Keep anonymous-client disclaimer.

### Task 6: Polish and verify
- [ ] Update navigation labels only where needed.
- [ ] Run `npm test`.
- [ ] Run static production build using the same environment as Pages.
- [ ] Open PR against `main`, verify CI once, merge only if green.
- [ ] Fast-forward the authorized Pages deployment branch and confirm final GitHub Pages deployment succeeds.
