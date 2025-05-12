"use server"

import { verifyPassword, setSessionCookie, clearSessionCookie } from "@/lib/auth"
import { redirect } from "next/navigation"
import { serviceClient } from "@/lib/supabase"

export async function login(username: string, password: string) {
  try {
    const isValid = await verifyPassword(username, password)

    if (isValid) {
      // Hole die Admin-ID
      const { data: admin } = await serviceClient.from("admin_users").select("id").eq("username", username).single()

      if (admin) {
        // Setze den Session-Cookie
        setSessionCookie(admin.id)

        // Protokolliere den Login im Audit-Log
        await serviceClient.from("audit_logs").insert({
          action: "LOGIN",
          entity_type: "admin_users",
          entity_id: admin.id,
          user_id: admin.id,
          details: { username },
        })

        return { success: true }
      }
    }

    return { success: false, error: "Ungültige Anmeldedaten" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Ein Fehler ist aufgetreten" }
  }
}

export async function logout() {
  clearSessionCookie()
  redirect("/admin/login")
}
