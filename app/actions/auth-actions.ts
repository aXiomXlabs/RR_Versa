"use server"

import { serviceClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export type RegistrationData = {
  email: string
  name: string
  telegramHandle?: string
  experience?: string
  newsletter?: boolean
}

export async function registerUser(data: RegistrationData) {
  try {
    // Prüfen, ob der Benutzer bereits existiert
    const { data: existingUser, error: checkError } = await serviceClient
      .from("users")
      .select("id")
      .eq("email", data.email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing user:", checkError)
      return { success: false, error: "Fehler bei der Überprüfung der E-Mail-Adresse" }
    }

    if (existingUser) {
      return { success: false, error: "Diese E-Mail-Adresse ist bereits registriert" }
    }

    // Neuen Benutzer erstellen
    const { data: newUser, error } = await serviceClient
      .from("users")
      .insert([
        {
          email: data.email,
          name: data.name,
          telegram_handle: data.telegramHandle || null,
          experience_level: data.experience || "beginner",
          newsletter_opt_in: !!data.newsletter,
          registration_date: new Date().toISOString(),
          status: "waitlist",
        },
      ])
      .select()

    if (error) {
      console.error("Error creating user:", error)
      return { success: false, error: "Fehler bei der Registrierung" }
    }

    // Audit-Log erstellen
    await serviceClient.from("audit_logs").insert({
      action: "REGISTER",
      entity_type: "users",
      entity_id: newUser?.[0]?.id,
      details: { email: data.email, name: data.name },
    })

    revalidatePath("/")
    return { success: true, userId: newUser?.[0]?.id }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "Ein unerwarteter Fehler ist aufgetreten" }
  }
}

export async function subscribeToNewsletter(email: string, name?: string) {
  try {
    // Prüfen, ob die E-Mail bereits abonniert ist
    const { data: existingSubscriber } = await serviceClient
      .from("newsletter_subscribers")
      .select("id, is_active")
      .eq("email", email)
      .single()

    if (existingSubscriber) {
      // Wenn der Abonnent existiert, aber inaktiv ist, reaktivieren
      if (!existingSubscriber.is_active) {
        await serviceClient
          .from("newsletter_subscribers")
          .update({
            is_active: true,
            unsubscribed_at: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingSubscriber.id)

        return { success: true, message: "Dein Newsletter-Abonnement wurde reaktiviert" }
      }

      return { success: true, message: "Du bist bereits angemeldet" }
    }

    // Neuen Abonnenten erstellen
    const { data: newSubscriber, error } = await serviceClient
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          name: name || null,
          subscribed_at: new Date().toISOString(),
          is_active: true,
        },
      ])
      .select()

    if (error) {
      console.error("Error subscribing to newsletter:", error)
      return { success: false, error: "Fehler beim Abonnieren des Newsletters" }
    }

    // Audit-Log erstellen
    await serviceClient.from("audit_logs").insert({
      action: "SUBSCRIBE",
      entity_type: "newsletter_subscribers",
      entity_id: newSubscriber?.[0]?.id,
      details: { email, name },
    })

    revalidatePath("/")
    return { success: true, message: "Erfolgreich zum Newsletter angemeldet" }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, error: "Ein unerwarteter Fehler ist aufgetreten" }
  }
}
