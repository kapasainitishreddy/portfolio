export interface GitHubProject {
  name: string;
  repo: string;
  href: string;
  category: string;
  summary: string;
  facts: string[];
  stack: string[];
  note?: string;
}

/**
 * Curated public builds. Every capability below is taken from the repository's
 * current README / project documentation; roadmap-only ideas are intentionally
 * excluded from the visible proof points.
 */
export const githubProjects: GitHubProject[] = [
  {
    name: "Scribe Studio",
    repo: "scribe-studio",
    href: "https://github.com/kapasainitishreddy/scribe-studio",
    category: "AI filmmaking · 3D product",
    summary:
      "A screenplay-to-previs filmmaking workspace that turns written scenes into an interactive 3D storyboard workflow instead of stopping at text generation.",
    facts: [
      "Screenplay editor connected to interactive 3D previs",
      "React Three Fiber viewport with camera and transform controls",
      "IndexedDB-backed offline-first workspace",
    ],
    stack: ["React", "React Three Fiber", "Gemini", "IndexedDB", "3D"],
  },
  {
    name: "ViralEdit AI",
    repo: "videoediting",
    href: "https://github.com/kapasainitishreddy/videoediting",
    category: "AI video · local-first media",
    summary:
      "A mobile-first editor that analyzes a reference short-form video, extracts its cut rhythm and transitions, then maps a user's clips onto a reproducible edit pipeline.",
    facts: [
      "12 transitions rendered through FFmpeg xfade",
      "7 color grades plus 720×1280 MP4 export",
      "Local-first editing with IndexedDB + FFmpeg WebAssembly",
    ],
    stack: ["Next.js 16", "FFmpeg WASM", "Zustand", "IndexedDB", "yt-dlp"],
    note: "The repository explicitly documents remaining real-device and platform-download testing limits.",
  },
  {
    name: "ProofTimeline",
    repo: "PoT",
    href: "https://github.com/kapasainitishreddy/PoT",
    category: "Evidence workflow · privacy",
    summary:
      "A local-first evidence organizer for turning truthful user-provided screenshots, receipts, messages, documents, and notes into structured evidence packets without fabricating or modifying source material.",
    facts: [
      "SHA-256 fingerprints computed client-side for uploaded files",
      "Zero-key local browser mode before cloud services are configured",
      "Clerk + Supabase architecture with private storage and RLS",
    ],
    stack: ["Next.js 14", "TypeScript", "Supabase", "Clerk", "Zod"],
  },
  {
    name: "Still",
    repo: "still-hack-for-humanity-2026",
    href: "https://github.com/kapasainitishreddy/still-hack-for-humanity-2026",
    category: "Hackathon · local-first mobile",
    summary:
      "A private, local-first urge-interruption and recovery-support app with on-device reflection tools, progress analytics, and explicit boundaries against diagnosis or behavioral prediction.",
    facts: [
      "Hackathon work window: August 7–September 4, 2026",
      "Seven-day recovery summaries and on-device progress analytics",
      "SQLite + SecureStore with privacy and local-data deletion hardening",
    ],
    stack: ["React Native", "Expo", "TypeScript", "SQLite", "SecureStore"],
    note: "Public judging snapshot for Hack for Humanity Summer 2026.",
  },
  {
    name: "Chisel",
    repo: "Chisel",
    href: "https://github.com/kapasainitishreddy/Chisel",
    category: "Android · guided facial routines",
    summary:
      "An Android facial-routine assistant built around camera-assisted analysis, guided routines, grooming tools, and persistent daily plans.",
    facts: [
      "Six documented screens: Home, Analyze, Affirm, Meditate, Groom, and Connect",
      "Live camera path uses browser FaceDetector when available with graceful fallback",
      "Capacitor Android wrapper around a self-contained HTML, CSS, and JavaScript app",
    ],
    stack: ["Capacitor", "Android", "JavaScript", "FaceDetector", "localStorage"],
    note: "The public project describes heuristic facial scoring and a debug-signed APK. It is not presented as a medical or diagnostic system.",
  },
];
