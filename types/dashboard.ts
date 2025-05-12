export interface UserSettings {
  id: string
  theme: string
  language: string
  notification_preferences: {
    email: boolean
    push: boolean
    telegram: boolean
  }
  dashboard_layout: {
    widgets: string[]
  }
  created_at: string
  updated_at: string
}

export interface Bot {
  id: string
  user_id: string
  name: string
  bot_type: string
  status: string
  configuration: Record<string, any>
  created_at: string
  updated_at: string
  last_active_at: string | null
}

export interface Transaction {
  id: string
  user_id: string
  bot_id: string | null
  transaction_type: string
  token_symbol: string
  token_address: string
  amount: number
  price_usd: number
  gas_fee_usd: number | null
  status: string
  blockchain: string
  tx_hash: string | null
  executed_at: string
  created_at: string
  user_bots?: {
    name: string
  }
}

export interface PerformanceMetric {
  id: string
  user_id: string
  bot_id: string | null
  period_start: string
  period_end: string
  roi_percentage: number | null
  profit_loss_usd: number | null
  win_count: number
  loss_count: number
  total_transactions: number
  avg_holding_time_seconds: number | null
  metrics_data: Record<string, any> | null
  created_at: string
  user_bots?: {
    name: string
  }
}

export interface AggregatedPerformance {
  totalProfitLoss: number
  averageRoi: number
  winRate: number
  totalTransactions: number
}

export interface Alert {
  id: string
  user_id: string
  alert_type: string
  alert_condition: Record<string, any>
  is_active: boolean
  notification_channels: {
    email: boolean
    push: boolean
    telegram: boolean
  }
  created_at: string
  updated_at: string
  last_triggered_at: string | null
}

export interface Wallet {
  id: string
  user_id: string
  wallet_address: string
  wallet_name: string
  blockchain: string
  is_primary: boolean
  balance_snapshot: Record<string, any> | null
  last_updated: string
  created_at: string
}
