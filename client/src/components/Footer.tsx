import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { site, socials } from "@/data/portfolio";

export default function Footer() {
  const { theme, config } = usePortfolioTheme();
  const isTerminal = theme === "terminal";
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "2.5rem 0",
        background: config.bgColor,
        borderTop: `1px solid ${config.accentColor}18`,
        position: "relative",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${config.accentColor}60, transparent)`,
          boxShadow: `0 0 10px ${config.accentColor}40`,
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: `var(--t-font-display)`,
                fontSize: "0.85rem",
                fontWeight: 700,
                color: config.accentColor,
                marginBottom: "0.3rem",
                letterSpacing: isTerminal ? "0.05em" : "0.1em",
                textShadow: `0 0 10px ${config.accentColor}50`,
              }}
            >
              {isTerminal ? `// ${site.name}` : site.name}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.05em",
              }}
            >
              {isTerminal ? "// Complex ideas deserve clear communication." : "Complex ideas deserve clear communication."}
            </div>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            {[
              { label: "GitHub", url: socials.github },
              { label: "LinkedIn", url: socials.linkedin },
              { label: "Email", url: socials.email },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  transition: "color 0.2s ease",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = config.accentColor; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
              >
                {isTerminal ? `[${s.label.toLowerCase()}]` : s.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.08em",
            }}
          >
            {isTerminal ? `$ echo "© ${year} SNRK"` : `© ${year} Sai Nitish Reddy Kapa`}
          </div>
        </div>
      </div>
    </footer>
  );
}
