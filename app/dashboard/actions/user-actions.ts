"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import type { Language } from "@/contexts/dashboard-language-context"

interface UserSettingsUpdateParams {
  theme?: string
  language?: Language
  notification_preferences?: {
    email: boolean
    push: boolean
    telegram: boolean
  }
  dashboard_layout?: {
    widgets: string[]
  }
}

export async function updateUserSettings(params: UserSettingsUpdateParams) {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  // Aktualisiere nur die bereitgestellten Felder
  const updateData: any = {}

  if (params.theme) updateData.theme = params.theme
  if (params.language) updateData.language = params.language
  if (params.notification_preferences) updateData.notification_preferences = params.notification_preferences
  if (params.dashboard_layout) updateData.dashboard_layout = params.dashboard_layout

  // Wenn nichts zu aktualisieren ist, beende früh
  if (Object.keys(updateData).length === 0) {
    return { success: true, message: "No changes to update" }
  }

  const { error } = await supabase.from("user_settings").update(updateData).eq("id", user.id)

  if (error) {
    throw new Error(`Failed to update settings: ${error.message}`)
  }

  // Revalidate the dashboard page
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/settings")

  return { success: true, message: "Settings updated successfully" }
}

// Hier folgen weitere Aktionen für Benutzereinstellungen...
