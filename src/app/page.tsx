import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import IdentityRail from "@/components/sections/IdentityRail";
import ProofLens from "@/components/sections/ProofLens";
import CrossFunctional from "@/components/sections/CrossFunctional";
import AskNitish from "@/components/sections/AskNitish";
import AIUniverse from "@/components/sections/AIUniverse";
import Skills from "@/components/sections/Skills";
import FlagshipCaseStudies from "@/components/sections/FlagshipCaseStudies";
import FeaturedWork from "@/components/sections/FeaturedWork";
import StartupCaseStudies from "@/components/sections/StartupCaseStudies";
import AISafetyTeaching from "@/components/sections/AISafetyTeaching";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import WhyHireMe from "@/components/sections/WhyHireMe";
import Certifications from "@/components/sections/Certifications";
import Principles from "@/components/sections/Principles";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        <Hero />
        <IdentityRail />
        <ProofLens />
        <CrossFunctional />
        <AskNitish />
        <AIUniverse />
        <Skills />
        <FlagshipCaseStudies />
        <FeaturedWork />
        <StartupCaseStudies />
        <AISafetyTeaching />
        <Experience />
        <Projects />
        <About />
        <WhyHireMe />
        <Certifications />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
