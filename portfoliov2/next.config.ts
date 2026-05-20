import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Stop your site from being embedded in iframes on other domains
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Tell browsers to always use HTTPS
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Limit referrer info sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unused browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Basic CSP — allows inline styles (Tailwind/framer-motion), self scripts,
  // external frames for the work-page previews, and the /api/send-email fetch
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "frame-src *",           // work page iframes load external sites
      "connect-src 'self'",    // /api/send-email
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Cache public images for 7 days
      // Note: /_next/static/** is managed by Vercel automatically — don't override it
      {
        source: "/:path(.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico))",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
