# Résumé source

`resume.html` is the source of truth for the downloadable résumé served at
`/resume.pdf` (linked from the site via `site.resumeUrl`).

It is a print-styled, Letter-size HTML document (Forward Deployed Engineer
focus, including the "How I Approach Every Problem" methodology, anonymized
FDE case studies with proof metrics, and the FDE × AI governance projects).

## Regenerate the PDF

Render the HTML to `public/resume.pdf` with headless Chromium:

```js
import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage();
await p.goto("file://" + process.cwd() + "/resume/resume.html", { waitUntil: "networkidle" });
await p.pdf({ path: "public/resume.pdf", format: "Letter", printBackground: true, preferCSSPageSize: true });
await b.close();
```

Edit `resume.html`, re-run, and commit both files together.
