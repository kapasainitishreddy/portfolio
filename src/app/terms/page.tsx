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
          <p className="legal-date">Last updated: October 2026</p>
          <p className="legal-date"><strong>Draft — pending legal review.</strong></p>
          <section>
            <h2>Portfolio content</h2>
            <p>
              This portfolio is provided for viewing, professional evaluation, and educational reference. Text, original design, and private
              case-study presentation remain the work of {site.name} unless stated otherwise.
            </p>
          </section>
          <section>
            <h2>Project information</h2>
            <p>
              Client and product identities may be withheld. Published outcomes and descriptions are intentionally limited to information
              that can be shared responsibly.
            </p>
          </section>
          <section>
            <h2>No affiliation</h2>
            <p>
              Company names, logos, and product references belong to their respective owners and are used only to describe past work where
              disclosure is permitted. This site does not claim endorsement by those organizations.
            </p>
          </section>
          <section>
            <h2>As-is disclaimer</h2>
            <p>
              This site and its content are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied.
            </p>
          </section>
          <section>
            <h2>Limitation of liability</h2>
            <p>
              To the maximum extent allowed by law, {site.name} is not liable for any indirect, incidental, special, consequential, or
              punitive damages arising from the use of this site.
            </p>
          </section>
          <section>
            <h2>Acceptable use</h2>
            <p>
              You agree not to misuse this site, interfere with its operation, or attempt unauthorized access to any systems connected to it.
            </p>
          </section>
          <section>
            <h2>Governing law</h2>
            <p>[GOVERNING LAW PLACEHOLDER]</p>
          </section>
          <section>
            <h2>Questions</h2>
            <p>
              Contact <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
