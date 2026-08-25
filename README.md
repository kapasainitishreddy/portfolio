# Sai Nitish Reddy Kapa — Portfolio

An interactive, Suminagashi-inspired portfolio for communications, AI governance,
research, digital publishing, and data work. Built with Next.js, TypeScript,
Tailwind CSS, Framer Motion, and a custom GLSL ink engine running on React Three
Fiber.

> Ideas move like ink. Systems give them form.

## Highlights

- **Living ink background** — a WebGL fragment shader renders marbled, veined
  Suminagashi ink that flows slowly, reacts to the pointer, ripples on click,
  intensifies while scrolling, and calms when you stop. It reshapes per project.
- **Performance-aware** — the heavy WebGL bundle is dynamically imported, shader
  resolution scales to the device, the render loop pauses when the tab is hidden,
  and a pure-CSS static artwork is shown if WebGL is unavailable.
- **Accessible by design** — full keyboard navigation, visible focus states, ARIA
  labels, a pause/intensity control for the ink, and complete
  `prefers-reduced-motion` fallbacks. No information is conveyed by animation alone.
- **Editable from data files** — visitor-facing positioning, projects, skills,
  experience, and links live in `src/data`.
- **Release surfaces included** — SEO + Open Graph + JSON-LD structured data,
  favicon/social image, sitemap, robots, privacy/terms pages, a custom 404, error
  boundaries, and a guarded contact endpoint.
- **Private portfolio guide** — “Ask Nitish” uses portfolio-only public knowledge.
  The release configuration is deterministic-only: cloud/on-device LLM providers
  and voice input are disabled on this site.

## Themes

Visitors can switch between three living backgrounds from the navigation (the
choice is remembered in `localStorage`). Each theme also gives sections its own
reveal animation:

- **Suminagashi (Ink)** — the WebGL marbled-ink engine. The ink drags and swirls
  around the cursor with a luminous wake, ripples on click, and intensifies on
  scroll. Sections fade up.
- **Shodō (Calligraphy)** — the cursor becomes a sumi brush painting tapered,
  speed-sensitive strokes that dry and fade. When idle, a ghost brush paints a
  demonstration stroke with a directional arrow. A floating draw pad lets a
  visitor paint their own ink on rice paper. Sections bleed in like ink on paper.
- **Bushidō (Samurai)** — a dark dojo where every click unsheathes a katana slash
  with a burst of sparks and drifting dust. Sections are sliced open along a blade
  line as they enter view.

All three keep a high-contrast canvas so text stays readable, ship a static
fallback, and respect `prefers-reduced-motion`.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion |
| Graphics | React Three Fiber + Three.js + GLSL |
| Fonts | Newsreader, Inter, JetBrains Mono |

## Local setup

```bash
npm install
npm run dev
```

For a release candidate, use the explicit gates:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

Node 18.18+ is required by this Next.js line; Node 20 or 22 is recommended.

## Project structure

```text
src/
├── app/                  # routes, metadata, sitemap, robots, legal/error pages
│   ├── api/contact/      # bounded, rate-limited contact endpoint
│   ├── layout.tsx        # fonts, SEO, structured data, providers
│   └── page.tsx          # homepage composition
├── components/
│   ├── ink/              # WebGL ink engine + fallbacks
│   ├── layout/           # navigation, footer, loader, reveal, section, icons
│   ├── sections/         # hero, about, skills, projects, experience, contact
│   ├── skills/           # interactive skills network
│   ├── projects/         # cards and case-study presentation
│   └── contact/          # contact form
├── data/                 # visitor-facing copy and portfolio data
└── lib/                  # accessibility, animation, performance, security helpers
```

## Customizing content

| To change… | Edit |
| --- | --- |
| Name, tagline, email, hero/about | `src/data/site.ts` |
| Social links | `socials` in `src/data/site.ts` |
| Projects / case studies | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Experience | `src/data/experience.ts` |
| Currently-building phases | `src/data/building.ts` |

### Résumé

`public/resume.pdf` is the asset used by the Résumé actions. Replace it only with
the exact release résumé you intend to publish, then verify the PDF in the deployed
site before release.

### Project screenshots

Put an image at `public/projects/<project-id>.jpg` and set the matching `image`
field in `src/data/projects.ts`. See `public/projects/README.md`.

## Contact form

The contact endpoint intentionally **fails closed** when email delivery is not
configured. A production deployment must set:

```text
RESEND_API_KEY=...
CONTACT_FROM_EMAIL=...
CONTACT_TO_EMAIL=...
```

The server validates an allowlisted contact reason, bounds the JSON request body,
limits field sizes, rejects cross-site browser submissions, applies temporary
request throttling, and keeps visitor message contents out of security logs. A
hidden honeypot and submit-timing signal provide additional low-cost spam
filtering. Provider failures return an error instead of showing a false success.

## Portfolio guide

The site mounts the shared Syrava assistant UI from
`https://syrava.com/assistant/v1/widget.js`, but this portfolio’s
`public/assistant/site.json` disables Chrome/Puter LLM providers and voice input.
Questions are matched against `public/assistant/knowledge.json`, and unsupported
questions fall back to the configured unknown answer rather than being invented.

## Accessibility & motion

- A wave control in navigation lets visitors tune or pause the visual ink effect.
- `prefers-reduced-motion` gets static/fallback visual behavior.
- Interactive controls are intended to be keyboard reachable with visible focus.
- Release acceptance still requires an actual desktop/mobile keyboard and
  reduced-motion browser pass.

## Privacy

Analytics are disabled by default. Browsing requires no account. Contact-form data
is processed only when a visitor chooses to submit it, and the privacy page
explains the deployment/email/assistant boundaries. See `/privacy` in the site.

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md). The canonical site URL and email-delivery
secrets are deployment requirements, not optional release polish.

## License

Personal portfolio. Content © Sai Nitish Reddy Kapa. Code is free to learn from.
