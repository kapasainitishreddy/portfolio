import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this portfolio site handles your information.",
};

export default function PrivacyPage() {
  return (
    <main className="content-pad mx-auto max-w-3xl py-32">
      <Link href="/" className="link-quiet text-sm text-silver">
        ← Back home
      </Link>
      <h1 className="mt-8 font-serif text-rice" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
        Privacy
      </h1>
      <div className="mt-8 space-y-5 text-silver">
        <p>
          This is a personal portfolio website. It is built to respect your privacy and collects as
          little information as possible.
        </p>
        <h2 className="font-serif text-2xl text-rice">Analytics</h2>
        <p>
          Analytics are disabled by default. No tracking or advertising cookies are set when you
          browse this site.
        </p>
        <h2 className="font-serif text-2xl text-rice">Contact form</h2>
        <p>
          If you use the contact form, the information you submit (your name, email, optional
          organization, reason and message) is used only to read and reply to your message. It is not
          sold or shared, and is not used to train any model.
        </p>
        <h2 className="font-serif text-2xl text-rice">Your choices</h2>
        <p>
          You can request that any message you sent be deleted at any time by emailing{" "}
          <a href={`mailto:${site.email}`} className="link-quiet text-rice">
            {site.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
