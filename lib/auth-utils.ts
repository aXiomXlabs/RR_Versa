import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import type { CookieOptions } from "@supabase/auth-helpers-nextjs"

// Types for users
export type UserProfile = {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  is_admin?: boolean
}

// Create a Supabase client for the server side
export const createServerSupabaseClient = () => {
  // Dynamic import to avoid "next/headers" being imported at module level
  // This ensures it's only imported in server contexts
  const getCookieStore = async () => {
    const { cookies } = await import("next/headers")
    return cookies()
  }

  return {
    getClient: async () => {
      const cookieStore = await getCookieStore()

      return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: "", ...options })
          },
        },
      })
    },
  }
}

// Create a Supabase client for the client side
export const createClientSupabaseClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Check if the user is logged in
export async function requireAuth() {
  const { getClient } = createServerSupabaseClient()
  const supabase = await getClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  return session.user
}

// Get the user profile
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { getClient } = createServerSupabaseClient()
  const supabase = await getClient()

  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error || !data) {
    return null
  }

  return data as UserProfile
}

// Create or update user settings
export async function initUserSettings(userId: string) {
  const { getClient } = createServerSupabaseClient()
  const supabase = await getClient()

  // Check if settings already exist
  const { data: existingSettings } = await supabase.from("user_settings").select("id").eq("id", userId).single()

  if (!existingSettings) {
    // Create default settings
    await supabase.from("user_settings").insert({
      id: userId,
      theme: "dark",
      language: "de",
      notification_preferences: { email: true, push: false, telegram: false },
      dashboard_layout: { widgets: ["performance", "active_bots", "transactions", "alerts"] },
    })
  }
}

// Check if a user has admin rights
export async function isAdmin(userId: string): Promise<boolean> {
  const { getClient } = createServerSupabaseClient()
  const supabase = await getClient()

  const { data } = await supabase.from("user_profiles").select("is_admin").eq("id", userId).single()

  return data?.is_admin === true
}
