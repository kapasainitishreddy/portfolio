// Portfolio data for Sai Nitish Reddy Kapa
// Sourced from: https://github.com/kapasainitishreddy/portfolio

export const site = {
  name: "Sai Nitish Reddy Kapa",
  roles: ["Communications Professional", "Data Analyst", "AI Strategist"],
  tagline: "Making complex technology clear, useful, and trustworthy",
  email: "kapasainitishreddy@gmail.com",
  location: "United States",
  description:
    "Sai Nitish Reddy Kapa translates complex technical, research, and operational information into clear digital content, reports, presentations, and data-informed communications.",
  resumeUrl: "/resume.pdf",
} as const;

export const socials = {
  github: "https://github.com/kapasainitishreddy",
  linkedin: "https://www.linkedin.com/in/kapasainitishreddy",
  email: `mailto:kapasainitishreddy@gmail.com`,
} as const;

export const navItems = [
  { label: "Home", href: "#home", cmd: "cd ~" },
  { label: "About", href: "#about", cmd: "cat about.md" },
  { label: "Skills", href: "#skills", cmd: "ls skills/" },
  { label: "Projects", href: "#projects", cmd: "ls projects/" },
  { label: "Experience", href: "#experience", cmd: "cat resume.json" },
  { label: "Contact", href: "#contact", cmd: "mail -s contact" },
] as const;

