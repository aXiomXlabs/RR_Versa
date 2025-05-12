"use client"

import { motion, useAnimation } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { BotType, SimulationResults } from "./types"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useBotDescriptions } from "./bot-utils"
import { useLanguage } from "../../contexts/language-context"
import { useEffect } from "react"

interface ComparisonViewProps {
  botResults: SimulationResults
  botType: BotType
}

export default function ComparisonView({ botResults, botType }: ComparisonViewProps) {
  const { t } = useLanguage()
  const { getBotDescription } = useBotDescriptions()
  const botDescription = getBotDescription(botType)
  const controls = useAnimation()

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

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible")
      await controls.start("highlight")
    }
    sequence()
  }, [controls])

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    highlight: (i: number) => ({
      boxShadow: ["0 0 0 rgba(255, 255, 255, 0)", "0 0 15px rgba(57, 255, 20, 0.3)", "0 0 0 rgba(255, 255, 255, 0)"],
      transition: {
        delay: i * 0.3 + 0.5,
        duration: 1.5,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    }),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-transparent via-neon/20 to-transparent rounded-xl blur-xl"
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{ opacity: 0.5 }}
      />

      <Card className="bg-dark/30 backdrop-blur-md border-white/10 p-6 mb-6 relative z-10">
        <motion.h3
          className="text-lg font-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {t("compare.title")}
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            className="bg-white/5 p-4 rounded-lg relative overflow-hidden"
            custom={0}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-neon/10 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              }}
            />

            <h4 className="text-md font-medium mb-3 flex items-center relative z-10">
              <div className={`w-4 h-4 rounded-full bg-${botDescription.color} mr-2`}></div>
              {botDescription.title}
            </h4>

            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-silver">ROI</span>
                <motion.span
                  className="font-medium text-neon"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
                >
                  {botResults.roi.toFixed(2)}%
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">{t("simulation.winRate")}</span>
                <span className="font-medium">{botResults.winRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">{t("results.tradeCount")}</span>
                <span className="font-medium">{botResults.tradesExecuted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">{t("simulation.execTime")}</span>
                <span className="font-medium">{botResults.averageExecutionTime.toFixed(0)} ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">{t("results.endCapital")}</span>
                <span className="font-medium">{formatCurrency(botResults.endBalance)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/5 p-4 rounded-lg"
            custom={1}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              transition: { duration: 0.2 },
            }}
          >
            <h4 className="text-md font-medium mb-3 flex items-center">
              <div className="w-4 h-4 rounded-full bg-silver/30 mr-2"></div>
              {t("compare.manual")}
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-silver">ROI</span>
                <span className="font-medium text-silver">{manualResults.roi.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">{t("simulation.winRate")}</span>
                <span className="font-medium">{manualResults.winRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">{t("results.tradeCount")}</span>
                <span className="font-medium">{manualResults.tradesExecuted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">{t("simulation.execTime")}</span>
                <span className="font-medium">{manualResults.averageExecutionTime.toFixed(0)} ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-silver">{t("results.endCapital")}</span>
                <span className="font-medium">{formatCurrency(calculateManualEndBalance())}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-neon/10 border border-neon/30 rounded-lg p-4 mb-6 relative overflow-hidden"
          custom={2}
          initial="hidden"
          animate={controls}
          variants={cardVariants}
          whileHover={{
            backgroundColor: "rgba(57, 255, 20, 0.15)",
            borderColor: "rgba(57, 255, 20, 0.5)",
            transition: { duration: 0.2 },
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-neon/20 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
            }}
          />

          <h4 className="text-md font-medium mb-2 relative z-10">{t("compare.result")}</h4>
          <p className="text-sm relative z-10">
            {t("compare.resultDesc").split(" ").slice(0, -2).join(" ")}{" "}
            <motion.span
              className="text-neon font-medium"
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              {formatCurrency(calculateDifference())}
            </motion.span>{" "}
            {t("compare.resultDesc").split(" ").slice(-2).join(" ")}{" "}
            <motion.span
              className="text-neon font-medium"
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.4,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              {((botResults.roi / manualResults.roi) * 100 - 100).toFixed(0)}%
            </motion.span>{" "}
            {t("compare.resultDesc").split(" ").slice(-2).join(" ")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            className="bg-white/5 p-4 rounded-lg"
            custom={3}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.2 }}>
                <AlertCircle className="w-4 h-4 text-red mr-2" />
              </motion.div>
              {t("compare.emotional")}
            </h4>
            <p className="text-sm text-silver">
              {t("compare.emotionalDesc").split(" ").slice(0, -1).join(" ")}{" "}
              <motion.span
                className="text-red font-medium"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                {manualResults.emotionalDecisions}
              </motion.span>{" "}
              {t("compare.emotionalDesc").split(" ").slice(-1).join(" ")}
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 p-4 rounded-lg"
            custom={4}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.2 }}>
                <XCircle className="w-4 h-4 text-red mr-2" />
              </motion.div>
              {t("compare.missed")}
            </h4>
            <p className="text-sm text-silver">
              {t("compare.missedDesc").split(" ").slice(0, -1).join(" ")}{" "}
              <motion.span
                className="text-red font-medium"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                {manualResults.missedOpportunities}
              </motion.span>{" "}
              {t("compare.missedDesc").split(" ").slice(-1).join(" ")}
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 p-4 rounded-lg"
            custom={5}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.2 }}>
                <CheckCircle className="w-4 h-4 text-neon mr-2" />
              </motion.div>
              {t("compare.consistent")}
            </h4>
            <p className="text-sm text-silver">
              {t("compare.consistentDesc").split(" ").slice(0, 5).join(" ")}{" "}
              <motion.span
                className="text-neon font-medium"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.5 }}
              >
                100%
              </motion.span>{" "}
              {t("compare.consistentDesc").split(" ").slice(5, -1).join(" ")}{" "}
              <motion.span
                className="text-red"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.5 }}
              >
                {manualResults.executionErrors}
              </motion.span>{" "}
              {t("compare.consistentDesc").split(" ").slice(-1).join(" ")}
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
