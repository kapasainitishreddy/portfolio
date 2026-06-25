import { useEffect, useRef, useState } from "react";
import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { site, socials } from "@/data/portfolio";

export default function ContactSection() {
  const { theme, config } = usePortfolioTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: `${config.accentColor}08`,
    border: `1px solid ${config.accentColor}30`,
    borderRadius: "4px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.85rem",
    color: "#fff",
    outline: "none",
    transition: "all 0.2s ease",
  };

  return (
    <section
      id="contact"
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

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: `radial-gradient(ellipse, ${config.accentColor}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "3rem", textAlign: "center" }}>
          {isTerminal ? (
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: config.accentColor, marginBottom: "0.5rem" }}>
              $ mail -s "Hello" {site.email}
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "40px", height: "2px", background: config.accentColor, boxShadow: `0 0 8px ${config.accentColor}` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: config.accentColor, textTransform: "uppercase" }}>
                Contact
              </span>
              <div style={{ width: "40px", height: "2px", background: config.accentColor, boxShadow: `0 0 8px ${config.accentColor}` }} />
            </div>
          )}
          <h2 style={{ fontFamily: `var(--t-font-display)`, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            {isTerminal ? <span style={{ color: config.accentColor }}>## Initiate Contact</span> : "Let's Work Together"}
          </h2>
          <p style={{ fontFamily: `var(--t-font-body)`, fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto" }}>
            Open to communications, AI governance, research, and digital publishing opportunities.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          {/* Contact info */}
          <div>
            <div className="reveal glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: config.accentColor, marginBottom: "1.25rem", letterSpacing: "0.1em" }}>
                {isTerminal ? "# CONTACT_INFO" : "DIRECT CONTACT"}
              </div>

              {[
                { label: "Email", value: site.email, href: `mailto:${site.email}` },
                { label: "Location", value: site.location, href: null },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: `1px solid ${config.accentColor}15` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem" }}>
                    {isTerminal ? `[${item.label.toUpperCase()}]` : item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: `var(--t-font-body)`, fontSize: "0.9rem", color: config.accentColor, textDecoration: "none" }}>
                      {item.value}
                    </a>
                  ) : (
                    <div style={{ fontFamily: `var(--t-font-body)`, fontSize: "0.9rem", color: "#fff" }}>{item.value}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "GitHub", url: socials.github, desc: "View my repositories" },
                { label: "LinkedIn", url: socials.linkedin, desc: "Connect professionally" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 1.25rem",
                    background: `${config.accentColor}08`,
                    border: `1px solid ${config.accentColor}20`,
                    borderRadius: "4px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${config.accentColor}15`;
                    e.currentTarget.style.borderColor = `${config.accentColor}50`;
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${config.accentColor}08`;
                    e.currentTarget.style.borderColor = `${config.accentColor}20`;
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div>
                    <div style={{ fontFamily: `var(--t-font-display)`, fontSize: "0.85rem", color: config.accentColor, marginBottom: "0.2rem" }}>
                      {isTerminal ? `> ${s.label}` : s.label}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>{s.desc}</div>
                  </div>
                  <span style={{ color: config.accentColor, fontSize: "1rem" }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="reveal glass-card" style={{ padding: "2rem" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
                <div style={{ fontFamily: `var(--t-font-display)`, fontSize: "1.1rem", color: config.accentColor, marginBottom: "0.5rem" }}>
                  {isTerminal ? "MESSAGE_SENT" : "Message Sent!"}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  {isTerminal ? "// Awaiting response..." : "I'll get back to you soon."}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: config.accentColor, marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
                  {isTerminal ? "# COMPOSE_MESSAGE" : "SEND A MESSAGE"}
                </div>

                {[
                  { key: "name", label: "Name", type: "text", placeholder: isTerminal ? "your_name" : "Your name" },
                  { key: "email", label: "Email", type: "email", placeholder: isTerminal ? "your@email.com" : "your@email.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.4rem", letterSpacing: "0.1em" }}>
                      {isTerminal ? `[${field.label.toUpperCase()}]` : field.label}
                    </label>
                    <input
                      type={field.type}
                      value={formState[field.key as keyof typeof formState]}
                      onChange={(e) => setFormState({ ...formState, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      required
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = config.accentColor; e.target.style.boxShadow = `0 0 10px ${config.accentColor}30`; }}
                      onBlur={(e) => { e.target.style.borderColor = `${config.accentColor}30`; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.4rem", letterSpacing: "0.1em" }}>
                    {isTerminal ? "[MESSAGE]" : "Message"}
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={isTerminal ? "// Type your message here..." : "Your message..."}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                    onFocus={(e) => { e.target.style.borderColor = config.accentColor; e.target.style.boxShadow = `0 0 10px ${config.accentColor}30`; }}
                    onBlur={(e) => { e.target.style.borderColor = `${config.accentColor}30`; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "0.85rem",
                    background: config.accentColor,
                    color: config.bgColor,
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    boxShadow: `0 0 20px ${config.accentColor}50`,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 30px ${config.accentColor}70`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 0 20px ${config.accentColor}50`; }}
                >
                  {isTerminal ? "$ send_message" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
