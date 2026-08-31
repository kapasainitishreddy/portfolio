export type FeaturedPortfolioItem = {
  id: string;
  name: string;
  category: string;
  status: string;
  summary: string;
  proof: string[];
  stack: string[];
  sourceRepo: string;
  liveHref?: string;
};

/**
 * The five products Sai explicitly wants foregrounded on the portfolio.
 * Copy is intentionally evidence-based and avoids production claims that the
 * source repositories do not support yet.
 */
export const featuredPortfolio: FeaturedPortfolioItem[] = [
  {
    id: "vakya",
    name: "Vakya",
    category: "Real-time language intelligence",
    status: "Demo verified",
    summary:
      "A privacy-first translation and subtitle assistant spanning a Chrome extension, realtime speech pipeline, web surfaces, and an Android path.",
    proof: [
      "Chrome extension builds, typechecks, and loads with draggable subtitles",
      "Explicit tab-audio consent plus demo/live modes",
      "Realtime WebSocket path with local STT smoke support",
    ],
    stack: ["Plasmo", "Next.js", "FastAPI", "WebSockets", "Flutter", "Speech AI"],
    sourceRepo: "kapasainitishreddy/vakya",
  },
  {
    id: "circuit",
    name: "Circuit",
    category: "AI career learning and simulation",
    status: "Active build",
    summary:
      "A role-learning platform that combines structured curricula, large practice catalogs, simulations, evidence-backed proof, interview rehearsal, and certification prep.",
    proof: [
      "300 learner-visible lessons across five 60-lesson tracks",
      "15,600 versioned SQL, DSA, and Forward-Deployed practice items",
      "Evidence-backed Proof surface for competency artifacts",
    ],
    stack: ["Expo", "React Native", "TypeScript", "NativeWind", "Cloudflare", "Vitest"],
    sourceRepo: "kapasainitishreddy/ai-atlas",
    liveHref: "https://circuit.syrava.com",
  },
  {
    id: "appgraft",
    name: "AppGraft",
    category: "Software capability transplant platform",
    status: "Active build",
    summary:
      "A company-first system that maps repositories, evaluates reusable capabilities, produces adaptation and rollback contracts, and prepares human-reviewed draft pull requests.",
    proof: [
      "Repository architecture, dependency, migration, and schema analysis",
      "CycloneDX SBOM plus license-policy evidence",
      "Isolated appgraft/* branches, draft PRs, and sanitized execution receipts",
    ],
    stack: ["GitHub", "Cloudflare Workers", "D1", "TypeScript", "SBOM", "OAuth"],
    sourceRepo: "kapasainitishreddy/appgraft",
  },
  {
    id: "edge",
    name: "Edge",
    category: "Local-first model studio",
    status: "Local-first studio",
    summary:
      "A compact classifier studio built around one clear loop: collect, train, inspect, test, and export, with offline inference and inspectable model evidence.",
    proof: [
      "Local TF-IDF plus logistic-regression training and evaluation",
      "Holdout, macro-F1, label-level, mistake, and confidence inspection",
      "Portable JavaScript/TypeScript export for Expo, web, React Native, or Node",
    ],
    stack: ["FastAPI", "SQLite", "TypeScript", "Python", "React Native export", "Docker"],
    sourceRepo: "kapasainitishreddy/syrava-edge-",
  },
  {
    id: "unsaid",
    name: "Unsaid",
    category: "Private reflection and journaling",
    status: "Mobile monorepo",
    summary:
      "A private place to write what should not be sent, combining journaling and venting with an AI companion, safety checks, data export, and native mobile shells.",
    proof: [
      "Fastify and SQLite backend with mobile web client",
      "Native iOS and Android shell through Capacitor",
      "42 backend tests documented as passing in the source repository",
    ],
    stack: ["Fastify", "SQLite", "Capacitor", "Clerk", "RevenueCat", "Node.js"],
    sourceRepo: "kapasainitishreddy/unsent",
  },
];
