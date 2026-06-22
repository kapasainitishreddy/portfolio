/**
 * Central site configuration.
 * Edit names, links, navigation and hero copy here. Nothing else needs to change.
 */

export const site = {
  name: "Sai Nitish Reddy Kapa",
  shortName: "Sai Nitish",
  initials: "SK",
  roles: ["Public-Interest AI Founder", "AI Product Builder", "Data Scientist", "Systems Designer"],
  tagline: "Building software for people not in the room",
  email: "kapasainitishreddy@gmail.com",
  location: "United States",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Sai Nitish Reddy Kapa builds thoughtful AI products, decision infrastructure, and privacy-first systems designed to increase human agency and create durable public good.",
  resumeUrl: "/resume.pdf",
} as const;

export const socials = {
  github: "https://github.com/kapasainitishreddy",
  linkedin: "https://www.linkedin.com/in/kapasainitishreddy",
  email: `mailto:${site.email}`,
} as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Mission", href: "#about" },
  { label: "Capabilities", href: "#skills" },
  { label: "Public-Good Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  headline: "I build AI systems for the people who are not in the room.",
  supporting: [
    "I am Sai Nitish Reddy Kapa, a founder and AI product builder working on decision tools, private personal software, and coordination infrastructure that increase human agency.",
    "My current focus is The Seventh Seat: a system that helps institutions identify missing stakeholders, expose consent debt, and improve consequential AI decisions before they become difficult to reverse.",
  ],
  status: "Applying to Surplus 2026 · building public-interest AI infrastructure",
  actions: [
    { label: "See The Seventh Seat", href: "#projects", kind: "primary" as const },
    { label: "Explore Public-Good Work", href: "#projects", kind: "ghost" as const },
    { label: "Start a Conversation", href: "#contact", kind: "ghost" as const },
  ],
} as const;

export const about = {
  heading: "Software should account for more than the person paying for it.",
  paragraphs: [
    "Many consequential technology decisions affect children, future users, vulnerable communities, workers, and people who never had a meaningful chance to consent. I want to turn consideration for those people from an aspiration into a practical product workflow.",
    "My work combines AI, data science, product design, privacy engineering, and systems thinking. I build from the complete decision journey: evidence, assumptions, interfaces, incentives, safeguards, feedback loops, and accountability.",
    "I am especially interested in public-interest AI, epistemic infrastructure, humane automation, local-first products, institutional memory, explainable coordination, and software that preserves dignity rather than exploiting attention or vulnerability.",
  ],
  keywords: [
    { word: "Agency", note: "Tools that help people understand, decide, and remain in control." },
    { word: "Evidence", note: "Clear separation between facts, assumptions, forecasts, and model inference." },
    { word: "Consent", note: "Systems that notice who bears risk without meaningful participation." },
    { word: "Coordination", note: "Shared interfaces for making difficult decisions together." },
  ],
} as const;

export const principles = {
  heading: "Principles for building consequential software.",
  items: [
    {
      title: "Represent the absent",
      body: "Ask who is affected but missing from the room, especially when power, time, age, or access prevents meaningful participation.",
    },
    {
      title: "Separate evidence from simulation",
      body: "Model-generated hypotheses should never masquerade as sourced facts, community testimony, or moral authority.",
    },
    {
      title: "Prefer reversible decisions",
      body: "High-impact systems should support pilots, rollback, correction, compensation, and clear stopping conditions.",
    },
    {
      title: "Privacy is architecture",
      body: "Storage, permissions, retention, deletion, and data movement should express the product's values directly.",
    },
    {
      title: "Ship into reality",
      body: "Public-good intentions matter only when a usable product changes real behavior, improves decisions, or reduces harm.",
    },
  ],
} as const;

export const contact = {
  heading: "Let’s build technology worthy of trust.",
  supporting:
    "I am looking for collaborators, design partners, mentors, and funders interested in public-interest AI, decision infrastructure, privacy-first products, and tools for flourishing futures.",
  reasons: [
    "The Seventh Seat design partnership",
    "Public-interest AI collaboration",
    "Research or governance",
    "Incubator or funding",
    "Other",
  ],
} as const;

export const footer = {
  signature: "Designed and built by Sai Nitish Reddy Kapa",
  motto: "Every important table needs a seat for those not present.",
} as const;
