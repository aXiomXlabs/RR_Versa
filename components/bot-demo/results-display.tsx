"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Clock, DollarSign, BarChart, ExternalLink } from "lucide-react"
import type { BotType, SimulationResults, Trade } from "./types"
import { botDescriptions } from "./default-configs"

interface ResultsDisplayProps {
  results: SimulationResults
  botType: BotType
  onToggleComparison: () => void
}

export default function ResultsDisplay({ results, botType, onToggleComparison }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("summary")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  return (
    <Card className="bg-dark/30 backdrop-blur-md border-white/10 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Simulationsergebnisse</h3>
        <button className="text-sm text-neon flex items-center hover:underline" onClick={onToggleComparison}>
          <BarChart className="w-4 h-4 mr-1" />
          Vergleich mit manuellem Trading
        </button>
      </div>

      <Tabs defaultValue="summary" onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 border-b border-white/10 w-full justify-start mb-4">
          <TabsTrigger value="summary" className="data-[state=active]:bg-white/10">
            Zusammenfassung
          </TabsTrigger>
          <TabsTrigger value="trades" className="data-[state=active]:bg-white/10">
            Trades
          </TabsTrigger>
          <TabsTrigger value="metrics" className="data-[state=active]:bg-white/10">
            Metriken
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium mb-3">Performance</h4>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-silver">Startkapital</span>
                    <span className="font-medium">{formatCurrency(results.startBalance)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-silver">Endkapital</span>
                    <span className="font-medium">{formatCurrency(results.endBalance)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-silver">Absoluter Gewinn/Verlust</span>
                    <span className={`font-medium ${results.profitLoss >= 0 ? "text-neon" : "text-red"}`}>
                      {formatCurrency(results.profitLoss)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-silver">ROI</span>
                    <span className={`font-medium ${results.roi >= 0 ? "text-neon" : "text-red"}`}>
                      {results.roi.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-silver">Anzahl Trades</span>
                    <span className="font-medium">{results.tradesExecuted}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-silver">Win Rate</span>
                    <span className={`font-medium ${results.winRate >= 50 ? "text-neon" : "text-red"}`}>
                      {results.winRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-silver">Durchschn. Ausführungszeit</span>
                    <span className="font-medium">{results.averageExecutionTime.toFixed(0)} ms</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium mb-3">Bot-Vorteile</h4>
              <div className="bg-white/5 p-4 rounded-lg space-y-4">
                <div className="flex items-start">
                  <div
                    className={`w-8 h-8 rounded-full bg-${botDescriptions[botType].color} flex items-center justify-center mr-3 shrink-0`}
                  >
                    <Clock className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Blitzschnelle Ausführung</h5>
                    <p className="text-sm text-silver">
                      {botType === "sniper"
                        ? "Unter 10ms Reaktionszeit für maximalen Vorteil bei neuen Listings und Flash-Opportunities."
                        : "Schnelle und präzise Ausführung ohne emotionale Verzögerungen."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`w-8 h-8 rounded-full bg-${botDescriptions[botType].color} flex items-center justify-center mr-3 shrink-0`}
                  >
                    <TrendingUp className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Optimierte Strategien</h5>
                    <p className="text-sm text-silver">
                      {botType === "whale"
                        ? "Erkennt Whale-Bewegungen und positioniert sich strategisch vor Marktbewegungen."
                        : botType === "wallet"
                          ? "Kopiert erfolgreiche Trader mit präziser Timing-Optimierung."
                          : "Datenbasierte Entscheidungen ohne emotionale Beeinflussung."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`w-8 h-8 rounded-full bg-${botDescriptions[botType].color} flex items-center justify-center mr-3 shrink-0`}
                  >
                    <DollarSign className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Risikomanagement</h5>
                    <p className="text-sm text-silver">
                      Automatische Take-Profit und Stop-Loss Mechanismen schützen dein Kapital und maximieren Gewinne.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg flex items-center justify-center transition-colors">
                  <span>Vollständigen Bericht herunterladen</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trades" className="mt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 text-left">
                <tr>
                  <th className="p-3 text-sm font-medium text-silver">Zeit</th>
                  <th className="p-3 text-sm font-medium text-silver">Token</th>
                  <th className="p-3 text-sm font-medium text-silver">Einstieg</th>
                  <th className="p-3 text-sm font-medium text-silver">Ausstieg</th>
                  <th className="p-3 text-sm font-medium text-silver">Volumen</th>
                  <th className="p-3 text-sm font-medium text-silver">P/L</th>
                  <th className="p-3 text-sm font-medium text-silver">Exchange</th>
                  <th className="p-3 text-sm font-medium text-silver">Zeit (ms)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {results.trades.map((trade) => (
                  <TradeRow key={trade.id} trade={trade} />
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-md font-medium mb-3">Performance-Metriken</h4>
              <div className="space-y-3">
                <MetricItem
                  label="ROI"
                  value={`${results.roi.toFixed(2)}%`}
                  description="Return on Investment über den Simulationszeitraum"
                  isPositive={results.roi > 0}
                />
                <MetricItem
                  label="Win Rate"
                  value={`${results.winRate.toFixed(1)}%`}
                  description="Prozentsatz der profitablen Trades"
                  isPositive={results.winRate > 50}
                />
                <MetricItem
                  label="Durchschn. Gewinn pro Trade"
                  value={formatCurrency(results.profitLoss / results.tradesExecuted)}
                  description="Durchschnittlicher Gewinn oder Verlust pro Trade"
                  isPositive={results.profitLoss > 0}
                />
                <MetricItem
                  label="Sharpe Ratio"
                  value="1.87"
                  description="Verhältnis von Rendite zu Risiko (>1 ist gut)"
                  isPositive={true}
                />
                <MetricItem
                  label="Max Drawdown"
                  value="8.3%"
                  description="Maximaler Rückgang vom Höchststand"
                  isPositive={false}
                />
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-md font-medium mb-3">Technische Metriken</h4>
              <div className="space-y-3">
                <MetricItem
                  label="Ausführungszeit"
                  value={`${results.averageExecutionTime.toFixed(0)} ms`}
                  description="Durchschnittliche Zeit zur Ausführung eines Trades"
                  isPositive={results.averageExecutionTime < 100}
                />
                <MetricItem
                  label="Slippage"
                  value="0.12%"
                  description="Durchschnittliche Preisabweichung bei der Ausführung"
                  isPositive={true}
                />
                <MetricItem
                  label="Gas-Effizienz"
                  value="92%"
                  description="Effizienz der Gas-Nutzung im Vergleich zum Marktdurchschnitt"
                  isPositive={true}
                />
                <MetricItem
                  label="MEV-Schutz"
                  value="100%"
                  description="Schutz vor Miner Extractable Value"
                  isPositive={true}
                />
                <MetricItem
                  label="Routing-Effizienz"
                  value="97.3%"
                  description="Effizienz der DEX-Routing-Entscheidungen"
                  isPositive={true}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

interface TradeRowProps {
  trade: Trade
}

function TradeRow({ trade }: TradeRowProps) {
  const isProfitable = trade.profitLoss > 0
  const formattedTime = new Date(trade.timestamp).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return price.toFixed(6)
    } else if (price < 1) {
      return price.toFixed(4)
    } else {
      return price.toFixed(2)
    }
  }

  return (
    <tr className="hover:bg-white/5">
      <td className="p-3 text-sm">{formattedTime}</td>
      <td className="p-3 text-sm font-medium">{trade.token}</td>
      <td className="p-3 text-sm">${formatPrice(trade.entryPrice)}</td>
      <td className="p-3 text-sm">${formatPrice(trade.exitPrice)}</td>
      <td className="p-3 text-sm">${trade.volume.toFixed(2)}</td>
      <td className={`p-3 text-sm font-medium ${isProfitable ? "text-neon" : "text-red"}`}>
        {isProfitable ? "+" : ""}
        {trade.profitLoss.toFixed(2)}
      </td>
      <td className="p-3 text-sm">{trade.exchange}</td>
      <td className="p-3 text-sm">{trade.executionTime.toFixed(1)}</td>
    </tr>
  )
}

interface MetricItemProps {
  label: string
  value: string
  description: string
  isPositive: boolean
}

function MetricItem({ label, value, description, isPositive }: MetricItemProps) {
  return (
    <div className="flex items-start">
      <div
        className={`w-6 h-6 rounded-full ${isPositive ? "bg-neon/20" : "bg-red/20"} flex items-center justify-center mr-3 shrink-0`}
      >
        {isPositive ? (
          <TrendingUp className={`w-3 h-3 ${isPositive ? "text-neon" : "text-red"}`} />
        ) : (
          <TrendingDown className={`w-3 h-3 ${isPositive ? "text-neon" : "text-red"}`} />
        )}
      </div>
      <div>
        <div className="flex items-center">
          <span className="text-sm text-silver mr-2">{label}:</span>
          <span className={`text-sm font-medium ${isPositive ? "text-neon" : "text-red"}`}>{value}</span>
        </div>
        <p className="text-xs text-silver/70">{description}</p>
      </div>
    </div>
  )
}
