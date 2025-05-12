"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Clock, DollarSign, BarChart, ExternalLink } from "lucide-react"
import type { BotType, SimulationResults } from "./types"
import { useBotDescriptions } from "./bot-utils"
import { useLanguage } from "../../contexts/language-context"
import { motion, AnimatePresence, useAnimation } from "framer-motion"

interface ResultsDisplayProps {
  results: SimulationResults
  botType: BotType
  onToggleComparison: () => void
}

export default function ResultsDisplay({ results, botType, onToggleComparison }: ResultsDisplayProps) {
  const { t } = useLanguage()
  const { getBotDescription } = useBotDescriptions()
  const botDescription = getBotDescription(botType)
  const [activeTab, setActiveTab] = useState("summary")
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }))
  }, [activeTab, controls])

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-dark/30 backdrop-blur-md border-white/10 p-6 mb-6">
        <motion.div
          className="flex justify-between items-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold">{t("results.title")}</h3>
          <motion.button
            className="text-sm text-neon flex items-center hover:underline"
            onClick={onToggleComparison}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart className="w-4 h-4 mr-1" />
            {t("results.compare")}
          </motion.button>
        </motion.div>

        <Tabs defaultValue="summary" onValueChange={setActiveTab}>
          <TabsList className="bg-white/5 border-b border-white/10 w-full justify-start mb-4">
            <TabsTrigger value="summary" className="data-[state=active]:bg-white/10 relative group">
              {t("results.summary")}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeTab === "summary" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </TabsTrigger>
            <TabsTrigger value="trades" className="data-[state=active]:bg-white/10 relative group">
              {t("results.trades")}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeTab === "trades" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-white/10 relative group">
              {t("results.metrics")}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeTab === "metrics" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="summary" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <h4 className="text-md font-medium mb-3">{t("results.performance")}</h4>
                  <div className="space-y-4">
                    <motion.div
                      className="bg-white/5 p-4 rounded-lg"
                      custom={0}
                      animate={controls}
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-silver">{t("results.startCapital")}</span>
                        <span className="font-medium">{formatCurrency(results.startBalance)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-silver">{t("results.endCapital")}</span>
                        <span className="font-medium">{formatCurrency(results.endBalance)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-silver">{t("results.absoluteProfit")}</span>
                        <motion.span
                          className={`font-medium ${results.profitLoss >= 0 ? "text-neon" : "text-red"}`}
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          {formatCurrency(results.profitLoss)}
                        </motion.span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-silver">ROI</span>
                        <motion.span
                          className={`font-medium ${results.roi >= 0 ? "text-neon" : "text-red"}`}
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          {results.roi.toFixed(2)}%
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-white/5 p-4 rounded-lg"
                      custom={1}
                      animate={controls}
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-silver">{t("results.tradeCount")}</span>
                        <span className="font-medium">{results.tradesExecuted}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-silver">{t("simulation.winRate")}</span>
                        <span className={`font-medium ${results.winRate >= 50 ? "text-neon" : "text-red"}`}>
                          {results.winRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-silver">{t("results.avgExecTime")}</span>
                        <span className="font-medium">{results.averageExecutionTime.toFixed(0)} ms</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-3">{t("results.advantages")}</h4>
                  <motion.div
                    className="bg-white/5 p-4 rounded-lg space-y-4"
                    custom={2}
                    animate={controls}
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-full bg-${botDescription.color} flex items-center justify-center mr-3 shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Clock className="w-4 h-4 text-black" />
                      </motion.div>
                      <div>
                        <h5 className="font-medium mb-1">{t("results.fastExecution")}</h5>
                        <p className="text-sm text-silver">{t("results.fastExecutionDesc")}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-full bg-${botDescription.color} flex items-center justify-center mr-3 shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TrendingUp className="w-4 h-4 text-black" />
                      </motion.div>
                      <div>
                        <h5 className="font-medium mb-1">{t("results.optimizedStrategies")}</h5>
                        <p className="text-sm text-silver">{t("results.optimizedStrategiesDesc")}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-full bg-${botDescription.color} flex items-center justify-center mr-3 shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <DollarSign className="w-4 h-4 text-black" />
                      </motion.div>
                      <div>
                        <h5 className="font-medium mb-1">{t("results.riskManagement")}</h5>
                        <p className="text-sm text-silver">{t("results.riskManagementDesc")}</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div className="mt-4" custom={3} animate={controls} initial={{ opacity: 0, y: 20 }}>
                    <motion.button
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg flex items-center justify-center transition-colors"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{t("results.download")}</span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="trades" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="overflow-x-auto"
              >
                <table className="w-full">
                  <thead className="bg-white/5 text-left">
                    <tr>
                      <th className="p-3 text-sm font-medium text-silver">{t("trading.time")}</th>
                      <th className="p-3 text-sm font-medium text-silver">{t("trading.token")}</th>
                      <th className="p-3 text-sm font-medium text-silver">{t("trading.entry")}</th>
                      <th className="p-3 text-sm font-medium text-silver">{t("trading.exit")}</th>
                      <th className="p-3 text-sm font-medium text-silver">{t("trading.volume")}</th>
                      <th className="p-3 text-sm font-medium text-silver">{t("trading.pl")}</th>
                      <th className="p-3 text-sm font-medium text-silver">{t("trading.exchange")}</th>
                      <th className="p-3 text-sm font-medium text-silver">{t("trading.execTime")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {results.trades.map((trade, index) => (
                      <motion.tr
                        key={trade.id}
                        className="hover:bg-white/5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      >
                        <td className="p-3 text-sm">{formatTime(trade.timestamp)}</td>
                        <td className="p-3 text-sm font-medium">{trade.token}</td>
                        <td className="p-3 text-sm">${formatPrice(trade.entryPrice)}</td>
                        <td className="p-3 text-sm">${formatPrice(trade.exitPrice)}</td>
                        <td className="p-3 text-sm">${trade.volume.toFixed(2)}</td>
                        <td className={`p-3 text-sm font-medium ${trade.profitLoss > 0 ? "text-neon" : "text-red"}`}>
                          {trade.profitLoss > 0 ? "+" : ""}
                          {trade.profitLoss.toFixed(2)}
                        </td>
                        <td className="p-3 text-sm">{trade.exchange}</td>
                        <td className="p-3 text-sm">{trade.executionTime.toFixed(1)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </TabsContent>

            <TabsContent value="metrics" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  className="bg-white/5 p-4 rounded-lg"
                  custom={0}
                  animate={controls}
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <h4 className="text-md font-medium mb-3">Performance-Metriken</h4>
                  <div className="space-y-3">
                    <MetricItem
                      label="ROI"
                      value={`${results.roi.toFixed(2)}%`}
                      description="Return on Investment über den Simulationszeitraum"
                      isPositive={results.roi > 0}
                      delay={0.1}
                    />
                    <MetricItem
                      label="Win Rate"
                      value={`${results.winRate.toFixed(1)}%`}
                      description="Prozentsatz der profitablen Trades"
                      isPositive={results.winRate > 50}
                      delay={0.2}
                    />
                    <MetricItem
                      label="Durchschn. Gewinn pro Trade"
                      value={formatCurrency(results.profitLoss / results.tradesExecuted)}
                      description="Durchschnittlicher Gewinn oder Verlust pro Trade"
                      isPositive={results.profitLoss > 0}
                      delay={0.3}
                    />
                    <MetricItem
                      label="Sharpe Ratio"
                      value="1.87"
                      description="Verhältnis von Rendite zu Risiko (>1 ist gut)"
                      isPositive={true}
                      delay={0.4}
                    />
                    <MetricItem
                      label="Max Drawdown"
                      value="8.3%"
                      description="Maximaler Rückgang vom Höchststand"
                      isPositive={false}
                      delay={0.5}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/5 p-4 rounded-lg"
                  custom={1}
                  animate={controls}
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <h4 className="text-md font-medium mb-3">Technische Metriken</h4>
                  <div className="space-y-3">
                    <MetricItem
                      label="Ausführungszeit"
                      value={`${results.averageExecutionTime.toFixed(0)} ms`}
                      description="Durchschnittliche Zeit zur Ausführung eines Trades"
                      isPositive={results.averageExecutionTime < 100}
                      delay={0.1}
                    />
                    <MetricItem
                      label="Slippage"
                      value="0.12%"
                      description="Durchschnittliche Preisabweichung bei der Ausführung"
                      isPositive={true}
                      delay={0.2}
                    />
                    <MetricItem
                      label="Gas-Effizienz"
                      value="92%"
                      description="Effizienz der Gas-Nutzung im Vergleich zum Marktdurchschnitt"
                      isPositive={true}
                      delay={0.3}
                    />
                    <MetricItem
                      label="MEV-Schutz"
                      value="100%"
                      description="Schutz vor Miner Extractable Value"
                      isPositive={true}
                      delay={0.4}
                    />
                    <MetricItem
                      label="Routing-Effizienz"
                      value="97.3%"
                      description="Effizienz der DEX-Routing-Entscheidungen"
                      isPositive={true}
                      delay={0.5}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </Card>
    </motion.div>
  )
}

function formatPrice(price: number) {
  if (price < 0.01) {
    return price.toFixed(6)
  } else if (price < 1) {
    return price.toFixed(4)
  } else {
    return price.toFixed(2)
  }
}

interface MetricItemProps {
  label: string
  value: string
  description: string
  isPositive: boolean
  delay: number
}

function MetricItem({ label, value, description, isPositive, delay }: MetricItemProps) {
  return (
    <motion.div
      className="flex items-start"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ x: 5 }}
    >
      <motion.div
        className={`w-6 h-6 rounded-full ${isPositive ? "bg-neon/20" : "bg-red/20"} flex items-center justify-center mr-3 shrink-0`}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        {isPositive ? (
          <TrendingUp className={`w-3 h-3 ${isPositive ? "text-neon" : "text-red"}`} />
        ) : (
          <TrendingDown className={`w-3 h-3 ${isPositive ? "text-neon" : "text-red"}`} />
        )}
      </motion.div>
      <div>
        <div className="flex items-center">
          <span className="text-sm text-silver mr-2">{label}:</span>
          <motion.span
            className={`text-sm font-medium ${isPositive ? "text-neon" : "text-red"}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: delay + 0.1 }}
          >
            {value}
          </motion.span>
        </div>
        <p className="text-xs text-silver/70">{description}</p>
      </div>
    </motion.div>
  )
}
