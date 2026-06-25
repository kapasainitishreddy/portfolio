import { useEffect, useRef, useState } from "react";
import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { experience } from "@/data/portfolio";

export default function ExperienceSection() {
  const { theme, config } = usePortfolioTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeExp, setActiveExp] = useState(0);
  const isTerminal = theme === "terminal";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        padding: "6rem 0",
        background: config.bgColor,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${config.accentColor}40, transparent)`,
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          {isTerminal ? (
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: config.accentColor, marginBottom: "0.5rem" }}>
              $ cat resume.json | jq '.experience'
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "40px", height: "2px", background: config.accentColor, boxShadow: `0 0 8px ${config.accentColor}` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: config.accentColor, textTransform: "uppercase" }}>
                Experience
              </span>
            </div>
          )}
          <h2 style={{ fontFamily: `var(--t-font-display)`, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff" }}>
            {isTerminal ? <span style={{ color: config.accentColor }}>## Work Experience</span> : "Work Experience"}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem", alignItems: "start" }}>
          {/* Timeline nav */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {experience.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActiveExp(i)}
                className="reveal"
                style={{
                  padding: "1rem 1.25rem",
                  background: activeExp === i ? `${config.accentColor}15` : "transparent",
                  border: `1px solid ${activeExp === i ? config.accentColor : config.accentColor + "20"}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  boxShadow: activeExp === i ? `0 0 15px ${config.accentColor}20` : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {activeExp === i && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "3px",
                      background: config.accentColor,
                      boxShadow: `0 0 8px ${config.accentColor}`,
                    }}
                  />
                )}
                <div
                  style={{
                    fontFamily: `var(--t-font-display)`,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: activeExp === i ? config.accentColor : "#fff",
                    marginBottom: "0.25rem",
                  }}
                >
                  {exp.title}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {exp.org}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: config.accentColor,
                    opacity: 0.7,
                    marginTop: "0.25rem",
                  }}
                >
                  {exp.period}
                </div>
              </button>
            ))}
          </div>

          {/* Active experience detail */}
          <div
            className="glass-card reveal"
            style={{
              padding: "2rem",
              border: `1px solid ${config.accentColor}30`,
              minHeight: "300px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `linear-gradient(90deg, ${config.accentColor}, transparent)`,
              }}
            />

            <div style={{ marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontFamily: `var(--t-font-display)`,
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: config.accentColor,
                  marginBottom: "0.4rem",
                  textShadow: `0 0 15px ${config.accentColor}40`,
                }}
              >
                {isTerminal ? `> ${experience[activeExp].title}` : experience[activeExp].title}
              </h3>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {experience[activeExp].org} · {experience[activeExp].period}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {experience[activeExp].focus.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                    padding: "0.75rem",
                    background: `${config.accentColor}08`,
                    borderRadius: "4px",
                    border: `1px solid ${config.accentColor}15`,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${config.accentColor}15`;
                    e.currentTarget.style.borderColor = `${config.accentColor}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${config.accentColor}08`;
                    e.currentTarget.style.borderColor = `${config.accentColor}15`;
                  }}
                >
                  <span
                    style={{
                      color: config.accentColor,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      marginTop: "0.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {isTerminal ? `${String(i + 1).padStart(2, "0")}.` : "▸"}
                  </span>
                  <span
                    style={{
                      fontFamily: `var(--t-font-body)`,
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
