// Set STATIC_EXPORT=true to produce a fully static build (used for the
// GitHub Pages deploy, which has no server: no API routes, no image
// optimization, no custom headers). The default build (Vercel/Netlify,
// `next dev`) keeps the API route, image optimization, and security headers.
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = isStaticExport ? "/portfolio" : "";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport && {
    output: "export",
    basePath,
    assetPrefix: `${basePath}/`,
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    // ContactForm uses this compile-time value to choose the honest mailto
    // fallback on GitHub Pages instead of attempting a non-existent API call.
    NEXT_PUBLIC_STATIC_EXPORT: isStaticExport ? "true" : "false",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    ...(isStaticExport && { unoptimized: true }),
  },
  transpilePackages: ["three"],
  ...(!isStaticExport && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "Content-Security-Policy", value: contentSecurityPolicy },
            { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
            { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          ],
        },
      ];
    },
  }),
};

export default nextConfig;
