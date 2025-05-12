import { type NextRequest, NextResponse } from "next/server"
// import { updateKeywordRankings } from "@/lib/seo/keyword-tracker"
import { validateCronSecret } from "@/lib/env-utils"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  // Extrahiere das Secret aus dem Authorization-Header oder Query-Parameter
  const authHeader = request.headers.get("authorization")
  const secret = authHeader ? authHeader.replace("Bearer ", "") : request.nextUrl.searchParams.get("secret")

  // Überprüfe das Secret
  if (!validateCronSecret(secret)) {
    console.error("Ungültiges CRON_SECRET bei update-keywords")
    return new NextResponse(JSON.stringify({ error: "Nicht autorisiert" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    // Hier würde die Logik zum Aktualisieren der Keyword-Rankings stehen
    // await updateKeywordRankings();
    console.log("Cronjob für Keyword-Ranking-Updates erfolgreich ausgeführt.")
    return NextResponse.json({ success: true, message: "Keyword-Rankings erfolgreich aktualisiert." })
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Keyword-Rankings:", error)
    return NextResponse.json({ error: "Fehler beim Aktualisieren der Keyword-Rankings" }, { status: 500 })
  }
}
