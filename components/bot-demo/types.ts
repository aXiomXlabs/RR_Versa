export type BotType = "sniper" | "wallet" | "whale" | "buy"

export interface BotConfig {
  aggressiveness: number // 0-100
  safetyLevel: number // 0-100
  maxSlippage: number // Prozent
  gasBoost: "low" | "medium" | "high"
  targetDEX: string[]
  autoTakeProfit: number // Prozent
  autoStopLoss: number // Prozent
  tradingPair: string
  timeframe: "5m" | "15m" | "1h" | "4h" | "1d"
  maxTradesPerDay: number
  useAntiMEV: boolean
  useSmartRouting: boolean
}

export interface Trade {
  id: string
  timestamp: string
  token: string
  entryPrice: number
  exitPrice: number
  volume: number
  profitLoss: number
  executionTime: number // in ms
  exchange: string
}

export interface SimulationResults {
  roi: number // Prozent
  winRate: number // Prozent
  tradesExecuted: number
  averageExecutionTime: number // in ms
  trades: Trade[]
  profitLoss: number // Absoluter Gewinn/Verlust
  timeframe: string
  startBalance: number
  endBalance: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    fill?: boolean
  }[]
}
