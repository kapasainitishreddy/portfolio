/** Central site configuration and recruiter-facing copy. */
export const site = {
  name: "Sai Nitish Reddy Kapa",
  shortName: "Sai Nitish",
  initials: "SK",
  roles: ["Forward Deployed Engineer", "Applied AI Engineer", "AI Governance Engineer", "Founder / Product Builder", "Writer"],
  tagline: "Engineer with heart of a Writer.",
  email: "kapasainitishreddy@gmail.com",
  location: "United States · Remote-first",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Sai Nitish Reddy Kapa is an engineer and writer building AI systems, products, agents, integrations, and safer AI workflows, while writing fiction under the Asta pen name.",
  resumeUrl: "/resume.pdf",
} as const;

export const socials = {
  github: "https://github.com/kapasainitishreddy",
  linkedin: "https://www.linkedin.com/in/kapasainitishreddy",
  email: `mailto:${site.email}`,
} as const;

export const navItems = [
  { label: "AI", href: "#ai-universe" },
  { label: "Case studies", href: "#featured-work" },
  { label: "Novels", href: "#novels" },
  { label: "Safety", href: "#ai-safety" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  headline: "Engineer with heart of a Writer.",
  supporting:
    "I build AI systems, products, and agents, and write stories about the people technology is supposed to serve.",
  identity: "Forward Deployed Engineer · Applied AI · Product Builder · Writer",
  status: "Open to Forward Deployed, Applied AI, Solutions, and AI Governance roles",
  capabilities: ["Agentic AI", "Product systems", "Data + API integration", "AI safety + governance"],
  proof: [
    { value: "~60%", label: "faster first response", detail: "AI support copilot workflow" },
    { value: "~20 hrs", label: "manual work removed weekly", detail: "production data pipeline" },
    { value: "1,800+", label: "LLM outputs evaluated", detail: "quality and safety review" },
    { value: "99.5%", label: "pipeline uptime", detail: "production operations workflow" },
  ],
  actions: [
    { label: "See how I build", href: "#featured-work", kind: "primary" as const },
    { label: "Read my novels", href: "#novels", kind: "ghost" as const },
    { label: "Contact me", href: "#contact", kind: "ghost" as const },
  ],
} as const;

export const about = {
  heading: "I work where product ambiguity meets production reality.",
  paragraphs: [
    "I am most useful when the problem is not fully specified yet. I can sit with a team, map the real workflow, turn unclear requirements into a working system, and keep iterating until the result survives real usage.",
    "My strongest engineering work combines Python and data engineering with LLM workflows, APIs, internal tools, testing, observability, human review, and AI governance. I care about the last mile: integration, failure handling, documentation, and whether the team can run the system after handoff.",
    "Working across recruiting, support, CX, operations, data, and engineering taught me something useful: the expensive problem is often sitting between teams, not inside one job description. AI helps me learn unfamiliar workflows faster, but I still measure the work by whether people trust and use what ships.",
    "I also build products through the Syrava ecosystem and write fiction under the Asta pen name. Product building keeps me close to real user friction, while long-form writing sharpens how I think about people, incentives, ambiguity, and communication.",
  ],
  keywords: [
    { word: "Discover", note: "Understand the workflow, constraints, users, and success criteria." },
    { word: "Build", note: "Turn the highest-value slice into working software quickly." },
    { word: "Integrate", note: "Connect data, APIs, auth, tools, and the real operating environment." },
    { word: "Prove", note: "Measure behavior, handle failures, document decisions, and keep humans in control." },
  ],
} as const;

export const principles = {
  heading: "How I work when the problem is still taking shape.",
  items: [
    { title: "Start with the workflow", body: "Watch how the work happens today, find the expensive friction, and define a measurable target before expanding scope." },
    { title: "Ship a working slice", body: "Build the smallest useful end-to-end path, put it in front of real users, and learn from evidence instead of a long speculative roadmap." },
    { title: "Integrate with reality", body: "Treat data quality, auth, APIs, permissions, latency, failure modes, and human handoffs as product requirements rather than cleanup work." },
    { title: "Make quality inspectable", body: "Use evaluations, logs, review points, tests, and runbooks so teams can see what the system did and why." },
  ],
} as const;

export const contact = {
  heading: "Have an ambiguous AI, product, or integration problem?",
  supporting:
    "I am open to Forward Deployed, Applied AI, Solutions, and AI Governance work. If the problem crosses customers, operations, data, and engineering, even better. Those are usually the interesting ones.",
  reasons: [
    "Forward Deployed Engineer role",
    "Applied AI or agentic AI role",
    "Solutions or integration engineering role",
    "AI governance or evaluation work",
    "Freelance embedded engineering",
    "Other",
  ],
} as const;

export const footer = {
  signature: "Designed and built by Sai Nitish Reddy Kapa",
  motto: "Build useful systems. Write human stories.",
} as const;
