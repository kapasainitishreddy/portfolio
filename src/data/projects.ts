/**
 * Selected projects rendered as expandable case-study cards.
 *
 * To add or edit a project:
 *  - keep `tags` to the values in `ProjectTag` so filtering keeps working
 *  - `status` may be any short string; "Coming Soon" renders a special label
 *  - `inkPattern` selects the background ink behaviour when the card is open
 *  - drop a screenshot at public/projects/<id>.jpg and set `image` to use it,
 *    otherwise a tasteful generated placeholder is shown
 *  - links are optional; omit any you do not have yet
 */

export type ProjectTag = "AI" | "Data" | "Blockchain" | "Networks" | "Privacy" | "Product";

export type InkPattern =
  | "network" // coordinated nodes
  | "waves" // sound waves through ink
  | "streams" // streams collecting into one pool
  | "typography" // type emerging from liquid
  | "ledger" // interconnected ledger rings
  | "graph" // graph structures from marbling
  | "default";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  status: string;
  comingSoon?: boolean;
  tags: ProjectTag[];
  inkPattern: InkPattern;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  features: string[];
  technologies: string[];
  /** Optional path under /public, e.g. "/projects/vakya.jpg". */
  image?: string;
  links?: ProjectLink[];
  /** Optional respectful / safety note shown prominently in the case study. */
  note?: string;
}