export const hero = {
  headline: "Systems that think.\nCommunication that lands.",
  supporting: [
    "I am Sai Nitish Reddy Kapa — a communications and data professional with 3+ years of experience producing reports, presentations, digital content, dashboards, and stakeholder updates.",
    "My work combines editorial judgment, publication coordination, analytics, visual storytelling, and responsible AI tools to make technical and policy-oriented ideas accurate, accessible, and actionable.",
  ],
  status: "Open to communications, AI governance, research, and digital publishing opportunities",
  actions: [
    { label: "Access Projects", href: "#projects", kind: "primary" as const },
    { label: "Read Experience", href: "#experience", kind: "ghost" as const },
    { label: "Initiate Contact", href: "#contact", kind: "ghost" as const },
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

export const skillGroups = [
  {
    id: "ai",
    label: "AI & Governance",
    blurb: "Using AI tools responsibly to research, summarize, edit, and communicate complex technical and policy-oriented material with human review.",
    skills: ["Responsible generative AI", "AI governance communication", "Prompt engineering", "Research summarization", "Content evaluation", "Factual verification", "Audience adaptation", "AI safety interest", "Human-in-the-loop review", "Technical translation"],
  },
  {
    id: "data",
    label: "Analytics & Reporting",
    blurb: "Turning engagement, workflow, and operational data into dashboards, performance reports, recommendations, and clear decision support.",
    skills: ["Power BI", "Excel", "Google Analytics", "Performance reporting", "Engagement metrics", "Data visualization", "Python", "SQL", "Reporting automation", "Insight development"],
  },
  {
    id: "publishing",
    label: "Digital Publishing",
    blurb: "Producing accurate, accessible content across websites, newsletters, reports, presentations, social media, and branded materials.",
    skills: ["WordPress", "Mailchimp", "Canva", "Digital publishing", "Newsletter production", "Social media content", "Report formatting", "Presentation design", "Proofreading and editing", "Brand consistency"],
  },
  {
    id: "ops",
    label: "Communications Ops",
    blurb: "Coordinating people, content, timelines, approvals, and assets across concurrent projects in remote and cross-functional environments.",
    skills: ["Publication workflows", "Content calendars", "Campaign coordination", "Stakeholder follow-up", "Editorial review", "Deadline management", "Version control", "Event communications", "Remote collaboration", "Document production"],
  },
];

export const experience = [
  {
    title: "Business Data Analyst",
    org: "Augmentare Inc.",
    period: "Aug 2024 – Present",
    focus: [
      "Translate technical and operational findings into concise reports, executive presentations, dashboards, one-pagers, and stakeholder updates",
      "Coordinate timelines, source materials, review cycles, approvals, and handoffs across business and technical teams",
      "Create polished visual assets and presentations using Canva, PowerPoint, Excel, and Power BI",
      "Build recurring performance reports and recommend workflow improvements that increased reporting efficiency by 28%",
      "Use AI-enabled tools responsibly for research summarization, drafting, content refinement, and quality review",
    ],
  },
  {
    title: "Data Analyst",
    org: "VN Technologies",
    period: "Jun 2020 – Jan 2023",
    focus: [
      "Produced client-ready reports, research summaries, presentations, process documentation, and internal communications",
      "Partnered with cross-functional stakeholders to gather content, resolve inconsistencies, and manage revisions",
      "Built recurring dashboards and surfaced trends that reduced analysis turnaround by 30%",
      "Standardized templates, organized source files, proofread deliverables, and maintained version control",
      "Prepared briefing notes, milestone updates, meeting materials, and post-project summaries for distributed teams",
    ],
  },
  {
    title: "AI Model Trainer",
    org: "Outlier AI",
    period: "Freelance",
    focus: [
      "Evaluate and edit AI-generated content for factual accuracy, clarity, tone, safety, and audience usefulness",
      "Reviewed more than 1,800 outputs across reasoning, instruction following, and written communication tasks",
      "Documented 30+ recurring quality issues and translated findings into structured feedback",
      "Applied editorial judgment to improve concise, accurate, and audience-appropriate responses",
      "Supported responsible human review of AI-assisted communication workflows",
    ],
  },
  {
    title: "Lead Analyst",
    org: "Legitified",
    period: "Freelance",
    focus: [
      "Transform market and research data into structured recommendations and decision-ready communications",
      "Develop persuasive narratives, presentations, summaries, and stakeholder-facing materials",
      "Synthesize competitor, audience, and opportunity research into clear strategic insights",
      "Organize complex source material into consistent and reusable communication formats",
      "Balance analytical depth with concise writing for non-technical audiences",
    ],
  },
];

export const projects = [
  {
    id: "siraba-hq",
    name: "Siraba HQ",
    category: "AI Operations",
    status: "Prototype",
    tags: ["AI", "Product"],
    summary: "AI company operating system that orchestrates workflows, communications, and decision-making across distributed teams.",
    problem: "AI companies struggle to coordinate rapidly evolving workflows, communications, and decisions across distributed teams.",
    solution: "A unified operating system that integrates AI-assisted task management, communication routing, and decision support.",
    features: ["AI workflow orchestration", "Communication routing", "Decision support", "Team coordination", "Analytics dashboard"],
    technologies: ["React", "Python", "LangChain", "PostgreSQL", "Redis"],
  },
  {
    id: "vakya",
    name: "Vakya",
    category: "Language Intelligence",
    status: "Prototype",
    tags: ["AI", "Data"],
    summary: "Real-time language intelligence platform that analyzes, translates, and adapts communications for different audiences and contexts.",
    problem: "Organizations produce content for diverse audiences but lack tools to adapt tone, complexity, and format in real-time.",
    solution: "An intelligent layer that analyzes incoming text and suggests or automatically applies audience-specific adaptations.",
    features: ["Real-time analysis", "Audience adaptation", "Tone calibration", "Multi-format output", "Quality scoring"],
    technologies: ["TypeScript", "OpenAI API", "Anthropic Claude", "Next.js", "Supabase"],
  },
  {
    id: "gtm-nexus",
    name: "GTM Nexus",
    category: "Go-To-Market Intelligence",
    status: "Active Development",
    tags: ["Product", "Data"],
    summary: "An integrated GTM analysis platform combining market dynamics, reasoning, and inference to predict product-market fit and optimal positioning.",
    problem: "GTM decisions are made with fragmented data — market trends, competitive moves, user signals scattered across tools.",
    solution: "A unified platform that ingests market signals, reasons through scenarios, and generates predictive GTM playbooks.",
    features: ["Market signal aggregation", "Competitive positioning", "Channel viability scoring", "PMF prediction", "Scenario reasoning", "GTM playbook generation"],
    technologies: ["Perplexity AI", "Hermes LLM", "Graph analysis", "Python", "PostgreSQL", "React"],
  },
  {
    id: "flow-studio",
    name: "Flow Studio",
    category: "Visual AI Orchestration",
    status: "Prototype",
    tags: ["AI", "Product"],
    summary: "A visual studio for designing and orchestrating complex multi-agent AI workflows without code, with real-time execution debugging.",
    problem: "AI orchestration requires deep coding skills. Non-technical teams cannot visualize or modify agent flows without rewrites.",
    solution: "A node-based visual editor where you drag agents, connect data flows, set triggers, and see execution in real-time.",
    features: ["Node-based visual editor", "Real-time execution view", "Agent library", "Data flow visualization", "Performance profiler", "One-click deployment"],
    technologies: ["React", "D3.js", "TypeScript", "LangGraph", "Redis"],
  },
  {
    id: "receipts",
    name: "Receipts",
    category: "Personal Finance",
    status: "Testing",
    tags: ["Product", "Data"],
    summary: "Local-first personal clarity app that transforms financial receipts into actionable spending insights and patterns.",
    problem: "Personal finance apps require cloud sync and subscriptions. Most people lose track of spending without real-time feedback.",
    solution: "A local-first app that scans receipts, categorizes spending, and surfaces patterns — all without cloud dependency.",
    features: ["Receipt scanning", "Local-first storage", "Spending patterns", "Category insights", "Export reports"],
    technologies: ["React Native", "SQLite", "TensorFlow Lite", "TypeScript"],
  },
  {
    id: "keeply",
    name: "Keeply",
    category: "Knowledge Management",
    status: "Prototype",
    tags: ["Product", "AI"],
    summary: "Universal capture and organization system that intelligently categorizes and connects ideas, links, and notes across all your sources.",
    problem: "Information is scattered across bookmarks, notes, emails, and documents. Retrieval is slow and context is lost.",
    solution: "A universal inbox that captures anything, uses AI to categorize and connect items, and surfaces relevant context when needed.",
    features: ["Universal capture", "AI categorization", "Smart connections", "Context surfacing", "Multi-source sync"],
    technologies: ["Electron", "SQLite", "OpenAI Embeddings", "TypeScript", "React"],
  },
];

export const certifications = [
  {
    title: "Google IT Support Professional Certificate",
    issuer: "Google",
    credential: "Professional Certificate",
    url: "https://www.coursera.org/professional-certificates/google-it-support",
  },
  {
    title: "Forward Deployed Engineer",
    issuer: "Educative",
    credential: "Specialized Track",
    url: "https://www.educative.io",
  },
];

export const principles = [
  { title: "Understand before simplifying", body: "Read the underlying research closely so summaries remain accessible without losing accuracy or important nuance." },
  { title: "Design for the audience", body: "Adapt structure, tone, format, and level of detail for websites, newsletters, reports, presentations, and social channels." },
  { title: "Make workflows reliable", body: "Use clear ownership, templates, review checkpoints, content calendars, and version control to keep concurrent deliverables moving." },
  { title: "Measure and improve", body: "Use engagement, traffic, workflow, and operational data to identify what works and recommend practical improvements." },
  { title: "Use AI responsibly", body: "Apply AI tools to accelerate research and drafting while preserving human review, factual verification, privacy, and accountability." },
];
