import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080A0C",
    theme_color: "#080A0C",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
