export type GitHubProject = {
  name: string;
  repo: string;
  href: string;
  summary: string;
  evidence: string[];
  stack: string[];
  boundary?: string;
};

export const githubProjects: GitHubProject[] = [
  {
    name: "Scribe Studio",
    repo: "scribe-studio",
    href: "https://github.com/kapasainitishreddy/scribe-studio",
    summary:
      "A screenplay-to-previs filmmaking tool that combines screenplay editing, interactive 3D staging, and agentic automation in one desktop-oriented workflow.",
    evidence: [
      "React Three Fiber and Three.js power the 3D studio surface.",
      "Google ADK and Google GenAI packages are wired into the project for agentic and generative workflows.",
      "The repo includes Tauri, Vitest evaluation scripts, and Playwright end-to-end testing.",
    ],
    stack: ["React 19", "TypeScript", "React Three Fiber", "Three.js", "Tauri", "Google ADK", "Vitest", "Playwright"],
    boundary: "Public repository. The portfolio describes only capabilities visible in the repository and its README/package metadata.",
  },
  {
    name: "Chisel",
    repo: "Chisel",
    href: "https://github.com/kapasainitishreddy/Chisel",
    summary:
      "An Android facial-routine assistant built as a Capacitor-wrapped local web app with camera-assisted analysis, guided routines, and persistent daily plans.",
    evidence: [
      "The Android app exposes six screens: Home, Analyze, Affirm, Meditate, Groom, and Connect.",
      "The live camera path uses browser FaceDetector when available and falls back gracefully.",
      "The repository includes Android build/deploy scripts, tests, Supabase assets, and a self-contained HTML/CSS/JS app shell.",
    ],
    stack: ["Capacitor", "Android", "HTML", "CSS", "JavaScript", "FaceDetector", "localStorage"],
    boundary: "The public README describes a debug-signed APK and heuristic facial scoring, not a medical or diagnostic system.",
  },
  {
    name: "Still",
    repo: "still-hack-for-humanity-2026",
    href: "https://github.com/kapasainitishreddy/still-hack-for-humanity-2026",
    summary:
      "A local-first urge interruption and recovery-support app published as the Hack for Humanity Summer 2026 judging snapshot.",
    evidence: [
      "Hackathon-period work includes a private recovery dashboard, on-device analytics, and seven-day summaries.",
      "The app includes offline calming soundscapes, breathing and interruption reliability work, urge-log persistence, and streak handling.",
      "The public snapshot explicitly hardens local-data deletion and keeps the core experience useful offline.",
    ],
    stack: ["React Native", "Expo Router", "TypeScript", "SQLite", "SecureStore", "Local Authentication", "Reanimated"],
    boundary: "The repository explicitly states that Still is not a diagnostic, treatment, or mental-state prediction product.",
  },
  {
    name: "ViralEdit AI",
    repo: "videoediting",
    href: "https://github.com/kapasainitishreddy/videoediting",
    summary:
      "A mobile-first video editing system that analyzes reference edits, extracts pacing and transitions, and renders recreated timelines locally with FFmpeg WebAssembly.",
    evidence: [
      "The README documents 12 rendered transition types, 7 color grades, and 9:16 MP4 export.",
      "Cut detection, beat estimation, timeline mapping, and rendering run locally in the browser; AI enrichment is optional.",
      "Provider responses are normalized through one validation schema before they can alter edit-plan structure.",
    ],
    stack: ["Next.js 16", "React", "Tailwind", "FFmpeg WASM", "Zustand", "IndexedDB", "yt-dlp", "Docker"],
    boundary: "The repository notes that real-device footage and real social-platform URLs still need full end-to-end validation.",
  },
  {
    name: "ProofTimeline",
    repo: "PoT",
    href: "https://github.com/kapasainitishreddy/PoT",
    summary:
      "A documentation and evidence-packet builder designed around truthful user-provided records, deterministic packet generation, and local-first privacy.",
    evidence: [
      "Client-side SHA-256 fingerprints are computed for uploaded evidence in local-first mode.",
      "The README documents 8 evidence packet types, timeline merging, communications logs, follow-up tracking, and JSON/CSV export.",
      "The data model includes Supabase RLS, private storage, Clerk authentication, and a clearly separated mock Stripe path until production billing keys are configured.",
    ],
    stack: ["Next.js 14", "TypeScript", "Tailwind", "Clerk", "Supabase", "Stripe", "Zod", "React Hook Form"],
    boundary: "The app explicitly refuses fabricated evidence, legal-admissibility claims, or fake official documents; some billing and cloud persistence paths remain clearly labeled placeholders.",
  },
];
