import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080A0C",
    theme_color: "#080A0C",
    icons: [{ src: "favicon.png", sizes: "192x192", type: "image/png" }],
  };
}
