import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketing Documents Editor",
  description: "Edit marketing documents and track changes automatically",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
