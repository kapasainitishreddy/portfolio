# Portfolio Polish and Ink Engines Design

## Goal

Make the portfolio recruiter-first while preserving the Japanese visual identity. The site must explain what Sai can do within the first screen, show proof before breadth, use tighter spacing, remove em dashes from visible copy, and make Suminagashi, Shodo, and Bushido unmistakably different.

## Recruiter flow

1. Hero: one-line value proposition, explicit capability statement, proof metrics, primary work and experience actions.
2. What I can do: four concrete capability cards for discovery, AI workflows, integration, and evaluation/governance.
3. Featured work: the three strongest forward-deployed case studies with outcome metrics.
4. Experience: real roles with evidence bullets and measurable outcomes.
5. Project library: broader AI, data, integration, and governance work.
6. About, why hire me, credentials, principles, contact.

The homepage must not use a blocking intro loader.

## Visual systems

### Suminagashi

Use the user's supplied browser fluid implementation as the foundation. Preserve the Kelvin/Jaffer-style radial drop warp, delayed water drop that opens a blot into a ring, stable-fluid velocity projection, vorticity, MacCormack dye advection, slow ambient wind, pointer stirring, and washi paper absorption. The user interface remains minimal: click/tap adds ink and drag stirs the surface.

### Shodo

Use a 2D canvas brush model, not the fluid engine. Pointer pressure and velocity control width. Layer multiple bristle tracks, feathered wet edges, dry-brush gaps, slow-motion pooling, turn/speed splatter, and tapered endings. Idle demonstration strokes begin only after a quiet period. No arrowheads.

### Bushido

Use a 2D event-driven canvas. The scene is mostly still. Pointer-down and pointer-up define slash direction. A slash has a thin blade core, restrained red afterimage, short spark burst, and a faint retained scar. Automatic cuts are rare. Dust is subtle.

## Theme separation

ThemedBackground selects one engine. Each theme gets an independent overlay treatment instead of sharing the same ink veil:

- Suminagashi: paper/water readability veil
- Shodo: transparent washi veil
- Bushido: directional dojo vignette

## Performance and accessibility

- Dynamically load the heavy Suminagashi engine.
- Scale fluid resolution for mobile.
- Pause animation when the document is hidden.
- Respect prefers-reduced-motion with static or greatly reduced visual treatment.
- Keep navigation, contact, project modals, and resume links keyboard accessible.

## Copy and spacing

- No em dash in visible portfolio copy.
- Sections use tighter vertical spacing.
- Long explanatory paragraphs become short, evidence-led statements.
- Decorative controls do not compete with recruiter content.
