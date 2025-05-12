"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCcw, ArrowDownRight, ArrowUpRight, Clock, X, CheckCircle } from "lucide-react"

interface TransactionsWidgetProps {
  data?: any[]
  compact?: boolean
  expanded?: boolean
}

export function TransactionsWidget({ data = [], compact = false, expanded = false }: TransactionsWidgetProps) {
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
  const mockTransactionData = [
    {
      id: "tx1",
      type: "buy",
      token: "BTC",
      amount: 0.05,
      price: 68423.12,
      total: 3421.16,
      status: "completed",
      timestamp: "2023-10-30T14:23:11Z",
      botId: "bot-1",
      botName: "Grid Trading Bot",
    },
    {
      id: "tx2",
      type: "sell",
      token: "ETH",
      amount: 1.2,
      price: 3215.78,
      total: 3858.94,
      status: "completed",
      timestamp: "2023-10-30T12:15:32Z",
      botId: "bot-2",
      botName: "DCA Bitcoin",
    },
    {
      id: "tx3",
      type: "buy",
      token: "SOL",
      amount: 15,
      price: 145.32,
      total: 2179.8,
      status: "pending",
      timestamp: "2023-10-30T09:42:05Z",
      botId: "bot-1",
      botName: "Grid Trading Bot",
    },
    {
      id: "tx4",
      type: "sell",
      token: "BNB",
      amount: 2.5,
      price: 543.21,
      total: 1358.03,
      status: "failed",
      timestamp: "2023-10-29T22:11:44Z",
      botId: "bot-3",
      botName: "ETH-USDT Scalper",
    },
  ]

  const transactionsData = data.length > 0 ? data : mockTransactionData
  // Limitiere Daten für das kompakte Widget
  const displayTransactions = compact && !expanded ? transactionsData.slice(0, 3) : transactionsData

  // Formatiere Zeitstempel für bessere Lesbarkeit
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // Heutiges Datum
    if (date.toDateString() === today.toDateString()) {
      return `Heute, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    // Gestriges Datum
    if (date.toDateString() === yesterday.toDateString()) {
      return `Gestern, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    // Andere Daten
    return (
      date.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" }) +
      `, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    )
  }

  // Status-Badge-Komponente mit verbesserten Touch-Zielen
  const TransactionStatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white px-2 py-1">
            <CheckCircle className="h-3 w-3 mr-1" />
            <span className={isMobile ? "text-xs" : "text-xs"}>Abgeschlossen</span>
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500 px-2 py-1">
            <Clock className="h-3 w-3 mr-1" />
            <span className={isMobile ? "text-xs" : "text-xs"}>Ausstehend</span>
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="px-2 py-1">
            <X className="h-3 w-3 mr-1" />
            <span className={isMobile ? "text-xs" : "text-xs"}>Fehlgeschlagen</span>
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="px-2 py-1">
            <span className={isMobile ? "text-xs" : "text-xs"}>{status}</span>
          </Badge>
        )
    }
  }

  return (
    <Card className={`${expanded ? "col-span-full" : ""}`}>
      <CardHeader className={`flex justify-between items-center ${compact ? "pb-2" : ""}`}>
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <RefreshCcw className="h-5 w-5 text-violet-500" />
          Transaktionen
        </CardTitle>
      </CardHeader>

      <CardContent className={`${compact ? "pt-0" : ""}`}>
        {displayTransactions.length > 0 ? (
          <div className="space-y-4">
            {displayTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => router.push(`/dashboard/transactions/${tx.id}`)}
              >
                <div className="flex items-start gap-3 w-full sm:w-auto">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "buy" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {tx.type === "buy" ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 justify-between">
                      <h3 className="font-medium truncate">
                        {tx.type === "buy" ? "Kauf" : "Verkauf"} {tx.amount} {tx.token}
                      </h3>

                      <div className="flex items-center gap-2">
                        <TransactionStatusBadge status={tx.status} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
                        <p className="text-xs text-muted-foreground">
                          Via <span className="font-medium">{tx.botName}</span>
                        </p>
                        <p className="hidden sm:block text-xs text-muted-foreground">•</p>
                        <p className="text-xs text-muted-foreground">{formatTimestamp(tx.timestamp)}</p>
                      </div>

                      <p className={`font-medium ${tx.type === "buy" ? "text-green-600" : "text-red-600"}`}>
                        {tx.type === "buy" ? "-" : "+"} $
                        {tx.total.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <RefreshCcw className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium">Keine Transaktionen</h3>
            <p className="text-sm text-muted-foreground">Erstellen Sie einen Bot, um mit dem Trading zu beginnen</p>
          </div>
        )}

        {compact && transactionsData.length > 3 && !expanded && (
          <div className="pt-4 text-center">
            <Button variant="link" size="sm" onClick={() => router.push("/dashboard/transactions")}>
              Alle Transaktionen anzeigen
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
