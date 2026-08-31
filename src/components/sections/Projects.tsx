import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { featuredPortfolio } from "@/data/featuredPortfolio";
import { ArrowIcon } from "@/components/layout/icons";

export default function Projects() {
  return (
    <Section id="projects" label="Featured Work" className="portfolio-projects-section">
      <Reveal>
        <div className="portfolio-section-heading">
          <div>
            <h2 className="text-rice">Products I’m building and testing.</h2>
            <p className="text-silver">
              Five projects that best represent how I think about AI, product design, developer tooling,
              privacy, and useful software.
            </p>
          </div>
          <span className="portfolio-section-note">Proof over promises.</span>
        </div>
      </Reveal>

      <div className="featured-product-grid">
        {featuredPortfolio.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.04}>
            <details className="featured-product-card" data-product={project.id}>
              <summary>
                <div className="featured-product-card__visual" aria-hidden="true">
                  <div className="featured-product-card__device">
                    <span className="featured-product-card__device-mark">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{project.name}</strong>
                    <small>{project.status}</small>
                  </div>
                </div>

                <div className="featured-product-card__copy">
                  <div className="featured-product-card__meta">
                    <span>{project.category}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <span className="featured-product-card__open">View project details</span>
                </div>
              </summary>

              <div className="featured-product-card__details">
                <p className="font-mono-label">Evidence in the current build</p>
                <ul>
                  {project.proof.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="featured-product-card__stack" aria-label={`${project.name} technology stack`}>
                  {project.stack.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                {project.liveHref && (
                  <a href={project.liveHref} target="_blank" rel="noopener noreferrer" className="portfolio-inline-link">
                    Open live product <ArrowIcon width={14} height={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
