# AI Ink Universe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing Suminagashi portfolio into an AI-first personal universe while preserving the real portrait, existing themes, recruiter evidence, and truthful public claims.

**Architecture:** Add two small data modules for the AI universe and grounded portfolio guide, four focused presentation sections, and minimal changes to the existing Hero, About, navigation, page composition, and polish stylesheet. The guide is client-side and deterministic in version 1 so it remains truthful and works without secrets or an external model provider.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, Tailwind utility classes, existing theme engines, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-08-ai-ink-universe-design.md`

## Global Constraints

- Preserve `public/profile.webp` and continue using it in the hero and navigation.
- Preserve Suminagashi, Shodo/calligraphy, and Bushido/samurai theme engines.
- No em dashes in visible portfolio copy.
- No fabricated metrics, credentials, client names, revenue, or traction.
- State truthfully that Sai teaches undergraduate sessions/classes about jailbreaks, AI safety, and AI governance.
- Frame jailbreak content as defensive AI-safety education, not bypass instructions.
- The local Ask Nitish guide must not claim to be an external LLM.
- Respect reduced motion and existing accessibility patterns.

---

### Task 1: Add regression tests for the new story

**Files:**
- Modify: `tests/portfolio-quality.test.mjs`

**Interfaces:**
- Consumes: existing filesystem-based quality test helpers.
- Produces: assertions that later tasks must satisfy.

- [ ] **Step 1: Extend the visible-copy list**

Add these files to `visibleCopyFiles`:

```js
"src/data/aiUniverse.ts",
"src/data/askNitish.ts",
"src/components/sections/IdentityRail.tsx",
"src/components/sections/AskNitish.tsx",
"src/components/sections/AIUniverse.tsx",
"src/components/sections/AISafetyTeaching.tsx",
```

- [ ] **Step 2: Add a failing section-order test**

Add:

```js
test("AI-first homepage exposes identity, grounded guide, universe, and safety teaching", () => {
  const page = read("src/app/page.tsx");
  const markers = ["<Hero />", "<IdentityRail />", "<AskNitish />", "<AIUniverse />", "<FeaturedWork />", "<StartupCaseStudies />", "<AISafetyTeaching />", "<Experience />"];
  const positions = markers.map((marker) => page.indexOf(marker));
  assert.ok(positions.every((value) => value >= 0), `Missing AI-first section: ${markers.filter((_, i) => positions[i] < 0).join(", ")}`);
  for (let i = 1; i < positions.length; i++) assert.ok(positions[i - 1] < positions[i], `${markers[i - 1]} must appear before ${markers[i]}`);
});
```

- [ ] **Step 3: Add a failing teaching-claim test**

Add:

```js
test("portfolio states undergraduate AI safety teaching clearly", () => {
  const teaching = read("src/components/sections/AISafetyTeaching.tsx");
  assert.match(teaching, /undergraduate/i);
  assert.match(teaching, /jailbreak/i);
  assert.match(teaching, /AI safety/i);
  assert.match(teaching, /AI governance/i);
  assert.match(teaching, /evaluations|guardrails|oversight/i);
});
```

- [ ] **Step 4: Add a grounded-guide test**

Add:

```js
test("Ask Nitish is grounded locally and does not pretend to be an external LLM", () => {
  const guide = read("src/data/askNitish.ts");
  const section = read("src/components/sections/AskNitish.tsx");
  assert.match(guide, /findGroundedAnswer/);
  assert.match(section, /A grounded guide to my work/i);
  assert.doesNotMatch(section, /GPT|OpenAI|large language model/i);
});
```

- [ ] **Step 5: Run the focused test and confirm RED**

Run:

```bash
node --test tests/portfolio-quality.test.mjs
```

Expected: failures because the new files and section markers do not exist yet.

---

### Task 2: Add AI universe and grounded-guide data

**Files:**
- Create: `src/data/aiUniverse.ts`
- Create: `src/data/askNitish.ts`

**Interfaces:**
- Produces: `identityRail`, `aiUniverseGroups`, `teachingTopics`, `suggestedQuestions`, and `findGroundedAnswer(question: string): GroundedAnswer`.

- [ ] **Step 1: Create `aiUniverse.ts`**

Define exported arrays with these shapes:

```ts
export type IdentityItem = { title: string; description: string };
export type AIUniverseGroup = { id: string; title: string; description: string; projects: string[]; focus: string };
export type TeachingTopic = { title: string; description: string };
```

Use the required groups from the design spec and representative existing project names such as Scythe, Future OS, Scribe, Nevra, AI Browser, AppGraft, Extforge, Persona, Lunyra, Gathered, Choices, Become, Gympose/GymLens, Vakya, Slango, Circuit/AI Atlas, Harvestly, and Syrava.

- [ ] **Step 2: Create `askNitish.ts`**

Define:

```ts
export type GroundedAnswer = { title: string; body: string; links?: { label: string; href: string }[] };
export const suggestedQuestions: string[] = [...];
export function findGroundedAnswer(question: string): GroundedAnswer;
```

Use normalized lowercase token matching across intents for agents, governance, teaching, projects, Syrava, experience, writing, and hiring. Return a neutral fallback that points visitors to Projects, Experience, and Contact.

- [ ] **Step 3: Re-run the focused test**

Expected: guide-data assertions pass; section-order and section-file assertions remain red until Task 3.

---

### Task 3: Build the four AI-first sections

**Files:**
- Create: `src/components/sections/IdentityRail.tsx`
- Create: `src/components/sections/AskNitish.tsx`
- Create: `src/components/sections/AIUniverse.tsx`
- Create: `src/components/sections/AISafetyTeaching.tsx`

**Interfaces:**
- Consumes: exports from `src/data/aiUniverse.ts` and `src/data/askNitish.ts`, `Section`, `Reveal`, Framer Motion patterns, existing CSS tokens.
- Produces: default React components with no required props.

- [ ] **Step 1: Implement `IdentityRail.tsx`**

Render the four identity items as an editorial horizontal rail on desktop and a vertical list on mobile. Avoid card-heavy chrome.

- [ ] **Step 2: Implement `AskNitish.tsx`**

Use a client component with `useState`. Include:

```tsx
<label htmlFor="ask-nitish-question">Ask about my work</label>
<input id="ask-nitish-question" ... />
<button type="submit">Ask Nitish</button>
<div aria-live="polite">...</div>
```

Suggested question buttons populate and answer common recruiter questions. All answers come from `findGroundedAnswer`.

- [ ] **Step 3: Implement `AIUniverse.tsx`**

Render groups in a staggered open layout using index-aware alignment and a project-name rail. Keep a strong editorial hierarchy instead of a uniform card grid.

- [ ] **Step 4: Implement `AISafetyTeaching.tsx`**

Visible copy must include:

> I teach undergraduate sessions on AI jailbreaks, AI safety, and AI governance.

Explain evaluations, guardrails, human oversight, failure modes, and governance as the purpose.

- [ ] **Step 5: Run the focused test**

Expected: teaching and grounded-guide file assertions pass; homepage order remains red until Task 4.

---

### Task 4: Recompose the homepage and public positioning

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/data/site.ts`
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/About.tsx`

**Interfaces:**
- Consumes: new section components and existing site data.
- Produces: AI-first homepage order and updated public copy.

- [ ] **Step 1: Update `site.ts`**

Change the role list to lead with AI builder and FDE positioning. Add navigation items for AI and Safety. Update hero headline to:

```txt
I build AI systems, products, and agents that survive contact with reality.
```

Keep proof metrics unchanged.

- [ ] **Step 2: Update `Hero.tsx`**

Keep `profile.webp` exactly as the portrait source. Add one concise identity line below the supporting copy, using existing typography and tokens, not a new badge wall.

- [ ] **Step 3: Update `page.tsx`**

Compose sections in this order:

```tsx
<Hero />
<IdentityRail />
<AskNitish />
<AIUniverse />
<Skills />
<FeaturedWork />
<StartupCaseStudies />
<AISafetyTeaching />
<Experience />
<Projects />
<About />
<WhyHireMe />
<Certifications />
<Principles />
<Contact />
```

- [ ] **Step 4: Update `About.tsx`**

Add a restrained secondary paragraph that identifies Sai as a founder/product builder and writer under the Asta pen name without displacing the engineering story.

- [ ] **Step 5: Run tests and confirm GREEN**

Run:

```bash
npm test
```

Expected: all quality tests pass.

---

### Task 5: Add premium responsive styling

**Files:**
- Modify: `src/app/polish.css`

**Interfaces:**
- Consumes: class names from the four new sections.
- Produces: desktop/mobile visual system with existing theme tokens.

- [ ] **Step 1: Add identity rail styles**

Create `.identity-rail`, `.identity-rail__item`, and responsive separators using existing silver/copper token mixes.

- [ ] **Step 2: Add grounded-guide styles**

Create `.ask-nitish`, `.ask-nitish__input`, `.ask-nitish__answer`, and suggestion-button styles. Ensure focus-visible outlines are explicit.

- [ ] **Step 3: Add universe styles**

Create `.ai-universe-list`, `.ai-universe-row`, `.ai-universe-projects`, with alternating desktop offsets and no horizontal overflow on mobile.

- [ ] **Step 4: Add teaching section styles**

Use one strong split-surface composition with a copper rule and open text, not three repeated cards.

- [ ] **Step 5: Run tests again**

Run:

```bash
npm test
```

Expected: all tests pass and no visible-copy em dash regressions.

---

### Task 6: Final verification and delivery

**Files:**
- Modify only if verification finds an issue: `.github/workflows/portfolio-quality.yml`

**Interfaces:**
- Produces: evidence that the branch is buildable and reviewable.

- [ ] **Step 1: Run production build**

Run:

```bash
npm run build
```

Expected: exit code 0.

- [ ] **Step 2: Review the diff**

Confirm only intended portfolio files and design docs changed. Confirm `public/profile.webp` is untouched.

- [ ] **Step 3: Open a pull request**

Use title:

```txt
feat: turn portfolio into AI Ink Universe
```

PR body should summarize AI-first positioning, grounded Ask Nitish guide, AI Universe, undergraduate AI-safety teaching, preserved portrait/themes, and verification results.

- [ ] **Step 4: Verify CI once**

If the current workflow does not trigger for the PR base, make the smallest workflow-trigger fix needed, then run a single final CI build to conserve Actions minutes.
