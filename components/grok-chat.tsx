"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Bot, Send, User, X, Minimize, Maximize, Brain, Sparkles, ArrowDown, Copy, Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type Message = {
  role: "user" | "assistant"
  content: string
}

// Vordefinierte Fragen für Schnellauswahl
const suggestedQuestions = [
  {
    de: "Wie funktioniert der Sniper Bot?",
    en: "How does the Sniper Bot work?",
    es: "¿Cómo funciona el Bot Sniper?",
    fr: "Comment fonctionne le Bot Sniper ?",
    zh: "狙击机器人是如何工作的？",
  },
  {
    de: "Was sind die Vorteile von Rust Rocket?",
    en: "What are the advantages of Rust Rocket?",
    es: "¿Cuáles son las ventajas de Rust Rocket?",
    fr: "Quels sont les avantages de Rust Rocket ?",
    zh: "Rust Rocket有什么优势？",
  },
  {
    de: "Wie kann ich mit dem Trading beginnen?",
    en: "How can I start trading?",
    es: "¿Cómo puedo empezar a operar?",
    fr: "Comment puis-je commencer à trader ?",
    zh: "我如何开始交易？",
  },
  {
    de: "Was kostet der Zugang zu Rust Rocket?",
    en: "How much does access to Rust Rocket cost?",
    es: "¿Cuánto cuesta el acceso a Rust Rocket?",
    fr: "Combien coûte l'accès à Rust Rocket ?",
    zh: "访问Rust Rocket需要多少费用？",
  },
]

export default function GrokChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  // Automatisches Scrollen zum Ende der Nachrichten
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Tastaturkürzel zum Öffnen des Chats
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+C öffnet den Chat
      if (e.altKey && e.key === "c") {
        setIsOpen((prev) => !prev)
        setIsMinimized(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Nachricht senden
  const sendMessage = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      // Produktinformationen zum Kontext hinzufügen
      const contextEnhancedMessages = [
        {
          role: "system" as const,
          content: `Du bist ein Assistent für Rust Rocket, einen führenden Telegram Trading und Sniping Bot. 
          Rust Rocket bietet verschiedene Bots an: Sniper Bot (für schnelles Token-Sniping in <10ms), 
          Wallet Bot (zum Kopieren erfolgreicher Trader), Whale Bot (zum Verfolgen von Whale-Bewegungen) 
          und Buy Bot (für automatisierte Kaufstrategien). Die Plattform nutzt fortschrittliche 
          Rust-Technologie für maximale Geschwindigkeit und Präzision. Aktuelle Sprache: ${language}`,
        },
        ...messages,
        userMessage,
      ]

      const response = await fetch("/api/chat/grok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: contextEnhancedMessages,
        }),
      })

      if (!response.ok) {
        throw new Error(`Netzwerkantwort war nicht ok: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Fehler beim Senden der Nachricht:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Entschuldigung, es gab ein Problem bei der Verarbeitung Ihrer Anfrage. Unser Chat-Service ist momentan nicht verfügbar. Bitte versuchen Sie es später noch einmal.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Nachricht bei Enter-Taste senden
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Text in die Zwischenablage kopieren
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Chat-Bubble zum Öffnen des Chats
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 p-0 shadow-lg hover:from-green-600 hover:to-emerald-700"
        aria-label="Chat mit AI öffnen"
      >
        <Brain className="h-6 w-6 text-white" />
        <span className="sr-only">Chat öffnen (Alt+C)</span>
      </Button>
    )
  }

  // Minimierter Chat
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-white shadow-lg">
        <Bot className="h-5 w-5" />
        <span className="font-medium">AI Assistent</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMinimized(false)}
          className="ml-2 h-6 w-6 rounded-full p-0 text-white hover:bg-green-600"
        >
          <Maximize className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-6 left-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-lg shadow-xl">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-white/20">
              <Bot className="h-5 w-5 text-white" />
            </Avatar>
            <CardTitle className="text-base text-white">AI Assistent</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="h-6 w-6 rounded-full p-0 text-white hover:bg-green-600"
              title="Minimieren"
            >
              <Minimize className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 rounded-full p-0 text-white hover:bg-green-600"
              title="Schließen"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
            <Bot className="mb-2 h-12 w-12 text-green-500" />
            <p className="mb-1 text-lg font-medium">Willkommen bei Rust Rocket!</p>
            <p className="mb-4 text-sm">
              Fragen Sie unseren AI Assistenten nach Informationen zu unseren Trading-Bots oder wie Sie loslegen können.
            </p>

            {showSuggestions && (
              <div className="mt-2 w-full space-y-2">
                <p className="text-xs font-medium text-gray-400">Vorschläge:</p>
                {suggestedQuestions.map((q, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start text-left text-sm"
                    onClick={() => sendMessage(q[language])}
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-green-500" />
                    {q[language]}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`group relative flex max-w-[80%] items-start gap-2 rounded-lg px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="mt-1 h-6 w-6 bg-emerald-600">
                      <Bot className="h-4 w-4 text-white" />
                    </Avatar>
                  )}
                  <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                  {msg.role === "user" && (
                    <Avatar className="mt-1 h-6 w-6 bg-green-600">
                      <User className="h-4 w-4 text-white" />
                    </Avatar>
                  )}

                  {/* Kopier-Button für Assistenten-Nachrichten */}
                  {msg.role === "assistant" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(msg.content, index)}
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white p-1 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 dark:bg-gray-700"
                      title="Kopieren"
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t bg-white p-3 dark:bg-gray-950">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Stellen Sie eine Frage... (Alt+C)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="h-10 w-10 rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Zeige Vorschläge wieder an, wenn der Nutzer möchte */}
          {messages.length > 0 && !showSuggestions && (
            <Button
              variant="ghost"
              size="sm"
              className="mx-auto flex items-center text-xs text-gray-500"
              onClick={() => setShowSuggestions(true)}
            >
              <ArrowDown className="mr-1 h-3 w-3" />
              Vorschläge anzeigen
            </Button>
          )}

          {messages.length > 0 && showSuggestions && (
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.slice(0, 2).map((q, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="h-auto py-1 text-xs"
                  onClick={() => sendMessage(q[language])}
                >
                  {q[language]}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
