# Engineer + Writer Portfolio Redesign

## Purpose

Rework the existing portfolio so it is easier to navigate, more legible, more personal, and more credible as both an engineering portfolio and a writing portfolio. The redesign keeps the existing dark ink/editorial identity while removing confusing placeholder visuals and reducing the feeling of an endless resume page.

## User-facing goals

1. The first viewport communicates the identity line exactly as **“Engineer with heart of a Writer.”**
2. The hero portrait always renders on GitHub Pages and has a graceful fallback if the asset fails.
3. Desktop visitors can jump between sections without scrolling back to the top.
4. Mobile visitors retain a compact navigation experience without losing content width.
5. The first three Forward Deployed case studies use understandable product/system previews instead of abstract network/stream placeholders.
6. Writing is a first-class portfolio pillar through a dedicated Novels section.
7. The homepage is shorter and more intentional, while deeper proof remains available through interactive sections and project modals.
8. Existing themes, dark/light mode, accessibility, reduced motion, resume links, and static GitHub Pages export continue to work.

## Information architecture

Homepage order:

1. Hero
2. Identity rail
3. Proof lens
4. Featured work
5. Novels
6. AI universe
7. AI safety + teaching
8. Experience
9. About
10. Contact

Sections removed from the primary homepage flow, without deleting their components/data: CrossFunctional, AskNitish, StartupCaseStudies, Skills, Projects, WhyHireMe, Certifications, Principles. Their content can be reintroduced later on dedicated pages if desired.

## Navigation

### Desktop

At `min-width: 1100px`, replace the centered top navbar with a fixed left rail about 96px wide.

The rail contains:

- compact profile mark / name
- Home
- AI
- Case studies
- Novels
- Safety
- Experience
- About
- Contact
- Résumé
- theme and mode controls in a compact utility area
- an active-section indicator driven by IntersectionObserver
- a vertical scroll-progress track
- a Back to top action when the visitor has scrolled beyond the hero

The main content and footer shift right so nothing is hidden behind the rail.

### Mobile / tablet

Keep a compact sticky top bar with profile, name, theme controls, resume, and menu button. The menu opens a full-screen sheet with the same destinations, including Novels.

## Hero

### Copy

Headline, exact:

> Engineer with heart of a Writer.

Supporting sentence:

> I build AI systems, products, and agents, and write stories about the people technology is supposed to serve.

Identity line:

> Forward Deployed Engineer · Applied AI · Product Builder · Writer

Status line remains focused on Forward Deployed, Applied AI, Solutions, and AI Governance roles.

### Portrait

Use `/profile.webp` through a deterministic GitHub Pages-safe URL helper and render it with a plain `<img>` so static-export path handling is explicit. The frame includes an initial/name fallback underneath the image that becomes visible if loading fails. The portrait frame remains editorial rather than dashboard-like.

### Visual hierarchy

The hero uses fewer pills and less competing UI than the current version. One primary action goes to flagship work, one secondary action goes to Novels, and a third text action can go to Contact. Existing proof metrics remain below the portrait as compact evidence, not as the hero’s primary focal point.

## Featured work previews

For the first three Forward Deployed projects, render a purpose-built preview component keyed by project id:

- `fde-support-copilot`: support chat with grounded answer/citation and human escalation affordance.
- `fde-data-pipeline`: data sources → transform → validate → dashboard flow with status checks.
- `fde-onboarding-agent`: onboarding checklist with agent guidance and human approval handoff.

All other projects continue to use their configured image or the generic placeholder fallback.

The previews must be code-native, responsive, understandable without reading the card title, and decorative text must remain legible at card scale.

## Novels

Create `src/data/novels.ts` and `src/components/sections/Novels.tsx`.

Initial highlighted titles:

- Still Figuring It Out
- Bare Minimum
- You Always Come Back
- REGRET
- The Cat Who Stayed
- Wolf One: Red Monsoon

Each entry includes title, short one-line premise, genre/tone, accent label, and optional external link. Do not fabricate publication status, ISBNs, sales, reviews, or release dates.

The section should feel literary rather than like another app-card grid: horizontal shelf on desktop, snap scrolling on smaller screens, large typography, restrained cover-like art built from gradients/typography rather than fake cover images.

## Visual system

Preserve:

- dark blue-black / ink background
- rice/ivory text
- copper accent
- serif display typography
- mono labels
- subtle Suminagashi / ink theme behavior

Improve:

- max readable line lengths
- section rhythm and whitespace
- smaller first-viewport heading on laptop screens to avoid clipping
- stronger focus-visible states
- clearer selected and hover states
- reduced nested-card framing
- predictable content gutters

No new dependencies are required.

## Accessibility

- Semantic nav and section anchors.
- `aria-current="location"` for the active desktop rail item.
- Focus-visible states for all navigation and interactive controls.
- Mobile menu remains keyboard operable.
- The active-section observer is progressive enhancement only; anchor links work without it.
- Portrait fallback communicates the user’s name without relying on the image.
- Motion continues to respect the existing reduced-motion hook and browser preference.

## Static export / deployment

The implementation must pass the existing `Portfolio quality` workflow on a pull request to `main`, which runs `npm test` and a static production build with:

- `STATIC_EXPORT=true`
- `NEXT_PUBLIC_STATIC_EXPORT=true`
- `NEXT_PUBLIC_SITE_URL=https://kapasainitishreddy.github.io/portfolio`

Asset URLs must work at the `/portfolio` base path.

## Acceptance criteria

- Desktop shows a fixed left navigation rail and active-section feedback.
- Mobile shows the compact top navigation and menu.
- `Novels` appears in navigation and as a visible homepage section.
- The exact hero headline is present.
- The portrait has explicit error fallback and uses a deterministic base-path-safe source.
- The first three featured case-study cards no longer show abstract network/stream placeholder art.
- No horizontal overflow is introduced at 360px viewport width.
- Keyboard focus is visible across nav, tabs, and primary CTAs.
- Existing tests pass.
- Static GitHub Pages production build succeeds.
