export type IdentityItem = {
  title: string;
  description: string;
};

export type AIUniverseGroup = {
  id: string;
  title: string;
  description: string;
  projects: string[];
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
    description: "I build a broad product ecosystem through Syrava and keep testing where AI can remove real friction.",
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
    projects: ["Scythe", "Future OS", "Scribe", "Nevra", "AI Browser"],
    focus: "Agents · orchestration · MCP · local AI",
  },
  {
    id: "developer-tools",
    title: "Developer tools",
    description: "Tools for building, testing, extending, and evaluating software faster with AI in the loop.",
    projects: ["AppGraft", "Extforge", "Persona", "Scribe Studio"],
    focus: "Developer experience · testing · evaluation",
  },
  {
    id: "consumer-ai",
    title: "Consumer AI",
    description: "Products that turn messy everyday decisions, relationships, habits, and personal workflows into calmer guided experiences.",
    projects: ["Lunyra", "Gathered", "Choices", "Become", "Noxly"],
    focus: "Personalization · multimodal · product AI",
  },
  {
    id: "health-fitness",
    title: "Health and fitness AI",
    description: "Computer-vision and coaching concepts designed around form, progress, behavior, and usable feedback loops.",
    projects: ["Gympose / GymLens", "Actra", "Chisel"],
    focus: "Computer vision · coaching · feedback",
  },
  {
    id: "language-voice",
    title: "Language and voice",
    description: "Speech, language, and culturally aware AI experiences that make technology feel more natural across languages and contexts.",
    projects: ["Vakya", "Slango", "Murmur"],
    focus: "Speech · language · localization",
  },
  {
    id: "knowledge",
    title: "Knowledge and research",
    description: "Systems for navigating complex information, AI models, evidence, and research without losing traceability.",
    projects: ["Circuit / AI Atlas", "Consensus", "Research Swarm"],
    focus: "RAG · research · knowledge systems",
  },
  {
    id: "governance",
    title: "Evaluation, privacy, and governance",
    description: "Testing and oversight layers that ask whether an AI system is safe, private, compliant, explainable, and useful before trust is assumed.",
    projects: ["Persona", "ProofTimeline", "Risk Ledger", "TraceGrid"],
    focus: "Evals · privacy · compliance · governance",
  },
  {
    id: "public-good",
    title: "Public good and climate",
    description: "AI and data products aimed at agriculture, climate risk, public infrastructure, and practical social outcomes.",
    projects: ["Harvestly", "Climate", "Karmakaryam"],
    focus: "Climate · public good · data systems",
  },
  {
    id: "syrava",
    title: "Syrava ecosystem",
    description: "The umbrella for my product-building work: many small bets, shared infrastructure, rapid iteration, and a bias toward shipping usable software.",
    projects: ["Syrava", "Circuit", "Karmakaryam", "Lunyra", "Gathered", "Vakya"],
    focus: "Founder work · product systems · shipping",
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
