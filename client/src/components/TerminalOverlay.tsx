import { useState, useRef, useEffect, useCallback } from "react";
import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { site, hero, about, skillGroups, projects, experience, principles } from "@/data/portfolio";

interface TerminalLine {
  type: "input" | "output" | "error" | "system" | "success" | "info";
  content: string;
}

const BOOT_SEQUENCE = [
  "SNRK-OS v2.6.1 — Portfolio Terminal Interface",
  "Copyright (c) 2024 Sai Nitish Reddy Kapa",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "[  OK  ] Loaded communications.service",
  "[  OK  ] Loaded analytics.service",
  "[  OK  ] Loaded ai-governance.service",
  "[  OK  ] Started portfolio.target",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "Type 'help' to see available commands.",
  "",
];

function buildOutput(cmd: string, setTheme: (t: any) => void): TerminalLine[] {
  const trimmed = cmd.trim().toLowerCase();
  const parts = trimmed.split(/\s+/);

  if (trimmed === "clear" || trimmed === "cls") return [{ type: "system", content: "__CLEAR__" }];

  if (trimmed === "help") {
    return [
      { type: "info", content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
      { type: "success", content: "SNRK-OS Command Reference" },
      { type: "info", content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
      { type: "output", content: "  NAVIGATION" },
      { type: "output", content: "  cd ~              → Scroll to Home" },
      { type: "output", content: "  cat about.md      → About section" },
      { type: "output", content: "  ls skills/        → Skills & capabilities" },
      { type: "output", content: "  ls projects/      → All projects" },
      { type: "output", content: "  cat resume.json   → Work experience" },
      { type: "output", content: "  mail -s contact   → Contact section" },
      { type: "output", content: "" },
      { type: "output", content: "  DETAILS" },
      { type: "output", content: "  whoami            → Identity overview" },
      { type: "output", content: "  cat principles    → Working principles" },
      { type: "output", content: "  ls projects/<id>  → Project details" },
      { type: "output", content: "  ping github       → Open GitHub" },
      { type: "output", content: "  ping linkedin     → Open LinkedIn" },
      { type: "output", content: "" },
      { type: "output", content: "  SYSTEM" },
      { type: "output", content: "  theme <name>      → cyber | space | ink | term" },
      { type: "output", content: "  clear             → Clear terminal" },
      { type: "output", content: "  exit              → Close terminal" },
      { type: "info", content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
    ];
  }

  if (trimmed === "whoami") {
    return [
      { type: "success", content: site.name },
      { type: "output", content: `Roles:    ${site.roles.join(" | ")}` },
      { type: "output", content: `Email:    ${site.email}` },
      { type: "output", content: `Location: ${site.location}` },
      { type: "info", content: "" },
      { type: "output", content: hero.supporting[0] },
      { type: "info", content: "" },
      { type: "info", content: `STATUS: ${hero.status}` },
    ];
  }

  if (trimmed === "cat about.md") {
    return [
      { type: "success", content: `# ${about.heading}` },
      { type: "info", content: "" },
      ...about.paragraphs.map((p) => ({ type: "output" as const, content: p })),
      { type: "info", content: "" },
      { type: "success", content: "## Core Values" },
      ...about.keywords.map((k) => ({ type: "output" as const, content: `  [${k.word}] ${k.note}` })),
    ];
  }

  if (trimmed === "ls skills/" || trimmed === "ls skills") {
    return [
      { type: "success", content: "skills/" },
      { type: "info", content: "" },
      ...skillGroups.flatMap((g) => [
        { type: "info" as const, content: `  ${g.label}/` },
        ...g.skills.map((s) => ({ type: "output" as const, content: `    ├── ${s}` })),
        { type: "output" as const, content: "" },
      ]),
    ];
  }

  if (trimmed === "ls projects/" || trimmed === "ls projects") {
    return [
      { type: "success", content: "projects/" },
      { type: "info", content: "" },
      ...projects.map((p) => ({
        type: "output" as const,
        content: `  ${p.id.padEnd(22)} [${p.status.padEnd(18)}]  ${p.category}`,
      })),
      { type: "info", content: "" },
      { type: "output", content: "  Use: ls projects/<id> for details" },
    ];
  }

  if (trimmed === "cat resume.json") {
    return [
      { type: "success", content: "resume.json" },
      { type: "info", content: "" },
      ...experience.flatMap((e) => [
        { type: "success" as const, content: `  ${e.title} @ ${e.org}` },
        { type: "info" as const, content: `  Period: ${e.period}` },
        ...e.focus.map((f) => ({ type: "output" as const, content: `    • ${f}` })),
        { type: "output" as const, content: "" },
      ]),
    ];
  }

  if (trimmed === "mail -s contact" || trimmed === "contact") {
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300);
    return [
      { type: "success", content: "Opening contact section..." },
      { type: "output", content: `To: ${site.email}` },
    ];
  }

  if (trimmed === "cd ~" || trimmed === "cd" || trimmed === "home") {
    setTimeout(() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }), 300);
    return [{ type: "success", content: "Navigating to home..." }];
  }

  if (trimmed === "cat principles") {
    return [
      { type: "success", content: "principles.md" },
      { type: "info", content: "" },
      ...principles.map((p, i) => [
        { type: "info" as const, content: `  [${String(i + 1).padStart(2, "0")}] ${p.title}` },
        { type: "output" as const, content: `       ${p.body}` },
        { type: "output" as const, content: "" },
      ]).flat(),
    ];
  }

  if (trimmed === "ping github") {
    setTimeout(() => window.open("https://github.com/kapasainitishreddy", "_blank"), 200);
    return [{ type: "success", content: "Opening GitHub profile..." }];
  }

  if (trimmed === "ping linkedin") {
    setTimeout(() => window.open("https://www.linkedin.com/in/kapasainitishreddy", "_blank"), 200);
    return [{ type: "success", content: "Opening LinkedIn profile..." }];
  }

  // Project details
  const projMatch = trimmed.match(/^ls projects\/(.+)/);
  if (projMatch) {
    const p = projects.find((proj) => proj.id === projMatch[1]);
    if (!p) return [{ type: "error", content: `Project not found: ${projMatch[1]}` }];
    return [
      { type: "success", content: `projects/${p.id}/` },
      { type: "info", content: "" },
      { type: "output", content: `  Name:     ${p.name}` },
      { type: "output", content: `  Category: ${p.category}` },
      { type: "output", content: `  Status:   ${p.status}` },
      { type: "output", content: `  Tags:     ${p.tags.join(", ")}` },
      { type: "info", content: "" },
      { type: "success", content: "  Summary" },
      { type: "output", content: `  ${p.summary}` },
      { type: "info", content: "" },
      { type: "success", content: "  Problem" },
      { type: "output", content: `  ${p.problem}` },
      { type: "info", content: "" },
      { type: "success", content: "  Solution" },
      { type: "output", content: `  ${p.solution}` },
      { type: "info", content: "" },
      { type: "success", content: "  Features" },
      ...p.features.map((f) => ({ type: "output" as const, content: `    • ${f}` })),
      { type: "info", content: "" },
      { type: "success", content: "  Stack" },
      { type: "output", content: `    ${p.technologies.join(" · ")}` },
    ];
  }

  // Theme switching
  const themeMatch = trimmed.match(/^theme\s+(\w+)/);
  if (themeMatch) {
    const map: Record<string, string> = { cyber: "cyberpunk", cyberpunk: "cyberpunk", space: "space", ink: "ink", term: "terminal", terminal: "terminal" };
    const target = map[themeMatch[1]];
    if (target) {
      setTimeout(() => setTheme(target), 300);
      return [{ type: "success", content: `Switching theme to: ${target}` }];
    }
    return [{ type: "error", content: `Unknown theme: ${themeMatch[1]}. Options: cyber, space, ink, term` }];
  }

  // Navigation shortcuts
  const navMap: Record<string, string> = {
    "cd about": "about", "cd skills": "skills", "cd projects": "projects",
    "cd experience": "experience", "cd contact": "contact",
  };
  if (navMap[trimmed]) {
    const id = navMap[trimmed];
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    return [{ type: "success", content: `Navigating to #${id}...` }];
  }

  if (trimmed === "exit" || trimmed === "quit") {
    return [{ type: "system", content: "__EXIT__" }];
  }

  if (trimmed === "") return [];

  return [{ type: "error", content: `Command not found: ${cmd.trim()}. Type 'help' for available commands.` }];
}

