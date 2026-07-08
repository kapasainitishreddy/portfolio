import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
// Static content with no request-time data — required for GitHub Pages'
// fully static export build (STATIC_EXPORT=true).
export const dynamic = "force-static";

// Favicon: "SK" initials on an indigo ink disc.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 35% 30%, #26345E 0%, #080A0C 90%)",
          color: "#F2EFE8",
          fontSize: 34,
          fontWeight: 500,
          fontFamily: "Georgia, serif",
          borderRadius: 14,
          letterSpacing: -1,
        }}
      >
        SK
      </div>
    ),
    { ...size },
  );
}
