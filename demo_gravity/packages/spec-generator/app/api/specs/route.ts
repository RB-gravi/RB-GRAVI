import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const specsPath = path.join(process.cwd(), "app/data/latest-specs.json")

    if (!fs.existsSync(specsPath)) {
      return NextResponse.json([])
    }

    const data = fs.readFileSync(specsPath, "utf8")
    const specs = JSON.parse(data)

    return NextResponse.json(specs)
  } catch (error) {
    console.error("Error reading specs:", error)
    return NextResponse.json([])
  }
}
