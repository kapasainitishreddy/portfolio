"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // surface the error in dev tools without external analytics
    console.error(error);
  }, [error]);

  return (
    <main className="content-pad flex min-h-screen flex-col items-center justify-center text-center">
      <p className="font-mono-label">Something dispersed</p>
      <h1 className="mt-4 font-serif text-4xl text-rice md:text-5xl">
        The ink ran past the page.
      </h1>
      <p className="mt-4 max-w-md text-silver">
        An unexpected error occurred. You can try again, and the surface should settle.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full px-6 py-3 text-sm font-medium text-ink"
        style={{ background: "var(--color-soft)" }}
      >
        Try again
      </button>
    </main>
  );
}
