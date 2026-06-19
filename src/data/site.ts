/**
 * Central site configuration.
 * Edit names, links, navigation and hero copy here. Nothing else needs to change.
 */

export const site = {
  name: "Sai Nitish Reddy Kapa",
  shortName: "Sai Nitish",
  initials: "SK",
  roles: ["AI Product Builder", "Data Scientist", "Blockchain Enthusiast", "Network Analyst"],
  tagline: "Engineer with the heart of a writer",
  email: "kapasainitishreddy@gmail.com",
  location: "United States",
  // Used for SEO. Override with NEXT_PUBLIC_SITE_URL in production.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Sai Nitish Reddy Kapa is an AI product builder and data scientist working across artificial intelligence, data science, blockchain analytics and network analysis to turn complex systems into clear, useful products.",
  // Drop your resume PDF at public/resume.pdf to make this button live.
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
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  headline: "I build intelligent systems from data, networks, and ambitious ideas.",
  supporting: [
    "I am Sai Nitish Reddy Kapa, an AI product builder and data scientist exploring how artificial intelligence, blockchain, automation, and network analysis can be transformed into useful products.",
    "I work across the complete product journey, from research and system design to prototypes, analytics, interfaces, and deployment.",
  ],
  status: "Currently building AI products and intelligent automation systems.",
  actions: [
    { label: "Explore My Work", href: "#projects", kind: "primary" as const },
    { label: "View Résumé", href: site.resumeUrl, kind: "ghost" as const, external: true },
    { label: "Start a Conversation", href: "#contact", kind: "ghost" as const },
  ],
} as const;

export const about = {
  heading: "Turning complex systems into clear, useful experiences.",
  paragraphs: [
    "My work sits at the intersection of artificial intelligence, data science, product development, blockchain, and network analysis.",
    "I enjoy taking broad or technically complex ideas and turning them into understandable systems, practical workflows, and polished user experiences. My interests include AI agents, local-first applications, real-time translation, data automation, privacy-focused products, decentralized systems, graph analytics, and intelligent interfaces.",
    "I approach products as connected systems. The model, data, interface, infrastructure, privacy design, and user experience should work together rather than being treated as separate pieces.",
  ],
  keywords: [
    { word: "Intelligence", note: "Models that reason, retrieve and act with judgment." },
    { word: "Data", note: "Pipelines and analysis that make signal legible." },
    { word: "Networks", note: "Graphs that reveal structure, influence and risk." },
    { word: "Products", note: "Interfaces where all of it becomes usable." },
  ],
} as const;

export const principles = {
  heading: "How I think about building.",
  items: [
    {
      title: "Start with the real problem",
      body: "Technology should solve a specific human or operational problem, not exist only to demonstrate technical complexity.",
    },
    {
      title: "Design the complete system",
      body: "Models, data, workflows, infrastructure, privacy, and interfaces must be designed together.",
    },
    {
      title: "Keep humans in control",
      body: "High-impact automation should include visibility, approval, correction, and clear ownership.",
    },
    {
      title: "Privacy is architecture",
      body: "Privacy should be reflected in storage, permissions, data movement, retention, and deletion, not added as a final policy page.",
    },
    {
      title: "Build, measure, and improve",
      body: "Strong products emerge through small working releases, user feedback, observable behavior, and continuous iteration.",
    },
  ],
} as const;

export const contact = {
  heading: "Let’s build something meaningful.",
  supporting:
    "I am interested in opportunities and collaborations involving artificial intelligence, data science, product development, blockchain analytics, network analysis, and early-stage technology.",
  reasons: [
    "Job opportunity",
    "Collaboration",
    "Product discussion",
    "Research",
    "Other",
  ],
} as const;

export const footer = {
  signature: "Designed and built by Sai Nitish Reddy Kapa",
  motto: "Ideas move like ink. Systems give them form.",
} as const;
