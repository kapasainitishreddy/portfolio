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
          <p className="legal-date">Last updated: October 2026</p>
          <section>
            <h2>Overview</h2>
            <p>
              This portfolio is a static showcase of work and writing. It does not use visitor accounts, contact forms, advertising trackers,
              or analytics scripts.
            </p>
          </section>
          <section>
            <h2>Cookies and local storage</h2>
            <p>
              This site does not set non-essential cookies for tracking or marketing. Browser/local storage may be used only for basic
              interface behavior.
            </p>
          </section>
          <section>
            <h2>Hosting data</h2>
            <p>
              Hosting providers (for example GitHub Pages) may process standard request logs needed to deliver the site, such as IP address,
              browser metadata, and request timestamps. This portfolio does not receive or store those logs directly.
            </p>
          </section>
          <section>
            <h2>Third-party links and email</h2>
            <p>
              Links to external platforms (for example GitHub or LinkedIn) are governed by those services&apos; own privacy policies. If you
              email Sai, your email provider and the receiving email provider process that message under their own terms.
            </p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>
              Privacy questions can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
