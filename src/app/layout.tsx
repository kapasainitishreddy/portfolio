import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono, Ma_Shan_Zheng, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import "./portfolio.css";
import { site, socials } from "@/data/site";
import { InkProvider } from "@/components/ink/InkProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ModeProvider } from "@/components/theme/ModeContext";
import ThemedBackground from "@/components/theme/ThemedBackground";
import ThemeExtras from "@/components/theme/ThemeExtras";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const maShanZheng = Ma_Shan_Zheng({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-brush",
  display: "swap",
});

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-samurai",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080A0C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.roles[0]}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Sai Nitish Reddy Kapa",
    "AI product builder",
    "data scientist",
    "blockchain",
    "network analysis",
    "AI agents",
    "machine learning",
    "portfolio",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} · ${site.roles[0]}`,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.roles[0]}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.roles.join(", "),
  email: `mailto:${site.email}`,
  url: site.url,
  description: site.description,
  sameAs: [socials.github, socials.linkedin],
  knowsAbout: [
    "Artificial Intelligence",
    "Data Science",
    "Blockchain",
    "Network Analysis",
    "Product Development",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrains.variable} ${maShanZheng.variable} ${shippori.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('snrk_theme');if(t==='ink'||t==='calligraphy'||t==='samurai'){document.documentElement.setAttribute('data-theme',t);}var m=localStorage.getItem('snrk_mode');document.documentElement.setAttribute('data-mode',(m==='light'||m==='dark')?m:'dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ModeProvider>
          <ThemeProvider>
            <InkProvider>
              <ThemedBackground />
              {children}
              <ThemeExtras />
            </InkProvider>
          </ThemeProvider>
        </ModeProvider>
        <div id="syrava-assistant-host" aria-hidden="false" />
        <script type="module" src="https://syrava.com/assistant/v1/widget.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var host=document.getElementById('syrava-assistant-host');if(!host)return;var el=document.createElement('syrava-assistant');el.setAttribute('site-config','/assistant/site.json');host.appendChild(el);}());`,
          }}
        />
      </body>
    </html>
  );
}
