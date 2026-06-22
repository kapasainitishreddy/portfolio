import type { Project } from "@/data/projects";

/**
 * Public-interest projects highlighted first for the Surplus application.
 * These are intentionally described as concepts, research, or prototypes
 * unless a working implementation exists.
 */
export const publicGoodProjects: Project[] = [
  {
    id: "the-seventh-seat",
    name: "The Seventh Seat",
    category: "Decision Infrastructure for Public-Interest AI",
    status: "Founding Concept · Prototype in Progress",
    tags: ["AI", "Data", "Privacy", "Product"],
    inkPattern: "network",
    summary:
      "A decision-intelligence system that helps institutions represent people affected by consequential choices who cannot meaningfully participate in making them.",
    problem:
      "AI products and policies can affect children, future users, vulnerable communities, workers, and indirect stakeholders who are absent from the decision room. Their risks are often reduced to a checklist or considered only after launch.",
    solution:
      "The Seventh Seat maps missing stakeholders, separates evidence from assumptions, identifies consent debt, tests reversibility, and produces safeguards and unresolved objections before a decision becomes difficult to change.",
    role:
      "Founder. Product thesis, consent-debt framework, stakeholder reasoning workflow, interaction design, validation research, and technical architecture.",
    features: [
      "Missing-stakeholder discovery",
      "Consent-debt analysis",
      "Evidence and assumption separation",
      "Reversibility and rollback review",
      "Long-term scenario mapping",
      "Safeguard recommendations",
      "Challenge and dissent workflow",
      "Optional public transparency pages",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "LLM orchestration",
      "Retrieval-augmented generation",
      "Structured evidence graphs",
      "PostgreSQL",
      "Human-in-the-loop review",
    ],
    note:
      "The system does not claim to impersonate communities or determine the morally correct answer. It is designed to surface omissions, uncertainty, and contestable assumptions while keeping humans accountable for decisions.",
  },
  {
    id: "evidence-escrow",
    name: "Evidence Escrow",
    category: "Accountability and Institutional Memory",
    status: "Research Concept",
    tags: ["AI", "Data", "Product"],
    inkPattern: "ledger",
    summary:
      "A tamper-evident record of the predictions, assumptions, launch criteria, and promised safeguards behind consequential AI decisions.",
    problem:
      "After a deployment succeeds or fails, institutions can unconsciously rewrite what they believed beforehand. Important forecasts, warnings, and promises disappear across documents and staff turnover.",
    solution:
      "Teams commit decision claims and measurable expectations before launch. The platform later compares them with outcomes, preserves dissent, and creates a reusable memory of what was believed, missed, and learned.",
    role: "Product concept, accountability model, decision schema, and experience design.",
    features: [
      "Pre-decision claim capture",
      "Forecast and confidence tracking",
      "Safeguard commitments",
      "Outcome reconciliation",
      "Dissent preservation",
      "Public or private audit trails",
    ],
    technologies: ["Next.js", "PostgreSQL", "Cryptographic timestamps", "Data visualization", "LLMs"],
  },
  {
    id: "reversibility-index",
    name: "The Reversibility Index",
    category: "Public AI Deployment Observatory",
    status: "Public Website Concept",
    tags: ["AI", "Data", "Product"],
    inkPattern: "graph",
    summary:
      "A public database showing how easily major AI systems, policies, and deployments can be paused, audited, rolled back, repaired, or compensated for when assumptions fail.",
    problem:
      "Public discussion focuses heavily on whether a technology is beneficial or harmful, but less on whether society can recover when the initial judgment is wrong.",
    solution:
      "The index evaluates deployments across rollback cost, data persistence, dependency, auditability, affected population, compensation pathways, and institutional exit options.",
    role: "Research framework, scoring methodology, public information design, and product direction.",
    features: [
      "Deployment profiles",
      "Reversibility dimensions",
      "Evidence-linked scoring",
      "Comparative visualizations",
      "Community challenges",
      "Historical outcome tracking",
    ],
    technologies: ["Next.js", "Open data", "Data visualization", "Evidence retrieval", "PostgreSQL"],
    note:
      "Scores would remain decomposable and challengeable. The product would display evidence and uncertainty rather than presenting a single number as objective truth.",
  },
  {
    id: "failed-decisions-library",
    name: "The Useful Failure Library",
    category: "Shared Learning Infrastructure",
    status: "Research Concept",
    tags: ["Data", "Networks", "Product", "Privacy"],
    inkPattern: "streams",
    summary:
      "A privacy-preserving repository for abandoned pilots, negative results, near misses, and operational lessons that public-interest organizations usually lose or hide.",
    problem:
      "Organizations repeatedly spend money rediscovering why an approach failed because negative results are scattered, reputationally sensitive, or never published.",
    solution:
      "Contributors submit structured failure reports with configurable anonymity. The system extracts reusable lessons, connects similar attempts, and helps teams search what has already been tried before beginning new work.",
    role: "Product concept, privacy model, knowledge architecture, and incentive design.",
    features: [
      "Anonymous and attributed submissions",
      "Structured postmortems",
      "Near-miss reporting",
      "Semantic lesson retrieval",
      "Related-attempt graphs",
      "Sensitive-detail redaction",
    ],
    technologies: ["Local redaction", "Embeddings", "Knowledge graphs", "PostgreSQL", "Next.js"],
  },
  {
    id: "still",
    name: "Still",
    category: "Private Self-Regulation Technology",
    status: "Prototype",
    tags: ["Privacy", "Product"],
    inkPattern: "waves",
    summary:
      "A calm, private urge-interruption experience that creates space between an impulse and an action without shame, surveillance, or punitive streak mechanics.",
    problem:
      "During intense urges, people have limited attention and may avoid tools that feel judgmental, complicated, or designed around failure and guilt.",
    solution:
      "Still offers a quiet sequence of intensity check-ins, breathing, attention shifts, riddles, and reset exercises designed to restore agency in the moment.",
    role: "Founder and product designer. Behavioral flow, privacy approach, visual system, and frontend implementation.",
    features: [
      "Urge intensity check-in",
      "Guided reset space",
      "Attention-shift exercises",
      "Riddle room",
      "Private local progress",
      "Calm, non-punitive interaction design",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Local-first storage", "PWA"],
    note:
      "Still is a self-regulation aid, not medical treatment or a substitute for qualified professional support.",
  },
];
