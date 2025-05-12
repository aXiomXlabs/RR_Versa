"use server"

import { createServerClient } from "@/lib/supabase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserPerformanceMetrics(period = "30d") {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  // Calculate date range based on period
  const endDate = new Date()
  const startDate = new Date()

  if (period === "7d") {
    startDate.setDate(endDate.getDate() - 7)
  } else if (period === "30d") {
    startDate.setDate(endDate.getDate() - 30)
  } else if (period === "90d") {
    startDate.setDate(endDate.getDate() - 90)
  } else if (period === "1y") {
    startDate.setFullYear(endDate.getFullYear() - 1)
  }

  const { data, error } = await supabase
    .from("performance_metrics")
    .select("*, user_bots(name)")
    .eq("user_id", session.user.id)
    .gte("period_end", startDate.toISOString())
    .lte("period_start", endDate.toISOString())
    .order("period_start", { ascending: false })

  if (error) {
    console.error("Error fetching performance metrics:", error)
    return []
  }

  return data
}

export async function getBotPerformanceMetrics(botId: string, period = "30d") {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  // Calculate date range based on period
  const endDate = new Date()
  const startDate = new Date()

  if (period === "7d") {
    startDate.setDate(endDate.getDate() - 7)
  } else if (period === "30d") {
    startDate.setDate(endDate.getDate() - 30)
  } else if (period === "90d") {
    startDate.setDate(endDate.getDate() - 90)
  } else if (period === "1y") {
    startDate.setFullYear(endDate.getFullYear() - 1)
  }

  const { data, error } = await supabase
    .from("performance_metrics")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("bot_id", botId)
    .gte("period_end", startDate.toISOString())
    .lte("period_start", endDate.toISOString())
    .order("period_start", { ascending: true })

  if (error) {
    console.error("Error fetching bot performance metrics:", error)
    return []
  }

  return data
}

export async function getAggregatedPerformance(period = "30d") {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  // Calculate date range based on period
  const endDate = new Date()
  const startDate = new Date()

  if (period === "7d") {
    startDate.setDate(endDate.getDate() - 7)
  } else if (period === "30d") {
    startDate.setDate(endDate.getDate() - 30)
  } else if (period === "90d") {
    startDate.setDate(endDate.getDate() - 90)
  } else if (period === "1y") {
    startDate.setFullYear(endDate.getFullYear() - 1)
  }

  const { data, error } = await supabase
    .from("performance_metrics")
    .select("*")
    .eq("user_id", session.user.id)
    .gte("period_end", startDate.toISOString())
    .lte("period_start", endDate.toISOString())

  if (error) {
    console.error("Error fetching performance metrics:", error)
    return {
      totalProfitLoss: 0,
      averageRoi: 0,
      winRate: 0,
      totalTransactions: 0,
    }
  }

  // Calculate aggregated metrics
  let totalProfitLoss = 0
  let totalRoi = 0
  let totalWins = 0
  let totalLosses = 0
  let totalTransactions = 0

  data.forEach((metric) => {
    totalProfitLoss += metric.profit_loss_usd || 0
    totalRoi += metric.roi_percentage || 0
    totalWins += metric.win_count || 0
    totalLosses += metric.loss_count || 0
    totalTransactions += metric.total_transactions || 0
  })

  const averageRoi = data.length > 0 ? totalRoi / data.length : 0
  const winRate = totalWins + totalLosses > 0 ? (totalWins / (totalWins + totalLosses)) * 100 : 0

  return {
    totalProfitLoss,
    averageRoi,
    winRate,
    totalTransactions,
  }
}
