"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { serviceClient } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || "super-secret-jwt-token-with-at-least-32-characters"
const TOKEN_EXPIRY = "24h"

export async function login(username: string, password: string) {
  try {
    // Benutzer in der Datenbank suchen
    const { data: user, error } = await serviceClient.from("admin_users").select("*").eq("username", username).single()

    if (error || !user) {
      return {
        success: false,
        error: "Ungültige Anmeldedaten",
      }
    }

    // Passwort überprüfen
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      return {
        error: "Ungültige Anmeldedaten",
      }
    }

    // Prüfen, ob der Benutzer aktiv ist
    if (!user.is_active) {
      return {
        error: "Dieses Konto ist deaktiviert",
      }
    }

    // JWT-Token erstellen
    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY },
    )

    // Token in Cookie speichern
    cookies().set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 Stunden
      path: "/",
    })

    // Letzten Login aktualisieren
    await serviceClient.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", user.id)

    redirect("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Login-Fehler:", error)
    return {
      error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
    }
  }
}

export async function logout() {
  cookies().delete("admin_token")
  redirect("/admin/login")
}
