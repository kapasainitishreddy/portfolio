# Sai Nitish Reddy Kapa — Portfolio

An interactive, Suminagashi-inspired portfolio that feels like a calm pool of
flowing ink. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion and a
custom GLSL ink engine running on React Three Fiber.

> Ideas move like ink. Systems give them form.

## Highlights

- **Living ink background** — a WebGL fragment shader renders marbled, veined
  Suminagashi ink that flows slowly, reacts to the pointer, ripples on click,
  intensifies while scrolling and calms when you stop. It reshapes per project.
- **Performance-aware** — the heavy WebGL bundle is dynamically imported, shader
  resolution scales to the device, the render loop pauses when the tab is hidden,
  and a pure-CSS static artwork is shown if WebGL is unavailable.
- **Accessible by design** — full keyboard navigation, visible focus states, ARIA
  labels, a pause/intensity control for the ink, and complete `prefers-reduced-motion`
  fallbacks. No information is conveyed by animation alone.
- **Editable from data files** — all copy, projects, skills, experience and links
  live in `src/data`.
- **Production ready** — SEO + Open Graph + JSON-LD structured data, generated
  favicon and social image, sitemap, robots, legal pages, a dispersed-ink 404 page,
  and error boundaries.

## Themes

Visitors can switch between three living backgrounds from the navigation (the
choice is remembered in `localStorage`). Each theme also gives sections their own
reveal animation:

- **Suminagashi (Ink)** — the WebGL marbled-ink engine. The ink now drags and
  swirls around the cursor with a luminous wake, ripples on click and intensifies
  on scroll. Sections fade up.
- **Shodō (Calligraphy)** — your cursor becomes a sumi brush painting tapered,
  speed-sensitive strokes that dry and fade. When idle, a ghost brush paints a
  demonstration stroke with a directional arrow. A floating **draw pad** lets any
  visitor paint their own ink on rice paper. Sections bleed in like ink on paper.
- **Bushidō (Samurai)** — a dark dojo where every click unsheathes a katana slash
  with a burst of sparks and drifting dust. Sections are sliced open along a blade
  line as they enter view.

All three keep a dark, high-contrast canvas so text stays readable, ship a static
fallback, and fully respect `prefers-reduced-motion`.

## Tech stack

| Area        | Choice                                   |
| ----------- | ---------------------------------------- |
| Framework   | Next.js (App Router)                     |
| Language    | TypeScript                               |
| Styling     | Tailwind CSS v4                          |
| Motion      | Framer Motion                            |
| Graphics    | React Three Fiber + Three.js + GLSL      |
| Fonts       | Newsreader, Inter, JetBrains Mono        |

## Local setup

```bash
# 1. install dependencies
npm install

# 2. (optional) configure environment
cp .env.example .env.local

# 3. start the dev server
npm run dev
# open http://localhost:3000

# production build / preview
npm run build
npm run start
```

Node 18.18+ (Node 20 or 22 recommended).

## Project structure

```
src/
├── app/                  # routes, metadata, sitemap, robots, icon, og image, 404
│   ├── layout.tsx        # fonts, SEO, structured data, providers
│   ├── page.tsx          # the homepage (assembles all sections)
│   ├── not-found.tsx     # dispersed-ink 404
│   └── globals.css       # design tokens + ink styles
├── components/
│   ├── ink/              # WebGL ink engine, shader, provider, control, fallbacks
│   ├── layout/           # navigation, footer, loader, reveal, section, icons
│   ├── sections/         # hero, about, skills, projects, building, experience…
│   ├── skills/           # interactive skills network graph
│   ├── projects/         # cards, case-study modal, generated placeholders
├── data/                 # ← EDIT EVERYTHING HERE
│   ├── site.ts           # name, links, nav, hero/about/principles/contact copy
│   ├── projects.ts       # project case studies + filter tags
│   ├── skills.ts         # skill groups for the network graph
│   ├── experience.ts     # experience timeline
│   └── building.ts       # "currently building" phases
└── lib/                  # accessibility, animation and performance helpers
```

## Customizing the content

Everything visitor-facing lives in `src/data`. You rarely need to touch components.

| To change…                       | Edit                                            |
| -------------------------------- | ----------------------------------------------- |
| Name, tagline, email, hero/about | `src/data/site.ts`                              |
| Social links                     | `socials` in `src/data/site.ts`                 |
| Projects / case studies          | `src/data/projects.ts`                          |
| Skills in the network graph      | `src/data/skills.ts`                            |
| Experience timeline              | `src/data/experience.ts`                        |
| "Currently building" phases      | `src/data/building.ts`                          |
| Principles                       | `principles` in `src/data/site.ts`              |

### Résumé

Replace `public/resume.pdf` with your real résumé. The "Résumé" buttons point at
`/resume.pdf` (configurable via `site.resumeUrl`).

### Project screenshots

Drop an image at `public/projects/<project-id>.jpg` and set the matching `image`
field in `src/data/projects.ts`. Without an image, a tasteful generated ink
placeholder is shown. See `public/projects/README.md`.

### Biography & social profiles

Edit `site` and `socials` in `src/data/site.ts`. The GitHub and LinkedIn URLs are
placeholders pointing at `kapasainitishreddy` — update them to your real handles.

### Favicon & social-preview image

Both are generated from the initials "SK" in `src/app/icon.tsx` and
`src/app/opengraph-image.tsx`. Edit those files (colors, text) to restyle them, or
replace with static files (`app/icon.png`, `app/opengraph-image.png`).

## Accessibility & motion

- A wave icon in the navigation opens an **ink control**: a slider to set ink
  intensity and a button to fully pause the animation.
- Visitors with `prefers-reduced-motion` get the static ink artwork and no
  scroll/loader animations automatically.
- All interactive elements are keyboard reachable with visible focus rings.

## Privacy note

The current portfolio is static and does not include visitor accounts, analytics
scripts, or contact-form collection.

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for step-by-step Vercel and Netlify
instructions.

## License

Personal portfolio. Content © Sai Nitish Reddy Kapa. Code is free to learn from.
