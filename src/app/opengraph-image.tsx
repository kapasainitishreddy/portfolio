import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — Forward Deployed Engineer and AI Product Builder`;
export const dynamic = "force-static";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px", background: "#070809", color: "#f2f4f7", fontFamily: "Arial, sans-serif", border: "1px solid #253244" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 700 }}>
          <span>SN / 01</span>
          <span style={{ color: "#6ea8ff", fontFamily: "monospace", fontSize: 17 }}>BUILD · INTEGRATE · PROVE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: "#6ea8ff", fontFamily: "monospace", fontSize: 20 }}>{site.name}</div>
          <div style={{ maxWidth: 980, fontSize: 74, lineHeight: 0.98, fontWeight: 700, letterSpacing: -4 }}>From ambiguous problem to working system.</div>
          <div style={{ maxWidth: 900, color: "#aeb7c4", fontSize: 28 }}>Forward Deployed Engineer and AI product builder.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#aeb7c4", fontFamily: "monospace", fontSize: 16 }}>
          <span style={{ width: 12, height: 12, background: "#6ea8ff" }} />
          <span>AI-native products</span><span>·</span><span>Web + mobile</span><span>·</span><span>Production systems</span>
        </div>
      </div>
    ),
    size,
  );
}
