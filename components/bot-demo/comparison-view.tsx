"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { BotType, SimulationResults } from "./types"
import { botDescriptions } from "./default-configs"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ComparisonViewProps {
  botResults: SimulationResults
  botType: BotType
}

export default function ComparisonView({ botResults, botType }: ComparisonViewProps) {
  // Simuliere manuelle Trading-Ergebnisse (schlechter als Bot)
  const manualResults = {
    roi: botResults.roi * 0.4, // 40% der Bot-Performance
    winRate: botResults.winRate * 0.7, // 70% der Bot-Win-Rate
    tradesExecuted: Math.floor(botResults.tradesExecuted * 0.6), // 60% der Bot-Trades
    averageExecutionTime: botResults.averageExecutionTime * 50, // 50x langsamer
    emotionalDecisions: 7,
    missedOpportunities: 5,
    executionErrors: 3,
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const calculateManualEndBalance = () => {
    return botResults.startBalance * (1 + manualResults.roi / 100)
  }

  const calculateDifference = () => {
    return botResults.endBalance - calculateManualEndBalance()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-dark/30 backdrop-blur-md border-white/10 p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">{botDescriptions[botType].title} vs. Manuelles Trading</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <div className={`w-4 h-4 rounded-full bg-${botDescriptions[botType].color} mr-2`}></div>
              {botDescriptions[botType].title}
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-silver">ROI</span>
                <span className="font-medium text-neon">{botResults.roi.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">Win Rate</span>
                <span className="font-medium">{botResults.winRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">Anzahl Trades</span>
                <span className="font-medium">{botResults.tradesExecuted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">Ausführungszeit</span>
                <span className="font-medium">{botResults.averageExecutionTime.toFixed(0)} ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">Endkapital</span>
                <span className="font-medium">{formatCurrency(botResults.endBalance)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <div className="w-4 h-4 rounded-full bg-silver/30 mr-2"></div>
              Manuelles Trading
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-silver">ROI</span>
                <span className="font-medium text-silver">{manualResults.roi.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">Win Rate</span>
                <span className="font-medium">{manualResults.winRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">Anzahl Trades</span>
                <span className="font-medium">{manualResults.tradesExecuted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">Ausführungszeit</span>
                <span className="font-medium">{manualResults.averageExecutionTime.toFixed(0)} ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">Endkapital</span>
                <span className="font-medium">{formatCurrency(calculateManualEndBalance())}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neon/10 border border-neon/30 rounded-lg p-4 mb-6">
          <h4 className="text-md font-medium mb-2">Ergebnis</h4>
          <p className="text-sm">
            Mit dem {botDescriptions[botType].title} hättest du{" "}
            <span className="text-neon font-medium">{formatCurrency(calculateDifference())}</span> mehr verdient als mit
            manuellem Trading. Das entspricht einer{" "}
            <span className="text-neon font-medium">
              {((botResults.roi / manualResults.roi) * 100 - 100).toFixed(0)}%
            </span>{" "}
            besseren Performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 text-red mr-2" />
              Emotionale Entscheidungen
            </h4>
            <p className="text-sm text-silver">
              Beim manuellen Trading wurden{" "}
              <span className="text-red font-medium">{manualResults.emotionalDecisions}</span> emotionale Entscheidungen
              getroffen, die zu suboptimalen Ergebnissen führten.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <XCircle className="w-4 h-4 text-red mr-2" />
              Verpasste Chancen
            </h4>
            <p className="text-sm text-silver">
              Beim manuellen Trading wurden{" "}
              <span className="text-red font-medium">{manualResults.missedOpportunities}</span> profitable Gelegenheiten
              verpasst, die der Bot genutzt hat.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 text-neon mr-2" />
              Konsistente Ausführung
            </h4>
            <p className="text-sm text-silver">
              Der Bot führte alle Trades mit <span className="text-neon font-medium">100% Präzision</span> aus, während
              beim manuellen Trading <span className="text-red">{manualResults.executionErrors}</span> Ausführungsfehler
              auftraten.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
