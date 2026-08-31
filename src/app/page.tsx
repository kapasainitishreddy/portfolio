import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Writing from "@/components/sections/Writing";
import About from "@/components/sections/About";
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
      <main id="main" className="portfolio-page">
        <Hero />
        <Projects />
        <Writing />
        <About />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
