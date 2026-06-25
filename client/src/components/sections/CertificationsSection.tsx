import { useEffect, useRef } from "react";
import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { certifications, principles } from "@/data/portfolio";

export default function CertificationsSection() {
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
      id="principles"
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
        {/* Principles */}
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          {isTerminal ? (
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: config.accentColor, marginBottom: "0.5rem" }}>
              $ cat principles.md
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "40px", height: "2px", background: config.accentColor, boxShadow: `0 0 8px ${config.accentColor}` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: config.accentColor, textTransform: "uppercase" }}>
                Principles
              </span>
            </div>
          )}
          <h2 style={{ fontFamily: `var(--t-font-display)`, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff" }}>
            {isTerminal ? <span style={{ color: config.accentColor }}>## Working Principles</span> : "Working Principles"}
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "4rem",
          }}
        >
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="reveal glass-card"
              style={{
                padding: "1.5rem",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${config.accentColor}50`;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 8px 30px ${config.accentColor}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = `1px solid ${config.accentColor}20`;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "3px",
                  height: "100%",
                  background: `linear-gradient(to bottom, ${config.accentColor}, transparent)`,
                }}
              />
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: config.accentColor,
                  marginBottom: "0.75rem",
                  letterSpacing: "0.1em",
                }}
              >
                {isTerminal ? `[${String(i + 1).padStart(2, "0")}]` : `0${i + 1}`}
              </div>
              <h3
                style={{
                  fontFamily: `var(--t-font-display)`,
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.75rem",
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: `var(--t-font-body)`,
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="reveal" style={{ marginBottom: "2rem" }}>
          {isTerminal ? (
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: config.accentColor, marginBottom: "0.5rem" }}>
              $ ls certifications/
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "40px", height: "2px", background: config.accentColor, boxShadow: `0 0 8px ${config.accentColor}` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: config.accentColor, textTransform: "uppercase" }}>
                Certifications
              </span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {certifications.map((cert) => (
            <a
              key={cert.title}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal glass-card"
              style={{
                padding: "1.25rem 1.5rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${config.accentColor}60`;
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.boxShadow = `0 0 20px ${config.accentColor}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = `1px solid ${config.accentColor}20`;
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: `${config.accentColor}20`,
                  border: `1px solid ${config.accentColor}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: config.accentColor,
                }}
              >
                ✓
              </div>
              <div>
                <div
                  style={{
                    fontFamily: `var(--t-font-display)`,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "0.2rem",
                  }}
                >
                  {cert.title}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: config.accentColor,
                    opacity: 0.8,
                  }}
                >
                  {cert.issuer} · {cert.credential}
                </div>
              </div>
              <span style={{ color: config.accentColor, marginLeft: "auto", opacity: 0.6 }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
