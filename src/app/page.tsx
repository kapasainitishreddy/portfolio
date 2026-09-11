import Navigation from "@/components/layout/Navigation";
import QuickMenuKeyboardNavigation from "@/components/layout/QuickMenuKeyboardNavigation";
import Footer from "@/components/layout/Footer";
import DeferredPortfolioThreeLayer from "@/components/three/DeferredPortfolioThreeLayer";
import Hero from "@/components/sections/Hero";
import AskNitish from "@/components/sections/AskNitish";
import AskSaiFocusRecovery from "@/components/sections/AskSaiFocusRecovery";
import FeaturedWork from "@/components/sections/FeaturedWork";
import PrivateBuilds from "@/components/sections/PrivateBuilds";
import Novels from "@/components/sections/Novels";
import AIUniverse from "@/components/sections/AIUniverse";
import AISafetyTeaching from "@/components/sections/AISafetyTeaching";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <QuickMenuKeyboardNavigation />
      <AskSaiFocusRecovery />
      <DeferredPortfolioThreeLayer />
      <main id="main" className="portfolio-main">
        <Hero />
        <AskNitish />
        <FeaturedWork />
        <PrivateBuilds />
        <Novels />
        <AIUniverse />
        <AISafetyTeaching />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
