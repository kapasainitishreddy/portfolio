export type IdentityItem = {
  title: string;
  description: string;
};

export type AIUniverseGroup = {
  id: string;
  title: string;
  description: string;
  signals: string[];
  focus: string;
};

export type TeachingTopic = {
  title: string;
  description: string;
};

export const identityRail: IdentityItem[] = [
  {
    title: "AI Builder",
    description: "I prototype, integrate, evaluate, and ship AI products instead of stopping at demos.",
  },
  {
    title: "Forward Deployed Engineer",
    description: "I move from a customer workflow to code, APIs, data, deployment, and measurable proof.",
  },
  {
    title: "Founder / Product Builder",
    description: "I build private products, reuse infrastructure across them, and keep product identities private while I scale the work.",
  },
  {
    title: "AI Safety Educator",
    description: "I teach undergraduates about jailbreaks, AI safety, and AI governance with a focus on responsible deployment.",
  },
];

export const aiUniverseGroups: AIUniverseGroup[] = [
  {
    id: "agents",
    title: "Agents and infrastructure",
    description: "Agentic systems, local assistants, orchestration, tool use, and the infrastructure that lets AI act safely across real workflows.",
    signals: ["Tool orchestration", "Permission boundaries", "Local + cloud execution"],
    focus: "Agents · orchestration · MCP · local AI",
  },
  {
    id: "developer-tools",
    title: "Developer systems",
    description: "AI-assisted workflows for building, testing, extending, debugging, and evaluating software faster.",
    signals: ["Developer experience", "Testing loops", "Evaluation tooling"],
    focus: "DX · testing · evaluation",
  },
  {
    id: "consumer-ai",
    title: "Consumer AI",
    description: "Products that turn messy everyday decisions and personal workflows into calmer guided experiences.",
    signals: ["Personalization", "Multimodal flows", "Product AI"],
    focus: "Personalization · multimodal · product AI",
  },
  {
    id: "computer-vision",
    title: "Computer vision and feedback",
    description: "Camera and vision workflows designed around usable feedback, clear uncertainty, and privacy-aware product boundaries.",
    signals: ["Vision pipelines", "Feedback loops", "On-device patterns"],
    focus: "Computer vision · coaching · feedback",
  },
  {
    id: "language-voice",
    title: "Language and voice",
    description: "Speech, language, and culturally aware AI experiences that make technology feel more natural across languages and contexts.",
    signals: ["Speech interfaces", "Localization", "Language workflows"],
    focus: "Speech · language · localization",
  },
  {
    id: "knowledge",
    title: "Knowledge and research",
    description: "Systems for navigating complex information, evidence, and research without losing traceability.",
    signals: ["RAG", "Evidence retrieval", "Research orchestration"],
    focus: "RAG · research · knowledge systems",
  },
  {
    id: "governance",
    title: "Evaluation, privacy, and governance",
    description: "Testing and oversight layers that ask whether an AI system is safe, private, explainable, and useful before trust is assumed.",
    signals: ["Evals", "Privacy boundaries", "Auditability"],
    focus: "Evals · privacy · governance",
  },
  {
    id: "private-studio",
    title: "Private product studio",
    description: "The product work itself stays private while I develop and scale it. The public portfolio shows system patterns and defensible outcomes instead of product identities.",
    signals: ["Shared infrastructure", "Rapid iteration", "Scale-minded product systems"],
    focus: "Founder work · product systems · scaling",
  },
];

export const teachingTopics: TeachingTopic[] = [
  {
    title: "Jailbreaks and adversarial prompting",
    description: "How model behavior can be pressured or manipulated, why those failure modes matter, and how to study them safely without turning the lesson into a bypass manual.",
  },
  {
    title: "AI safety",
    description: "Evaluations, guardrails, failure analysis, human review, and practical controls for systems that will be used by real people.",
  },
  {
    title: "AI governance",
    description: "Accountability, auditability, risk ownership, policy, and the operating structures that keep AI deployment aligned with people and institutions.",
  },
];
