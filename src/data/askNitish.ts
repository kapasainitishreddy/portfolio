export type GroundedAnswer = {
  title: string;
  body: string;
  links?: { label: string; href: string }[];
};

type Intent = GroundedAnswer & {
  keywords: string[];
};

export const suggestedQuestions = [
  "What kind of AI systems do you build?",
  "What have you built with agents?",
  "How do you think about AI safety?",
  "What do you teach undergraduates?",
  "What is Syrava?",
  "Why hire you as a Forward Deployed Engineer?",
  "What do you write outside engineering?",
];

const intents: Intent[] = [
  {
    title: "AI systems I build",
    body:
      "I work across agentic AI, data and API integration, internal tools, evaluation, governance, multimodal workflows, and production delivery. I care about the last mile: auth, data quality, failure handling, human review, documentation, and whether a team can actually operate what I ship.",
    keywords: ["ai", "systems", "build", "llm", "multimodal", "integration", "production"],
    links: [
      { label: "See the AI universe", href: "#ai-universe" },
      { label: "See featured work", href: "#featured-work" },
    ],
  },
  {
    title: "Agents and infrastructure",
    body:
      "My agent work includes projects such as Scythe, Future OS, Scribe, Nevra, and AI Browser. The recurring problems are tool use, orchestration, permissions, local or cloud model execution, observability, and making agents useful without giving them uncontrolled freedom.",
    keywords: ["agent", "agents", "scythe", "scribe", "future", "nevra", "browser", "mcp", "orchestration"],
    links: [{ label: "Explore agent projects", href: "#ai-universe" }],
  },
  {
    title: "AI safety and governance",
    body:
      "I treat safety as an engineering requirement. My focus includes evaluations, red-team thinking, human approvals, auditability, privacy, permission boundaries, failure analysis, and governance. I want teams to be able to inspect what an AI system did, where it can fail, and who is responsible for the decision path.",
    keywords: ["safety", "governance", "eval", "evaluation", "privacy", "compliance", "guardrail", "risk", "responsible"],
    links: [{ label: "Read about safety teaching", href: "#ai-safety" }],
  },
  {
    title: "Teaching undergraduates",
    body:
      "I teach undergraduate sessions on AI jailbreaks, AI safety, and AI governance. The goal is to help students understand model failure modes and misuse, then connect those risks to evaluations, guardrails, human oversight, governance, and responsible system design.",
    keywords: ["teach", "teaching", "undergrad", "undergraduate", "class", "jailbreak", "student", "students"],
    links: [{ label: "See the teaching section", href: "#ai-safety" }],
  },
  {
    title: "Syrava and product building",
    body:
      "Syrava is the umbrella for my product-building work. I use it to explore multiple AI products and shared infrastructure, including Circuit, Karmakaryam, Lunyra, Gathered, Vakya, and other experiments. The pattern is fast iteration, reusable systems, and learning from products instead of treating every repo as an isolated demo.",
    keywords: ["syrava", "founder", "startup", "product", "company", "ecosystem"],
    links: [
      { label: "Explore the Syrava ecosystem", href: "#ai-universe" },
      { label: "See projects", href: "#projects" },
    ],
  },
  {
    title: "Forward deployed fit",
    body:
      "I am strongest when the problem is still ambiguous. I can sit with stakeholders, map the workflow, build a useful end-to-end slice, connect it to the real stack, and prove whether it works. That mix of customer discovery, implementation, integration, evaluation, and handoff is why Forward Deployed Engineer and Solutions roles fit me well.",
    keywords: ["hire", "forward", "deployed", "fde", "solutions", "customer", "stakeholder", "role", "fit"],
    links: [
      { label: "See experience", href: "#experience" },
      { label: "Contact me", href: "#contact" },
    ],
  },
  {
    title: "Writing and creative work",
    body:
      "Outside engineering, I write fiction under the Asta pen name. I work across thrillers, horror, fantasy, relationship drama, and speculative stories. Long-form writing is a different craft from engineering, but it strengthens how I think about people, incentives, pacing, ambiguity, and communicating complicated ideas clearly.",
    keywords: ["write", "writing", "writer", "asta", "book", "books", "fiction", "novel"],
    links: [{ label: "Read about me", href: "#about" }],
  },
  {
    title: "Projects and breadth",
    body:
      "My portfolio spans AI agents, developer tools, consumer products, computer vision, language and voice, knowledge systems, governance, climate, and public-good work. I prefer grouping that work by the problem and system pattern rather than presenting a wall of repositories.",
    keywords: ["project", "projects", "portfolio", "apps", "app", "built", "work"],
    links: [
      { label: "See the AI universe", href: "#ai-universe" },
      { label: "Browse projects", href: "#projects" },
    ],
  },
];

const fallback: GroundedAnswer = {
  title: "Try a more specific angle",
  body:
    "I can answer from the public information in this portfolio about my AI systems, agent work, safety and governance, undergraduate teaching, Syrava, experience, projects, and writing. Try one of the suggested questions or jump straight to the work below.",
  links: [
    { label: "AI universe", href: "#ai-universe" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function findGroundedAnswer(question: string): GroundedAnswer {
  const tokens = normalize(question);
  if (tokens.length === 0) return fallback;

  let best: Intent | undefined;
  let bestScore = 0;

  for (const intent of intents) {
    const score = intent.keywords.reduce((total, keyword) => {
      const keywordTokens = normalize(keyword);
      const matched = keywordTokens.every((token) => tokens.includes(token));
      return total + (matched ? Math.max(1, keywordTokens.length) : 0);
    }, 0);

    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }

  if (!best || bestScore === 0) return fallback;
  const { keywords: _keywords, ...answer } = best;
  return answer;
}
