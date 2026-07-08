# Projects Showcase (standalone)

A fully self-contained, single-file portfolio site — every project I've built
or prototyped, with **no résumé and no experience/employment section**. Just
the work.

## Run it

No build step, no dependencies. Open `index.html` directly in a browser, or
serve the folder statically:

```
npx serve .
```

## Structure

- `index.html` — the entire site (markup, styles, and vanilla JS inline)
- `assets/` — snapshot images for the two AI governance projects (GovSeal,
  TraceGrid); every other project renders a generated placeholder

## Editing

All 26 projects live in the `PROJECTS` array near the top of the `<script>`
block in `index.html`. Add an object with the same shape (id, name, category,
status, tags, summary, problem, solution, role, features, technologies, and
optionally image/note/comingSoon) and it appears in the grid and filters
automatically.
