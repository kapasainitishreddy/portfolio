/**
 * Central site configuration.
 * Edit names, links, navigation and hero copy here. Nothing else needs to change.
 */

export const site = {
  name: "Sai Nitish Reddy Kapa",
  shortName: "Sai Nitish",
  initials: "SK",
  roles: [
    "Forward Deployed Engineer",
    "AI Governance Engineer",
    "Solutions & Deployment Engineer",
    "Embedded Technical Partner",
  ],
  tagline: "I embed with teams to ship AI systems that actually work in the real world",
  email: "kapasainitishreddy@gmail.com",
  location: "United States · Remote-first",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Sai Nitish Reddy Kapa is a Forward Deployed Engineer who embeds with teams to design, integrate, and safely deploy AI systems in production — pairing hands-on delivery with responsible AI governance.",
  resumeUrl: "/resume.pdf",
} as const;

export const socials = {
  github: "https://github.com/kapasainitishreddy",
  linkedin: "https://www.linkedin.com/in/kapasainitishreddy",
  email: `mailto:${site.email}`,
} as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#skills" },
  { label: "Case Studies", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  headline: "I embed with teams to ship AI systems that work in the real world.",
  supporting: [
    "I'm Sai Nitish Reddy Kapa, a Forward Deployed Engineer. I sit with founders and product teams, learn their domain firsthand, and turn messy real-world requirements into deployed, reliable AI software.",
    "I'm FDE-certified through Educative and currently completing an AI Governance certification — so the systems I ship don't just work, they stay monitored, explainable, and accountable after launch.",
  ],
  status: "Open to Forward Deployed Engineer & AI governance roles",
  actions: [
    { label: "View FDE Case Studies", href: "#projects", kind: "primary" as const },
    { label: "Read My Experience", href: "#experience", kind: "ghost" as const },
    { label: "Let's Talk", href: "#contact", kind: "ghost" as const },
  ],
} as const;

export const about = {
  heading: "A Forward Deployed Engineer turns a customer's problem into shipped software.",
  paragraphs: [
    "Forward deployed work means going to where the problem actually lives. I embed with a team, learn their domain and constraints firsthand, prototype against real data, and iterate in tight loops until the system is running in production and creating value.",
    "My work spans integration engineering, data pipelines, LLM and agent orchestration, internal tooling, and the glue code that makes AI dependable in the messy conditions of a live business. I move between writing code, talking to stakeholders, and debugging in production without losing the thread.",
    "I pair that delivery focus with responsible AI governance — evaluations, human-in-the-loop review, monitoring, and clear documentation — so the systems I deploy stay explainable, safe, and accountable long after the first launch.",
  ],
  keywords: [
    { word: "Embed", note: "Sit with the customer, learn the domain, build against real workflows." },
    { word: "Ship", note: "Prototype fast, integrate deeply, get systems running in production." },
    { word: "Iterate", note: "Tight feedback loops with real users until the system truly works." },
    { word: "Govern", note: "Evaluations, monitoring, and human oversight so deployed AI stays accountable." },
  ],
} as const;

export const principles = {
  heading: "How I approach forward deployed engineering.",
  items: [
    {
      title: "Go to where the problem is",
      body: "Embed with the team, watch the real workflow, and build against actual data and constraints instead of a spec written from a distance.",
    },
    {
      title: "Ship the thinnest thing that works",
      body: "Get a working slice into production early, learn from real usage, and expand from evidence rather than assumptions.",
    },
    {
      title: "Integrate deeply, not around",
      body: "Wire into the customer's real systems — data sources, auth, tools, and workflows — so the solution survives contact with production.",
    },
    {
      title: "Keep a human in the loop",
      body: "Design approvals, review steps, and fallbacks so AI accelerates people without ever removing accountability.",
    },
    {
      title: "Govern what you deploy",
      body: "Add evaluations, monitoring, logging, and documentation so a shipped system stays explainable, safe, and auditable.",
    },
  ],
} as const;

export const contact = {
  heading: "Let's talk — I'm making a point of talking to more people.",
  supporting:
    "I'm actively looking for Forward Deployed Engineer and AI governance work, and I'm deliberately reaching out to more people to sharpen my communication skills. If you're building something hard, I'd genuinely love a conversation — even just to compare notes.",
  reasons: [
    "Forward Deployed Engineer role",
    "AI governance or responsible-AI collaboration",
    "Freelance / embedded engineering engagement",
    "Just want to connect and talk shop",
    "Other",
  ],
} as const;

export const footer = {
  signature: "Designed and built by Sai Nitish Reddy Kapa",
  motto: "Embed. Ship. Govern.",
} as const;
