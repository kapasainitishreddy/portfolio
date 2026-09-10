/**
 * Selected work rendered as expandable case-study cards.
 *
 * The first entries are Forward Deployed Engineer case studies from a
 * confidential freelance engagement with a seed-stage startup — client and
 * customer names are intentionally withheld. The final two are FDE × AI
 * governance projects that ship with a snapshot image.
 *
 * To add or edit a project:
 *  - keep `tags` to the values in `ProjectTag` so filtering keeps working
 *  - `status` may be any short string; "Coming Soon" renders a special label
 *  - `inkPattern` selects the background ink behaviour when the card is open
 *  - drop a screenshot at public/projects/<id>.svg (or .jpg/.png/.webp) and set
 *    the matching `image` field, otherwise a generated placeholder is shown
 *  - links are optional; omit any you do not have yet
 */

export type ProjectTag =
  | "AI"
  | "Governance"
  | "Deployment"
  | "Integration"
  | "Data"
  | "Product"
  | "Platform"
  | "Privacy";

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

export interface ProjectOutcome {
  value: string;
  label: string;
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
  jobTitle?: string;
  jobPeriod?: string;
  outcomes?: ProjectOutcome[];
  features: string[];
  technologies: string[];
  /** Optional path under /public, e.g. "/projects/govseal.svg". */
  image?: string;
  links?: ProjectLink[];
  /** Optional respectful / safety / confidentiality note shown in the case study. */
  note?: string;
}

