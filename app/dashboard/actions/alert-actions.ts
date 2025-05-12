"use server"

import { createServerClient } from "@/lib/supabase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserAlerts() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const { data, error } = await supabase
    .from("user_alerts")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user alerts:", error)
    return []
  }

  return data
}

export async function getAlertById(alertId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const { data, error } = await supabase
    .from("user_alerts")
    .select("*")
    .eq("id", alertId)
    .eq("user_id", session.user.id)
    .single()

  if (error) {
    console.error("Error fetching alert:", error)
    return null
  }

  return data
}

export async function createAlert(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const alertType = formData.get("alert_type") as string

  // Parse alert condition based on alert type
  const alertCondition: Record<string, any> = {}

  if (alertType === "price_alert") {
    alertCondition.token = formData.get("token") as string
    alertCondition.price = Number.parseFloat(formData.get("price") as string)
    alertCondition.condition = formData.get("condition") as string // 'above' or 'below'
  } else if (alertType === "roi_alert") {
    alertCondition.botId = formData.get("bot_id") as string
    alertCondition.roi = Number.parseFloat(formData.get("roi") as string)
    alertCondition.condition = formData.get("condition") as string // 'above' or 'below'
  } else if (alertType === "transaction_alert") {
    alertCondition.botId = formData.get("bot_id") as string
    alertCondition.transactionType = formData.get("transaction_type") as string // 'buy' or 'sell'
  }

  // Parse notification channels
  const notificationChannels = {
    email: formData.get("notification_email") === "on",
    push: formData.get("notification_push") === "on",
    telegram: formData.get("notification_telegram") === "on",
  }

  const { data, error } = await supabase
    .from("user_alerts")
    .insert({
      user_id: session.user.id,
      alert_type: alertType,
      alert_condition: alertCondition,
      is_active: true,
      notification_channels: notificationChannels,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    console.error("Error creating alert:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data[0] }
}

export async function updateAlert(alertId: string, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  // First, get the existing alert to check ownership
  const { data: existingAlert, error: fetchError } = await supabase
    .from("user_alerts")
    .select("*")
    .eq("id", alertId)
    .eq("user_id", session.user.id)
    .single()

  if (fetchError || !existingAlert) {
    console.error("Error fetching alert or alert not found:", fetchError)
    return { success: false, error: "Alert not found or access denied" }
  }

  const isActive = formData.get("is_active") === "on"

  // Parse alert condition based on alert type
  const alertCondition: Record<string, any> = { ...existingAlert.alert_condition }

  if (existingAlert.alert_type === "price_alert") {
    alertCondition.token = formData.get("token") as string
    alertCondition.price = Number.parseFloat(formData.get("price") as string)
    alertCondition.condition = formData.get("condition") as string // 'above' or 'below'
  } else if (existingAlert.alert_type === "roi_alert") {
    alertCondition.botId = formData.get("bot_id") as string
    alertCondition.roi = Number.parseFloat(formData.get("roi") as string)
    alertCondition.condition = formData.get("condition") as string // 'above' or 'below'
  } else if (existingAlert.alert_type === "transaction_alert") {
    alertCondition.botId = formData.get("bot_id") as string
    alertCondition.transactionType = formData.get("transaction_type") as string // 'buy' or 'sell'
  }

  // Parse notification channels
  const notificationChannels = {
    email: formData.get("notification_email") === "on",
    push: formData.get("notification_push") === "on",
    telegram: formData.get("notification_telegram") === "on",
  }

  const { data, error } = await supabase
    .from("user_alerts")
    .update({
      alert_condition: alertCondition,
      is_active: isActive,
      notification_channels: notificationChannels,
      updated_at: new Date().toISOString(),
    })
    .eq("id", alertId)
    .eq("user_id", session.user.id)
    .select()

  if (error) {
    console.error("Error updating alert:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data[0] }
}

export async function deleteAlert(alertId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  // First, get the existing alert to check ownership
  const { data: existingAlert, error: fetchError } = await supabase
    .from("user_alerts")
    .select("*")
    .eq("id", alertId)
    .eq("user_id", session.user.id)
    .single()

  if (fetchError || !existingAlert) {
    console.error("Error fetching alert or alert not found:", fetchError)
    return { success: false, error: "Alert not found or access denied" }
  }

  const { error } = await supabase.from("user_alerts").delete().eq("id", alertId).eq("user_id", session.user.id)

  if (error) {
    console.error("Error deleting alert:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
