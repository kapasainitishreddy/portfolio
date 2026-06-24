/**
 * Central site configuration.
 * Edit names, links, navigation and hero copy here. Nothing else needs to change.
 */

export const site = {
  name: "Sai Nitish Reddy Kapa",
  shortName: "Sai Nitish",
  initials: "SK",
  roles: ["Communications & Data Professional", "AI Governance Communicator", "Digital Content Strategist", "Data Analyst"],
  tagline: "Making complex technology clear, useful, and trustworthy",
  email: "kapasainitishreddy@gmail.com",
  location: "United States",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Sai Nitish Reddy Kapa translates complex technical, research, and operational information into clear digital content, reports, presentations, and data-informed communications.",
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
  { label: "Selected Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  headline: "I turn complex AI, research, and data into communication people can use.",
  supporting: [
    "I am Sai Nitish Reddy Kapa, a communications and data professional with 3+ years of experience producing reports, presentations, digital content, dashboards, and stakeholder updates.",
    "My work combines editorial judgment, publication coordination, analytics, visual storytelling, and responsible AI tools to make technical and policy-oriented ideas accurate, accessible, and actionable.",
  ],
  status: "Open to communications, AI governance, research, and digital publishing opportunities",
  actions: [
    { label: "View Selected Work", href: "#projects", kind: "primary" as const },
    { label: "Read My Experience", href: "#experience", kind: "ghost" as const },
    { label: "Start a Conversation", href: "#contact", kind: "ghost" as const },
  ],
} as const;

export const about = {
  heading: "Clear communication is infrastructure for better decisions.",
  paragraphs: [
    "Complex research and technology only create impact when people can understand what matters, why it matters, and what to do next. I translate detailed analysis into concise reports, presentations, web content, briefing materials, and stakeholder communications.",
    "My background spans business and operational analysis, AI content evaluation, market research, publication workflows, visual communication, and performance reporting. I am comfortable coordinating multiple deliverables across remote, cross-functional teams while maintaining accuracy, consistency, and deadlines.",
    "I am especially interested in responsible AI, AI governance, technology policy, digital publishing, research communications, and mission-driven organizations working to make consequential systems safer and more accountable.",
  ],
  keywords: [
    { word: "Clarity", note: "Translate technical and policy-oriented material for different audiences." },
    { word: "Accuracy", note: "Validate claims, edit carefully, and keep evidence distinct from inference." },
    { word: "Coordination", note: "Manage timelines, reviews, approvals, stakeholders, and publication handoffs." },
    { word: "Insight", note: "Use analytics and audience signals to improve communication performance." },
  ],
} as const;

export const principles = {
  heading: "How I approach communications and digital work.",
  items: [
    {
      title: "Understand before simplifying",
      body: "Read the underlying research closely so summaries remain accessible without losing accuracy or important nuance.",
    },
    {
      title: "Design for the audience",
      body: "Adapt structure, tone, format, and level of detail for websites, newsletters, reports, presentations, and social channels.",
    },
    {
      title: "Make workflows reliable",
      body: "Use clear ownership, templates, review checkpoints, content calendars, and version control to keep concurrent deliverables moving.",
    },
    {
      title: "Measure and improve",
      body: "Use engagement, traffic, workflow, and operational data to identify what works and recommend practical improvements.",
    },
    {
      title: "Use AI responsibly",
      body: "Apply AI tools to accelerate research and drafting while preserving human review, factual verification, privacy, and accountability.",
    },
  ],
} as const;

export const contact = {
  heading: "Let’s make important work easier to understand.",
  supporting:
    "I am interested in communications, digital publishing, research, AI governance, technology policy, analytics, and mission-driven work where clarity and coordination matter.",
  reasons: [
    "Communications opportunity",
    "AI governance or policy collaboration",
    "Research and digital publishing",
    "Data and performance reporting",
    "Other",
  ],
} as const;

export const footer = {
  signature: "Designed and built by Sai Nitish Reddy Kapa",
  motto: "Complex ideas deserve clear communication.",
} as const;
