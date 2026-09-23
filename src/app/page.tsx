import Header from "@/components/portfolio/Header";
import DocsHero from "@/components/portfolio/DocsHero";
import SelectedWork from "@/components/portfolio/SelectedWork";
import StorySections from "@/components/portfolio/StorySections";
import Footer from "@/components/portfolio/Footer";
import DocsContents from "@/components/portfolio/DocsContents";
import DocsArticle from "@/components/portfolio/DocsArticle";

export default function Home() {
  return (
    <div className="docs-app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <div className="docs-body">
        <DocsArticle>
          <DocsHero />
          <SelectedWork />
          <StorySections />
          <Footer />
        </DocsArticle>
        <DocsContents />
      </div>
    </div>
  );
}
