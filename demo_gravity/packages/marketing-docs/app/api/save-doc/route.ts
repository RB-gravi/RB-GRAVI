import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const MAX_CONTENT_LENGTH = 100_000
const MAX_TITLE_LENGTH = 200

// Simple in-memory rate limiter: max 20 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()

  // Purge expired entries to prevent unbounded memory growth
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key)
    }
  }

  const entry = rateLimitMap.get(ip)

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

function sanitizeFilename(filename: unknown) {
  if (typeof filename !== "string") {
    throw new Error("Filename must be a string")
  }

  const normalized = filename.trim()

  if (!normalized) {
    throw new Error("Filename is required")
  }

  const safeName = path.basename(normalized)

  if (safeName !== normalized || normalized.includes("..")) {
    throw new Error("Invalid filename")
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(safeName)) {
    throw new Error("Filename contains unsupported characters")
  }

  return safeName
}

function sanitizeTitle(title: unknown): string {
  if (title === undefined || title === null) {
    return ""
  }
  if (typeof title !== "string") {
    throw new Error("Title must be a string")
  }
  return title.trim().slice(0, MAX_TITLE_LENGTH)
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const { filename, content, title } = await request.json()
    const safeFilename = sanitizeFilename(filename)

    if (typeof content !== "string") {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 })
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json({ error: "Document is too large" }, { status: 413 })
    }

    const safeTitle = sanitizeTitle(title)

    // Create docs directory if it doesn't exist
    const docsDir = path.join(process.cwd(), "documents")
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true })
    }

    // Save the document
    const filePath = path.join(docsDir, safeFilename)
    fs.writeFileSync(filePath, content)

    // Also save metadata
    const metadataPath = path.join(docsDir, `${safeFilename}.meta.json`)
    fs.writeFileSync(
      metadataPath,
      JSON.stringify(
        {
          title: safeTitle,
          filename: safeFilename,
          lastModified: new Date().toISOString(),
          wordCount: content.split(/\s+/).length,
        },
        null,
        2,
      ),
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.toLowerCase().includes("filename") ||
        error.message.toLowerCase().includes("title"))
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error("Error saving document:", error)
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
  }
}
