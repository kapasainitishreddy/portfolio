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
  "Why are your product builds private?",
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
      { label: "See AI capabilities", href: "#ai-universe" },
      { label: "See case studies", href: "#featured-work" },
    ],
  },
  {
    title: "Agents and infrastructure",
    body:
      "My private product work includes agentic systems and supporting infrastructure. The recurring engineering problems are tool use, orchestration, permissions, local or cloud model execution, observability, evaluation, and making agents useful without giving them uncontrolled freedom. Product identities and repositories stay private while I scale them.",
    keywords: ["agent", "agents", "mcp", "orchestration", "tools", "infrastructure"],
    links: [{ label: "Explore AI capabilities", href: "#ai-universe" }],
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
    title: "Private product building",
    body:
      "I am actively developing and scaling a set of private products. The public portfolio intentionally shows system patterns, engineering judgment, and defensible outcomes instead of product names, repositories, roadmaps, or unreleased implementation details.",
    keywords: ["private", "product", "products", "founder", "startup", "scale", "scaling", "repo", "repository"],
    links: [{ label: "Why the builds are private", href: "#private-builds" }],
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
    links: [{ label: "See novels", href: "#novels" }],
  },
  {
    title: "Private systems and breadth",
    body:
      "The public portfolio groups my private product work by system capability rather than by product identity. It covers agents, developer workflows, consumer AI, computer vision, language and voice, knowledge systems, evaluation, privacy, and governance without exposing names or repositories.",
    keywords: ["project", "projects", "portfolio", "apps", "app", "built", "work", "systems"],
    links: [
      { label: "See AI capabilities", href: "#ai-universe" },
      { label: "See private builds", href: "#private-builds" },
    ],
  },
];

const fallback: GroundedAnswer = {
  title: "Try a more specific angle",
  body:
    "I can answer from the public information in this portfolio about AI systems, agent work, safety and governance, undergraduate teaching, anonymized experience, private product building, and writing. Private employer identities, product names, repositories, roadmaps, and unreleased implementation details are intentionally not exposed.",
  links: [
    { label: "AI capabilities", href: "#ai-universe" },
    { label: "Private builds", href: "#private-builds" },
    { label: "Experience", href: "#experience" },
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
