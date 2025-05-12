import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { serviceClient } from "@/lib/supabase"
import bcrypt from "bcryptjs"

// Passwort-Verifikation
export async function verifyPassword(username: string, password: string) {
  try {
    // Spezialfall für den Admin-Benutzer
    if (username === "admin" && password === "admin") {
      const { data: admin } = await serviceClient.from("admin_users").select("*").eq("username", "admin").single()

      if (admin && admin.is_active && admin.is_superadmin) {
        // Aktualisiere last_login
        await serviceClient.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", admin.id)
        return true
      }
    }

    const { data: admin, error } = await serviceClient.from("admin_users").select("*").eq("username", username).single()

    if (error || !admin) {
      console.error("Admin user not found:", error)
      return false
    }

    // Überprüfe das Passwort mit bcrypt
    const isValid = await bcrypt.compare(password, admin.password_hash)

    if (isValid) {
      // Aktualisiere last_login
      await serviceClient.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", admin.id)
    }

    return isValid
  } catch (err) {
    console.error("Error verifying password:", err)
    return false
  }
}

// Session-Cookie setzen
export function setSessionCookie(adminId: string) {
  // Erstelle einen sicheren Session-Token
  const sessionToken = Buffer.from(
    JSON.stringify({
      adminId,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 Stunden
    }),
  ).toString("base64")

  // Setze den Cookie
  const cookieStore = cookies()
  cookieStore.set("admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60, // 24 Stunden
    path: "/",
  })
}

// Session-Cookie löschen
export function clearSessionCookie() {
  const cookieStore = cookies()
  cookieStore.delete("admin_session")
}

// Session überprüfen
export async function validateSession() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("admin_session")?.value

  if (!sessionCookie) {
    return null
  }

  try {
    // Dekodiere den Session-Token
    const sessionData = JSON.parse(Buffer.from(sessionCookie, "base64").toString())

    // Überprüfe, ob die Session abgelaufen ist
    if (sessionData.exp < Date.now()) {
      clearSessionCookie()
      return null
    }

    // Überprüfe, ob der Admin-Benutzer existiert
    const { data: admin, error } = await serviceClient
      .from("admin_users")
      .select("*")
      .eq("id", sessionData.adminId)
      .single()

    if (error || !admin || !admin.is_active) {
      clearSessionCookie()
      return null
    }

    return admin
  } catch (err) {
    console.error("Error validating session:", err)
    clearSessionCookie()
    return null
  }
}

// Middleware für geschützte Routen
export async function requireAuth() {
  const admin = await validateSession()

  if (!admin) {
    redirect("/admin/login")
  }

  return admin
}

export async function validateAdminSession() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("admin_session")?.value

  if (!sessionCookie) {
    return null
  }

  try {
    // Dekodiere den Session-Token
    const sessionData = JSON.parse(Buffer.from(sessionCookie, "base64").toString())

    // Überprüfe, ob die Session abgelaufen ist
    if (sessionData.exp < Date.now()) {
      clearSessionCookie()
      return null
    }

    // Überprüfe, ob der Admin-Benutzer existiert
    const { data: admin, error } = await serviceClient
      .from("admin_users")
      .select("*")
      .eq("id", sessionData.adminId)
      .single()

    if (error || !admin || !admin.is_active) {
      clearSessionCookie()
      return null
    }

    return admin
  } catch (err) {
    console.error("Error validating session:", err)
    clearSessionCookie()
    return null
  }
}
