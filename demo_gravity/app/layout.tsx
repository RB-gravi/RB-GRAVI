import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { resolveFeatureFlags } from '@/lib/featureFlags'
import { FeatureFlagProvider } from '@/hooks/use-feature-flag'

export const metadata: Metadata = {
  title: 'Gravity',
  description:
    'Gravity helps product teams turn code changes into launch-ready marketing updates faster with AI-generated specs, messaging, and collaboration workflows.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Resolve flags once per request on the server; only booleans reach the client.
  const flags = resolveFeatureFlags()

  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <FeatureFlagProvider flags={flags}>{children}</FeatureFlagProvider>
      </body>
    </html>
  )
}
