"use server"

import { serviceClient } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function createAdminAccount(email: string, username: string, password: string) {
  try {
    // Überprüfen, ob der Benutzer bereits existiert
    const { data: existingUser } = await serviceClient
      .from("admin_users")
      .select("*")
      .or(`username.eq.${username},email.eq.${email}`)
      .maybeSingle()

    if (existingUser) {
      return {
        success: false,
        message: "Ein Benutzer mit diesem Benutzernamen oder dieser E-Mail existiert bereits.",
      }
    }

    // Passwort hashen
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Admin-Benutzer erstellen
    const { data, error } = await serviceClient
      .from("admin_users")
      .insert({
        username,
        email,
        password_hash: hashedPassword,
        is_active: true,
        role: "admin", // Verwende role statt is_superadmin
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Fehler beim Erstellen des Admin-Benutzers:", error)
      return {
        success: false,
        message: "Fehler beim Erstellen des Admin-Benutzers: " + error.message,
      }
    }

    // Audit-Log-Eintrag erstellen
    await serviceClient.from("audit_logs").insert({
      action: "CREATE_ADMIN",
      entity_type: "admin_users",
      entity_id: data[0].id,
      details: { username, email },
      ip_address: "127.0.0.1", // Lokale IP für Systemaktionen
    })

    return {
      success: true,
      message: "Admin-Benutzer erfolgreich erstellt!",
      userId: data[0].id,
    }
  } catch (error) {
    console.error("Unerwarteter Fehler:", error)
    return {
      success: false,
      message: "Ein unerwarteter Fehler ist aufgetreten.",
    }
  }
}
