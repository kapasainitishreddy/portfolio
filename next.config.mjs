// Set STATIC_EXPORT=true to produce a fully static build (used for the
// GitHub Pages deploy, which has no server: no API routes, no image
// optimization, no custom headers). The default build (Vercel, `next dev`)
// keeps the API route, image optimization, and security headers.
const isStaticExport = process.env.STATIC_EXPORT === "true";
// GitHub Pages serves this repo at /portfolio, not the domain root.
const basePath = isStaticExport ? "/portfolio" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport && {
    output: "export",
    basePath,
    assetPrefix: `${basePath}/`,
  }),
  // Exposed to client code so plain <a href> / next/image string sources
  // (which Next does not auto-prefix, unlike next/link) can prepend it via
  // src/lib/basePath.ts. Empty string for the normal build — a no-op there.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow the locally-authored project snapshot SVGs to be served through
    // next/image. Sandboxed + script-src 'none' keeps it safe for our own assets.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Static export has no image-optimization server.
    ...(isStaticExport && { unoptimized: true }),
  },
  // three.js ships ESM; transpile for older bundling edge cases
  transpilePackages: ["three"],
  // Custom headers require a server; skip entirely for static export.
  ...(!isStaticExport && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "SAMEORIGIN" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          ],
        },
      ];
    },
  }),
};

export default nextConfig;
