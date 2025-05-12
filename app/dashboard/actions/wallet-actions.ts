"use server"

import { createServerClient } from "@/lib/supabase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserWallets() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const { data, error } = await supabase
    .from("user_wallets")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user wallets:", error)
    return []
  }

  return data
}

export async function addWallet(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  const walletAddress = formData.get("wallet_address") as string
  const walletName = formData.get("wallet_name") as string
  const blockchain = formData.get("blockchain") as string
  const isPrimary = formData.get("is_primary") === "on"

  // If this is set as primary, update all other wallets to not be primary
  if (isPrimary) {
    await supabase.from("user_wallets").update({ is_primary: false }).eq("user_id", session.user.id)
  }

  const { data, error } = await supabase
    .from("user_wallets")
    .insert({
      user_id: session.user.id,
      wallet_address: walletAddress,
      wallet_name: walletName,
      blockchain: blockchain,
      is_primary: isPrimary,
      balance_snapshot: {},
      last_updated: new Date().toISOString(),
      created_at: new Date().toISOString(),
    })
    .select()

  if (error) {
    console.error("Error adding wallet:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data[0] }
}

export async function updateWallet(walletId: string, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  // First, get the existing wallet to check ownership
  const { data: existingWallet, error: fetchError } = await supabase
    .from("user_wallets")
    .select("*")
    .eq("id", walletId)
    .eq("user_id", session.user.id)
    .single()

  if (fetchError || !existingWallet) {
    console.error("Error fetching wallet or wallet not found:", fetchError)
    return { success: false, error: "Wallet not found or access denied" }
  }

  const walletName = formData.get("wallet_name") as string
  const isPrimary = formData.get("is_primary") === "on"

  // If this is set as primary, update all other wallets to not be primary
  if (isPrimary) {
    await supabase.from("user_wallets").update({ is_primary: false }).eq("user_id", session.user.id).neq("id", walletId)
  }

  const { data, error } = await supabase
    .from("user_wallets")
    .update({
      wallet_name: walletName,
      is_primary: isPrimary,
      last_updated: new Date().toISOString(),
    })
    .eq("id", walletId)
    .eq("user_id", session.user.id)
    .select()

  if (error) {
    console.error("Error updating wallet:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data[0] }
}

export async function deleteWallet(walletId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  // First, get the existing wallet to check ownership
  const { data: existingWallet, error: fetchError } = await supabase
    .from("user_wallets")
    .select("*")
    .eq("id", walletId)
    .eq("user_id", session.user.id)
    .single()

  if (fetchError || !existingWallet) {
    console.error("Error fetching wallet or wallet not found:", fetchError)
    return { success: false, error: "Wallet not found or access denied" }
  }

  const { error } = await supabase.from("user_wallets").delete().eq("id", walletId).eq("user_id", session.user.id)

  if (error) {
    console.error("Error deleting wallet:", error)
    return { success: false, error: error.message }
  }

  // If this was the primary wallet and there are other wallets, make another one primary
  if (existingWallet.is_primary) {
    const { data: otherWallets } = await supabase
      .from("user_wallets")
      .select("id")
      .eq("user_id", session.user.id)
      .limit(1)

    if (otherWallets && otherWallets.length > 0) {
      await supabase.from("user_wallets").update({ is_primary: true }).eq("id", otherWallets[0].id)
    }
  }

  return { success: true }
}
