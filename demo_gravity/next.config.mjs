/** @type {import('next').NextConfig} */

const ONE_YEAR_IN_SECONDS = 31536000

/**
 * HTTP security headers applied to every response when the
 * FEATURE_ENABLE_SECURITY_HARDENING flag is enabled.
 */
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "Origin-Agent-Cluster",
    value: "?1",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
]

const staticAssetCacheHeaders = [
  {
    source: "/_next/static/:path*",
    headers: [
      {
        key: "Cache-Control",
        value: `public, max-age=${ONE_YEAR_IN_SECONDS}, immutable`,
      },
    ],
  },
  {
    source: "/:path*.:ext(js|css|woff|woff2|ttf|otf|eot|svg|ico|jpg|jpeg|png|webp|avif|gif)",
    headers: [
      {
        key: "Cache-Control",
        value: "public, max-age=0, must-revalidate",
      },
    ],
  },
]

const securityHardeningEnabled =
  process.env.FEATURE_ENABLE_SECURITY_HARDENING?.toLowerCase() === "true"

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.output.assetModuleFilename = "static/media/[name].[contenthash][ext]"
    }

    return config
  },
  async headers() {
    const globalHeaders = securityHardeningEnabled
      ? [
          {
            source: "/(.*)",
            headers: securityHeaders,
          },
        ]
      : []

    return [...staticAssetCacheHeaders, ...globalHeaders]
  },
}

export default nextConfig
