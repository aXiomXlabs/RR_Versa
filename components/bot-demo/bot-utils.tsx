"use client"

import { useLanguage } from "../../contexts/language-context"
import type { BotType } from "./types"
import { Rocket, Wallet, FishIcon as Whale, ShoppingCart } from "lucide-react"

// Hilfsfunktion, um die Farbe für jeden Bot-Typ zu erhalten
export const getBotColor = (botType: BotType): string => {
  switch (botType) {
    case "sniper":
      return "neon"
    case "wallet":
      return "blue"
    case "whale":
      return "purple"
    case "buy":
      return "red"
    default:
      return "neon"
  }
}

// Hilfsfunktion, um die CSS-Klasse für die Bot-Farbe zu erhalten
export const getBotColorClass = (botType: BotType): string => {
  switch (botType) {
    case "sniper":
      return "bg-gradient-to-r from-neon to-neon/70 hover:from-neon/90 hover:to-neon/60"
    case "wallet":
      return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
    case "whale":
      return "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
    case "buy":
      return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
    default:
      return "bg-gradient-to-r from-neon to-neon/70 hover:from-neon/90 hover:to-neon/60"
  }
}

// Hilfsfunktion, um das Icon für jeden Bot-Typ zu erhalten
export const getBotIcon = (type: BotType) => {
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

// Hook, um übersetzte Bot-Beschreibungen zu erhalten
export const useBotDescriptions = () => {
  const { t } = useLanguage()

  const getBotDescription = (botType: BotType) => {
    return {
      title: t(`bot.${botType}.title`),
      description: t(`bot.${botType}.description`),
      color: getBotColor(botType),
    }
  }

  return {
    getBotDescription,
    botDescriptions: {
      sniper: getBotDescription("sniper"),
      wallet: getBotDescription("wallet"),
      whale: getBotDescription("whale"),
      buy: getBotDescription("buy"),
    },
  }
}
