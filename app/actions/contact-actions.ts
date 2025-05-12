"use server"

import { serviceClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export type ContactFormData = {
  name: string
  email: string
  phone?: string
  inquiryType: string
  message: string
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validiere den Anfragetyp
    const validTypes = ["general", "support", "pricing", "partnership", "feature"]
    if (!validTypes.includes(data.inquiryType)) {
      return { success: false, error: "Ungültiger Anfragetyp" }
    }

    // Erstelle die Kontaktanfrage
    const { data: submission, error } = await serviceClient
      .from("contact_submissions")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          inquiry_type: data.inquiryType,
          message: data.message,
          submitted_at: new Date().toISOString(),
          status: "new",
        },
      ])
      .select()

    if (error) {
      console.error("Error submitting contact form:", error)
      return { success: false, error: "Fehler beim Senden des Kontaktformulars" }
    }

    // Audit-Log erstellen
    await serviceClient.from("audit_logs").insert({
      action: "CONTACT",
      entity_type: "contact_submissions",
      entity_id: submission?.[0]?.id,
      details: { email: data.email, inquiry_type: data.inquiryType },
    })

    revalidatePath("/")
    return { success: true, submissionId: submission?.[0]?.id }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return { success: false, error: "Ein unerwarteter Fehler ist aufgetreten" }
  }
}
