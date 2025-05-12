import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  text: string
  html: string
  from?: string
}

// Erstelle einen Transporter für den E-Mail-Versand
// Für Testzwecke verwenden wir Ethereal (ein Fake-SMTP-Service)
let transporter: nodemailer.Transporter | null = null

async function createTestTransporter() {
  if (transporter) return transporter

  // Erstelle ein Ethereal-Testkonto für Entwicklungszwecke
  const testAccount = await nodemailer.createTestAccount()

  // Erstelle einen Transporter mit Ethereal
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  return transporter
}

export async function sendEmail(options: EmailOptions) {
  try {
    // In einer Produktionsumgebung würdest du hier deinen eigenen SMTP-Server verwenden
    // Für Testzwecke verwenden wir Ethereal
    const transport = await createTestTransporter()

    const { to, subject, text, html, from = "Rust Rocket <noreply@rust-rocket.com>" } = options

    const info = await transport.sendMail({
      from,
      to,
      subject,
      text,
      html,
    })

    console.log("E-Mail gesendet:", info.messageId)

    // Ethereal-URL für die Vorschau der E-Mail (nur für Testzwecke)
    console.log("Vorschau-URL:", nodemailer.getTestMessageUrl(info))

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    }
  } catch (error) {
    console.error("Fehler beim E-Mail-Versand:", error)
    throw error
  }
}
