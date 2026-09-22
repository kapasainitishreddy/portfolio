import { hero, site } from "@/data/site";
import { withBasePath } from "@/lib/basePath";
import { ArrowIcon, DocumentIcon } from "./icons";

export default function Hero() {
  return (
    <section className="hero section-rule" id="home">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="identity-line">{site.name} <span>·</span> {site.roles[0]}</p>
          <h1>{hero.headline}</h1>
          <p className="hero-summary">{hero.supporting}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore the work <ArrowIcon />
            </a>
            <a className="button button-secondary" href={withBasePath(site.resumeUrl)}>
              <DocumentIcon /> Resume
            </a>
          </div>
        </div>

        <figure className="hero-display" aria-labelledby="hero-display-title">
          <figcaption id="hero-display-title"><span>FIELD SYSTEM / 001</span><b>SUPPORT COPILOT</b><small>Evidence before action</small></figcaption>
          <svg className="hero-artifact" viewBox="0 0 720 560" role="img" aria-labelledby="hero-artifact-title hero-artifact-desc">
            <title id="hero-artifact-title">Support Copilot system object</title>
            <desc id="hero-artifact-desc">A glass core organizes evidence threads around a human approval ring.</desc>
            <defs>
              <radialGradient id="hero-sphere" cx="36%" cy="28%" r="72%"><stop stopColor="#d7e8f7" stopOpacity=".58"/><stop offset=".38" stopColor="#6e8193" stopOpacity=".16"/><stop offset="1" stopColor="#a8c4de" stopOpacity=".02"/></radialGradient>
              <linearGradient id="hero-ring" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e5edf5"/><stop offset=".47" stopColor="#657383"/><stop offset="1" stopColor="#c8d4df"/></linearGradient>
              <filter id="hero-soft-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <ellipse cx="360" cy="492" rx="218" ry="24" fill="#a7bfd5" opacity=".14" />
            <circle cx="360" cy="270" r="164" fill="url(#hero-sphere)" stroke="#b8c9d9" strokeOpacity=".38" />
            <circle cx="360" cy="270" r="185" fill="none" stroke="#d3e0ec" strokeOpacity=".2" strokeDasharray="2 11" />
            <ellipse cx="360" cy="270" rx="250" ry="73" fill="none" stroke="url(#hero-ring)" strokeWidth="20" transform="rotate(-17 360 270)" />
            <ellipse cx="360" cy="270" rx="250" ry="73" fill="none" stroke="#edf5fc" strokeOpacity=".72" strokeWidth="1.3" transform="rotate(-17 360 270)" />
            <path d="M225 190L310 242L445 195M215 333L310 296L470 350M277 128L332 224M455 136L408 234M255 408L328 315M484 405L405 315" fill="none" stroke="#c1d9ef" strokeOpacity=".6" strokeWidth="1.5" />
            <g fill="#e4f1ff" filter="url(#hero-soft-glow)"><circle cx="225" cy="190" r="4"/><circle cx="445" cy="195" r="4"/><circle cx="215" cy="333" r="4"/><circle cx="470" cy="350" r="4"/><circle cx="277" cy="128" r="4"/><circle cx="484" cy="405" r="4"/></g>
            <rect x="303" y="211" width="114" height="118" rx="4" fill="#151c24" fillOpacity=".82" stroke="#ced9e4" strokeOpacity=".72" />
            <rect x="318" y="226" width="84" height="88" fill="#27323f" fillOpacity=".65" stroke="#afc7dc" strokeOpacity=".44" />
            <path d="M333 246H387M333 260H373M333 274H383M333 288H365" stroke="#c5d8e8" strokeOpacity=".56" />
            <path d="M360 329V424M292 424H428" stroke="#c9d7e4" strokeOpacity=".65" strokeWidth="2" />
            <path d="M280 458H440L473 482H247Z" fill="#1b222a" stroke="#95a3b1" strokeOpacity=".56" />
            <path d="M247 482H473V495H247Z" fill="#0c0f13" stroke="#95a3b1" strokeOpacity=".35" />
          </svg>
          <div className="display-status"><i /> Grounded in approved evidence <span>·</span> Human approval</div>
        </figure>
      </div>
      <div className="proof-rail" aria-label="Core capabilities">
        <div className="shell proof-grid">
          {hero.proof.map((proof) => (
            <div key={proof.label} className="proof-item"><span aria-hidden="true" /><strong>{proof.value}</strong><span className="proof-copy">{proof.label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
