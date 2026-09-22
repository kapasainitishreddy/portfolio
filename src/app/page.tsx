import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import SelectedWork from "@/components/portfolio/SelectedWork";
import StorySections from "@/components/portfolio/StorySections";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <SelectedWork />
        <StorySections />
      </main>
      <Footer />
    </>
  );
}
