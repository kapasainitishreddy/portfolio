import Reveal from "@/components/layout/Reveal";
import { identityRail } from "@/data/aiUniverse";

export default function IdentityRail() {
  return (
    <section aria-label="Professional identities" className="content-pad mx-auto w-full max-w-7xl pb-8 md:pb-10">
      <Reveal>
        <div className="identity-rail">
          {identityRail.map((item, index) => (
            <article key={item.title} className="identity-rail__item">
              <span className="identity-rail__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="identity-rail__title">{item.title}</h2>
                <p className="identity-rail__copy">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
