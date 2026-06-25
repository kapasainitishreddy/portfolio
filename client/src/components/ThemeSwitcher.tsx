import { usePortfolioTheme, THEMES, PortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = usePortfolioTheme();
  const [hovered, setHovered] = useState<PortfolioTheme | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: "1.25rem",
        transform: "translateY(-50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        alignItems: "flex-end",
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); setHovered(null); }}
    >
      {/* Vertical label */}
      <div
        style={{
          writingMode: "vertical-rl",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.15)",
          marginBottom: "0.5rem",
          textTransform: "uppercase",
          transform: "rotate(180deg)",
          transition: "opacity 0.2s ease",
          opacity: expanded ? 0 : 1,
        }}
      >
        THEME
      </div>

      {THEMES.map((t) => {
        const active = theme === t.id;
        const isHovered = hovered === t.id;
        return (
          <div
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              cursor: "pointer",
            }}
            onClick={() => setTheme(t.id)}
            onMouseEnter={() => setHovered(t.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Label */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: active ? t.accentColor : "rgba(255,255,255,0.4)",
                opacity: expanded || active ? 1 : 0,
                transform: expanded || active ? "translateX(0)" : "translateX(12px)",
                transition: "all 0.25s cubic-bezier(0.23, 1, 0.32, 1)",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                textShadow: active ? `0 0 8px ${t.accentColor}` : "none",
              }}
            >
              {t.label}
            </div>

            {/* Dot indicator */}
            <div
              style={{
                position: "relative",
                width: active ? "14px" : isHovered ? "10px" : "8px",
                height: active ? "14px" : isHovered ? "10px" : "8px",
                borderRadius: "50%",
                background: active ? t.accentColor : isHovered ? `${t.accentColor}60` : "rgba(255,255,255,0.15)",
                boxShadow: active
                  ? `0 0 12px ${t.accentColor}, 0 0 24px ${t.accentColor}60`
                  : isHovered
                  ? `0 0 8px ${t.accentColor}60`
                  : "none",
                border: `1px solid ${active ? t.accentColor : isHovered ? t.accentColor + "60" : "rgba(255,255,255,0.2)"}`,
                transition: "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
                flexShrink: 0,
              }}
            >
              {/* Ping animation for active */}
              {active && (
                <div
                  style={{
                    position: "absolute",
                    inset: "-4px",
                    borderRadius: "50%",
                    border: `1px solid ${t.accentColor}`,
                    animation: "ping 2s ease-out infinite",
                    opacity: 0.4,
                  }}
                />
              )}
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