export const projects: Project[] = [
  // ── Forward Deployed Engineer case studies (confidential freelance engagement) ──
  {
    id: "fde-support-copilot",
    name: "Embedded Support Copilot",
    category: "Support + CX",
    status: "Shipped",
    tags: ["AI", "Deployment", "Integration"],
    inkPattern: "network",
    jobTitle: "Forward Deployed Engineer (Freelance)",
    jobPeriod: "2024 - Present",
    outcomes: [
      { value: "~60%", label: "faster first response on covered ticket types" },
      { value: "~45%", label: "routine tickets resolved from copilot drafts" },
      { value: "<4 weeks", label: "prototype-to-production delivery" },
    ],
    summary:
      "Took an LLM support prototype into a real customer-support workflow by connecting approved knowledge, ticket context, review gates, and evaluation logging.",
    problem:
      "The startup had a promising demo, but it was disconnected from the knowledge base, ticketing flow, and approval process. Agents still handled repetitive work manually, and an unsupported model answer could become a customer-facing mistake.",
    solution:
      "I mapped the live support workflow, wired retrieval to approved help content, added cited drafts and human review, integrated the ticketing path, and logged interactions so quality could be evaluated after launch. The first usable slice shipped quickly, then improved from real agent feedback.",
    role: "Discovery, architecture, RAG pipeline, ticketing integration, evaluation harness, human-review controls, and production rollout.",
    features: [
      "Grounded answers from approved support content",
      "Citations attached to drafted responses",
      "Human approval before customer-facing sends",
      "Unsupported-question fallback and escalation",
      "Interaction logging for evaluation and debugging",
    ],
    technologies: ["Python", "LLM orchestration", "RAG", "PostgreSQL", "Ticketing API", "Next.js"],
    note:
      "Client and customer names are withheld under NDA. Metrics reflect measured outcomes of the engagement on the workflows the copilot covered.",
  },
  {
    id: "fde-data-pipeline",
    name: "Production Data & Ops Pipeline",
    category: "Operations + Data",
    status: "Shipped",
    tags: ["Data", "Integration", "Deployment"],
    inkPattern: "streams",
    jobTitle: "Forward Deployed Engineer (Freelance)",
    jobPeriod: "2024 - Present",
    outcomes: [
      { value: "~20 hrs/week", label: "manual reporting work removed" },
      { value: "Near real-time", label: "reporting cadence after automation" },
      { value: "99.5%", label: "pipeline uptime across the engagement" },
    ],
    summary:
      "Replaced a recurring spreadsheet-and-copy-paste reporting process with an automated data pipeline, reconciliation layer, dashboard, alerts, and operational handoff.",
    problem:
      "The founding team manually pulled numbers from four disconnected systems every week. Reporting was slow, fragile, and stale by the time it was assembled.",
    solution:
      "I identified the decisions the reports actually supported, automated ingestion from the live sources, made joins and business rules deterministic, added validation and failure alerts, and delivered a current operating view with runbooks for team ownership.",
    role: "Requirements discovery, source integration, pipeline engineering, validation, dashboard delivery, alerting, and operational handoff.",
    features: [
      "Automated ingestion across four live sources",
      "Deterministic reconciliation and schema validation",
      "Live operations dashboard with threshold alerts",
      "Failure handling and idempotent scheduled jobs",
      "Runbooks and documentation for self-service ownership",
    ],
    technologies: ["Python", "SQL", "PostgreSQL", "Supabase", "Power BI", "Scheduled jobs"],
    note:
      "Client and customer names are withheld under NDA. Metrics reflect measured outcomes of the engagement.",
  },
  {
    id: "fde-onboarding-agent",
    name: "Customer Onboarding Agent",
    category: "Customer onboarding",
    status: "Shipped",
    tags: ["AI", "Deployment", "Product"],
    inkPattern: "graph",
    jobTitle: "Forward Deployed Engineer (Freelance)",
    jobPeriod: "2024 - Present",
    outcomes: [
      { value: "~4 days", label: "onboarding time, down from ~3 weeks" },
      { value: "~90%", label: "manual founder onboarding steps removed" },
      { value: "0", label: "irreversible actions without human approval" },
    ],
    summary:
      "Converted a manual onboarding process into a guided state-based workflow that collected inputs, validated each step, called provisioning APIs, and stopped for human review when the path became ambiguous.",
    problem:
      "New customers moved through email threads, missed setup steps, and founder follow-up. The process was hard to scale and slow enough to hurt early customer momentum.",
    solution:
      "After shadowing real onboardings, I modeled the process as explicit states, validated inputs before progression, connected allowed provisioning actions, and packaged exceptions with context for human review instead of pretending the agent knew what to do.",
    role: "Workflow discovery, state-machine design, agent orchestration, provisioning API integration, validation, and human-approval guardrails.",
    features: [
      "State-based onboarding progression",
      "Input validation before workflow advancement",
      "Provisioning API actions with confirmation",
      "Human escalation with full context on ambiguity",
      "Retry and exception handling for failed steps",
    ],
    technologies: ["LLM agents", "Python", "REST APIs", "Next.js", "Webhooks"],
    note:
      "Client and customer names are withheld under NDA. Metrics reflect measured outcomes of the engagement.",
  },

  // ── Public technical projects: agent orchestration, data, and governance infra ──
  {
    id: "risk-ledger",
    name: "RiskLedger — AI Use Case Registry & Risk Tiering",
    category: "AI Governance · Pre-Deployment",
    status: "In Development",
    tags: ["Governance", "AI", "Platform"],
    inkPattern: "ledger",
    image: "/projects/risk-ledger.svg",
    summary:
      "A pre-deployment AI governance registry that catalogs every AI use case an organization runs, tiers it by risk against NIST AI RMF and EU AI Act categories, and tracks ownership and review cadence before anything ships.",
    problem:
      "Organizations deploying AI often have no single inventory of what's in production, who owns it, what data it touches, or how risky it is — so governance reviews happen reactively, after an incident, instead of before launch.",
    solution:
      "A structured registry where every AI use case gets a single-page entry — purpose, data sensitivity, model, owner, and an automated risk tier — with review reminders and an approval workflow before a system moves from pilot to production.",
    role: "Founder & engineer — risk-tiering methodology, registry schema, workflow design, and UI.",
    features: [
      "Risk tiering aligned to NIST AI RMF and EU AI Act categories",
      "Single-page use-case entries (purpose, data, owner, model, status)",
      "Pre-production review and approval workflow",
      "Automated review-cadence reminders by risk tier",
      "Cross-team ownership and accountability tracking",
      "Exportable registry for audits and board reporting",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Risk-scoring rules engine", "NIST AI RMF mapping"],
  },
  {
    id: "research-swarm",
    name: "Research Swarm — Multi-Agent Enterprise Research System",
    category: "Multi-Agent Systems",
    status: "Prototype",
    tags: ["AI", "Integration", "Platform"],
    inkPattern: "network",
    image: "/projects/research-swarm.svg",
    summary:
      "A role-based multi-agent system where a planner agent decomposes a research question, specialist agents gather and verify evidence from internal and external sources, and a synthesizer produces a cited brief — with every tool call logged for review.",
    problem:
      "Answering a nontrivial research question well requires searching multiple sources, cross-checking claims, and synthesizing — work that's slow for a single generalist agent to do reliably and impossible to audit as one opaque call.",
    solution:
      "A LangGraph/CrewAI-orchestrated crew of role-based agents (planner, researcher, verifier, writer) that decompose the task, call tools independently, cross-check each other's claims, and hand off to a synthesizer — with a full trace of every decision.",
    role: "Founder & engineer — agent role design, orchestration graph, tool integration, and evaluation harness.",
    features: [
      "Planner / researcher / verifier / writer role-based agent crew",
      "Tool use: web search, internal doc retrieval, calculator/code execution",
      "Cross-agent fact verification before synthesis",
      "Full trace of every tool call and agent decision",
      "Configurable stopping conditions and budget limits",
      "Exportable, cited research briefs",
    ],
    technologies: ["LangGraph", "CrewAI", "Python", "OpenAI / Anthropic APIs", "Vector search", "FastAPI"],
  },
  {
    id: "querypilot",
    name: "QueryPilot — Text-to-SQL Data Analyst Agent",
    category: "Data + AI Agent",
    status: "Prototype",
    tags: ["AI", "Data", "Product"],
    inkPattern: "streams",
    image: "/projects/querypilot.svg",
    summary:
      "A conversational analyst agent that turns plain-English business questions into validated SQL, runs it safely against a real schema, and returns a chart-ready answer with the query shown for review.",
    problem:
      "Business teams wait on analysts for routine questions that are simple in principle but require SQL and schema knowledge — creating a backlog for questions that don't need a human in the loop every time.",
    solution:
      "An agent that grounds itself in the real database schema, drafts SQL, validates it against a read-only sandbox before execution, and returns both the answer and the exact query run, so every result is checkable rather than trusted blindly.",
    role: "Founder & engineer — schema grounding, SQL generation and validation pipeline, safety sandboxing, and UI.",
    features: [
      "Schema-grounded SQL generation from plain-English questions",
      "Read-only sandbox validation before any query runs",
      "Query shown alongside every answer for auditability",
      "Automatic chart selection for numeric results",
      "Guardrails against destructive or out-of-scope queries",
      "Query history and reusable saved questions",
    ],
    technologies: ["Python", "LangChain", "SQL", "PostgreSQL", "FastAPI", "Evaluation harness"],
  },
  {
    id: "mcp-bridge",
    name: "MCP Bridge — Enterprise Tool Connector for AI Agents",
    category: "Agent Infrastructure",
    status: "In Development",
    tags: ["AI", "Integration", "Platform"],
    inkPattern: "graph",
    image: "/projects/mcp-bridge.svg",
    summary:
      "A Model Context Protocol server that exposes an organization's internal tools (ticketing, CRM, internal APIs) to any MCP-compatible AI agent through one governed, permissioned interface — instead of a bespoke integration per agent.",
    problem:
      "Every new AI agent a team adopts needs its own custom integration to internal tools, each with its own auth, rate limits, and blast radius — multiplying integration work and making it hard to audit what agents can actually touch.",
    solution:
      "A single MCP server that wraps internal tools behind one consistent, permissioned interface, so any MCP-compatible agent gets the same governed access — with every call logged and scoped per agent.",
    role: "Founder & engineer — MCP server design, tool adapters, permission model, and audit logging.",
    features: [
      "MCP-compliant server exposing internal tools to any compatible agent",
      "Per-agent, per-tool permission scoping",
      "Centralized rate limiting and quota enforcement",
      "Full call logging for audit and debugging",
      "Adapter pattern for adding new internal tools quickly",
      "Works with Claude, custom LangGraph agents, and IDE assistants",
    ],
    technologies: ["TypeScript", "Model Context Protocol (MCP)", "Node.js", "PostgreSQL", "OAuth"],
  },

  // ── FDE × AI Governance projects (with snapshots) ──
  {
    id: "govseal",
    name: "GovSeal — Deployment Governance Console",
    category: "FDE × AI Governance",
    status: "In Development",
    tags: ["Governance", "AI", "Platform"],
    inkPattern: "ledger",
    image: "/projects/govseal.svg",
    summary:
      "A governance console that sits on top of deployed AI systems — tracking evaluations, drift, human approvals, and a tamper-evident audit log — so the same team that ships a model can prove it's still behaving.",
    problem:
      "Forward deployed AI gets to production fast, but governance usually lags behind: no one can easily answer whether a live model still passes its evals, who approved the last prompt change, or what it did last Tuesday. Accountability becomes a scramble the moment something goes wrong.",
    solution:
      "GovSeal wraps a deployed system with continuous evaluation runs, drift and quality monitoring, a human-approval workflow for changes, and an immutable audit trail. It turns 'is this model still safe to run?' from a hopeful guess into a dashboard you can point an auditor at.",
    role: "Founder & engineer — governance model, evaluation harness, monitoring pipeline, approval workflow, and console UI.",
    features: [
      "Continuous evaluation runs against a versioned test suite",
      "Live drift and quality monitoring with alerting",
      "Human-approval workflow for prompt and model changes",
      "Tamper-evident audit log of every decision and change",
      "Per-model risk scoring and status at a glance",
      "Exportable compliance and incident reports",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "LLM evaluation", "Monitoring", "Audit logging"],
    note:
      "GovSeal is a governance and observability layer. It surfaces evidence, drift, and unresolved approvals — it keeps humans accountable rather than replacing their judgment.",
  },
  {
    id: "tracegrid",
    name: "TraceGrid — LLM Evaluation & Audit Platform",
    category: "FDE × AI Governance",
    status: "Prototype",
    tags: ["Governance", "AI", "Data"],
    inkPattern: "graph",
    image: "/projects/tracegrid.svg",
    summary:
      "An evaluation and audit workbench that scores every LLM response a deployed system produces — for accuracy, safety, bias, and policy compliance — and traces each answer back to its inputs, prompt, and grounding.",
    problem:
      "When a deployed AI system gives a bad answer, teams usually can't reconstruct why: which prompt version, which retrieved context, which model. Without that trace, governance is theater and fixes are guesswork.",
    solution:
      "TraceGrid captures the full trace of each response, runs it through configurable evaluators (factuality, safety, bias, tone, policy), and grids the results so patterns and regressions are obvious. Failing cases feed a red-team queue and a human review workflow, closing the loop between evaluation and improvement.",
    role: "Founder & engineer — trace capture, evaluator framework, scoring grid, red-team workflow, and reporting.",
    features: [
      "Full trace capture: input, prompt version, context, model, output",
      "Configurable evaluators for factuality, safety, bias, and policy",
      "Regression grid to catch quality drops release-over-release",
      "Red-team queue seeded from failing cases",
      "Human review and sign-off workflow",
      "Shareable evaluation and compliance reports",
    ],
    technologies: ["Python", "Next.js", "TypeScript", "LLM-as-judge", "Vector search", "PostgreSQL"],
    note:
      "TraceGrid is designed to make AI behavior legible and contestable — evaluator scores stay decomposable and reviewable rather than presented as a single opaque verdict.",
  },
];

/** Filter chips shown above the project grid. */
export const projectTags: ProjectTag[] = [
  "AI",
  "Governance",
  "Deployment",
  "Integration",
  "Data",
  "Product",
  "Platform",
];
