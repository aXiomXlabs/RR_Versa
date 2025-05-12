"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import InteractiveHeader from "../interactive-header"
import InteractiveFooter from "../interactive-footer"
import TradingBotSimulator from "./trading-bot-simulator"
import BotConfigPanel from "./bot-config-panel"
import ResultsDisplay from "./results-display"
import ComparisonView from "./comparison-view"
import StrategyExplainer from "./strategy-explainer"
import type { BotType, BotConfig, SimulationResults } from "./types"
import { defaultConfigs } from "./default-configs"
import AnimatedCTAButton from "../animated-cta-button"

export default function BotDemoPage() {
  const [selectedBot, setSelectedBot] = useState<BotType>("sniper")
  const [botConfig, setBotConfig] = useState<BotConfig>(defaultConfigs.sniper)
  const [simulationResults, setSimulationResults] = useState<SimulationResults | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  const handleBotSelect = (botType: BotType) => {
    setSelectedBot(botType)
    setBotConfig(defaultConfigs[botType])
    setSimulationResults(null)
  }

  const handleConfigChange = (newConfig: Partial<BotConfig>) => {
    setBotConfig((prev) => ({ ...prev, ...newConfig }))
  }

  const handleStartSimulation = async () => {
    setIsSimulating(true)
    setSimulationResults(null)

    // Simuliere eine API-Anfrage mit Verzögerung
    setTimeout(() => {
      const results = simulateResults(selectedBot, botConfig)
      setSimulationResults(results)
      setIsSimulating(false)
    }, 2000)
  }

  const handleToggleComparison = () => {
    setShowComparison((prev) => !prev)
  }

  return (
    <main className="bg-dark text-white min-h-screen">
      <InteractiveHeader />

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-neon glow-text">Trading Bot Demo</span>
            </h1>
            <p className="text-silver max-w-2xl mx-auto">
              Erlebe die Leistungsfähigkeit unserer Trading Bots in einer interaktiven Simulation. Wähle einen Bot-Typ,
              passe die Parameter an und sieh dir die Ergebnisse in Echtzeit an.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <BotConfigPanel
                selectedBot={selectedBot}
                config={botConfig}
                onBotSelect={handleBotSelect}
                onConfigChange={handleConfigChange}
                onStartSimulation={handleStartSimulation}
                isSimulating={isSimulating}
              />
            </div>

            <div className="lg:col-span-2">
              <TradingBotSimulator
                botType={selectedBot}
                config={botConfig}
                isSimulating={isSimulating}
                results={simulationResults}
              />

              {simulationResults && (
                <ResultsDisplay
                  results={simulationResults}
                  botType={selectedBot}
                  onToggleComparison={handleToggleComparison}
                />
              )}

              {simulationResults && showComparison && (
                <ComparisonView botResults={simulationResults} botType={selectedBot} />
              )}
            </div>
          </div>

          <StrategyExplainer botType={selectedBot} />

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Bereit, mit echten Assets zu handeln?</h2>
            <AnimatedCTAButton href="#" onClick={(e) => e.preventDefault()}>
              Jetzt zur Warteliste anmelden
            </AnimatedCTAButton>
          </div>
        </div>
      </section>

      <InteractiveFooter />
    </main>
  )
}

// Hilfsfunktion zur Simulation von Ergebnissen basierend auf Bot-Typ und Konfiguration
function simulateResults(botType: BotType, config: BotConfig): SimulationResults {
  // In einer echten Implementierung würden hier Daten von einer API abgerufen
  // oder komplexe Berechnungen durchgeführt werden

  const baseROI = {
    sniper: 42,
    wallet: 28,
    whale: 35,
    buy: 22,
  }[botType]

  // Berechne ROI basierend auf Konfigurationsparametern
  const configImpact = (config.aggressiveness / 100) * 20 - (config.safetyLevel / 100) * 10
  const finalROI = baseROI + configImpact

  // Generiere Handelsdaten
  const trades = generateTrades(botType, config, finalROI)

  return {
    roi: finalROI,
    winRate: 65 + config.safetyLevel / 10,
    tradesExecuted: trades.length,
    averageExecutionTime: botType === "sniper" ? 8 : 120, // ms
    trades: trades,
    profitLoss: trades.reduce((sum, trade) => sum + trade.profitLoss, 0),
    timeframe: "24h",
    startBalance: 1000,
    endBalance: 1000 * (1 + finalROI / 100),
  }
}

