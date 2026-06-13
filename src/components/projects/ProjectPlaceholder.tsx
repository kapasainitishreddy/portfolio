import type { InkPattern } from "@/data/projects";

/**
 * Tasteful generated artwork used when a project has no screenshot yet.
 * The motif follows the project's ink pattern so each card feels distinct.
 * Drop a real image at public/projects/<id>.jpg and set `image` to replace it.
 */
export default function ProjectPlaceholder({
  pattern,
  name,
}: {
  pattern: InkPattern;
  name: string;
}) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 120% at 30% 20%, color-mix(in srgb, var(--color-indigo) 45%, transparent), transparent 60%), var(--color-charcoal)",
      }}
      aria-hidden
    >
      <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="xMidYMid slice">
        <Motif pattern={pattern} />
      </svg>
      <span className="font-mono-label relative z-10" style={{ letterSpacing: "0.3em" }}>
        {name}
      </span>
    </div>
  );
}

function Motif({ pattern }: { pattern: InkPattern }) {
  const stroke = "color-mix(in srgb, var(--color-silver) 60%, transparent)";
  switch (pattern) {
    case "network":
    case "graph":
      return (
        <g stroke={stroke} strokeWidth={0.8} fill="none">
          {Array.from({ length: 9 }).map((_, i) => {
            const x = 60 + (i % 3) * 140;
            const y = 60 + Math.floor(i / 3) * 70;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={4} fill="var(--color-rice)" />
                {i % 3 !== 2 && <line x1={x} y1={y} x2={x + 140} y2={y} />}
                {i < 6 && <line x1={x} y1={y} x2={x} y2={y + 70} />}
                {i < 6 && i % 3 !== 2 && <line x1={x} y1={y} x2={x + 140} y2={y + 70} />}
              </g>
            );
          })}
        </g>
      );
    case "waves":
      return (
        <g stroke={stroke} strokeWidth={1} fill="none">
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${50 + i * 28} C 80 ${20 + i * 28}, 160 ${80 + i * 28}, 240 ${50 + i * 28} S 400 ${30 + i * 28}, 400 ${50 + i * 28}`}
            />
          ))}
        </g>
      );
    case "streams":
      return (
        <g stroke={stroke} strokeWidth={1} fill="none">
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={i} d={`M${40 + i * 50} 0 C ${180 + (i - 3) * 10} 120, 200 180, 200 260`} />
          ))}
        </g>
      );
    case "ledger":
      return (
        <g stroke={stroke} strokeWidth={1} fill="none">
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx={200} cy={130} r={30 + i * 26} />
          ))}
        </g>
      );
    case "typography":
      return (
        <g fill={stroke}>
          <text x={200} y={150} textAnchor="middle" style={{ fontFamily: "serif", fontSize: 120, opacity: 0.5 }}>
            ”
          </text>
        </g>
      );
    default:
      return (
        <g stroke={stroke} strokeWidth={1} fill="none">
          {Array.from({ length: 4 }).map((_, i) => (
            <ellipse key={i} cx={200} cy={130} rx={60 + i * 40} ry={40 + i * 28} />
          ))}
        </g>
      );
  }
}
