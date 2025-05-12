"use server"

import { createServiceClient } from "@/lib/supabase"
import { sendEmail } from "@/lib/email"

export async function testDatabaseConnection() {
  try {
    const supabase = createServiceClient()

    // Teste die Verbindung zur users-Tabelle
    const { data: usersCount, error: usersError } = await supabase
      .from("users")
      .select("id", { count: "exact", head: true })

    if (usersError) {
      console.error("Fehler beim Zugriff auf die users-Tabelle:", usersError)
      return {
        success: false,
        message: `Fehler beim Zugriff auf die users-Tabelle: ${usersError.message}`,
      }
    }

    // Teste die Verbindung zur newsletter_subscribers-Tabelle
    const { data: newsletterCount, error: newsletterError } = await supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })

    if (newsletterError) {
      console.error("Fehler beim Zugriff auf die newsletter_subscribers-Tabelle:", newsletterError)
      return {
        success: false,
        message: `Fehler beim Zugriff auf die newsletter_subscribers-Tabelle: ${newsletterError.message}`,
      }
    }

    // Teste die Verbindung zur contact_submissions-Tabelle
    const { data: contactCount, error: contactError } = await supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })

    if (contactError) {
      console.error("Fehler beim Zugriff auf die contact_submissions-Tabelle:", contactError)
      return {
        success: false,
        message: `Fehler beim Zugriff auf die contact_submissions-Tabelle: ${contactError.message}`,
      }
    }

    return {
      success: true,
      message: "Datenbankverbindung erfolgreich! Alle Tabellen sind zugänglich.",
    }
  } catch (error) {
    console.error("Fehler bei der Datenbankverbindung:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
    }
  }
}

export async function testEmailSending(email: string) {
  try {
    const result = await sendEmail({
      to: email,
      subject: "Test-E-Mail von Rust Rocket",
      text: "Dies ist eine Test-E-Mail, um die E-Mail-Funktionalität zu überprüfen.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00ff00; text-align: center;">Rust Rocket</h1>
          <p>Hallo!</p>
          <p>Dies ist eine Test-E-Mail, um die E-Mail-Funktionalität zu überprüfen.</p>
          <p>Wenn du diese E-Mail erhalten hast, funktioniert der E-Mail-Versand korrekt.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              Diese E-Mail wurde automatisch gesendet. Bitte antworte nicht auf diese E-Mail.
            </p>
          </div>
        </div>
      `,
    })

    return {
      success: true,
      message: `E-Mail erfolgreich an ${email} gesendet!`,
    }
  } catch (error) {
    console.error("Fehler beim E-Mail-Versand:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
    }
  }
}
