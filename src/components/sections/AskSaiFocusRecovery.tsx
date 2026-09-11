"use client";

import { useEffect } from "react";

export default function AskSaiFocusRecovery() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const stopButton = target.closest<HTMLButtonElement>('button[aria-label="Stop Ask Sai response"]');
      if (!stopButton) return;

      window.requestAnimationFrame(() => {
        const questionInput = document.getElementById("ask-nitish-question");
        if (questionInput instanceof HTMLInputElement) questionInput.focus();
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
