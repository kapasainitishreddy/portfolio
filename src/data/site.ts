/**
 * Central portfolio copy and navigation.
 */
export const site = {
  name: "Sai Nitish Reddy Kapa",
  shortName: "Sai Nitish",
  initials: "SN",
  roles: ["AI Builder", "Product Founder", "Thriller Writer"],
  tagline: "Ideas move like ink. Systems give them form. Stories give them soul.",
  email: "kapasainitishreddy@gmail.com",
  location: "United States",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Sai Nitish Reddy builds AI products, intelligent systems, developer tools, mobile experiences, and psychological thrillers.",
  resumeUrl: "/resume.pdf",
} as const;

export const socials = {
  github: "https://github.com/kapasainitishreddy",
  email: `mailto:${site.email}`,
} as const;

export const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
  { label: "Philosophy", href: "#principles" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  headline: "I build AI products, intelligent systems, and story-driven experiences.",
  supporting: [
    "I am a builder, product founder, and thriller writer. I turn complex ideas into useful software, from language intelligence and developer infrastructure to private consumer products and stories about what people do under pressure.",
  ],
  status: "Building across AI, developer tools, mobile products, and stories",
  identities: [
    {
      title: "AI Builder",
      body: "Building intelligent systems, applied AI products, and agentic tools.",
    },
    {
      title: "Product Founder",
      body: "Turning ideas into focused products that solve real problems.",
    },
    {
      title: "Thriller Writer",
      body: "Exploring tension, motive, consequence, and the darker sides of human nature.",
    },
  ],
  actions: [
    { label: "Explore Products", href: "#projects", kind: "primary" as const },
    { label: "Read Writing", href: "#writing", kind: "ghost" as const },
    { label: "View GitHub", href: socials.github, kind: "ghost" as const, external: true },
  ],
} as const;

export const about = {
  heading: "Builder. Writer. Thinker.",
  paragraphs: [
    "I like building at the point where technology, product design, and human behavior meet. Some ideas become AI tools. Some become mobile products. Some become stories.",
    "My product work usually starts with a messy workflow or an annoying decision. I try to reduce it to one clear loop, make the system inspectable, and keep the interface simple enough that the user does not need a manual.",
    "Writing thrillers exercises a different part of the same instinct. I care about motive, pressure, hidden information, and what people choose when there is no comfortable option. That attention to human behavior also shapes the software I build.",
  ],
  keywords: [
    { word: "Intelligence", note: "Applied AI that supports a real workflow." },
    { word: "Products", note: "Small loops, clear value, and usable interfaces." },
    { word: "Systems", note: "Architecture that can be inspected, tested, and changed." },
    { word: "Stories", note: "Tension, motive, consequence, and human behavior." },
  ],
} as const;

export const principles = {
  heading: "Build with clarity. Write with truth.",
  items: [
    {
      title: "Build with clarity",
      body: "Strip away noise, solve the real problem, and make the next action obvious.",
    },
    {
      title: "Make it real",
      body: "Prefer working flows, tests, demos, and evidence over impressive sounding promises.",
    },
    {
      title: "Design for emotion",
      body: "People remember how a product or a story made them feel. Clarity and atmosphere both matter.",
    },
    {
      title: "Think long term",
      body: "Build foundations that can evolve instead of piling features onto weak structure.",
    },
  ],
} as const;

export const contact = {
  heading: "Let’s build something meaningful.",
  supporting:
    "If it is a product, a system, a story, or an unusual problem worth exploring, I am open to a conversation.",
  reasons: [
    "AI or product opportunity",
    "Forward deployed or solutions work",
    "Developer tools or mobile products",
    "Writing or story collaboration",
    "Other",
  ],
} as const;

export const footer = {
  signature: "Designed and built by Sai Nitish Reddy Kapa",
  motto: "Ideas move like ink. Systems give them form. Stories give them soul.",
} as const;
