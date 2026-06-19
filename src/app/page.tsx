import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import CurrentlyBuilding from "@/components/sections/CurrentlyBuilding";
import Experience from "@/components/sections/Experience";
import WhyHireMe from "@/components/sections/WhyHireMe";
import Certifications from "@/components/sections/Certifications";
import Principles from "@/components/sections/Principles";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Loader />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CurrentlyBuilding />
        <Experience />
        <WhyHireMe />
        <Certifications />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
