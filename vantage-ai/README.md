# Vantage AI — Personal Portfolio & Achievement Dashboard

A six-page personal portfolio and achievement dashboard. Pure HTML, CSS, and vanilla JavaScript — no external images, no build step, no dependencies.

## What's inside

- **6 pages**: Home, Portfolio, Skills, Timeline, Blog, Contact.
- **Custom cursor**: dot + trailing ring with hover state on interactive elements.
- **Light/dark mode toggle** with persisted preference.
- **3D card hover effects** (perspective tilt toward cursor).
- **Scroll reveal animations** on every section, plus a progressive timeline.
- **Animated statistics counter** that runs once when in view.
- **Skills radar chart** with the hover-layering fix (per-vertex draw order + larger hit areas).
- **Blog cards** with hover lift and pure-SVG cover art.
- **Contact form** with client-side validation.

## Run locally

This is a static site — open it directly:

```bash
# Option A: just open the file
open vantage-ai/index.html

# Option B: serve it (recommended; some browsers restrict file:// CORS)
cd vantage-ai && python3 -m http.server 8080
# then visit http://localhost:8080
```

No `npm install`, no build step, no framework runtime.

## File layout

```
vantage-ai/
├── index.html                  # Home / hero / stats / system overview
├── README.md
├── pages/
│   ├── portfolio.html          # Project gallery
│   ├── skills.html             # Radar chart
│   ├── timeline.html           # Career arc with progressive reveal
│   ├── blog.html               # Blog cards
│   └── contact.html            # Functional contact form
└── assets/
    ├── css/style.css           # All design tokens + components
    ├── js/app.js               # Cursor, theme, reveal, stats, tilt, radar, form
    └── data/skills.json        # Radar data (also inlined in skills.html)
```

## Tech notes

- **Radar hover fix**: vertices are appended to the SVG *after* the data polygon (so they sit visually on top), and each vertex has a transparent larger hit-area circle appended last (so pointer events are reliable even with overlapping vertices).
- **Custom cursor**: disabled on touch devices (`@media (hover: none)`) — never trap touch users.
- **Reduced motion**: respected via `prefers-reduced-motion`; animations short-circuit, reveals happen instantly.
- **Theme persistence**: stored in `localStorage` under `vantage-theme`. Defaults to `prefers-color-scheme`.
- **No external assets**: icons are inline SVG, cover art is inline SVG, the favicon is a `data:` URL.

## Browser support

Targets evergreen Chromium, Firefox, and Safari. Uses:

- CSS `color-mix()`, `:has()`, custom properties
- `backdrop-filter`
- `IntersectionObserver`
- `matchMedia` with `prefers-color-scheme` and `prefers-reduced-motion`

Gracefully degrades in older browsers — most notably the radar chart falls back to a static SVG and the custom cursor falls back to the system cursor.
