import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketing Spec Generator",
  description: "Automatically generate marketing specs from code changes",
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
