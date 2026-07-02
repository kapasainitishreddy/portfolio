"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import StaticFallback from "./StaticFallback";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";

// Heavy WebGL bundle is loaded only on the client, only when needed.
const InkCanvas = dynamic(() => import("./InkCanvas"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

function webglAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export default function InkBackground() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebgl(webglAvailable());

    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const useCanvas = mounted && !reducedMotion && webgl;

  return (
    <div className="ink-bg" aria-hidden role="presentation">
      {/* The CSS suminagashi is ALWAYS painted as a base layer, so the theme is
          never blank. When WebGL is available the live canvas draws on top of
          it (transparent, so if a shader/context fails at runtime the static
          ink still shows through instead of a black screen). */}
      <StaticFallback />
      {useCanvas && (
        <div className="ink-bg__canvas">
          <InkCanvas frameloop={tabVisible ? "always" : "never"} />
        </div>
      )}
      {/* paper veil keeps text crisp above the ink */}
      <div className="ink-bg__veil" />
    </div>
  );
}
