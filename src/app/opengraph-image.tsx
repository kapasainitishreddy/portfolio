import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} · ${site.roles[0]}`;

// Social-share card: editorial name + tagline over an ink-dark field.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(120% 120% at 20% 10%, #26345E 0%, #171A1E 45%, #080A0C 100%)",
          color: "#F2EFE8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#26345E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: "#FAF8F3",
            }}
          >
            SK
          </div>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#A9ADB4", fontFamily: "monospace" }}>
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 70, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 30, color: "#A9ADB4", maxWidth: 900 }}>
            I build intelligent systems from data, networks, and ambitious ideas.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
