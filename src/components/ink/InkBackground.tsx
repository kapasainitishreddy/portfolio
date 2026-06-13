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

  const useStatic = !mounted || reducedMotion || !webgl;

  return (
    <div className="ink-bg" aria-hidden role="presentation">
      {useStatic ? <StaticFallback /> : <InkCanvas frameloop={tabVisible ? "always" : "never"} />}
      {/* paper veil keeps text crisp above the ink */}
      <div className="ink-bg__veil" />
    </div>
  );
}
