import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import Reveal from "@/components/layout/Reveal";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Sai Nitish Reddy Kapa",
};

export default function TermsOfService() {
  return (
    <>
      <Loader />
      <Navigation />
      <main className="min-h-screen">
        <div className="content-pad mx-auto max-w-2xl py-20 space-y-12">
          <Reveal>
            <div className="space-y-4">
              <h1 className="text-4xl font-serif text-rice">Terms of Service</h1>
              <p className="text-silver text-sm">Last updated: June 2026</p>
            </div>
          </Reveal>

          <div className="space-y-8 text-silver">
            <Reveal delay={0.1}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">License to Use</h2>
                <p>
                  This portfolio is provided &ldquo;as is&rdquo; for viewing and educational purposes. Content and design are copyright Sai Nitish Reddy Kapa unless otherwise stated.
                </p>
                <p>
                  Code showcased here may be open source under its own license. Individual project repositories state their licensing clearly.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.15}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Acceptable Use</h2>
                <ul className="space-y-2 ml-4">
                  <li>• Do not scrape, crawl, or automate access to this site.</li>
                  <li>• Do not copy content or design for commercial use without permission.</li>
                  <li>• Do not attempt to bypass security or gain unauthorized access.</li>
                  <li>• Do not use this site to distribute malware or harmful content.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.2}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Contact Form</h2>
                <p>
                  By submitting the contact form, you agree that your message may be read and responded to. Do not submit sensitive personal information beyond what is necessary for contact.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.25}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Limitation of Liability</h2>
                <p>
                  This site is provided as-is. I make no warranties about accuracy, timeliness, or completeness of information. Use at your own risk.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.3}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Changes</h2>
                <p>
                  These terms may change without notice. Check back regularly. Continued use implies acceptance of changes.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.35}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Questions?</h2>
                <p>
                  Contact{" "}
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
