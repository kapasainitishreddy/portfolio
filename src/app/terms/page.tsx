import Header from "@/components/portfolio/Header";
import Footer from "@/components/portfolio/Footer";
import { site } from "@/data/site";

export const metadata = {
  title: "Terms",
  description: `Terms for ${site.name}'s portfolio`,
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <article className="shell">
          <p className="section-index">Policy / Terms</p>
          <h1>Terms</h1>
          <p className="legal-date">Last updated: September 2026</p>
          <section><h2>Portfolio content</h2><p>This portfolio is provided for viewing, professional evaluation, and educational reference. Text, original design, and private case-study presentation remain the work of {site.name} unless stated otherwise.</p></section>
          <section><h2>Project information</h2><p>Client and product identities may be withheld. Published outcomes and descriptions are intentionally limited to information that can be shared responsibly.</p></section>
          <section><h2>Open-source work</h2><p>Code linked from this portfolio follows the license included in its own repository. A link does not grant rights beyond that repository&apos;s license.</p></section>
          <section><h2>Questions</h2><p>Contact <a href={`mailto:${site.email}`}>{site.email}</a>.</p></section>
        </article>
      </main>
      <Footer />
    </>
  );
}
