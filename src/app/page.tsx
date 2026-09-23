import Header from "@/components/portfolio/Header";
import DocsHero from "@/components/portfolio/DocsHero";
import SelectedWork from "@/components/portfolio/SelectedWork";
import StorySections from "@/components/portfolio/StorySections";
import Footer from "@/components/portfolio/Footer";
import DocsArticle from "@/components/portfolio/DocsArticle";
import PortfolioDock from "@/components/portfolio/PortfolioDock";

export default function Home() {
  return (
    <div className="docs-app portfolio-app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <div className="docs-body">
        <DocsArticle>
          <DocsHero />
          <SelectedWork />
          <StorySections />
          <Footer />
        </DocsArticle>
      </div>
      <PortfolioDock />
    </div>
  );
}
