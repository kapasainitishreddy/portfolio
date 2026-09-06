import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import Reveal from "@/components/layout/Reveal";
import { site } from "@/data/site";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Sai Nitish Reddy Kapa",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Loader />
      <a href="#privacy-main" className="skip-link">
        Skip to privacy policy
      </a>
      <Navigation />
      <main id="privacy-main" className="min-h-screen">
        <div className="content-pad mx-auto max-w-3xl space-y-12 py-20">
          <Reveal>
            <div className="space-y-4">
              <h1 className="font-serif text-4xl text-rice md:text-5xl">Privacy Policy</h1>
              <p className="text-sm text-silver">Last updated: September 2026</p>
              <p className="max-w-2xl leading-relaxed text-silver">
                This policy explains what this portfolio processes, why it is processed, which third parties are involved, and how to exercise privacy choices from different countries and regions.
              </p>
            </div>
          </Reveal>

          <div className="space-y-10 text-silver">
            <Reveal delay={0.05}>
              <section className="space-y-3">
                <h2 className="font-serif text-2xl text-rice">Privacy by default</h2>
                <p>
                  Browsing does not require an account. Advertising, behavioural profiling, cross-site tracking, and visitor analytics are disabled by default. The site is designed to collect only the information needed to operate the portfolio and respond when you choose to make contact.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.1}>
              <section className="space-y-3">
                <h2 className="font-serif text-2xl text-rice">What is processed</h2>
                <ul className="ml-4 space-y-3">
                  <li>• <strong>No portfolio login:</strong> No user account, password, or persistent visitor profile is created by this site.</li>
                  <li>• <strong>Local display preferences:</strong> A selected visual theme may be stored in your browser&apos;s local storage so the site can remember your preference. It is not intended to identify you across sites.</li>
                  <li>• <strong>Contact form:</strong> If you submit the form, the name, email, optional organization, contact reason, and message you provide are sent to the configured Resend email endpoint for delivery to the portfolio owner.</li>
                  <li>• <strong>Abuse controls:</strong> The contact endpoint uses short-lived request throttling and security event metadata without intentionally logging your message body or email address.</li>
                  <li>• <strong>Hosting metadata:</strong> The hosting provider can process ordinary request metadata such as IP address, device/browser information, request path, and timestamps as part of operating and securing the service.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.15}>
              <section className="space-y-3">
                <h2 className="font-serif text-2xl text-rice">Why contact data is used</h2>
                <p>
                  Contact-form information is used only to receive, secure, and respond to your inquiry. It is not sold, used for targeted advertising, or automatically added to a marketing list. Where privacy law requires a legal basis, processing is intended to rely on the action you requested, a legitimate interest in responding to genuine inquiries and protecting the site from abuse, or consent where that is the appropriate basis.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.2}>
              <section className="space-y-3">
                <h2 className="font-serif text-2xl text-rice">Portfolio guide and AI</h2>
                <p>
                  The “Ask Nitish” guide is optional. Its interface code is not requested from syrava.com until you choose the Ask Nitish button. When you do, syrava.com can receive ordinary request metadata such as your IP address, browser information, timestamp, and referrer information allowed by your browser while serving that module. The guide then matches typed questions against public portfolio knowledge in your browser.
                </p>
                <p>
                  This portfolio configuration disables Chrome and Puter AI providers and disables voice input, so typed guide questions are not intentionally sent to a cloud AI service by this site. Optional text-to-speech is handled by your browser or operating system. The portfolio does not use automated decision-making to make decisions about visitors.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.25}>
              <section className="space-y-3">
                <h2 className="font-serif text-2xl text-rice">Service providers and international processing</h2>
                <p>
                  The site may be hosted on Vercel or Netlify, and Resend processes contact-form data when the form is successfully used. These providers may operate infrastructure in more than one country. This portfolio does not currently promise country-specific data residency. If a local law requires additional transfer safeguards, contracts, or notices before a particular deployment, that is treated as a deployment requirement rather than silently claimed as complete.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.3}>
              <section className="space-y-3">
                <h2 className="font-serif text-2xl text-rice">Retention and deletion</h2>
                <p>
                  Contact messages may remain in the receiving mailbox for as long as reasonably needed to handle the conversation, maintain ordinary business records, or meet legal obligations. You can request deletion when it is no longer needed. Security-throttling state is short-lived and is not intended to become a persistent visitor profile.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.35}>
              <section className="space-y-3">
                <h2 className="font-serif text-2xl text-rice">Your privacy rights around the world</h2>
                <p>
                  Depending on where you live, laws such as GDPR/UK GDPR, CCPA/CPRA and other US state privacy laws, Canada&apos;s PIPEDA, Brazil&apos;s LGPD, India&apos;s Digital Personal Data Protection framework, Australia&apos;s Privacy Act, Singapore&apos;s PDPA, Japan&apos;s APPI, South Korea&apos;s PIPA, and similar laws can provide different rights. Where applicable, you may ask to:
                </p>
                <ul className="ml-4 space-y-2">
                  <li>• access personal information associated with your inquiry;</li>
                  <li>• correct inaccurate information;</li>
                  <li>• delete information, subject to lawful retention requirements;</li>
                  <li>• object to or restrict certain processing where local law provides that right;</li>
                  <li>• withdraw consent when processing is based on consent;</li>
                  <li>• receive an export or portable copy when required and technically applicable;</li>
                  <li>• opt out of sale, sharing, or targeted advertising where those rights exist. This portfolio does not currently use those practices.</li>
                </ul>
                <p>
                  Rights vary by jurisdiction, so a request will be handled according to the law that actually applies rather than by assuming one country&apos;s rules govern every visitor.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.4}>
              <section className="space-y-3">
                <h2 className="font-serif text-2xl text-rice">Children and sensitive information</h2>
                <p>
                  This professional portfolio is not designed as a service for children and does not ask visitors to submit health, financial-account, government-ID, precise-location, or other highly sensitive information. Please do not include sensitive personal information in the contact message unless it is genuinely necessary for your inquiry.
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.45}>
              <section className="surface space-y-4 p-6 md:p-7">
                <h2 className="font-serif text-2xl text-rice">Privacy requests</h2>
                <p>
                  You can browse without using the contact form or portfolio guide. To request access, correction, deletion, or another privacy action, email{" "}
                  <a href={`mailto:${site.email}?subject=Portfolio%20privacy%20request`} className="link-quiet text-rice hover:text-soft">
                    {site.email}
                  </a>
                  . Please describe the message or interaction you want help locating. Do not send identity documents unless they are specifically needed to verify a request.
                </p>
                <p className="text-sm leading-relaxed">
                  This page describes product behaviour and technical privacy controls. It does not claim formal certification under every privacy law or replace jurisdiction-specific legal advice.
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
