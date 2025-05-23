"use client"

import type { BotType, BotConfig } from "./types"

export const defaultConfigs: Record<BotType, BotConfig> = {
  sniper: {
    aggressiveness: 80,
    safetyLevel: 40,
    maxSlippage: 2.5,
    gasBoost: "high",
    targetDEX: ["Uniswap", "PancakeSwap"],
    autoTakeProfit: 50,
    autoStopLoss: 15,
    tradingPair: "ETH",
    timeframe: "5m",
    maxTradesPerDay: 20,
    useAntiMEV: true,
    useSmartRouting: true,
  },
  wallet: {
    aggressiveness: 60,
    safetyLevel: 70,
    maxSlippage: 1.0,
    gasBoost: "medium",
    targetDEX: ["Uniswap", "dYdX", "Raydium"],
    autoTakeProfit: 30,
    autoStopLoss: 10,
    tradingPair: "USDT",
    timeframe: "1h",
    maxTradesPerDay: 10,
    useAntiMEV: true,
    useSmartRouting: true,
  },
  whale: {
    aggressiveness: 40,
    safetyLevel: 80,
    maxSlippage: 0.5,
    gasBoost: "low",
    targetDEX: ["dYdX", "Uniswap", "Raydium"],
    autoTakeProfit: 25,
    autoStopLoss: 8,
    tradingPair: "USDC",
    timeframe: "4h",
    maxTradesPerDay: 5,
    useAntiMEV: true,
    useSmartRouting: true,
  },
  buy: {
    aggressiveness: 70,
    safetyLevel: 50,
    maxSlippage: 1.5,
    gasBoost: "medium",
    targetDEX: ["PancakeSwap", "Uniswap"],
    autoTakeProfit: 40,
    autoStopLoss: 12,
    tradingPair: "BNB",
    timeframe: "15m",
    maxTradesPerDay: 15,
    useAntiMEV: false,
    useSmartRouting: true,
  },
}

export const botDescriptions = {
  sniper: {
    title: "Sniper Bot",
    description: "Blitzschnelle Ausführung für neue Token-Listings und Flash-Opportunities mit minimaler Latenz.",
    color: "neon",
  },
  wallet: {
    title: "Wallet Bot",
    description: "Kopiert Strategien von erfolgreichen Tradern mit präziser Timing-Optimierung und Smart Routing.",
    color: "blue",
  },
  whale: {
    title: "Whale Bot",
    description: "Trackt große Wallet-Bewegungen und positioniert sich strategisch vor Marktbewegungen.",
    color: "purple",
  },
  buy: {
    title: "Buy Bot",
    description: "Automatisierte Kaufstrategien basierend auf technischen Indikatoren und Marktbedingungen.",
    color: "red",
  },
}
