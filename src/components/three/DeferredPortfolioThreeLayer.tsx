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
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const cancelScheduledWork = () => {
      if (idleId !== null) {
        window.cancelIdleCallback(idleId);
        idleId = null;
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const scheduleThreeLayer = () => {
      cancelScheduledWork();

      if (motionPreference.matches) {
        setReady(false);
        return;
      }

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
        return;
      }

      timeoutId = setTimeout(() => setReady(true), 220);
    };

    scheduleThreeLayer();
    motionPreference.addEventListener("change", scheduleThreeLayer);

    return () => {
      cancelScheduledWork();
      motionPreference.removeEventListener("change", scheduleThreeLayer);
    };
  }, []);

  if (!ready) return <StaticThreeLayer />;
  return <PortfolioThreeLayer />;
}
