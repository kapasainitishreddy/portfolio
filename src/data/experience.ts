export interface Role {
  title: string;
  organization: string;
  period: string;
  summary: string;
  bullets: string[];
}

export const experience: Role[] = [
  {
    title: "Forward Deployed Engineer (Freelance)",
    organization: "Independent / confidential early-stage AI work",
    period: "2024 - Present",
    summary: "Embedded delivery across AI workflows, data integration, production debugging, evaluation, and customer feedback loops.",
    bullets: [
      "Built Python/FastAPI and React/TypeScript workflows that connected LLMs, retrieval, APIs, persistence, logging, and human review into usable end-to-end systems.",
      "Shipped an embedded support copilot that cut first-response time by about 60% for covered workflows and moved from prototype to production in under four weeks.",
      "Replaced a manual reporting process with a production data pipeline that removed about 20 analyst-hours per week and maintained 99.5% uptime.",
      "Added evaluations, approval points, structured logs, retry handling, and runbooks so teams could inspect failures and operate the system after handoff.",
      "Ran tight feedback loops with end users and translated ambiguous requests into scoped changes, tests, demos, and measurable acceptance criteria.",
    ],
  },
  {
    title: "Business Data Analyst",
    organization: "Augmentare Inc.",
    period: "Aug 2024 - Present",
    summary: "Data pipelines, analytics, automation, quality controls, and stakeholder-facing decision support.",
    bullets: [
      "Built Python, SQL, and Pandas workflows across datasets up to 2M rows for validation, anomaly detection, recurring analysis, and operational reporting.",
      "Delivered 25+ dashboards, internal tools, and automations used across 65+ stakeholder workflows, improving recurring reporting efficiency by 28%.",
      "Defined KPIs, acceptance criteria, test plans, and repeatable data-quality checks before analytical and automation changes were released.",
      "Integrated API and relational data sources while documenting schemas, transformations, assumptions, and exception-handling rules.",
      "Turned loosely framed business questions into measurable hypotheses, reproducible analysis, concise findings, and follow-up actions.",
    ],
  },
  {
    title: "AI Model Trainer / Evaluation Analyst",
    organization: "Outlier AI · Freelance",
    period: "Sep 2024 - Present",
    summary: "Hands-on evaluation of reasoning, factuality, coding quality, safety, and instruction adherence in model outputs.",
    bullets: [
      "Evaluated 1,800+ model outputs for factual accuracy, reasoning quality, coding and data correctness, safety, relevance, and instruction adherence.",
      "Documented 30+ recurring failure modes and converted them into reusable rubrics, regression-style checks, and reviewer guidance.",
      "Tested adversarial, ambiguous, and edge-case prompts to surface hallucinations, brittle behavior, and inconsistent reasoning patterns.",
      "Authored corrected answers, reviewer notes, and evidence-based adjudication rationale under changing evaluation standards.",
      "Used Python and SQL knowledge during technical reviews while keeping traceable records of model behavior and quality decisions.",
    ],
  },
  {
    title: "Operations Data Analyst",
    organization: "VN Technologies",
    period: "Jun 2020 - Jan 2023",
    summary: "Operational analytics, data quality, recurring reporting, and cross-functional issue resolution.",
    bullets: [
      "Developed SQL and Python pipelines, KPI trackers, recurring reports, and data-quality routines for high-volume operational datasets.",
      "Reduced analysis turnaround by 30% through reusable scripts, standardized queries, exception handling, and documented workflows.",
      "Reconciled multi-source records and investigated conflicting values to improve the reliability of downstream reporting.",
      "Monitored trends, outliers, and exceptions and converted raw operational data into concise root-cause findings and next actions.",
      "Partnered with technical and business stakeholders on requirements, validation, issue resolution, and reproducible reporting methods.",
    ],
  },
];
