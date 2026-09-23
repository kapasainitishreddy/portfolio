"use client";

import { useEffect, useState } from "react";

const pageIds = new Set(["overview", "work", "experience", "systems", "method", "lab", "writing", "about", "contact"]);

export default function DocsArticle({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState("overview");

  useEffect(() => {
    const syncPage = () => {
      const nextPage = window.location.hash.slice(1);
      setCurrentPage(pageIds.has(nextPage) ? nextPage : "overview");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    syncPage();
    window.addEventListener("hashchange", syncPage);
    window.addEventListener("popstate", syncPage);
    return () => {
      window.removeEventListener("hashchange", syncPage);
      window.removeEventListener("popstate", syncPage);
    };
  }, []);

  return <main className="docs-article" id="main" data-current-page={currentPage} tabIndex={-1}>{children}</main>;
}
