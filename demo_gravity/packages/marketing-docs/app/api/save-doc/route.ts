import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { filename, content, title } = await request.json()

    // Create docs directory if it doesn't exist
    const docsDir = path.join(process.cwd(), "documents")
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true })
    }

    // Save the document
    const filePath = path.join(docsDir, filename)
    fs.writeFileSync(filePath, content)

    // Also save metadata
    const metadataPath = path.join(docsDir, `${filename}.meta.json`)
    fs.writeFileSync(
      metadataPath,
      JSON.stringify(
        {
          title,
          filename,
          lastModified: new Date().toISOString(),
          wordCount: content.split(/\s+/).length,
        },
        null,
        2,
      ),
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving document:", error)
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
  }
}
