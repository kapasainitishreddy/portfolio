"use client";

import { useEffect } from "react";

export default function QuickMenuKeyboardNavigation() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (
        event.key !== "ArrowDown"
        && event.key !== "ArrowUp"
        && event.key !== "ArrowRight"
        && event.key !== "ArrowLeft"
        && event.key !== "Home"
        && event.key !== "End"
      ) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const grid = target.closest(".portfolio-command__grid");
      if (!(grid instanceof HTMLElement)) return;

      const actions = Array.from(grid.querySelectorAll<HTMLAnchorElement>("a[href]"));
      if (actions.length === 0) return;

      const currentAction = target.closest("a[href]");
      const currentIndex = currentAction instanceof HTMLAnchorElement
        ? actions.indexOf(currentAction)
        : -1;

      let nextIndex = currentIndex;
      if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = actions.length - 1;
      else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % actions.length;
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        nextIndex = currentIndex < 0 ? actions.length - 1 : (currentIndex - 1 + actions.length) % actions.length;
      }

      event.preventDefault();
      actions[nextIndex]?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
