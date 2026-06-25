import { useEffect, useRef, useState } from "react";
import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  const { theme, config } = usePortfolioTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const selectedProject = projects.find((p) => p.id === selected);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: "6rem 0",
        background: `${config.bgColor}`,
        position: "relative",
      }}
    >
      {/* Background accent */}
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
              $ ls projects/
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "40px", height: "2px", background: config.accentColor, boxShadow: `0 0 8px ${config.accentColor}` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: config.accentColor, textTransform: "uppercase" }}>
                Selected Work
              </span>
            </div>
          )}
          <h2 style={{ fontFamily: `var(--t-font-display)`, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff" }}>
            {isTerminal ? <span style={{ color: config.accentColor }}>## Projects</span> : "Selected Projects"}
          </h2>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="reveal glass-card"
              onClick={() => setSelected(selected === project.id ? null : project.id)}
              style={{
                padding: "1.75rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                border: selected === project.id
                  ? `1px solid ${config.accentColor}`
                  : `1px solid ${config.accentColor}20`,
                boxShadow: selected === project.id ? `0 0 20px ${config.accentColor}30` : "none",
              }}
              onMouseEnter={(e) => {
                if (selected !== project.id) {
                  e.currentTarget.style.border = `1px solid ${config.accentColor}60`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 8px 30px ${config.accentColor}20`;
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== project.id) {
                  e.currentTarget.style.border = `1px solid ${config.accentColor}20`;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, ${config.accentColor}, ${config.accentColor}00)`,
                  opacity: selected === project.id ? 1 : 0.4,
                }}
              />

              {/* Status badge */}
              <div
                style={{
                  display: "inline-block",
                  padding: "0.2rem 0.6rem",
                  background: `${config.accentColor}15`,
                  border: `1px solid ${config.accentColor}30`,
                  borderRadius: "3px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  color: config.accentColor,
                  marginBottom: "1rem",
                }}
              >
                {isTerminal ? `[${project.status.toUpperCase()}]` : project.status}
              </div>

              {/* Project name */}
              <h3
                style={{
                  fontFamily: `var(--t-font-display)`,
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.5rem",
                  letterSpacing: "0.02em",
                }}
              >
                {isTerminal ? `> ${project.name}` : project.name}
              </h3>

              {/* Category */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                {project.category}
              </div>

              {/* Summary */}
              <p
                style={{
                  fontFamily: `var(--t-font-body)`,
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "1.25rem",
                }}
              >
                {project.summary}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.2rem 0.5rem",
                      background: `${config.accentColor}10`,
                      border: `1px solid ${config.accentColor}25`,
                      borderRadius: "3px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: config.accentColor,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expand indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: config.accentColor,
                  opacity: 0.6,
                }}
              >
                {selected === project.id ? "[-]" : "[+]"}
              </div>
            </div>
          ))}
        </div>

        {/* Expanded project detail */}
        {selectedProject && (
          <div
            className="glass-card"
            style={{
              padding: "2.5rem",
              border: `1px solid ${config.accentColor}40`,
              boxShadow: `0 0 30px ${config.accentColor}20`,
              animation: "fadeInUp 0.3s ease-out forwards",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <h3
                  style={{
                    fontFamily: `var(--t-font-display)`,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: config.accentColor,
                    marginBottom: "1.5rem",
                  }}
                >
                  {selectedProject.name}
                </h3>

                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: config.accentColor, marginBottom: "0.4rem", letterSpacing: "0.1em" }}>
                    {isTerminal ? "# PROBLEM" : "PROBLEM"}
                  </div>
                  <p style={{ fontFamily: `var(--t-font-body)`, fontSize: "0.85rem", lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>
                    {selectedProject.problem}
                  </p>
                </div>

                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: config.accentColor, marginBottom: "0.4rem", letterSpacing: "0.1em" }}>
                    {isTerminal ? "# SOLUTION" : "SOLUTION"}
                  </div>
                  <p style={{ fontFamily: `var(--t-font-body)`, fontSize: "0.85rem", lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              <div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: config.accentColor, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>
                    {isTerminal ? "# FEATURES" : "FEATURES"}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {selectedProject.features.map((f) => (
                      <div
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontFamily: `var(--t-font-body)`,
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        <span style={{ color: config.accentColor, fontSize: "0.7rem" }}>▸</span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: config.accentColor, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>
                    {isTerminal ? "# STACK" : "TECH STACK"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "0.3rem 0.7rem",
                          background: `${config.accentColor}15`,
                          border: `1px solid ${config.accentColor}30`,
                          borderRadius: "3px",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.7rem",
                          color: config.accentColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
