import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketing Document Change Tracker",
  description: "Track and summarize changes to marketing documents automatically",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
