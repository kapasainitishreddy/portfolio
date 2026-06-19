import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import Reveal from "@/components/layout/Reveal";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Sai Nitish Reddy Kapa",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Loader />
      <Navigation />
      <main className="min-h-screen">
        <div className="content-pad mx-auto max-w-2xl py-20 space-y-12">
          <Reveal>
            <div className="space-y-4">
              <h1 className="text-4xl font-serif text-rice">Privacy Policy</h1>
              <p className="text-silver text-sm">Last updated: June 2026</p>
            </div>
          </Reveal>

          <div className="space-y-8 text-silver">
            <Reveal delay={0.1}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Overview</h2>
                <p>
                  Your privacy matters. This portfolio does not collect personal data. It is a static showcase of work and thoughts.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.15}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">What We Collect</h2>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>No cookies:</strong> This site uses no persistent cookies or tracking.</li>
                  <li>• <strong>No analytics:</strong> Visitor analytics are disabled by default.</li>
                  <li>• <strong>No login:</strong> No user accounts are required or stored.</li>
                  <li>• <strong>Contact form:</strong> If you fill the contact form, your email is sent securely via Resend API.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.2}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Third-Party Services</h2>
                <p>This site is hosted on Vercel or Netlify. Both process minimal data for hosting only.</p>
              </section>
            </Reveal>

            <Reveal delay={0.25}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Your Rights</h2>
                <p>
                  Request data deletion anytime at{" "}
                  <a href="mailto:kapasainitishreddy@gmail.com" className="link-quiet text-rice hover:text-soft">
                    kapasainitishreddy@gmail.com
                  </a>
                </p>
              </section>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
