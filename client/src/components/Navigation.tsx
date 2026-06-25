import { useState, useEffect } from "react";
import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import { navItems } from "@/data/portfolio";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663780404383/QbrCbTYZL2NPcTfmvBWHTv/portfolio-logo-E4TXRVznV7Uth8frh7DRxm.png";

export default function Navigation() {
  const { theme, config } = usePortfolioTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [theme]);

  const isTerminal = theme === "terminal";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        background: scrolled ? `${config.bgColor}ee` : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${config.accentColor}18` : "none",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "6px",
              background: `${config.accentColor}15`,
              border: `1px solid ${config.accentColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={LOGO_URL}
              alt="SNK"
              style={{
                width: "24px",
                height: "24px",
                filter: `drop-shadow(0 0 6px ${config.accentColor})`,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: `var(--t-font-display, 'Orbitron', monospace)`,
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: config.accentColor,
              textShadow: `0 0 12px ${config.accentColor}60`,
            }}
          >
            {isTerminal ? "~/snrk" : "SNK"}
          </span>
        </a>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.15rem",
          }}
          className="hidden md:flex"
        >
          {navItems.map((item) => {
            const active = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: isTerminal ? "'JetBrains Mono', monospace" : `var(--t-font-ui, 'Space Grotesk', sans-serif)`,
                  fontSize: isTerminal ? "0.72rem" : "0.75rem",
                  letterSpacing: isTerminal ? "0.05em" : "0.14em",
                  textTransform: "uppercase",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: active ? config.accentColor : "rgba(255,255,255,0.45)",
                  background: active ? `${config.accentColor}12` : "transparent",
                  border: active ? `1px solid ${config.accentColor}35` : "1px solid transparent",
                  boxShadow: active ? `0 0 12px ${config.accentColor}25` : "none",
                  transition: "all 0.2s ease",
                  fontWeight: active ? 600 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = config.accentColor;
                    (e.currentTarget as HTMLElement).style.background = `${config.accentColor}08`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {isTerminal ? item.cmd : item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: `1px solid ${config.accentColor}35`,
            color: config.accentColor,
            padding: "0.4rem 0.75rem",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.9rem",
            transition: "all 0.2s ease",
          }}
          className="md:hidden"
        >
          {mobileOpen ? "✕" : "≡"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: `${config.bgColor}f5`,
            backdropFilter: "blur(24px)",
            borderTop: `1px solid ${config.accentColor}15`,
            padding: "0.75rem 1rem",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.85rem 1rem",
                color: config.accentColor,
                textDecoration: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.82rem",
                borderBottom: `1px solid ${config.accentColor}12`,
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${config.accentColor}10`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <span style={{ color: config.accentColor, opacity: 0.5 }}>›</span>
              {isTerminal ? `$ ${item.cmd}` : item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
