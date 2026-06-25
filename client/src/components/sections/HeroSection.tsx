import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { hero, site, socials } from "@/data/portfolio";

const CyberpunkScene = lazy(() => import("@/components/three/CyberpunkScene"));
const SpaceScene = lazy(() => import("@/components/three/SpaceScene"));
const InkScene = lazy(() => import("@/components/three/InkScene"));
const TerminalScene = lazy(() => import("@/components/three/TerminalScene"));

const CYBERPUNK_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663780404383/QbrCbTYZL2NPcTfmvBWHTv/cyberpunk-hero-DEgZ2PCiKNbhBPATQBHhHL.webp";
const SPACE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663780404383/QbrCbTYZL2NPcTfmvBWHTv/space-hero-5NqDZT4E2pN67Kco6ucsX6.webp";
const INK_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663780404383/QbrCbTYZL2NPcTfmvBWHTv/ink-hero-VFDxcRPot2h8egnFED44Qv.webp";
const TERMINAL_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663780404383/QbrCbTYZL2NPcTfmvBWHTv/terminal-hero-e4S58osdjGtodjF9pYgprY.webp";

function TypewriterText({ text, speed = 60 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="term-cursor" />}
    </span>
  );
}

function GlitchText({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="glitch"
      data-text={text}
      style={{
        color,
        textShadow: `0 0 30px ${color}60`,
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
}

export default function HeroSection() {
  const { theme, config } = usePortfolioTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Periodic glitch for cyberpunk
  useEffect(() => {
    if (theme !== "cyberpunk") return;
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [theme]);

  const getBg = () => {
    switch (theme) {
      case "cyberpunk": return CYBERPUNK_BG;
      case "space": return SPACE_BG;
      case "ink": return INK_BG;
      case "terminal": return TERMINAL_BG;
    }
  };

  const isTerminal = theme === "terminal";
  const isInk = theme === "ink";
  const isCyberpunk = theme === "cyberpunk";
  const isSpace = theme === "space";

  const headlineLines = hero.headline.split("\n");

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: config.bgColor,
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${getBg()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isInk ? 0.5 : isTerminal ? 0.15 : 0.2,
          filter: isInk ? "none" : "saturate(1.3)",
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isInk
            ? `linear-gradient(135deg, ${config.bgColor}f0 0%, ${config.bgColor}70 50%, ${config.bgColor}f0 100%)`
            : isTerminal
            ? `linear-gradient(180deg, ${config.bgColor}f5 0%, ${config.bgColor}a0 50%, ${config.bgColor}f5 100%)`
            : `linear-gradient(135deg, ${config.bgColor}f5 0%, ${config.bgColor}90 40%, ${config.bgColor}70 100%)`,
        }}
      />

      {/* Three.js backgrounds */}
      <Suspense fallback={null}>
        {theme === "cyberpunk" && <CyberpunkScene />}
        {theme === "space" && <SpaceScene />}
        {theme === "ink" && <InkScene />}
        {theme === "terminal" && <TerminalScene />}
      </Suspense>

      {/* Hex grid overlay for cyberpunk */}
      {isCyberpunk && (
        <div
          className="hex-grid-bg"
          style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
        />
      )}

      {/* CRT scanlines for terminal */}
      {isTerminal && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      )}

      {/* Space nebula glow */}
      {isSpace && (
        <>
          <div style={{ position: "absolute", top: "20%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "20%", left: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        </>
      )}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          paddingTop: "7rem",
          paddingBottom: "5rem",
          width: "100%",
        }}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
            maxWidth: "750px",
          }}
        >
          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
              padding: "0.4rem 1.1rem",
              background: `${config.accentColor}12`,
              border: `1px solid ${config.accentColor}35`,
              borderRadius: "100px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              color: config.accentColor,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: config.accentColor,
                boxShadow: `0 0 8px ${config.accentColor}`,
                flexShrink: 0,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            {isTerminal ? "STATUS: AVAILABLE_FOR_HIRE" : hero.status.toUpperCase()}
          </div>

          {/* Main headline */}
          {isTerminal ? (
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: "2rem",
              }}
            >
              <div style={{ color: "rgba(0,255,65,0.5)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                <span style={{ color: config.accentColor }}>snrk@portfolio</span>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>:~$</span>
                <span style={{ color: "rgba(255,255,255,0.6)", marginLeft: "0.5rem" }}>whoami</span>
              </div>
              <div
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: config.accentColor,
                  textShadow: `0 0 20px ${config.accentColor}60`,
                }}
              >
                <TypewriterText text="sai_nitish_reddy_kapa" speed={70} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "0.75rem" }}>
                <span style={{ color: config.accentColor }}>→</span>
                <span style={{ marginLeft: "0.5rem" }}>{site.roles.join(" | ")}</span>
              </div>
            </div>
          ) : (
            <h1
              style={{
                fontFamily: `var(--t-font-display, 'Orbitron', monospace)`,
                fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                marginBottom: "2rem",
                letterSpacing: isCyberpunk ? "0.02em" : isInk ? "-0.02em" : "0.01em",
              }}
            >
              {headlineLines.map((line, i) => (
                <div key={i} style={{ display: "block" }}>
                  {i === 0 ? (
                    isCyberpunk ? (
                      <GlitchText text={line} color={config.accentColor} />
                    ) : (
                      <span
                        style={{
                          color: config.accentColor,
                          textShadow: `0 0 40px ${config.accentColor}50`,
                        }}
                      >
                        {line}
                      </span>
                    )
                  ) : (
                    <span style={{ color: "#fff" }}>{line}</span>
                  )}
                </div>
              ))}
            </h1>
          )}

          {/* Supporting text */}
          <div style={{ marginBottom: "2.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {hero.supporting.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: `var(--t-font-body)`,
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.62)",
                  maxWidth: "620px",
                  borderLeft: i === 0 ? `2px solid ${config.accentColor}50` : "none",
                  paddingLeft: i === 0 ? "1rem" : "0",
                }}
              >
                {isTerminal && (
                  <span style={{ color: config.accentColor, marginRight: "0.5rem", fontFamily: "'JetBrains Mono', monospace" }}>$</span>
                )}
                {p}
              </p>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "3rem" }}>
            {hero.actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.8rem 1.75rem",
                  borderRadius: isCyberpunk ? "2px" : isInk ? "2px" : "4px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
                  ...(action.kind === "primary"
                    ? {
                        background: config.accentColor,
                        color: config.bgColor,
                        boxShadow: `0 0 25px ${config.accentColor}60, 0 4px 15px ${config.accentColor}40`,
                      }
                    : {
                        background: "transparent",
                        color: config.accentColor,
                        border: `1px solid ${config.accentColor}50`,
                        boxShadow: `inset 0 0 0 0 ${config.accentColor}`,
                      }),
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  if (action.kind === "primary") {
                    el.style.boxShadow = `0 0 40px ${config.accentColor}90, 0 6px 20px ${config.accentColor}60`;
                    el.style.transform = "translateY(-3px)";
                  } else {
                    el.style.background = `${config.accentColor}18`;
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = `0 0 15px ${config.accentColor}30`;
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  if (action.kind === "primary") {
                    el.style.boxShadow = `0 0 25px ${config.accentColor}60, 0 4px 15px ${config.accentColor}40`;
                  } else {
                    el.style.background = "transparent";
                    el.style.boxShadow = "none";
                  }
                }}
              >
                {isTerminal && <span style={{ opacity: 0.6 }}>$</span>}
                {action.label}
                {action.kind === "primary" && <span>→</span>}
              </a>
            ))}
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {[
              { label: "GitHub", url: socials.github },
              { label: "LinkedIn", url: socials.linkedin },
              { label: "Email", url: socials.email },
            ].map((s, i) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = config.accentColor; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
              >
                {isTerminal ? `[${s.label.toLowerCase()}]` : s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 5,
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          {isTerminal ? "SCROLL_DOWN" : "SCROLL"}
        </span>
        <div
          style={{
            width: "1px",
            height: "50px",
            background: `linear-gradient(to bottom, ${config.accentColor}80, transparent)`,
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
