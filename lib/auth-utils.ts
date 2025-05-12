import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

// Typen für Benutzer
export type UserProfile = {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  is_admin?: boolean
}

// Erstelle einen Supabase-Client für die Serverseite
export const createServerSupabaseClient = () => {
  const cookieStore = cookies()

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}

// Erstelle einen Supabase-Client für die Clientseite
export const createClientSupabaseClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Überprüfe, ob der Benutzer angemeldet ist
export async function requireAuth() {
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/dashboard/login")
  }

  return session.user
}

// Hole das Benutzerprofil
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error || !data) {
    return null
  }

  return data as UserProfile
}

// Erstelle oder aktualisiere Benutzereinstellungen
export async function initUserSettings(userId: string) {
  const supabase = createServerSupabaseClient()

  // Prüfe, ob Einstellungen bereits existieren
  const { data: existingSettings } = await supabase.from("user_settings").select("id").eq("id", userId).single()

  if (!existingSettings) {
    // Erstelle Standardeinstellungen
    await supabase.from("user_settings").insert({
      id: userId,
      theme: "dark",
      language: "de",
      notification_preferences: { email: true, push: false, telegram: false },
      dashboard_layout: { widgets: ["performance", "active_bots", "transactions", "alerts"] },
    })
  }
}

// Prüfe, ob ein Benutzer Admin-Rechte hat
export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  const { data } = await supabase.from("user_profiles").select("is_admin").eq("id", userId).single()

  return data?.is_admin === true
}
