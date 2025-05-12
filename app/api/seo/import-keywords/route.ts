import { type NextRequest, NextResponse } from "next/server"
import { storeKeywordData } from "@/lib/seo/keyword-tracker"
import { validateAdminSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Überprüfe Admin-Authentifizierung
    const isAdmin = await validateAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse den Request-Body
    const data = await request.json()

    // Validiere die Daten
    if (
      !Array.isArray(data) ||
      !data.every((item) => item.keyword && item.language && typeof item.position === "number" && item.url)
    ) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Speichere die Keyword-Daten
    await storeKeywordData(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error importing keyword data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
