import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const MAX_CONTENT_LENGTH = 100_000

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

export async function POST(request: NextRequest) {
  try {
    const { filename, content, title } = await request.json()
    const safeFilename = sanitizeFilename(filename)

    if (typeof content !== "string") {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 })
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json({ error: "Document is too large" }, { status: 413 })
    }

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
          title,
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
    if (error instanceof Error && error.message.toLowerCase().includes("filename")) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error("Error saving document:", error)
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
  }
}
