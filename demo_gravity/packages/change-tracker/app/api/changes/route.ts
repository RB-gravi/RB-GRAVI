import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const changesPath = path.join(process.cwd(), "app/data/changes.json")

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
