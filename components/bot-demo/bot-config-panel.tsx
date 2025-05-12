"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Rocket, Wallet, FishIcon as Whale, ShoppingCart } from "lucide-react"
import type { BotType, BotConfig } from "./types"
import { motion, AnimatePresence } from "framer-motion"

// Importiere den Sprachkontext am Anfang der Datei
import { useLanguage } from "../../contexts/language-context"
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getBotColorClass } from "./bot-utils"

interface BotConfigPanelProps {
  selectedBot: BotType
  config: BotConfig
  onBotSelect: (botType: BotType) => void
  onConfigChange: (newConfig: Partial<BotConfig>) => void
  onStartSimulation: () => void
  isSimulating: boolean
}

// Füge den Sprachkontext zur Komponente hinzu
export default function BotConfigPanel({
  selectedBot,
  config,
  onBotSelect,
  onConfigChange,
  onStartSimulation,
  isSimulating,
}: BotConfigPanelProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic")

  const handleSliderChange = (key: keyof BotConfig, value: number[]) => {
    onConfigChange({ [key]: value[0] })
  }

  const handleSwitchChange = (key: keyof BotConfig, checked: boolean) => {
    onConfigChange({ [key]: checked })
  }

  const handleSelectChange = (key: keyof BotConfig, value: string) => {
    onConfigChange({ [key]: value })
  }

  const handleGasBoostChange = (value: string) => {
    onConfigChange({ gasBoost: value as "low" | "medium" | "high" })
  }

  const handleTimeframeChange = (value: string) => {
    onConfigChange({ timeframe: value as "5m" | "15m" | "1h" | "4h" | "1d" })
  }

  const getBotIcon = (type: BotType) => {
    switch (type) {
      case "sniper":
        return <Rocket className="w-5 h-5" />
      case "wallet":
        return <Wallet className="w-5 h-5" />
      case "whale":
        return <Whale className="w-5 h-5" />
      case "buy":
        return <ShoppingCart className="w-5 h-5" />
    }
  }

  function BotTypeButton({
    botType,
    isSelected,
    onClick,
    title,
    description,
    color,
    index,
  }: {
    botType: BotType
    isSelected: boolean
    onClick: () => void
    title: string
    description: string
    color: string
    index: number
  }) {
    const getBotIcon = () => {
      switch (botType) {
        case "sniper":
          return <Rocket className="w-5 h-5" />
        case "wallet":
          return <Wallet className="w-5 h-5" />
        case "whale":
          return <Whale className="w-5 h-5" />
        case "buy":
          return <ShoppingCart className="w-5 h-5" />
      }
    }

    return (
      <motion.button
        className={`p-3 rounded-lg text-left transition-all ${
          isSelected
            ? `bg-${color} bg-opacity-20 border border-${color} border-opacity-50`
            : "bg-white/5 border border-white/10 hover:bg-white/10"
        }`}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{
          scale: 1.03,
          boxShadow: isSelected
            ? `0 0 15px rgba(${color === "neon" ? "57, 255, 20" : color === "blue" ? "0, 122, 255" : color === "purple" ? "175, 82, 222" : "255, 45, 85"}, 0.3)`
            : "0 0 10px rgba(255, 255, 255, 0.1)",
        }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="flex items-center mb-1">
          <motion.div
            className={`w-8 h-8 rounded-full ${
              isSelected ? `bg-${color} bg-opacity-30` : "bg-white/10"
            } flex items-center justify-center mr-2`}
            animate={{
              rotate: isSelected ? [0, 10, 0] : 0,
              scale: isSelected ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: isSelected ? 0 : 0,
              repeatType: "reverse",
            }}
          >
            {getBotIcon()}
          </motion.div>
          <span className="font-medium">{title}</span>
        </div>
        <p className="text-xs text-silver line-clamp-2">{description}</p>
      </motion.button>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-dark/30 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle>{t("bot.config.type")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <BotTypeButton
              botType="sniper"
              isSelected={selectedBot === "sniper"}
              onClick={() => onBotSelect("sniper")}
              title={t("bot.types.sniper.title")}
              description={t("bot.types.sniper.description")}
              color={getBotColorClass("sniper")}
              index={0}
            />
            <BotTypeButton
              botType="wallet"
              isSelected={selectedBot === "wallet"}
              onClick={() => onBotSelect("wallet")}
              title={t("bot.types.wallet.title")}
              description={t("bot.types.wallet.description")}
              color={getBotColorClass("wallet")}
              index={1}
            />
            <BotTypeButton
              botType="whale"
              isSelected={selectedBot === "whale"}
              onClick={() => onBotSelect("whale")}
              title={t("bot.types.whale.title")}
              description={t("bot.types.whale.description")}
              color={getBotColorClass("whale")}
              index={2}
            />
            <BotTypeButton
              botType="buy"
              isSelected={selectedBot === "buy"}
              onClick={() => onBotSelect("buy")}
              title={t("bot.types.buy.title")}
              description={t("bot.types.buy.description")}
              color={getBotColorClass("buy")}
              index={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark/30 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle>{t("bot.config.settings")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={activeTab === "basic" ? "bg-secondary text-secondary-foreground" : ""}
              onClick={() => setActiveTab("basic")}
            >
              {t("bot.config.basic")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={activeTab === "advanced" ? "bg-secondary text-secondary-foreground" : ""}
              onClick={() => setActiveTab("advanced")}
            >
              {t("bot.config.advanced")}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "basic" && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slippage">{t("bot.config.slippage")}</Label>
                    <span className="text-muted-foreground text-sm">{config.slippage}%</span>
                  </div>
                  <Slider
                    id="slippage"
                    defaultValue={[config.slippage]}
                    max={5}
                    step={0.1}
                    onValueChange={(value) => handleSliderChange("slippage", value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="amount">{t("bot.config.amount")}</Label>
                    <span className="text-muted-foreground text-sm">{config.amount}</span>
                  </div>
                  <Slider
                    id="amount"
                    defaultValue={[config.amount]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleSliderChange("amount", value)}
                  />
                </div>

                <div>
                  <Label>{t("bot.config.gas_boost")}</Label>
                  <Select onValueChange={handleGasBoostChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("bot.config.select_gas_boost")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t("bot.config.low")}</SelectItem>
                      <SelectItem value="medium">{t("bot.config.medium")}</SelectItem>
                      <SelectItem value="high">{t("bot.config.high")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {activeTab === "advanced" && (
              <motion.div
                key="advanced"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="profit_percentage">{t("bot.config.profit_percentage")}</Label>
                    <span className="text-muted-foreground text-sm">{config.profit_percentage}%</span>
                  </div>
                  <Slider
                    id="profit_percentage"
                    defaultValue={[config.profit_percentage]}
                    max={10}
                    step={0.1}
                    onValueChange={(value) => handleSliderChange("profit_percentage", value)}
                  />
                </div>

                <div>
                  <Label>{t("bot.config.timeframe")}</Label>
                  <Select onValueChange={handleTimeframeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("bot.config.select_timeframe")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5m">5m</SelectItem>
                      <SelectItem value="15m">15m</SelectItem>
                      <SelectItem value="1h">1h</SelectItem>
                      <SelectItem value="4h">4h</SelectItem>
                      <SelectItem value="1d">1d</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={onStartSimulation} disabled={isSimulating}>
        {isSimulating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("bot.config.simulating")}
          </>
        ) : (
          t("bot.config.start_simulation")
        )}
      </Button>
    </motion.div>
  )
}
