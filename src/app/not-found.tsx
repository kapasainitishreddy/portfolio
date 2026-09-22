import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="shell">
        <p className="section-index">404 / Route not found</p>
        <h1>Nothing shipped here.</h1>
        <p>The route does not exist, but the working system is one step back.</p>
        <Link className="button button-primary" href="/">Return home</Link>
      </div>
    </main>
  );
}
