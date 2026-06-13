"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#080A0C",
          color: "#F2EFE8",
          fontFamily: "system-ui, sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Something went wrong</h1>
        <p style={{ color: "#A9ADB4", marginBottom: "1.5rem" }}>
          The application hit an unexpected error.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#FAF8F3",
            color: "#080A0C",
            border: "none",
            borderRadius: "999px",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
