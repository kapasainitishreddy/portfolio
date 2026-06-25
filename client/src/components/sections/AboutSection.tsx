import { useEffect, useRef } from "react";
import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { about } from "@/data/portfolio";

export default function AboutSection() {
  const { theme, config } = usePortfolioTheme();
  const sectionRef = useRef<HTMLElement>(null);
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
      id="about"
      ref={sectionRef}
      style={{
        padding: "6rem 0",
        background: config.bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-200px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.accentColor}08 0%, transparent 70%)`,
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          {isTerminal ? (
            <div style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <div style={{ color: config.accentColor, marginBottom: "0.5rem", fontSize: "0.85rem" }}>
                $ cat about.md
              </div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginBottom: "1rem" }}>
                # Reading file...
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  background: config.accentColor,
                  boxShadow: `0 0 8px ${config.accentColor}`,
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  color: config.accentColor,
                  textTransform: "uppercase",
                }}
              >
                About
              </span>
            </div>
          )}
          <h2
            style={{
              fontFamily: `var(--t-font-display)`,
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              maxWidth: "600px",
            }}
          >
            {isTerminal ? (
              <span style={{ color: config.accentColor }}>
                ## {about.heading}
              </span>
            ) : (
              about.heading
            )}
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
        >
          {/* Left: paragraphs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="reveal"
                style={{
                  fontFamily: `var(--t-font-body)`,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.7)",
                  borderLeft: i === 0 ? `2px solid ${config.accentColor}` : "none",
                  paddingLeft: i === 0 ? "1rem" : "0",
                }}
              >
                {isTerminal && <span style={{ color: config.accentColor, marginRight: "0.5rem" }}>›</span>}
                {p}
              </p>
            ))}
          </div>

          {/* Keywords grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            {about.keywords.map((kw, i) => (
              <div
                key={kw.word}
                className="reveal glass-card"
                style={{
                  padding: "1.5rem",
                  animationDelay: `${i * 0.1}s`,
                  position: "relative",
                  overflow: "hidden",
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
                <div
                  style={{
                    fontFamily: `var(--t-font-display)`,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: config.accentColor,
                    marginBottom: "0.5rem",
                    textShadow: `0 0 10px ${config.accentColor}60`,
                  }}
                >
                  {isTerminal ? `[${kw.word}]` : kw.word}
                </div>
                <div
                  style={{
                    fontFamily: `var(--t-font-body)`,
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {kw.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
