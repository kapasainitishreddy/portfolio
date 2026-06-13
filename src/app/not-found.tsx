import type { Metadata } from "next";
import Link from "next/link";
import DispersedInk from "@/components/ink/DispersedInk";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="content-pad relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      <DispersedInk />
      <p className="font-mono-label relative z-10">404</p>
      <h1 className="relative z-10 mt-4 font-serif text-rice" style={{ fontSize: "clamp(2.4rem, 8vw, 5rem)" }}>
        This page dispersed.
      </h1>
      <p className="relative z-10 mt-4 max-w-md text-silver">
        The page you were looking for drifted away like ink in water. Let us guide you back to calmer waters.
      </p>
      <Link
        href="/"
        className="relative z-10 mt-8 rounded-full px-6 py-3 text-sm font-medium text-ink"
        style={{ background: "var(--color-soft)" }}
      >
        Return home
      </Link>
    </main>
  );
}
