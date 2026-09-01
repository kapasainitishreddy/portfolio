# Projects Showcase (standalone)

A fully self-contained, single-file portfolio site — nine projects curated for
job relevance (AI agent orchestration, RAG, text-to-SQL, MCP integration, and
AI governance tooling, plus three shipped forward-deployed engagements), with
**no résumé and no experience/employment section**. Just the work.

Curated deliberately: no personal/hobby concept apps (the old lineup —
Keeply, Vakya, Un-em, etc. — is gone). Every entry here maps to an in-demand
2026 AI engineering or governance skill.

## Run it

No build step, no dependencies. Open `index.html` directly in a browser, or
serve the folder statically:

```
npx serve .
```

## Structure

- `index.html` — the entire site (markup, styles, and vanilla JS inline)
- `assets/` — snapshot images for all six AI-agent/governance projects
  (RiskLedger, Research Swarm, QueryPilot, MCP Bridge, GovSeal, TraceGrid);
  the three NDA'd FDE case studies render a generated placeholder

## The nine projects

1. **RiskLedger** — AI use case registry & risk tiering (NIST AI RMF / EU AI Act)
2. **Research Swarm** — multi-agent enterprise research system (LangGraph/CrewAI)
3. **QueryPilot** — text-to-SQL data analyst agent
4. **MCP Bridge** — Model Context Protocol tool connector for AI agents
5. **GovSeal** — post-deployment governance console
6. **TraceGrid** — LLM evaluation & audit platform
7. **Embedded Support Copilot** — shipped FDE case study (NDA)
8. **Production Data & Ops Pipeline** — shipped FDE case study (NDA)
9. **Customer Onboarding Agent** — shipped FDE case study (NDA)

## Editing

All projects live in the `PROJECTS` array near the top of the `<script>`
block in `index.html`. Add an object with the same shape (id, name, category,
status, tags, summary, problem, solution, role, features, technologies, and
optionally image/note/comingSoon) and it appears in the grid and filters
automatically.