export default function TerminalOverlay({ onThemeChange }: { onThemeChange: (t: string) => void }) {
  const { config, setTheme } = usePortfolioTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Boot sequence on first open
  useEffect(() => {
    if (!isOpen || booted) return;
    setBooted(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, { type: "system", content: BOOT_SEQUENCE[i] }]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [isOpen, booted]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  // Global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "`") || (e.ctrlKey && e.key === "t")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const processCommand = useCallback((cmd: string) => {
    if (!cmd.trim()) return;
    const result = buildOutput(cmd, (t) => { setTheme(t); onThemeChange(t); });

    if (result.length === 1 && result[0].content === "__CLEAR__") {
      setLines([]);
      return;
    }
    if (result.length === 1 && result[0].content === "__EXIT__") {
      setLines((prev) => [...prev, { type: "input", content: cmd }, { type: "system", content: "Closing terminal..." }]);
      setTimeout(() => setIsOpen(false), 500);
      return;
    }

    setLines((prev) => [...prev, { type: "input", content: cmd }, ...result]);
    setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);
  }, [setTheme, onThemeChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(idx);
      setInput(idx === -1 ? "" : history[idx]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = ["help", "clear", "cd ~", "cat about.md", "ls skills/", "ls projects/", "cat resume.json", "mail -s contact", "whoami", "cat principles", "ping github", "ping linkedin", "theme ", "exit"];
      const match = cmds.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setLines([]);
    }
  };

  const getColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input": return "rgba(255,255,255,0.9)";
      case "output": return "rgba(200,255,200,0.6)";
      case "error": return "#ff5555";
      case "system": return "rgba(0,255,65,0.4)";
      case "success": return "#00ff41";
      case "info": return config.accentColor;
    }
  };

  return (
    <>
      {/* Terminal toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1001,
          width: "52px",
          height: "52px",
          borderRadius: "8px",
          background: isOpen ? config.accentColor : `${config.accentColor}20`,
          border: `2px solid ${config.accentColor}`,
          color: isOpen ? config.bgColor : config.accentColor,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "1rem",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: `0 0 20px ${config.accentColor}${isOpen ? "80" : "40"}`,
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.05em",
        }}
        title="Toggle Terminal (Ctrl+`)"
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {isOpen ? "×" : ">_"}
      </button>

      {/* Terminal window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "5.5rem",
            right: "2rem",
            width: "min(720px, calc(100vw - 4rem))",
            height: "460px",
            zIndex: 1000,
            background: "rgba(4, 9, 4, 0.97)",
            border: `1px solid ${config.accentColor}50`,
            borderRadius: "8px",
            boxShadow: `0 0 50px ${config.accentColor}25, 0 20px 60px rgba(0,0,0,0.9)`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "'JetBrains Mono', monospace",
            backdropFilter: "blur(20px)",
            animation: "termSlideUp 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div
            style={{
              padding: "0.6rem 1rem",
              background: `${config.accentColor}12`,
              borderBottom: `1px solid ${config.accentColor}25`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div onClick={() => setIsOpen(false)} style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57", cursor: "pointer" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ fontSize: "0.7rem", color: config.accentColor, letterSpacing: "0.08em" }}>
              snrk@portfolio — SNRK-OS Terminal
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["help", "ls projects/", "whoami"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => { processCommand(cmd); setInput(""); }}
                  style={{
                    background: `${config.accentColor}15`,
                    border: `1px solid ${config.accentColor}25`,
                    color: config.accentColor,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "3px",
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${config.accentColor}28`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${config.accentColor}15`; }}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Output */}
          <div
            ref={outputRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0.75rem 1rem",
              scrollbarWidth: "thin",
              scrollbarColor: `${config.accentColor}30 transparent`,
            }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  fontSize: "0.77rem",
                  lineHeight: 1.65,
                  color: getColor(line.type),
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  display: "flex",
                  gap: "0.4rem",
                }}
              >
                {line.type === "input" && (
                  <span style={{ flexShrink: 0, color: config.accentColor }}>
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>snrk@portfolio</span>
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>:~$</span>
                  </span>
                )}
                <span>{line.type === "input" ? ` ${line.content}` : line.content}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.6rem 1rem",
              borderTop: `1px solid ${config.accentColor}18`,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexShrink: 0,
              background: `${config.accentColor}05`,
            }}
          >
            <span style={{ color: config.accentColor, fontSize: "0.8rem", flexShrink: 0, whiteSpace: "nowrap" }}>
              <span style={{ color: "rgba(255,255,255,0.35)" }}>snrk@portfolio</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>:~$</span>
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "rgba(200,255,200,0.9)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                caretColor: config.accentColor,
              }}
              placeholder="type a command... (Tab to autocomplete)"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes termSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
