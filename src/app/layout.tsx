import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./portfolio-v4.css";
import { site, socials } from "@/data/site";

const siteBase = site.url.replace(/\/$/, "");
const siteOrigin = new URL(site.url).origin;

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Sai Nitish Reddy Kapa | Forward Deployed Engineer & AI Product Builder",
    template: `%s | ${site.name}`,
  },
  description:
    "Forward Deployed Engineer and AI product builder turning ambiguous problems into reliable products, integrations, and production systems.",
  keywords: [
    "Sai Nitish Reddy Kapa",
    "Forward Deployed Engineer",
    "AI Product Builder",
    "Applied AI Engineer",
    "AI agents",
    "Full-Stack Engineer",
    "Solutions Engineer",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: site.url },
  icons: {
    icon: [{ url: `${siteBase}/favicon.svg`, type: "image/svg+xml" }],
    shortcut: `${siteBase}/favicon.svg`,
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Sai Nitish Reddy Kapa | Forward Deployed Engineer & AI Product Builder",
    description: "I turn ambiguous problems into reliable products, integrations, and production systems.",
    siteName: site.name,
    images: [{ url: `${siteBase}/opengraph-image`, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Nitish Reddy Kapa | Forward Deployed Engineer & AI Product Builder",
    description: "I turn ambiguous problems into reliable products, integrations, and production systems.",
    images: [`${siteBase}/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Forward Deployed Engineer and AI Product Builder",
  email: `mailto:${site.email}`,
  url: site.url,
  description: site.description,
  sameAs: [socials.github, socials.linkedin],
  knowsAbout: [
    "Forward Deployed Engineering",
    "Agentic AI",
    "Product Engineering",
    "Data and API Integration",
    "AI Evaluation",
    "Production AI Delivery",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
