"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Loader2, TrendingUp, TrendingDown, Clock, Zap } from "lucide-react"
import type { BotType, BotConfig, SimulationResults } from "./types"
import { useBotDescriptions } from "./bot-utils"
import TradingChart from "./trading-chart"
import { useLanguage } from "../../contexts/language-context"

interface TradingBotSimulatorProps {
  botType: BotType
  config: BotConfig
  isSimulating: boolean
  results: SimulationResults | null
}

export default function TradingBotSimulator({ botType, config, isSimulating, results }: TradingBotSimulatorProps) {
  const { t } = useLanguage()
  const { getBotDescription } = useBotDescriptions()
  const botDescription = getBotDescription(botType)

  const [chartData, setChartData] = useState<any>(null)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState<string>("")
  const controls = useAnimation()

  // Simuliere Fortschritt während der Simulation
  useEffect(() => {
    if (isSimulating) {
      setChartData(null)
      setSimulationProgress(0)

      const steps = [
        t("simulation.steps.loadingMarket"),
        t("simulation.steps.analyzingData"),
        t("simulation.steps.optimizingStrategies"),
        t("simulation.steps.applyingParams"),
        t("simulation.steps.simulatingTrades"),
        t("simulation.steps.calculatingResults"),
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
  }, [isSimulating, results, t])

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
          label: t("simulation.portfolioValue"),
          data: balanceData,
          borderColor: results.roi > 0 ? "#39FF14" : "#FF2D55",
          backgroundColor: results.roi > 0 ? "rgba(57, 255, 20, 0.1)" : "rgba(255, 45, 85, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    })
  }

  // Animiere die Statistikkarten sequentiell
  useEffect(() => {
    if (results && !isSimulating) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
      }))
    }
  }, [results, isSimulating, controls])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-dark/30 backdrop-blur-md border-white/10 p-6 mb-6 overflow-hidden">
        <motion.div
          className="flex justify-between items-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold">
            {botDescription.title} {t("simulation.title")}
          </h3>
          {isSimulating && (
            <motion.div
              className="flex items-center text-sm text-silver"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {simulationProgress.toFixed(0)}% - {currentStep}
            </motion.div>
          )}
          {results && !isSimulating && (
            <motion.div
              className="flex items-center text-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Clock className="w-4 h-4 mr-1 text-silver" />
              <span className="text-silver">
                {t("simulation.timeframe")}: {results.timeframe}
              </span>
            </motion.div>
          )}
        </motion.div>

        <div className="h-[300px] relative">
          <AnimatePresence mode="wait">
            {isSimulating && (
              <motion.div
                key="simulating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
                    {[0, 1, 2, 3, 4].map((index) => (
                      <SimulationStep
                        key={index}
                        icon={
                          index === 0 || index === 4 ? (
                            <Zap className="w-4 h-4" />
                          ) : index === 1 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : index === 2 ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )
                        }
                        title={
                          [
                            t("simulation.steps.short.config"),
                            t("simulation.steps.short.analyze"),
                            t("simulation.steps.short.optimize"),
                            t("simulation.steps.short.simulate"),
                            t("simulation.steps.short.calculate"),
                          ][index]
                        }
                        isActive={simulationProgress > index * 20}
                        isComplete={simulationProgress > (index + 1) * 20}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {chartData && !isSimulating && (
              <motion.div
                key="chart"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="h-full"
              >
                <TradingChart data={chartData} />
              </motion.div>
            )}

            {!chartData && !isSimulating && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <p className="text-silver text-center">{t("simulation.configure")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {results && !isSimulating && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <motion.div custom={0} animate={controls} initial={{ opacity: 0, y: 20 }}>
              <StatCard title={t("simulation.roi")} value={`${results.roi.toFixed(2)}%`} isPositive={results.roi > 0} />
            </motion.div>
            <motion.div custom={1} animate={controls} initial={{ opacity: 0, y: 20 }}>
              <StatCard
                title={t("simulation.winRate")}
                value={`${results.winRate.toFixed(1)}%`}
                isPositive={results.winRate > 50}
              />
            </motion.div>
            <motion.div custom={2} animate={controls} initial={{ opacity: 0, y: 20 }}>
              <StatCard title={t("simulation.trades")} value={results.tradesExecuted.toString()} isPositive={true} />
            </motion.div>
            <motion.div custom={3} animate={controls} initial={{ opacity: 0, y: 20 }}>
              <StatCard
                title={t("simulation.execTime")}
                value={`${results.averageExecutionTime.toFixed(0)} ms`}
                isPositive={results.averageExecutionTime < 100}
              />
            </motion.div>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

interface SimulationStepProps {
  icon: React.ReactNode
  title: string
  isActive: boolean
  isComplete: boolean
  delay: number
}

function SimulationStep({ icon, title, isActive, isComplete, delay }: SimulationStepProps) {
  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <motion.div
        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
          isComplete ? "bg-neon text-black" : isActive ? "bg-blue text-white" : "bg-white/10 text-silver"
        }`}
        animate={{
          scale: isActive && !isComplete ? [1, 1.1, 1] : 1,
          backgroundColor: isComplete
            ? "rgba(57, 255, 20, 1)"
            : isActive
              ? "rgba(0, 122, 255, 1)"
              : "rgba(255, 255, 255, 0.1)",
        }}
        transition={{
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
          },
          backgroundColor: {
            duration: 0.3,
          },
        }}
      >
        {icon}
      </motion.div>
      <span className={`text-sm ${isComplete ? "text-white" : isActive ? "text-blue" : "text-silver/70"}`}>
        {title}
      </span>
    </motion.div>
  )
}

interface StatCardProps {
  title: string
  value: string
  isPositive: boolean
}

function StatCard({ title, value, isPositive }: StatCardProps) {
  return (
    <motion.div
      className="bg-white/5 rounded-lg p-3 text-center overflow-hidden relative"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.05 }}
        style={{
          background: isPositive
            ? "linear-gradient(90deg, rgba(57, 255, 20, 0) 0%, rgba(57, 255, 20, 0.3) 100%)"
            : "linear-gradient(90deg, rgba(255, 45, 85, 0) 0%, rgba(255, 45, 85, 0.3) 100%)",
        }}
      />
      <p className="text-xs text-silver mb-1">{title}</p>
      <motion.p
        className={`text-lg font-bold ${isPositive ? "text-neon" : "text-red"}`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {value}
      </motion.p>
    </motion.div>
  )
}
