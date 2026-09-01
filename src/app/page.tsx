import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import FeaturedWork from "@/components/sections/FeaturedWork";
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
        <Skills />
        <FeaturedWork />
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
