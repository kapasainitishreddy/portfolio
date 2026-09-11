"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

function StaticThreeLayer() {
  return (
    <div className="portfolio-three-layer" aria-hidden="true" role="presentation">
      <div className="portfolio-three-layer__fallback" />
    </div>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const PortfolioThreeLayer = dynamic(() => import("./PortfolioThreeLayer"), {
  ssr: false,
  loading: StaticThreeLayer,
});

export default function DeferredPortfolioThreeLayer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
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

    const enableThreeLayer = () => {
      setReady(supportsWebGL());
    };

    const scheduleThreeLayer = () => {
      cancelScheduledWork();

      if (motionPreference.matches) {
        setReady(false);
        return;
      }

      if (saveData) {
        setReady(false);
        return;
      }

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(enableThreeLayer, { timeout: 1200 });
        return;
      }

      timeoutId = setTimeout(enableThreeLayer, 220);
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
