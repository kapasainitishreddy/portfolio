"use client";

import { useEffect, useRef, useState } from "react";

type LoadState = "idle" | "loading" | "ready" | "error";

const SCRIPT_ID = "syrava-assistant-widget";
const SCRIPT_SRC = "https://syrava.com/assistant/v1/widget.js";

function ensureAssistantElement(host: HTMLElement) {
  if (host.querySelector("syrava-assistant")) return;

  const element = document.createElement("syrava-assistant");
  element.setAttribute("site-config", "/assistant/site.json");
  host.appendChild(element);
}

export default function AssistantConsentLauncher() {
  const [state, setState] = useState<LoadState>("idle");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function mark(next: LoadState) {
    if (mounted.current) setState(next);
  }

  function loadAssistant() {
    if (state === "loading" || state === "ready") return;

    const host = document.getElementById("syrava-assistant-host");
    if (!host) {
      setState("error");
      return;
    }

    setState("loading");

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing?.dataset.loaded === "true") {
      ensureAssistantElement(host);
      setState("ready");
      return;
    }

    const script = existing ?? document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "module";
    script.src = SCRIPT_SRC;
    script.referrerPolicy = "strict-origin-when-cross-origin";

    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        ensureAssistantElement(host);
        mark("ready");
      },
      { once: true },
    );
    script.addEventListener("error", () => mark("error"), { once: true });

    if (!existing) document.body.appendChild(script);
  }

  if (state === "ready") return null;

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex max-w-[min(22rem,calc(100vw-2rem))] flex-col items-end gap-2">
      {state === "error" && (
        <p
          role="alert"
          className="surface max-w-xs rounded-lg px-4 py-3 text-sm leading-relaxed text-silver"
        >
          The portfolio guide could not load. The rest of the site still works normally.
        </p>
      )}

      <button
        type="button"
        onClick={loadAssistant}
        disabled={state === "loading"}
        className="surface inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-rice transition-colors hover:bg-[color-mix(in_srgb,var(--color-silver)_10%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] disabled:cursor-wait disabled:opacity-70"
        aria-describedby="assistant-privacy-note"
      >
        {state === "loading" ? "Opening guide…" : state === "error" ? "Retry Ask Nitish" : "Ask Nitish"}
      </button>

      <span id="assistant-privacy-note" className="sr-only">
        Opens the portfolio guide and then loads its interface code from syrava.com. No third-party guide request is made before you choose this button.
      </span>
    </div>
  );
}
