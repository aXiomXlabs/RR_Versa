"use server"

import { createServerClient } from "@/lib/supabase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserBots() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const { data, error } = await supabase
    .from("user_bots")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user bots:", error)
    return []
  }

  return data
}

export async function getBotById(botId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const { data, error } = await supabase
    .from("user_bots")
    .select("*")
    .eq("id", botId)
    .eq("user_id", session.user.id)
    .single()

  if (error) {
    console.error("Error fetching bot:", error)
    return null
  }

  return data
}

export async function createBot(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const name = formData.get("name") as string
  const botType = formData.get("bot_type") as string
  const status = "inactive"

  // Parse configuration based on bot type
  const configuration: Record<string, any> = {}

  // Common configuration fields
  configuration.tradingPair = formData.get("trading_pair") as string
  configuration.maxInvestment = Number.parseFloat(formData.get("max_investment") as string)

  // Strategy-specific configuration
  if (botType === "trend_following") {
    configuration.shortPeriod = Number.parseInt(formData.get("short_period") as string)
    configuration.longPeriod = Number.parseInt(formData.get("long_period") as string)
  } else if (botType === "mean_reversion") {
    configuration.lookbackPeriod = Number.parseInt(formData.get("lookback_period") as string)
    configuration.deviationThreshold = Number.parseFloat(formData.get("deviation_threshold") as string)
  } else if (botType === "arbitrage") {
    configuration.exchanges = (formData.get("exchanges") as string).split(",").map((e) => e.trim())
    configuration.minProfitMargin = Number.parseFloat(formData.get("min_profit_margin") as string)
  }

  const { data, error } = await supabase
    .from("user_bots")
    .insert({
      user_id: session.user.id,
      name,
      bot_type: botType,
      status,
      configuration,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    console.error("Error creating bot:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data[0] }
}

export async function updateBot(botId: string, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  // First, get the existing bot to check ownership
  const { data: existingBot, error: fetchError } = await supabase
    .from("user_bots")
    .select("*")
    .eq("id", botId)
    .eq("user_id", session.user.id)
    .single()

  if (fetchError || !existingBot) {
    console.error("Error fetching bot or bot not found:", fetchError)
    return { success: false, error: "Bot not found or access denied" }
  }

  const name = formData.get("name") as string
  const status = formData.get("status") as string

  // Parse configuration based on bot type
  const configuration: Record<string, any> = { ...existingBot.configuration }

  // Update common configuration fields
  configuration.tradingPair = formData.get("trading_pair") as string
  configuration.maxInvestment = Number.parseFloat(formData.get("max_investment") as string)

  // Update strategy-specific configuration
  if (existingBot.bot_type === "trend_following") {
    configuration.shortPeriod = Number.parseInt(formData.get("short_period") as string)
    configuration.longPeriod = Number.parseInt(formData.get("long_period") as string)
  } else if (existingBot.bot_type === "mean_reversion") {
    configuration.lookbackPeriod = Number.parseInt(formData.get("lookback_period") as string)
    configuration.deviationThreshold = Number.parseFloat(formData.get("deviation_threshold") as string)
  } else if (existingBot.bot_type === "arbitrage") {
    configuration.exchanges = (formData.get("exchanges") as string).split(",").map((e) => e.trim())
    configuration.minProfitMargin = Number.parseFloat(formData.get("min_profit_margin") as string)
  }

  const { data, error } = await supabase
    .from("user_bots")
    .update({
      name,
      status,
      configuration,
      updated_at: new Date().toISOString(),
      ...(status === "active" ? { last_active_at: new Date().toISOString() } : {}),
    })
    .eq("id", botId)
    .eq("user_id", session.user.id)
    .select()

  if (error) {
    console.error("Error updating bot:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data[0] }
}

export async function deleteBot(botId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  // First, get the existing bot to check ownership
  const { data: existingBot, error: fetchError } = await supabase
    .from("user_bots")
    .select("*")
    .eq("id", botId)
    .eq("user_id", session.user.id)
    .single()

  if (fetchError || !existingBot) {
    console.error("Error fetching bot or bot not found:", fetchError)
    return { success: false, error: "Bot not found or access denied" }
  }

  const { error } = await supabase.from("user_bots").delete().eq("id", botId).eq("user_id", session.user.id)

  if (error) {
    console.error("Error deleting bot:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