export const projects: Project[] = [
  {
    id: "siraba-hq",
    name: "Siraba HQ",
    category: "AI Agents and Company Operations",
    status: "In Development",
    tags: ["AI", "Product", "Networks"],
    inkPattern: "network",
    summary:
      "An AI-powered company operating system that accepts work, routes it to specialized agents, stores organizational knowledge, manages approvals, and tracks artifacts across product, marketing, engineering, and operations.",
    problem:
      "Small teams lose time moving work between tools, people and context. Knowledge is scattered, approvals are informal, and there is no shared memory of why decisions were made.",
    solution:
      "A coordinated layer of specialized agents that intake work, route it through the right workflow, draw on shared operational memory, and pause for human approval on anything high-impact, while keeping a full audit trail.",
    role: "Product design, system architecture, agent orchestration and data modeling.",
    features: [
      "Multi-agent orchestration",
      "Shared operational memory",
      "Human approval workflows",
      "Task routing and queues",
      "GitHub and productivity integrations",
      "Security and audit trails",
      "Marketing and GTM agents",
    ],
    technologies: [
      "LangGraph",
      "LiteLLM",
      "Supabase",
      "PostgreSQL",
      "pgvector",
      "BullMQ",
      "n8n",
      "React",
      "TypeScript",
    ],
  },
  {
    id: "vakya",
    name: "Vakya",
    category: "Real-Time Language Intelligence",
    status: "In Development",
    tags: ["AI", "Product"],
    inkPattern: "waves",
    summary:
      "A real-time translation and accessibility platform for live speech, subtitles, documents, and multilingual communication, with a focus on Indian and global languages.",
    problem:
      "Live multilingual communication is still hard. Subtitles lag, translation quality drops on domain language, and accessibility is treated as an afterthought.",
    solution:
      "A streaming pipeline that recognizes speech, translates in real time, overlays subtitles and speaks results back, with both local and hosted processing modes for privacy and reach.",
    role: "Product direction, speech and translation pipeline design, interface work.",
    features: [
      "Live speech recognition",
      "Real-time translation",
      "Subtitle overlays",
      "Text-to-speech",
      "Browser and mobile experiences",
      "Medical and document understanding",
      "Local and hosted processing modes",
      "Translation APIs",
    ],
    technologies: [
      "Whisper",
      "WebSockets",
      "NLP",
      "Speech AI",
      "Flutter",
      "Next.js",
      "Python",
      "Translation Models",
    ],
  },
  {
    id: "keeply",
    name: "Keeply",
    category: "Personal Knowledge and Organization",
    status: "Prototype",
    tags: ["AI", "Product", "Data"],
    inkPattern: "streams",
    summary:
      "A universal place to save links, screenshots, notes, files, ideas, and temporary information without forcing users to decide where everything belongs.",
    problem:
      "Saving something quickly usually means choosing a folder, an app or a tag first. That friction means most things never get saved at all.",
    solution:
      "A single fast capture surface that accepts anything, then organizes it intelligently in the background so retrieval is easy and filing is never required up front.",
    role: "Product concept, capture and retrieval model, local-first design.",
    features: [
      "Universal capture",
      "Intelligent categorization",
      "Search and retrieval",
      "Cross-device workflows",
      "Clipboard and desktop integration",
      "Local-first organization",
    ],
    technologies: ["TypeScript", "Local-first storage", "Embeddings", "Search", "Desktop integration"],
  },
  {
    id: "un-em",
    name: "Un-em",
    category: "AI Writing",
    status: "Prototype",
    tags: ["AI", "Product"],
    inkPattern: "typography",
    summary:
      "A conversational writing assistant that produces natural, readable responses without em dashes and helps users rewrite content in their preferred voice.",
    problem:
      "Generated writing often reads the same way and leans on tics like em dashes. People want help that sounds like them, not like a model.",
    solution:
      "A conversational assistant with explicit style controls and a no-em-dash response mode, able to rewrite, generate documents and adapt to a chosen voice.",
    role: "Product design, prompt and style system, writing tools.",
    features: [
      "Conversational AI",
      "Style controls",
      "Natural rewriting",
      "No-em-dash response mode",
      "Document generation",
      "Voice, image, slide, spreadsheet, and PDF tools",
    ],
    technologies: ["Large language models", "Prompt engineering", "Next.js", "TypeScript"],
  },
  {
    id: "smriti-ai",
    name: "Smriti.ai",
    category: "Private Memorial Technology",
    status: "Research and Prototype",
    tags: ["AI", "Privacy"],
    inkPattern: "default",
    summary:
      "A consent-focused, private memorial conversation experience created from user-provided memories, messages, documents, and voice recordings.",
    problem:
      "People want gentle, private ways to revisit memories of those they have lost, but most technology in this space ignores consent, privacy and emotional safety.",
    solution:
      "A local-first, consent-driven experience built only from material a person chooses to provide, with clear ethical boundaries and full user control over deletion.",
    role: "Research, privacy and ethics framework, careful product design.",
    features: [
      "On-device or local-first processing",
      "Explicit consent",
      "Privacy by design",
      "Clear emotional and ethical boundaries",
      "User-controlled deletion",
      "No hidden model training",
    ],
    technologies: ["Local-first AI", "On-device processing", "Privacy engineering"],
    note: "This is a private, consent-focused memory experience. It is not designed to recreate or replace a person, and it is built around explicit consent, emotional safety and full user control.",
  },
  {
    id: "receipts",
    name: "Receipts",
    category: "Personal Clarity and Decision Support",
    status: "MVP",
    tags: ["Privacy", "Product"],
    inkPattern: "default",
    summary:
      "A local-first personal clarity app that helps people save decisions, write difficult messages, create personal rules, and revisit past reasoning.",
    problem:
      "We make the same hard decisions repeatedly and forget why we chose what we did. In tense moments it is hard to write clearly or remember our own rules.",
    solution:
      "A private, local-only space to record decisions and the reasoning behind them, generate calm scripts for difficult moments, and revisit personal rules over time.",
    role: "Product concept, local-first architecture, interaction design.",
    features: [
      "Decision receipts",
      "Panic-script generator",
      "Saved drafts",
      "Review reminders",
      "Personal rules",
      "Local-only storage",
      "Export and import",
    ],
    technologies: ["Local-first storage", "TypeScript", "Offline-first design"],
  },
  {
    id: "pasthour-ai",
    name: "Pasthour AI",
    category: "Job Intelligence and Automation",
    status: "Concept and Research",
    tags: ["AI", "Data", "Product"],
    inkPattern: "network",
    summary:
      "A job discovery and application workspace focused on recently posted opportunities, resume personalization, application tracking, and human-approved automation.",
    problem:
      "The freshest roles get the most attention, but finding them, tailoring a resume and tracking applications is slow and easy to lose track of.",
    solution:
      "A workspace that surfaces recently posted jobs, tailors resumes, manages the application pipeline, and keeps a human in the loop before anything is sent.",
    role: "Product research, automation design, analytics.",
    features: [
      "Fresh-job discovery",
      "Resume tailoring",
      "Application workflow management",
      "Human approval before applying",
      "Job-source integrations",
      "Progress analytics",
    ],
    technologies: ["LLMs", "Automation", "Data pipelines", "Next.js"],
  },
  {
    id: "vibedesk",
    name: "VibeDesk",
    category: "Founder Productivity",
    status: "Concept",
    comingSoon: true,
    tags: ["Product"],
    inkPattern: "streams",
    summary:
      "A command center for solo builders to manage unfinished products, repositories, bugs, costs, API keys, deployment status, and next actions in one place.",
    problem:
      "Solo builders juggle many half-finished products across scattered tools, with no single view of cost, status and what to do next.",
    solution:
      "One command center that pulls together repositories, bugs, costs, keys and deployment status so the next action is always obvious.",
    role: "Product concept and information architecture.",
    features: [
      "Unified product dashboard",
      "Repository and bug tracking",
      "Cost and API key overview",
      "Deployment status",
      "Next-action focus",
    ],
    technologies: ["Next.js", "TypeScript", "Integrations"],
  },
  {
    id: "unsent",
    name: "Unsent",
    category: "Private Wellness Technology",
    status: "Concept",
    comingSoon: true,
    tags: ["Privacy", "Product"],
    inkPattern: "default",
    summary:
      "A private, local-first space where users can express messages they do not intend to send, reflect through guided journaling, and release difficult emotions without contacting the other person.",
    problem:
      "Sometimes we need to say something we should never actually send. There are few private, safe spaces to write it down and let it go.",
    solution:
      "A local-first space for writing unsent messages and guided reflection, designed for release rather than delivery, with everything kept private on the device.",
    role: "Product concept, privacy-first design.",
    features: [
      "Private unsent messages",
      "Guided journaling",
      "Reflection prompts",
      "Local-first storage",
    ],
    technologies: ["Local-first storage", "TypeScript"],
    note: "Unsent is a reflective writing space, not a substitute for professional mental-health care. If you are struggling, please reach out to a qualified professional or a local support line.",
  },
];

/** Filter chips shown above the project grid. */
export const projectTags: ProjectTag[] = ["AI", "Data", "Blockchain", "Networks", "Privacy", "Product"];
