import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Validiere die Eingabe
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Ungültige Anfrage: messages muss ein Array sein" }, { status: 400 })
    }

    // Formatiere die Nachrichten für Groq
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Generiere eine Antwort mit Groq statt Grok
    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      messages: formattedMessages,
      temperature: 0.7,
      maxTokens: 1000,
    })

    // Sende die Antwort zurück
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Fehler bei der Chat API-Anfrage:", error)
    return NextResponse.json({ error: "Fehler bei der Verarbeitung der Anfrage" }, { status: 500 })
  }
}
