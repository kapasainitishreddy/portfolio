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
              <p className="text-silver text-sm">Last updated: August 2026</p>
            </div>
          </Reveal>

          <div className="space-y-8 text-silver">
            <Reveal delay={0.1}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Overview</h2>
                <p>
                  This portfolio is designed to collect as little personal information as practical. Browsing does not require an account, analytics are disabled by default, and there is no advertising profile or cross-site tracking.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.15}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">What is processed</h2>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>No portfolio login:</strong> No user account, password, or profile is created by this site.</li>
                  <li>• <strong>No analytics by default:</strong> The portfolio does not enable visitor analytics unless the deployment is intentionally reconfigured.</li>
                  <li>• <strong>Contact form:</strong> If you submit the form, the name, email, optional organization, contact reason, and message you provide are sent to the configured Resend email endpoint for delivery to the portfolio owner. If email delivery is not configured, the form fails closed and tells you to use direct email instead of pretending your message was delivered.</li>
                  <li>• <strong>Abuse controls:</strong> The contact endpoint uses short-lived in-memory request throttling and records security event metadata without intentionally logging the message body or email address.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.2}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Portfolio guide</h2>
                <p>
                  The “Ask Nitish” guide loads its interface module from syrava.com and matches your typed question against public portfolio knowledge in your browser. This portfolio configuration disables Chrome and Puter AI providers and disables voice input, so typed guide questions are not intentionally sent to a cloud AI service by this site. Optional text-to-speech is handled by your browser or operating system.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.25}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Hosting and email delivery</h2>
                <p>
                  The site may be hosted on Vercel or Netlify. Those infrastructure providers can process ordinary request metadata such as IP address, browser information, and timestamps in accordance with their own service policies. Resend processes contact-form data only when the contact form is successfully used.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.3}>
              <section className="space-y-3">
                <h2 className="text-2xl font-serif text-rice">Your choices</h2>
                <p>
                  You can browse without using the contact form or portfolio guide. To request deletion of a contact message or ask a privacy question, email{" "}
                  <a href="mailto:kapasainitishreddy@gmail.com" className="link-quiet text-rice hover:text-soft">
                    kapasainitishreddy@gmail.com
                  </a>
                  .
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
