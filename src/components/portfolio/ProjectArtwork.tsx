type ProjectArtworkProps = { id: string };

export default function ProjectArtwork({ id }: ProjectArtworkProps) {
  if (id === "ops-pipeline") {
    return (
      <figure className="project-artwork pipeline-artwork" aria-label="A steel and glass operations pipeline that runs from live data sources through ingest, normalization, and delivery, then rises into a monitoring vessel.">
        <svg viewBox="0 0 1400 560" role="img" aria-labelledby="pipeline-title pipeline-desc" preserveAspectRatio="xMidYMid slice">
          <title id="pipeline-title">Ops Pipeline system diagram</title>
          <desc id="pipeline-desc">Four live data sources enter a continuous pipeline, pass through ingest, reconcile, and delivery stations, and rise into an operations monitor.</desc>
          <defs>
            <linearGradient id="pipe-metal" x1="0" y1="0" x2="0.15" y2="1">
              <stop offset="0" stopColor="#aab5c2" stopOpacity=".75" />
              <stop offset=".14" stopColor="#333b46" />
              <stop offset=".5" stopColor="#171d25" />
              <stop offset=".78" stopColor="#8d98a6" stopOpacity=".64" />
              <stop offset="1" stopColor="#252c35" />
            </linearGradient>
            <linearGradient id="pipe-glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c6d9e9" stopOpacity=".21" />
              <stop offset=".48" stopColor="#6f8ba3" stopOpacity=".1" />
              <stop offset="1" stopColor="#b4c6d6" stopOpacity=".22" />
            </linearGradient>
            <linearGradient id="pipe-inner" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#a8d4ff" stopOpacity="0" />
              <stop offset=".5" stopColor="#a8d4ff" stopOpacity=".95" />
              <stop offset="1" stopColor="#a8d4ff" stopOpacity="0" />
            </linearGradient>
            <filter id="pipe-glow" x="-30%" y="-100%" width="160%" height="300%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="1400" height="560" fill="#090b0e" />
          <path d="M0 470H1400M0 500H1400" stroke="#a9b6c4" strokeOpacity=".11" />
          <path d="M0 218H58Q76 218 76 242V278H1280Q1342 278 1342 216V0" fill="none" stroke="#030405" strokeWidth="92" />
          <path d="M0 218H58Q76 218 76 242V278H1280Q1342 278 1342 216V0" fill="none" stroke="url(#pipe-metal)" strokeWidth="70" />
          <path d="M0 218H58Q76 218 76 242V278H1280Q1342 278 1342 216V0" fill="none" stroke="url(#pipe-glass)" strokeWidth="42" />
          <path d="M0 208H58Q86 208 86 242V260H1280Q1324 260 1324 216V0" fill="none" stroke="#d5e2ec" strokeOpacity=".5" strokeWidth="1.4" />
          <path d="M-10 278H1400" fill="none" stroke="#18212a" strokeWidth="28" />
          <path d="M-10 278H1400" fill="none" stroke="url(#pipe-inner)" strokeWidth="3" filter="url(#pipe-glow)" />
          <path d="M145 278H1220" fill="none" stroke="#c1dcf4" strokeWidth="2" strokeDasharray="3 28" opacity=".88" className="data-packets" />
          {[70, 340, 660, 990, 1325].map((x) => (
            <g key={x} transform={`translate(${x} 278)`}>
              <ellipse rx="31" ry="53" fill="#050607" stroke="#6f7a87" strokeWidth="5" />
              <ellipse rx="22" ry="44" fill="url(#pipe-metal)" stroke="#d7e0e9" strokeOpacity=".6" strokeWidth="1.5" />
              <ellipse rx="13" ry="37" fill="#080a0d" stroke="#252f3a" />
            </g>
          ))}
          <g className="pipeline-station" transform="translate(420 0)">
            <path d="M-42 278V204Q-42 175 0 175Q42 175 42 204V278" fill="url(#pipe-metal)" stroke="#aab5c2" strokeOpacity=".72" strokeWidth="2" />
            <rect x="-92" y="68" width="184" height="124" rx="5" fill="#080b0f" stroke="#647282" strokeWidth="2" />
            <rect x="-77" y="82" width="154" height="95" fill="url(#pipe-glass)" stroke="#b7c9d8" strokeOpacity=".48" />
            <path d="M-65 154H65M0 82V177" stroke="#d1e5f7" strokeOpacity=".26" />
            <circle cx="0" cy="48" r="9" fill="#11171e" stroke="#9eacbb" strokeWidth="3" />
            <path d="M0 57V68M-126 200H-92M92 200H126" stroke="#aab5c2" strokeWidth="5" />
            <text x="0" y="111" textAnchor="middle" className="pipe-label">INGEST</text>
            <text x="0" y="133" textAnchor="middle" className="pipe-sub-label">4 LIVE SOURCES</text>
          </g>
          <g className="pipeline-station" transform="translate(735 0)">
            <path d="M-46 278V207Q-46 173 0 173Q46 173 46 207V278" fill="url(#pipe-metal)" stroke="#c4d0dc" strokeOpacity=".8" strokeWidth="2" />
            <rect x="-102" y="48" width="204" height="148" rx="5" fill="#080b0f" stroke="#8491a0" strokeWidth="2" />
            <rect x="-86" y="63" width="172" height="116" fill="url(#pipe-glass)" stroke="#c0d3e4" strokeOpacity=".52" />
            <path d="M-66 90H66M-66 116H66M-66 142H66" stroke="#9fb8ce" strokeOpacity=".42" />
            <path d="M-22 75V164M22 75V164" stroke="#d7e3ed" strokeOpacity=".25" />
            <circle cx="0" cy="28" r="10" fill="#151c24" stroke="#a6b4c1" strokeWidth="3" />
            <text x="0" y="102" textAnchor="middle" className="pipe-label">RECONCILE</text>
            <text x="0" y="127" textAnchor="middle" className="pipe-sub-label">VALIDATE / JOIN</text>
          </g>
          <g className="pipeline-station" transform="translate(1050 0)">
            <path d="M-42 278V207Q-42 175 0 175Q42 175 42 207V278" fill="url(#pipe-metal)" stroke="#aab5c2" strokeOpacity=".72" strokeWidth="2" />
            <rect x="-92" y="73" width="184" height="118" rx="5" fill="#080b0f" stroke="#647282" strokeWidth="2" />
            <rect x="-77" y="87" width="154" height="90" fill="url(#pipe-glass)" stroke="#b7c9d8" strokeOpacity=".48" />
            <path d="M-57 151L-20 126L6 140L48 104" fill="none" stroke="#b9d9f3" strokeWidth="2" />
            <path d="M-57 160H57" stroke="#d1e5f7" strokeOpacity=".25" />
            <circle cx="0" cy="49" r="9" fill="#11171e" stroke="#9eacbb" strokeWidth="3" />
            <text x="0" y="120" textAnchor="middle" className="pipe-label">DELIVER</text>
            <text x="0" y="144" textAnchor="middle" className="pipe-sub-label">LIVE METRICS</text>
          </g>
          <g className="pipe-inputs">
            <text x="80" y="384" className="pipe-kicker">CONNECTED SOURCES</text>
            <text x="80" y="409" className="pipe-small">APIs / FILES / EVENTS / DATABASES</text>
          </g>
          <g className="pipe-output">
            <rect x="1261" y="318" width="164" height="105" rx="4" fill="#0a0d11" stroke="#657281" />
            <path d="M1282 344H1402M1282 365H1373M1282 386H1390" stroke="#b9cde0" strokeOpacity=".42" />
            <circle cx="1280" cy="344" r="3" fill="#b9d8f3" /><circle cx="1280" cy="365" r="3" fill="#b9d8f3" /><circle cx="1280" cy="386" r="3" fill="#b9d8f3" />
            <text x="1282" y="450" className="pipe-small">OBSERVABLE OUTPUT</text>
          </g>
          <text x="54" y="531" className="pipe-label">FROM FRAGMENTED INPUT</text>
          <text x="1347" y="531" textAnchor="end" className="pipe-label">TO A RELIABLE OPERATING VIEW</text>
        </svg>
        <figcaption><span>01</span> Ingest <i /> <span>02</span> Reconcile <i /> <span>03</span> Deliver</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`project-artwork object-artwork object-${id}`} aria-hidden="true">
      <div className="object-halo" />
      <div className="object-scene">
        <div className="object-orbit object-orbit-a" />
        <div className="object-orbit object-orbit-b" />
        <div className="object-core"><span>{id === "support-copilot" ? "EVIDENCE" : id === "onboarding-agent" ? "STATE" : id === "research-swarm" ? "RESEARCH" : "CONTROL"}</span></div>
        <div className="object-signal object-signal-a" />
        <div className="object-signal object-signal-b" />
        <div className="object-signal object-signal-c" />
        <div className="object-plinth" />
      </div>
      <figcaption>System object / {id.replaceAll("-", " ")}</figcaption>
    </figure>
  );
}
