import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { contact, site } from "@/data/site";
import { MailIcon } from "@/components/layout/icons";
import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <Section id="contact" label="Contact">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <h2 className="text-rice" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
              {contact.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-md leading-relaxed text-silver">{contact.supporting}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm text-rice transition-colors hover:bg-[color-mix(in_srgb,var(--color-silver)_10%,transparent)]"
              style={{ border: "1px solid color-mix(in srgb, var(--color-silver) 26%, transparent)" }}
            >
              <MailIcon width={18} height={18} />
              Email Me
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-sm text-silver">
              Or reach me directly at{" "}
              <a href={`mailto:${site.email}`} className="link-quiet text-rice">
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
