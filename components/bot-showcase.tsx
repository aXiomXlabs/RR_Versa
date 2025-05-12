"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Rocket, Wallet, FishIcon as Whale, ShoppingCart } from "lucide-react"

interface BotCardProps {
  title: string
  icon: React.ReactNode
  color: string
  description: string
}

const BotCard: React.FC<BotCardProps> = ({ title, icon, color, description }) => {
  return (
    <Card
      className={`bg-dark/30 backdrop-blur-md border-${color}/30 hover:border-${color} p-6 transition-all duration-300 cursor-pointer group`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${color} to-black/80 flex items-center justify-center`}
        >
          {icon}
        </div>
        <div>
          <div className="flex items-center">
            <span className="text-sm text-silver/70">Rust Rocket</span>
          </div>
          <h3 className={`text-2xl font-bold mb-2 text-${color} group-hover:text-white transition-colors`}>{title}</h3>
          <p className="text-silver text-sm">{description}</p>
        </div>
      </div>
    </Card>
  )
}

export default function BotShowcase() {
  const bots = [
    {
      title: "Sniper Bot",
      icon: <Rocket className="w-6 h-6 text-white" />,
      color: "neon",
      description: "Snipe Tokens in <10 ms mit bloxroute-Gateways für maximale Gewinne.",
    },
    {
      title: "Wallet Bot",
      icon: <Wallet className="w-6 h-6 text-white" />,
      color: "blue",
      description: "Kopiere Top-Trader mit 80%+ Erfolgsquote automatisch in deine Wallet.",
    },
    {
      title: "Whale Bot",
      icon: <Whale className="w-6 h-6 text-white" />,
      color: "purple",
      description: "Verfolge Whale-Bewegungen und nutze Smart Exits mit Stop-Loss & Take-Profit.",
    },
    {
      title: "Buy Bot",
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      color: "red",
      description: "Erweitere deine Strategien mit unserer API und automatisierten Kaufregeln.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bots.map((bot) => (
        <BotCard key={bot.title} title={bot.title} icon={bot.icon} color={bot.color} description={bot.description} />
      ))}
    </div>
  )
}
