import { type NextRequest, NextResponse } from "next/server"
import { sendKeywordAlerts } from "@/lib/seo/keyword-alerts"
import { validateCronSecret } from "@/lib/env-utils"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  // Extrahiere das Secret aus dem Authorization-Header oder Query-Parameter
  const authHeader = request.headers.get("authorization")
  const secret = authHeader ? authHeader.replace("Bearer ", "") : request.nextUrl.searchParams.get("secret")

  // Überprüfe das Secret
  if (!validateCronSecret(secret)) {
    console.error("Ungültiges CRON_SECRET bei keyword-alerts")
    return new NextResponse(JSON.stringify({ error: "Nicht autorisiert" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    // Sende Keyword-Alerts
    const result = await sendKeywordAlerts()

    return NextResponse.json({
      success: true,
      message: "Keyword-Alerts wurden gesendet",
      sentAlerts: result.length,
    })
  } catch (error) {
    console.error("Fehler beim Senden der Keyword-Alerts:", error)
    return NextResponse.json({ error: "Fehler beim Senden der Keyword-Alerts" }, { status: 500 })
  }
}
