import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sample SaaS App",
  description: "A sample SaaS application for demo purposes",
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
