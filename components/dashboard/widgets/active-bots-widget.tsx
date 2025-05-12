"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bot, MoreVertical, Power, PowerOff, Settings, Play, PauseCircle, AlertTriangle } from "lucide-react"

interface ActiveBotsWidgetProps {
  data?: any[]
  compact?: boolean
  expanded?: boolean
}

export function ActiveBotsWidget({ data = [], compact = false, expanded = false }: ActiveBotsWidgetProps) {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // Überprüfen Sie die Bildschirmgröße
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Initial überprüfen
    checkScreenSize()

    // Event-Listener für Größenänderungen hinzufügen
    window.addEventListener("resize", checkScreenSize)

    // Event-Listener entfernen, wenn die Komponente nicht mehr gerendert wird
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Mock-Daten, wenn keine bereitgestellt werden
  const mockBotData = [
    {
      id: "bot-1",
      name: "Grid Trading Bot",
      type: "Grid",
      status: "active",
      performance: 12.4,
      lastActive: "2023-10-30T15:42:11Z",
    },
    {
      id: "bot-2",
      name: "DCA Bitcoin",
      type: "DCA",
      status: "active",
      performance: 8.7,
      lastActive: "2023-10-30T18:15:32Z",
    },
    {
      id: "bot-3",
      name: "ETH-USDT Scalper",
      type: "Scalper",
      status: "paused",
      performance: -2.1,
      lastActive: "2023-10-29T23:11:05Z",
    },
    {
      id: "bot-4",
      name: "Arbitrage Bot",
      type: "Arbitrage",
      status: "error",
      performance: 0,
      lastActive: "2023-10-28T10:05:44Z",
    },
  ]

  const botsData = data.length > 0 ? data : mockBotData
  // Limitiere Daten für das kompakte Widget
  const displayBots = compact && !expanded ? botsData.slice(0, 3) : botsData

  const navigateToBot = (botId: string) => {
    router.push(`/dashboard/bots/${botId}`)
  }

  // Status-Badge-Komponente mit verbesserten Touch-Zielen
  const BotStatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white px-2 py-1">
            <Power className="h-3 w-3 mr-1" />
            <span className={isMobile ? "text-xs" : "text-xs"}>Aktiv</span>
          </Badge>
        )
      case "paused":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500 px-2 py-1">
            <PauseCircle className="h-3 w-3 mr-1" />
            <span className={isMobile ? "text-xs" : "text-xs"}>Pausiert</span>
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive" className="px-2 py-1">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span className={isMobile ? "text-xs" : "text-xs"}>Fehler</span>
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="px-2 py-1">
            <PowerOff className="h-3 w-3 mr-1" />
            <span className={isMobile ? "text-xs" : "text-xs"}>Inaktiv</span>
          </Badge>
        )
    }
  }

  return (
    <Card className={`${expanded ? "col-span-full" : ""}`}>
      <CardHeader className={`flex justify-between items-center ${compact ? "pb-2" : ""}`}>
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-500" />
          Aktive Bots
        </CardTitle>

        {!compact && (
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/bots/new")}>
            Neuer Bot
          </Button>
        )}
      </CardHeader>

      <CardContent className={`${compact ? "pt-0" : ""}`}>
        {displayBots.length > 0 ? (
          <div className="space-y-4">
            {displayBots.map((bot) => (
              <div
                key={bot.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3 w-full">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      bot.status === "active"
                        ? "bg-blue-100 text-blue-600"
                        : bot.status === "paused"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    <Bot className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:gap-2">
                      <h3
                        className="font-medium truncate cursor-pointer hover:underline"
                        onClick={() => navigateToBot(bot.id)}
                      >
                        {bot.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        <BotStatusBadge status={bot.status} />
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            bot.performance > 0
                              ? "bg-green-100 text-green-700"
                              : bot.performance < 0
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {bot.performance > 0 ? "+" : ""}
                          {bot.performance}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{bot.type}</p>

                      {/* Mobile Action Buttons */}
                      <div className="flex sm:hidden items-center space-x-2">
                        <button
                          className="p-1.5 rounded-full hover:bg-muted"
                          aria-label={bot.status === "active" ? "Bot pausieren" : "Bot starten"}
                          onClick={(e) => {
                            e.stopPropagation()
                            // Logik zum Starten/Pausieren des Bots
                          }}
                        >
                          {bot.status === "active" ? (
                            <PauseCircle className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <Play className="h-4 w-4 text-green-500" />
                          )}
                        </button>

                        <button
                          className="p-1.5 rounded-full hover:bg-muted"
                          aria-label="Bot bearbeiten"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigateToBot(bot.id)
                          }}
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden sm:flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Logik zum Starten/Pausieren des Bots
                    }}
                    aria-label={bot.status === "active" ? "Bot pausieren" : "Bot starten"}
                  >
                    {bot.status === "active" ? (
                      <PauseCircle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Play className="h-4 w-4 text-green-500" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateToBot(bot.id)
                    }}
                    aria-label="Bot bearbeiten"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Mehr Optionen</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigateToBot(bot.id)}>Details anzeigen</DropdownMenuItem>
                      <DropdownMenuItem>Performance analysieren</DropdownMenuItem>
                      <DropdownMenuItem>Einstellungen ändern</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Bot löschen</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Bot className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium">Keine aktiven Bots</h3>
            <p className="text-sm text-muted-foreground">Erstellen Sie Ihren ersten Trading-Bot</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push("/dashboard/bots/new")}>
              Bot erstellen
            </Button>
          </div>
        )}

        {compact && botsData.length > 3 && !expanded && (
          <div className="pt-4 text-center">
            <Button variant="link" size="sm" onClick={() => router.push("/dashboard/bots")}>
              Alle Bots anzeigen
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