// Hilfsfunktion zur Generierung von simulierten Trades
function generateTrades(botType: BotType, config: BotConfig, targetROI: number) {
  const numTrades = 10 + Math.floor(Math.random() * 15)
  const trades = []

  let cumulativeROI = 0

  for (let i = 0; i < numTrades; i++) {
    const isWinningTrade = Math.random() < 0.65 + config.safetyLevel / 1000
    const tradeROI = isWinningTrade ? Math.random() * 15 + 2 : -(Math.random() * 8 + 1)

    cumulativeROI += tradeROI

    trades.push({
      id: `trade-${i}`,
      timestamp: new Date(Date.now() - (numTrades - i) * 3600000).toISOString(),
      token: generateRandomToken(),
      entryPrice: generateRandomPrice(),
      exitPrice: 0, // Wird unten berechnet
      volume: 50 + Math.random() * 950,
      profitLoss: 0, // Wird unten berechnet
      executionTime: botType === "sniper" ? Math.random() * 15 + 5 : Math.random() * 200 + 50,
      exchange: ["Uniswap", "PancakeSwap", "dYdX", "Raydium"][Math.floor(Math.random() * 4)],
    })

    // Berechne Exit-Preis und Gewinn/Verlust basierend auf ROI
    const trade = trades[trades.length - 1]
    trade.exitPrice = trade.entryPrice * (1 + tradeROI / 100)
    trade.profitLoss = trade.volume * (tradeROI / 100)
  }

  // Passe die Trades an, um das Ziel-ROI zu erreichen
  const currentROI = (trades.reduce((sum, trade) => sum + trade.profitLoss, 0) / 1000) * 100
  const adjustmentFactor = targetROI / currentROI

  trades.forEach((trade) => {
    trade.profitLoss *= adjustmentFactor
    trade.exitPrice = trade.entryPrice * (1 + trade.profitLoss / trade.volume)
  })

  return trades
}

// Hilfsfunktion zur Generierung zufälliger Token-Namen
function generateRandomToken() {
  const prefixes = ["SOL", "ETH", "BTC", "AVAX", "MATIC", "DOT", "ADA", "LINK", "UNI", "AAVE"]
  const suffixes = ["SWAP", "DAO", "FI", "CHAIN", "VERSE", "PAD", "STARTER", "X", "PROTOCOL", "NETWORK"]

  if (Math.random() < 0.7) {
    return prefixes[Math.floor(Math.random() * prefixes.length)]
  } else {
    return prefixes[Math.floor(Math.random() * prefixes.length)] + suffixes[Math.floor(Math.random() * suffixes.length)]
  }
}

// Hilfsfunktion zur Generierung zufälliger Preise
function generateRandomPrice() {
  const magnitude = Math.floor(Math.random() * 5) // 0-4

  switch (magnitude) {
    case 0: // $0.0001 - $0.001
      return Math.random() * 0.0009 + 0.0001
    case 1: // $0.001 - $0.01
      return Math.random() * 0.009 + 0.001
    case 2: // $0.01 - $0.1
      return Math.random() * 0.09 + 0.01
    case 3: // $0.1 - $1
      return Math.random() * 0.9 + 0.1
    case 4: // $1 - $100
      return Math.random() * 99 + 1
    default:
      return Math.random() * 0.9 + 0.1
  }
}
