import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AskNitish from "@/components/sections/AskNitish";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Projects from "@/components/sections/Projects";
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
      <main id="main" className="portfolio-main">
        <Hero />
        <AskNitish />
        <FeaturedWork />
        <Projects />
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
