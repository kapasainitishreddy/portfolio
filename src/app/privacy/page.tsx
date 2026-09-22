import Header from "@/components/portfolio/Header";
import Footer from "@/components/portfolio/Footer";
import { site } from "@/data/site";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}`,
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <article className="shell">
          <p className="section-index">Policy / Privacy</p>
          <h1>Privacy Policy</h1>
          <p className="legal-date">Last updated: September 2026</p>
          <section><h2>Overview</h2><p>This portfolio is a static showcase of work and writing. It does not use visitor accounts, persistent cookies, advertising trackers, or a contact form.</p></section>
          <section><h2>Hosting data</h2><p>GitHub Pages may process standard request information needed to serve the site. This portfolio does not receive or store that information directly.</p></section>
          <section><h2>Contact</h2><p>If you choose to email Sai, your email provider and the receiving email provider process that message under their own policies. You can request deletion at <a href={`mailto:${site.email}`}>{site.email}</a>.</p></section>
        </article>
      </main>
      <Footer />
    </>
  );
}
