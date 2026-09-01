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
    name: "FDE Case Study — Embedded Support Copilot",
    category: "Forward Deployed · AI in Production",
    status: "Shipped",
    tags: ["AI", "Deployment", "Integration"],
    inkPattern: "network",
    summary:
      "Embedded with a seed-stage startup as a Forward Deployed Engineer to design, integrate, and ship an AI support copilot into their live customer workflow — taking it from a demo that impressed to a system the team relied on daily.",
    problem:
      "The team had a promising LLM prototype but nothing in production. Support agents drowned in repetitive tickets, answers were inconsistent, and the prototype had no connection to the company's real knowledge base, ticketing system, or approval process.",
    solution:
      "I sat with the support team for the first week, mapped the real workflow, and built a copilot wired into their live help-center content and ticketing system. It drafted grounded answers with citations, routed edge cases to a human, and logged every interaction for review. We shipped a thin working slice in two weeks, then iterated weekly from real usage.",
    role: "Forward Deployed Engineer — discovery, architecture, integration, RAG pipeline, evaluation harness, and production rollout.",
    features: [
      "Proof: first-response time cut ~60% on covered ticket types",
      "Proof: ~45% of routine tickets resolved with copilot-drafted answers",
      "Proof: from prototype to production in under 4 weeks",
      "Grounded, cited answers from the live knowledge base",
      "Human approval before customer-facing sends",
      "Full interaction logging for evaluation and audit",
    ],
    technologies: ["Python", "LLM orchestration", "RAG", "PostgreSQL", "Ticketing API", "Next.js"],
    note:
      "Client and customer names are withheld under NDA. Metrics reflect measured outcomes of the engagement on the workflows the copilot covered.",
  },
  {
    id: "fde-data-pipeline",
    name: "FDE Case Study — Production Data & Ops Pipeline",
    category: "Forward Deployed · Data Integration",
    status: "Shipped",
    tags: ["Data", "Integration", "Deployment"],
    inkPattern: "streams",
    summary:
      "Replaced a founder's fragile spreadsheet-and-copy-paste reporting ritual with a deployed data pipeline and live operations dashboard, wired directly into the systems the business already ran on.",
    problem:
      "Every Monday the founding team spent hours manually pulling numbers from four disconnected tools into a spreadsheet. The reports were late, error-prone, and out of date the moment they were finished — and no one trusted them enough to act quickly.",
    solution:
      "Embedded with the ops and founding team to understand which decisions the numbers actually drove, then built an automated pipeline that ingested from their live sources, reconciled the data, and surfaced it in a real-time dashboard with alerting. I handed over runbooks so the team could own it.",
    role: "Forward Deployed Engineer — requirements discovery, pipeline engineering, dashboard build, and operational handover.",
    features: [
      "Proof: ~20 analyst-hours/week of manual reporting eliminated",
      "Proof: reporting latency dropped from weekly to near real-time",
      "Proof: 99.5% pipeline uptime across the engagement",
      "Automated ingestion and reconciliation across four sources",
      "Live operations dashboard with threshold alerting",
      "Runbooks and docs for team self-service ownership",
    ],
    technologies: ["Python", "SQL", "PostgreSQL", "Supabase", "Power BI", "Scheduled jobs"],
    note:
      "Client and customer names are withheld under NDA. Metrics reflect measured outcomes of the engagement.",
  },
  {
    id: "fde-onboarding-agent",
    name: "FDE Case Study — Customer Onboarding Agent",
    category: "Forward Deployed · Agent Automation",
    status: "Shipped",
    tags: ["AI", "Deployment", "Product"],
    inkPattern: "graph",
    summary:
      "Designed and deployed a human-in-the-loop onboarding agent that walked each new customer through setup, collected the right data, and unblocked the team — turning a three-week manual scramble into a guided, days-long flow.",
    problem:
      "Onboarding new customers was entirely manual: back-and-forth emails, missed steps, and a founder personally chasing every account. It didn't scale, and slow onboarding was quietly costing the startup early customers.",
    solution:
      "After shadowing two real onboardings, I built an agent that guided customers step by step, validated their inputs, integrated with the product's provisioning APIs, and escalated anything ambiguous to a human with full context. Nothing irreversible happened without a person approving it.",
    role: "Forward Deployed Engineer — workflow design, agent orchestration, API integration, and human-approval guardrails.",
    features: [
      "Proof: onboarding time cut from ~3 weeks to ~4 days",
      "Proof: founder freed from ~90% of manual onboarding steps",
      "Proof: zero irreversible actions taken without human approval",
      "Guided, validated step-by-step customer flow",
      "Deep integration with product provisioning APIs",
      "Human escalation with full context on ambiguity",
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
