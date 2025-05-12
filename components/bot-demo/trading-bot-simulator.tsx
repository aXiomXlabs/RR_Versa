"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Loader2, TrendingUp, TrendingDown, Clock, Zap } from "lucide-react"
import type { BotType, BotConfig, SimulationResults } from "./types"
import { botDescriptions } from "./default-configs"
import TradingChart from "./trading-chart"

interface TradingBotSimulatorProps {
  botType: BotType
  config: BotConfig
  isSimulating: boolean
  results: SimulationResults | null
}

export default function TradingBotSimulator({ botType, config, isSimulating, results }: TradingBotSimulatorProps) {
  const [chartData, setChartData] = useState<any>(null)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState<string>("")

  // Simuliere Fortschritt während der Simulation
  useEffect(() => {
    if (isSimulating) {
      setChartData(null)
      setSimulationProgress(0)

      const steps = [
        "Marktdaten laden...",
        "Historische Daten analysieren...",
        "Trading-Strategien optimieren...",
        "Bot-Parameter anwenden...",
        "Trades simulieren...",
        "Ergebnisse berechnen...",
      ]

      let currentStepIndex = 0
      setCurrentStep(steps[currentStepIndex])

      const interval = setInterval(() => {
        setSimulationProgress((prev) => {
          const newProgress = prev + Math.random() * 5 + 1

          // Wechsle zum nächsten Schritt
          if (newProgress > (currentStepIndex + 1) * (100 / steps.length)) {
            currentStepIndex = Math.min(currentStepIndex + 1, steps.length - 1)
            setCurrentStep(steps[currentStepIndex])
          }

          return Math.min(newProgress, 99)
        })
      }, 200)

      return () => clearInterval(interval)
    } else if (results) {
      setSimulationProgress(100)

      // Generiere Chart-Daten aus den Ergebnissen
      generateChartData(results)
    }
  }, [isSimulating, results])

  const generateChartData = (results: SimulationResults) => {
    // Erstelle Zeitreihen-Daten für das Chart
    const trades = [...results.trades].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    const labels = trades.map((trade) => {
      const date = new Date(trade.timestamp)
      return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    })

    // Berechne kumulativen Gewinn/Verlust
    let balance = results.startBalance
    const balanceData = [balance]

    for (const trade of trades) {
      balance += trade.profitLoss
      balanceData.push(balance)
    }

    // Füge Startpunkt hinzu
    labels.unshift("Start")

    setChartData({
      labels,
      datasets: [
        {
          label: "Portfolio-Wert",
          data: balanceData,
          borderColor: results.roi > 0 ? "#39FF14" : "#FF2D55",
          backgroundColor: results.roi > 0 ? "rgba(57, 255, 20, 0.1)" : "rgba(255, 45, 85, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    })
  }

  return (
    <Card className="bg-dark/30 backdrop-blur-md border-white/10 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{botDescriptions[botType].title} Simulation</h3>
        {isSimulating && (
          <div className="flex items-center text-sm text-silver">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {simulationProgress.toFixed(0)}% - {currentStep}
          </div>
        )}
        {results && !isSimulating && (
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-1 text-silver" />
            <span className="text-silver">Timeframe: {results.timeframe}</span>
          </div>
        )}
      </div>

      <div className="h-[300px] relative">
        <AnimatePresence>
          {isSimulating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-md">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-neon"
                    initial={{ width: "0%" }}
                    animate={{ width: `${simulationProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="space-y-4">
                  <SimulationStep
                    icon={<Zap className="w-4 h-4" />}
                    title="Bot-Konfiguration laden"
                    isActive={simulationProgress > 0}
                    isComplete={simulationProgress > 20}
                  />
                  <SimulationStep
                    icon={<TrendingUp className="w-4 h-4" />}
                    title="Marktdaten analysieren"
                    isActive={simulationProgress > 20}
                    isComplete={simulationProgress > 40}
                  />
                  <SimulationStep
                    icon={<Clock className="w-4 h-4" />}
                    title="Trading-Strategien optimieren"
                    isActive={simulationProgress > 40}
                    isComplete={simulationProgress > 60}
                  />
                  <SimulationStep
                    icon={<TrendingDown className="w-4 h-4" />}
                    title="Trades simulieren"
                    isActive={simulationProgress > 60}
                    isComplete={simulationProgress > 80}
                  />
                  <SimulationStep
                    icon={<Zap className="w-4 h-4" />}
                    title="Ergebnisse berechnen"
                    isActive={simulationProgress > 80}
                    isComplete={simulationProgress > 95}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {chartData && !isSimulating && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
              <TradingChart data={chartData} />
            </motion.div>
          )}

          {!chartData && !isSimulating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-silver text-center">
                Konfiguriere den Bot und starte die Simulation, <br />
                um die Ergebnisse zu sehen.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {results && !isSimulating && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatCard title="ROI" value={`${results.roi.toFixed(2)}%`} isPositive={results.roi > 0} />
          <StatCard title="Win Rate" value={`${results.winRate.toFixed(1)}%`} isPositive={results.winRate > 50} />
          <StatCard title="Trades" value={results.tradesExecuted.toString()} isPositive={true} />
          <StatCard
            title="Ausführungszeit"
            value={`${results.averageExecutionTime.toFixed(0)} ms`}
            isPositive={results.averageExecutionTime < 100}
          />
        </div>
      )}
    </Card>
  )
}

interface SimulationStepProps {
  icon: React.ReactNode
  title: string
  isActive: boolean
  isComplete: boolean
}

function SimulationStep({ icon, title, isActive, isComplete }: SimulationStepProps) {
  return (
    <div className="flex items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
          isComplete ? "bg-neon text-black" : isActive ? "bg-blue text-white animate-pulse" : "bg-white/10 text-silver"
        }`}
      >
        {icon}
      </div>
      <span className={`text-sm ${isComplete ? "text-white" : isActive ? "text-blue" : "text-silver/70"}`}>
        {title}
      </span>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  isPositive: boolean
}

function StatCard({ title, value, isPositive }: StatCardProps) {
  return (
    <div className="bg-white/5 rounded-lg p-3 text-center">
      <p className="text-xs text-silver mb-1">{title}</p>
      <p className={`text-lg font-bold ${isPositive ? "text-neon" : "text-red"}`}>{value}</p>
    </div>
  )
}
