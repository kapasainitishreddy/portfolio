"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function StaticThreeLayer() {
  return (
    <div className="portfolio-three-layer" aria-hidden="true" role="presentation">
      <div className="portfolio-three-layer__fallback" />
    </div>
  );
}

const PortfolioThreeLayer = dynamic(() => import("./PortfolioThreeLayer"), {
  ssr: false,
  loading: StaticThreeLayer,
});

export default function DeferredPortfolioThreeLayer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(() => setReady(true), 220);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!ready) return <StaticThreeLayer />;
  return <PortfolioThreeLayer />;
}
