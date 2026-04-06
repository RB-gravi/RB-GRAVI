import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const changesPath = path.join(process.cwd(), "app/data/changes.json")

export async function GET() {
  try {
    if (!fs.existsSync(changesPath)) {
      return NextResponse.json([])
    }

    const data = fs.readFileSync(changesPath, "utf8")
    const changes = JSON.parse(data)

    return NextResponse.json(changes)
  } catch (error) {
    console.error("Error reading changes:", error)
    return NextResponse.json([])
  }
}

export async function DELETE() {
  try {
    fs.writeFileSync(changesPath, JSON.stringify([]), "utf8")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error clearing changes:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
