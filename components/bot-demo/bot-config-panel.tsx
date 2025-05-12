"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, Wallet, FishIcon as Whale, ShoppingCart, Zap, Shield, Gauge } from "lucide-react"
import type { BotType, BotConfig } from "./types"
import { botDescriptions } from "./default-configs"
import AnimatedCTAButton from "../animated-cta-button"

interface BotConfigPanelProps {
  selectedBot: BotType
  config: BotConfig
  onBotSelect: (botType: BotType) => void
  onConfigChange: (newConfig: Partial<BotConfig>) => void
  onStartSimulation: () => void
  isSimulating: boolean
}

export default function BotConfigPanel({
  selectedBot,
  config,
  onBotSelect,
  onConfigChange,
  onStartSimulation,
  isSimulating,
}: BotConfigPanelProps) {
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

  return (
    <Card className="bg-dark/30 backdrop-blur-md border-white/10 p-6">
      <h2 className="text-xl font-bold mb-4">Bot Konfiguration</h2>

      {/* Bot Type Selection */}
      <div className="mb-6">
        <label className="text-sm text-silver mb-2 block">Bot-Typ auswählen</label>
        <div className="grid grid-cols-2 gap-3">
          {(["sniper", "wallet", "whale", "buy"] as BotType[]).map((botType) => (
            <button
              key={botType}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                selectedBot === botType
                  ? `bg-${botDescriptions[botType].color} text-black font-medium`
                  : "bg-white/10 hover:bg-white/20"
              }`}
              onClick={() => onBotSelect(botType)}
            >
              {getBotIcon(botType)}
              <span>{botDescriptions[botType].title.split(" ")[0]}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-silver">{botDescriptions[selectedBot].description}</p>
      </div>

      {/* Configuration Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-white/10 mb-4">
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "basic" ? "border-b-2 border-neon text-neon" : "text-silver"
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Grundeinstellungen
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "advanced" ? "border-b-2 border-neon text-neon" : "text-silver"
            }`}
            onClick={() => setActiveTab("advanced")}
          >
            Erweitert
          </button>
        </div>

        {activeTab === "basic" ? (
          <div className="space-y-6">
            {/* Aggressiveness Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm flex items-center gap-1">
                  <Zap className="w-4 h-4 text-neon" />
                  Aggressivität
                </Label>
                <span className="text-sm font-mono bg-white/10 px-2 rounded">{config.aggressiveness}%</span>
              </div>
              <Slider
                defaultValue={[config.aggressiveness]}
                max={100}
                step={1}
                onValueChange={(value) => handleSliderChange("aggressiveness", value)}
              />
              <div className="flex justify-between text-xs text-silver">
                <span>Konservativ</span>
                <span>Aggressiv</span>
              </div>
            </div>

            {/* Safety Level Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm flex items-center gap-1">
                  <Shield className="w-4 h-4 text-blue" />
                  Sicherheitslevel
                </Label>
                <span className="text-sm font-mono bg-white/10 px-2 rounded">{config.safetyLevel}%</span>
              </div>
              <Slider
                defaultValue={[config.safetyLevel]}
                max={100}
                step={1}
                onValueChange={(value) => handleSliderChange("safetyLevel", value)}
              />
              <div className="flex justify-between text-xs text-silver">
                <span>Riskant</span>
                <span>Sicher</span>
              </div>
            </div>

            {/* Gas Boost Selection */}
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-1">
                <Gauge className="w-4 h-4 text-purple" />
                Gas Boost
              </Label>
              <Select defaultValue={config.gasBoost} onValueChange={handleGasBoostChange}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Gas Boost auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Niedrig (günstigere Gebühren)</SelectItem>
                  <SelectItem value="medium">Mittel (ausgewogen)</SelectItem>
                  <SelectItem value="high">Hoch (schnellere Ausführung)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Take Profit & Stop Loss */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Auto Take-Profit</Label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm"
                    value={config.autoTakeProfit}
                    onChange={(e) => onConfigChange({ autoTakeProfit: Number(e.target.value) })}
                    min={0}
                    max={1000}
                  />
                  <span className="absolute right-3 top-2 text-sm text-silver">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Auto Stop-Loss</Label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm"
                    value={config.autoStopLoss}
                    onChange={(e) => onConfigChange({ autoStopLoss: Number(e.target.value) })}
                    min={0}
                    max={100}
                  />
                  <span className="absolute right-3 top-2 text-sm text-silver">%</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Max Slippage */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm">Max. Slippage</Label>
                <span className="text-sm font-mono bg-white/10 px-2 rounded">{config.maxSlippage}%</span>
              </div>
              <Slider
                defaultValue={[config.maxSlippage]}
                min={0.1}
                max={10}
                step={0.1}
                onValueChange={(value) => handleSliderChange("maxSlippage", value)}
              />
            </div>

            {/* Trading Pair */}
            <div className="space-y-2">
              <Label className="text-sm">Trading Pair</Label>
              <Select
                defaultValue={config.tradingPair}
                onValueChange={(value) => handleSelectChange("tradingPair", value)}
              >
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Trading Pair auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="BNB">BNB</SelectItem>
                  <SelectItem value="SOL">SOL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timeframe */}
            <div className="space-y-2">
              <Label className="text-sm">Timeframe</Label>
              <Select defaultValue={config.timeframe} onValueChange={handleTimeframeChange}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Timeframe auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5m">5 Minuten</SelectItem>
                  <SelectItem value="15m">15 Minuten</SelectItem>
                  <SelectItem value="1h">1 Stunde</SelectItem>
                  <SelectItem value="4h">4 Stunden</SelectItem>
                  <SelectItem value="1d">1 Tag</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Trades Per Day */}
            <div className="space-y-2">
              <Label className="text-sm">Max. Trades pro Tag</Label>
              <input
                type="number"
                className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm"
                value={config.maxTradesPerDay}
                onChange={(e) => onConfigChange({ maxTradesPerDay: Number(e.target.value) })}
                min={1}
                max={100}
              />
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm cursor-pointer" htmlFor="anti-mev">
                  Anti-MEV Schutz
                </Label>
                <Switch
                  id="anti-mev"
                  checked={config.useAntiMEV}
                  onCheckedChange={(checked) => handleSwitchChange("useAntiMEV", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm cursor-pointer" htmlFor="smart-routing">
                  Smart Routing
                </Label>
                <Switch
                  id="smart-routing"
                  checked={config.useSmartRouting}
                  onCheckedChange={(checked) => handleSwitchChange("useSmartRouting", checked)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Start Simulation Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <AnimatedCTAButton
          onClick={onStartSimulation}
          disabled={isSimulating}
          color={botDescriptions[selectedBot].color as any}
          className="w-full"
        >
          {isSimulating ? "Simulation läuft..." : "Simulation starten"}
        </AnimatedCTAButton>
      </motion.div>
    </Card>
  )
}
