import { useEffect, useRef, useState } from "react";
import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { skillGroups } from "@/data/portfolio";

export default function SkillsSection() {
  const { theme, config } = usePortfolioTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const isTerminal = theme === "terminal";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const group = skillGroups[activeGroup];

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: "6rem 0",
        background: `${config.bgColor}`,
        position: "relative",
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: "100%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${config.accentColor}20, transparent)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          {isTerminal ? (
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: config.accentColor, marginBottom: "0.5rem" }}>
              $ ls skills/
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "40px", height: "2px", background: config.accentColor, boxShadow: `0 0 8px ${config.accentColor}` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: config.accentColor, textTransform: "uppercase" }}>
                Capabilities
              </span>
            </div>
          )}
          <h2 style={{ fontFamily: `var(--t-font-display)`, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff" }}>
            {isTerminal ? <span style={{ color: config.accentColor }}>## Skills & Capabilities</span> : "Skills & Capabilities"}
          </h2>
        </div>

        {/* Tab navigation */}
        <div
          className="reveal"
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {skillGroups.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActiveGroup(i)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "4px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: activeGroup === i ? config.accentColor : "transparent",
                color: activeGroup === i ? config.bgColor : config.accentColor,
                border: `1px solid ${config.accentColor}${activeGroup === i ? "ff" : "40"}`,
                boxShadow: activeGroup === i ? `0 0 15px ${config.accentColor}50` : "none",
                fontWeight: activeGroup === i ? 700 : 400,
              }}
            >
              {isTerminal ? `[${g.id}]` : g.label}
            </button>
          ))}
        </div>

        {/* Active group content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Group info */}
          <div className="reveal glass-card" style={{ padding: "2rem" }}>
            <div
              style={{
                fontFamily: `var(--t-font-display)`,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: config.accentColor,
                marginBottom: "1rem",
                textShadow: `0 0 10px ${config.accentColor}60`,
              }}
            >
              {isTerminal ? `[${group.id.toUpperCase()}]` : group.label}
            </div>
            <p
              style={{
                fontFamily: `var(--t-font-body)`,
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {group.blurb}
            </p>
            <div
              style={{
                marginTop: "1.5rem",
                paddingTop: "1rem",
                borderTop: `1px solid ${config.accentColor}20`,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {group.skills.length} skills
            </div>
          </div>

          {/* Skills grid */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {group.skills.map((skill, i) => (
              <div
                key={skill}
                className="reveal"
                style={{
                  padding: "0.4rem 0.9rem",
                  background: `${config.accentColor}10`,
                  border: `1px solid ${config.accentColor}30`,
                  borderRadius: "4px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: config.accentColor,
                  cursor: "default",
                  transition: "all 0.2s ease",
                  animationDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = `${config.accentColor}25`;
                  el.style.boxShadow = `0 0 10px ${config.accentColor}30`;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = `${config.accentColor}10`;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {isTerminal ? `> ${skill}` : skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
