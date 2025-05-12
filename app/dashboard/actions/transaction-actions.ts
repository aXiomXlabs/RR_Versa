"use server"

import { createServerClient } from "@/lib/supabase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserTransactions(limit = 10, offset = 0) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const { data, error, count } = await supabase
    .from("trading_transactions")
    .select("*, user_bots(name)", { count: "exact" })
    .eq("user_id", session.user.id)
    .order("executed_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching transactions:", error)
    return { transactions: [], count: 0 }
  }

  return { transactions: data, count }
}

export async function getTransactionsByBotId(botId: string, limit = 10, offset = 0) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const { data, error, count } = await supabase
    .from("trading_transactions")
    .select("*", { count: "exact" })
    .eq("user_id", session.user.id)
    .eq("bot_id", botId)
    .order("executed_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching bot transactions:", error)
    return { transactions: [], count: 0 }
  }

  return { transactions: data, count }
}

export async function getTransactionById(transactionId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const { data, error } = await supabase
    .from("trading_transactions")
    .select("*, user_bots(name)")
    .eq("id", transactionId)
    .eq("user_id", session.user.id)
    .single()

  if (error) {
    console.error("Error fetching transaction:", error)
    return null
  }

  return data
}
