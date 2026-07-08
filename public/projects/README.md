# Project screenshots

Drop a screenshot for any project here, named `<project-id>.svg` (or .jpg/.png/.webp),
then set the matching `image` field in `src/data/projects.ts`, for example:

```ts
{ id: "govseal", /* ... */ image: "/projects/govseal.svg" }
```

Project ids: fde-support-copilot, fde-data-pipeline, fde-onboarding-agent,
govseal, tracegrid.

The two FDE × AI governance projects ship with hand-built SVG snapshots
(`govseal.svg`, `tracegrid.svg`). SVGs are served through next/image via
`dangerouslyAllowSVG` in `next.config.mjs` with a locked-down CSP.

If no image is set, a tasteful generated ink placeholder is shown automatically.
