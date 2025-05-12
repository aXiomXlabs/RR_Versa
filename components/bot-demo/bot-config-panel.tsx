"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Rocket, Wallet, FishIcon as Whale, ShoppingCart } from "lucide-react"
import type { BotType, BotConfig } from "./types"

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
  }: {
    botType: BotType
    isSelected: boolean
    onClick: () => void
    title: string
    description: string
    color: string
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
      <button
        className={`p-3 rounded-lg text-left transition-all ${
          isSelected
            ? `bg-${color} bg-opacity-20 border border-${color} border-opacity-50`
            : "bg-white/5 border border-white/10 hover:bg-white/10"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center mb-1">
          <div
            className={`w-8 h-8 rounded-full ${
              isSelected ? `bg-${color} bg-opacity-30` : "bg-white/10"
            } flex items-center justify-center mr-2`}
          >
            {getBotIcon()}
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <p className="text-xs text-silver line-clamp-2">{description}</p>
      </button>
    )
  }

  return (
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
            title={t("bot.sniper.title")}
            description={t("bot.sniper.description")}
            color="neon"
          />
          <BotTypeButton
            botType="wallet"
            isSelected={selectedBot === "wallet"}
            onClick={() => onBotSelect("wallet")}
            title={t("bot.wallet.title")}
            description={t("bot.wallet.description")}
            color="blue"
          />
          <BotTypeButton
            botType="whale"
            isSelected={selectedBot === "whale"}
            onClick={() => onBotSelect("whale")}
            title={t("bot.whale.title")}
            description={t("bot.whale.description")}
            color="purple"
          />
          <BotTypeButton
            botType="buy"
            isSelected={selectedBot === "buy"}
            onClick={() => onBotSelect("buy")}
            title={t("bot.buy.title")}
            description={t("bot.buy.description")}
            color="red"
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <Label htmlFor="aggressiveness">{t("bot.config.aggressiveness")}</Label>
              <span className="text-sm text-silver">{config.aggressiveness}%</span>
            </div>
            <Slider
              id="aggressiveness"
              min={0}
              max={100}
              step={5}
              value={[config.aggressiveness]}
              onValueChange={(values) => onConfigChange({ aggressiveness: values[0] })}
              className="cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <Label htmlFor="safetyLevel">{t("bot.config.safety")}</Label>
              <span className="text-sm text-silver">{config.safetyLevel}%</span>
            </div>
            <Slider
              id="safetyLevel"
              min={0}
              max={100}
              step={5}
              value={[config.safetyLevel]}
              onValueChange={(values) => onConfigChange({ safetyLevel: values[0] })}
              className="cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <Label htmlFor="maxSlippage">{t("bot.config.slippage")}</Label>
              <span className="text-sm text-silver">{config.maxSlippage}%</span>
            </div>
            <Slider
              id="maxSlippage"
              min={0.1}
              max={5}
              step={0.1}
              value={[config.maxSlippage]}
              onValueChange={(values) => onConfigChange({ maxSlippage: values[0] })}
              className="cursor-pointer"
            />
          </div>

          <div>
            <Label htmlFor="gasBoost" className="mb-1 block">
              {t("bot.config.gas")}
            </Label>
            <Select
              value={config.gasBoost}
              onValueChange={(value) => onConfigChange({ gasBoost: value as "low" | "medium" | "high" })}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark border-white/10">
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={onStartSimulation}
          disabled={isSimulating}
          className={`w-full ${getBotColorClass(selectedBot)}`}
        >
          {isSimulating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("bot.config.running")}
            </>
          ) : (
            t("bot.config.start")
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
