# Data Analysis Case Studies (standalone)

A fully self-contained, single-file portfolio site with four **sample /
illustrative** data-analysis case studies — SaaS retention, marketing channel
efficiency, warehouse delay root-cause, and bike-share demand patterns. Built
to demonstrate analytical technique (SQL/Python/dashboard framing, chart
craft, and clear findings → recommendations), not tied to a real employer or
client.

Every chart is hand-built inline SVG (no charting library, no CDN
dependency): fixed categorical colors per entity, hairline gridlines,
rounded-end bars, direct end-labels, hover tooltips, and a "View data table"
toggle on every chart for an accessible, non-visual fallback.

## Run it

No build step, no dependencies. Open `index.html` directly in a browser, or
serve the folder statically:

```
npx serve .
```

## Editing

Each case study is its own `<section class="case">` in `index.html`, with the
chart data defined as plain JS objects/arrays right above where each chart is
rendered (search for `Chart 1a`, `Chart 2a`, etc.). Swap in new numbers and
the charts, tables, and tooltips redraw automatically on load.
