import { Section } from "@/components/layout/Section";
import { certifications } from "@/data/certifications";
import Reveal from "@/components/layout/Reveal";
import { ArrowIcon } from "@/components/layout/icons";

export default function CertificationsSection() {
  return (
    <Section id="certifications" label="Credentials">
      <Reveal><div className="max-w-3xl"><h2 className="text-rice" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>Training that supports the work.</h2><p className="mt-5 max-w-2xl leading-7 text-silver">Credentials are supporting evidence, not the headline. The work above is the main proof.</p></div></Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {certifications.map((cert, idx) => (
          <Reveal key={cert.title} delay={idx * 0.04}>
            <article className="capability-card h-full p-5">
              <div className="flex items-start justify-between gap-4"><div><h3 className="font-serif text-xl text-rice">{cert.title}</h3><p className="mt-1 text-sm text-silver">{cert.issuer}{cert.date && ` · ${cert.date}`}</p><p className="mt-3 text-xs uppercase tracking-wider text-silver">{cert.credential}</p></div>{cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-silver" aria-label={`View ${cert.title}`}><ArrowIcon width={14} height={14} /></a>}</div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
