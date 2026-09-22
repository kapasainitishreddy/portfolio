import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: ".",
    scope: ".",
    display: "standalone",
    background_color: "#070809",
    theme_color: "#070809",
    icons: [{ src: "favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
