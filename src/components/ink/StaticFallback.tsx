/**
 * Pure-CSS Suminagashi artwork shown when WebGL is unavailable or the visitor
 * prefers reduced motion. No animation, full contrast preserved behind content.
 */
export default function StaticFallback() {
  return (
    <div aria-hidden className="ink-static" role="presentation">
      <div className="ink-static__ring ink-static__ring--1" />
      <div className="ink-static__ring ink-static__ring--2" />
      <div className="ink-static__ring ink-static__ring--3" />
      <div className="ink-static__vignette" />
    </div>
  );
}
