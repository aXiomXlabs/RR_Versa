"use server"

import { serviceClient } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function createTestAdmin() {
  try {
    // Prüfen, ob der Admin-Benutzer bereits existiert
    const { data: existingAdmin } = await serviceClient
      .from("admin_users")
      .select("id")
      .eq("username", "admin")
      .single()

    if (existingAdmin) {
      // Admin existiert bereits, aktualisiere das Passwort
      const hashedPassword = await bcrypt.hash("admin", 10)

      await serviceClient
        .from("admin_users")
        .update({
          password_hash: hashedPassword,
          is_active: true,
          is_superadmin: true,
          updated_at: new Date().toISOString(),
        })
        .eq("username", "admin")

      return { success: true, message: "Admin-Benutzer aktualisiert", isNew: false }
    }

    // Admin existiert nicht, erstelle einen neuen
    const hashedPassword = await bcrypt.hash("admin", 10)

    await serviceClient.from("admin_users").insert({
      username: "admin",
      password_hash: hashedPassword,
      email: "admin@example.com",
      display_name: "Test Admin",
      is_active: true,
      is_superadmin: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    // Erstelle auch einen entsprechenden Benutzer im auth-System für Dashboard-Zugriff
    const { data: authUser, error: authError } = await serviceClient.auth.admin.createUser({
      email: "admin@example.com",
      password: "admin",
      email_confirm: true,
      user_metadata: {
        is_admin: true,
        display_name: "Test Admin",
      },
    })

    if (authError) {
      console.error("Fehler beim Erstellen des Auth-Benutzers:", authError)
    } else {
      // Erstelle ein Benutzerprofil für den Dashboard-Zugriff
      await serviceClient.from("user_profiles").insert({
        id: authUser.user.id,
        email: "admin@example.com",
        name: "Test Admin",
        is_admin: true,
        created_at: new Date().toISOString(),
      })

      // Erstelle Standardeinstellungen
      await serviceClient.from("user_settings").insert({
        id: authUser.user.id,
        theme: "dark",
        language: "de",
        notification_preferences: { email: true, push: false, telegram: false },
        dashboard_layout: { widgets: ["performance", "active_bots", "transactions", "alerts"] },
      })
    }

    return { success: true, message: "Admin-Benutzer erstellt", isNew: true }
  } catch (error) {
    console.error("Fehler beim Erstellen des Admin-Benutzers:", error)
    return { success: false, message: "Fehler beim Erstellen des Admin-Benutzers" }
  }
}
