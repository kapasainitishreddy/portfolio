import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { githubProjects } from "@/data/githubProjects";

export default function GitHubProjects() {
  return (
    <Section id="projects" label="Public builds">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="max-w-3xl">
            <h2 className="text-rice" style={{ fontSize: "clamp(2.1rem, 4vw, 3.6rem)" }}>
              Public code you can inspect, not concept cards.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-silver">
              These repositories show product range across AI tooling, local-first media, privacy-sensitive workflows, and mobile systems. The proof points below are limited to capabilities documented in the repositories themselves.
            </p>
          </div>
          <p className="font-mono-label lg:text-right">Repository → build facts → stack</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {githubProjects.map((project) => (
          <Reveal key={project.repo}>
            <article className="surface flex h-full flex-col p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono-label">{project.category}</p>
                <span className="rounded-full border px-2.5 py-1 text-[0.65rem] text-silver">Public repository</span>
              </div>

              <h3 className="mt-4 font-serif text-3xl text-rice">{project.name}</h3>
              <p className="mt-3 text-sm leading-6 text-silver">{project.summary}</p>

              <div className="mt-6 border-t pt-5" style={{ borderColor: "color-mix(in srgb, var(--color-silver) 13%, transparent)" }}>
                <p className="font-mono-label mb-3">Verified in repo</p>
                <ul className="space-y-2.5">
                  {project.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-2.5 text-sm leading-6 text-silver">
                      <span className="mt-[0.58rem] h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--color-copper)" }} />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border px-2.5 py-1 text-xs text-silver">{item}</span>
                ))}
              </div>

              {project.note && <p className="mt-5 text-xs leading-5 text-silver">{project.note}</p>}

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm text-rice transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: "color-mix(in srgb, var(--color-copper) 28%, transparent)",
                  background: "color-mix(in srgb, var(--color-copper) 7%, transparent)",
                  outlineColor: "var(--color-copper)",
                }}
              >
                <span>View repository</span>
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
