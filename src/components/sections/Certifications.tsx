import { certifications } from "@/data/certifications";
import Reveal from "@/components/layout/Reveal";
import { ArrowIcon } from "@/components/layout/icons";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="space-y-12">
      <Reveal>
        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-rice">Certifications & Credentials</h2>
          <p className="max-w-2xl text-silver">
            Professional certifications that validate expertise and specialized skills.
          </p>
        </div>
      </Reveal>

      <div className="space-y-4">
        {certifications.map((cert, idx) => (
          <Reveal key={cert.title} delay={idx * 0.08}>
            <div className="group rounded-lg border border-charcoal bg-charcoal/40 p-6 transition-all hover:border-accent hover:bg-charcoal/60">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <h3 className="font-serif text-lg text-rice group-hover:text-soft transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-silver text-sm">
                    {cert.issuer}
                    {cert.date && ` • ${cert.date}`}
                  </p>
                  <p className="text-xs text-silver/70 uppercase tracking-wider">{cert.credential}</p>
                </div>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-silver/20 text-silver transition-all hover:border-accent hover:text-accent hover:bg-accent/10"
                    aria-label={`View ${cert.title}`}
                  >
                    <ArrowIcon width={14} height={14} />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
