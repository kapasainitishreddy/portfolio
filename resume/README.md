# Résumé source

Two résumé variants live here. `public/resume.pdf` (linked from the site via
`site.resumeUrl`) is currently generated from **`resume-ats.html`**, the
ATS-optimized version.

## `resume-ats.html` — ATS-friendly (currently live at /resume.pdf)

Single-column, plain-text-forward layout designed to parse cleanly through
resume-screening tools (verified against
[interviewstreet/hiring-agent](https://github.com/interviewstreet/hiring-agent)'s
expected section structure — Basics, Work, Education, Skills, Projects,
Awards — and by round-tripping the generated PDF through `pdf-parse` to
confirm every section, the email, and the portfolio link extract as clean
text in reading order).

Design choices for parseability:
- Single column — no tables, columns, or text boxes that scramble reading order
- Standard section headers: Summary, Skills, Experience, Projects,
  Certifications, Education
- Contact line (email, location, LinkedIn, GitHub, portfolio) as plain text,
  not inside a graphic or icon-only row
- No decorative images/SVGs carrying content — text is always real, selectable text
- Reverse-chronological experience with consistent date formatting

Includes all experience, all 9 projects (6 public technical projects + 3
NDA'd FDE case studies folded into Experience), certifications, and
education (M.S. Data Science — University at Buffalo; B.Tech ECE — IIIT
Trichy).

## `resume.html` — Designed/visual version

Print-styled, two-column Letter-size document (Forward Deployed Engineer
focus, including the "How I Approach Every Problem" methodology). Better for
a human reader (e.g. a portfolio download button) than for ATS parsing —
two-column layouts commonly scramble reading order in resume parsers.

## Regenerate a PDF

Render either HTML file to PDF with headless Chromium:

```js
import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage();
await p.goto("file://" + process.cwd() + "/resume/resume-ats.html", { waitUntil: "networkidle" });
await p.pdf({ path: "public/resume.pdf", format: "Letter", printBackground: true, preferCSSPageSize: true });
await b.close();
```

Edit the `.html` file, re-run, and commit both files together. To verify the
result still parses as clean text (not a rasterized image), extract it with
`pdf-parse` and confirm the email, portfolio link, and section headers all
come back as plain text.
