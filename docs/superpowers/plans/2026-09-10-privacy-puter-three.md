# Privacy First Puter and Three.js Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public portfolio privacy-first by anonymizing employers except Outlier AI, hiding named/public project exposure, and using Puter.js plus Three.js as the primary interactive layers while preserving semantic HTML, accessibility, and recruiter readability.

**Architecture:** Keep factual text in normal React/HTML. Replace named project/public-repo surfaces with a single private-builds narrative and anonymize role data at the source. Extend Ask Sai so Puter never reveals hidden employer or product identities. Add a lightweight React Three Fiber atmosphere to the shared Section component so major portfolio sections receive a consistent 3D depth layer without moving core content into WebGL.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, Puter.js browser SDK, Three.js, @react-three/fiber.

**Spec:** User-approved chat design from September 10, 2026.

## Global Constraints

- Employer names must not appear in current public portfolio source or rendered copy except `Outlier AI`.
- Do not show named public GitHub projects, repository links, or product names in the portfolio.
- Private product work may be described only at a high level as private while scaling.
- Preserve documented measurable outcomes where they do not reveal protected identities.
- Puter.js remains grounded only in rendered public portfolio context and must refuse hidden identities.
- Three.js is visual enhancement only. Text, navigation, forms, and links remain semantic HTML.
- Respect `prefers-reduced-motion`, mobile performance, and WebGL failure fallback.
- No em dashes in visible copy.

---

### Task 1: Privacy regressions
- [ ] Write failing tests for employer anonymization, private-build positioning, Puter privacy rules, and shared Three.js atmosphere.
- [ ] Run `npm test` and confirm RED.

### Task 2: Anonymize experience and case studies
- [ ] Modify `src/data/experience.ts`, `src/data/roleCaseStudies.ts`, and recruiter-facing copy in `src/data/site.ts`.
- [ ] Preserve only documented metrics and keep `Outlier AI` named.

### Task 3: Replace public project exposure
- [ ] Create `src/components/sections/PrivateBuilds.tsx`.
- [ ] Replace public GitHub project rendering in `src/app/page.tsx`.
- [ ] Rename navigation to `Private builds`.
- [ ] Remove current public project data/component files from the tree.

### Task 4: Deepen Puter.js privacy-aware interaction
- [ ] Replace Projects mode with Private systems mode.
- [ ] Add explicit hidden-identity, repo, and product-internals refusal rules to the Puter system prompt.
- [ ] Update local fallback copy to match.

### Task 5: Shared Three.js section atmosphere
- [ ] Create `src/components/three/SectionAtmosphere.tsx`.
- [ ] Load it client-side from the shared `Section` wrapper.
- [ ] Respect reduced motion and WebGL failure fallback.

### Task 6: Verify, merge, deploy
- [ ] Run full tests and static production build on the exact final PR head.
- [ ] Review current tree for forbidden names and repo URLs.
- [ ] Merge only when green and verify GitHub Pages on the exact merge commit.
