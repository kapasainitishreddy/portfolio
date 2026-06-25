import { usePortfolioTheme } from "@/contexts/PortfolioThemeContext";
import Navigation from "@/components/Navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import Footer from "@/components/Footer";
import TerminalOverlay from "@/components/TerminalOverlay";
import { PortfolioTheme } from "@/contexts/PortfolioThemeContext";

export default function Home() {
  const { theme, config, setTheme } = usePortfolioTheme();

  return (
    <div
      className={`theme-${theme}`}
      style={{
        minHeight: "100vh",
        background: config.bgColor,
        color: "#e8f4f8",
        fontFamily: `var(--t-font-body)`,
        transition: "background 0.5s ease, color 0.5s ease",
      }}
    >
      <Navigation />
      <ThemeSwitcher />
      <TerminalOverlay onThemeChange={(t) => setTheme(t as PortfolioTheme)} />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
