import type { Language } from "@/contexts/language-context"
import { getKeywordData } from "./keyword-tracker"
import { sendEmail } from "@/lib/email"

export type KeywordAlert = {
  keyword: string
  language: Language
  oldPosition: number
  newPosition: number
  change: number
  url: string
}

/**
 * Überprüft auf signifikante Änderungen in Keyword-Rankings
 */
export async function checkForSignificantChanges(threshold = 5): Promise<KeywordAlert[]> {
  const keywords = await getKeywordData()
  const alerts: KeywordAlert[] = []

  for (const keyword of keywords) {
    // Überprüfe, ob es eine vorherige Position gibt und ob die Änderung signifikant ist
    if (keyword.previousPosition && keyword.change && Math.abs(keyword.change) >= threshold) {
      alerts.push({
        keyword: keyword.keyword,
        language: keyword.language,
        oldPosition: keyword.previousPosition,
        newPosition: keyword.position,
        change: keyword.change,
        url: keyword.url,
      })
    }
  }

  return alerts
}

/**
 * Sendet E-Mail-Benachrichtigungen für wichtige Keyword-Änderungen
 */
export async function sendKeywordAlerts(emails: string[], threshold = 5): Promise<boolean> {
  try {
    const alerts = await checkForSignificantChanges(threshold)

    if (alerts.length === 0) {
      return true // Keine Benachrichtigungen erforderlich
    }

    // Gruppiere Alerts nach Sprache
    const alertsByLanguage: Record<Language, KeywordAlert[]> = {
      de: [],
      en: [],
      es: [],
      fr: [],
      zh: [],
    }

    alerts.forEach((alert) => {
      alertsByLanguage[alert.language].push(alert)
    })

    // Erstelle E-Mail-Inhalt
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4a5568; text-align: center;">Keyword-Ranking-Benachrichtigung</h1>
        <p>Es wurden signifikante Änderungen in Ihren Keyword-Rankings festgestellt:</p>
    `

    // Füge Tabellen für jede Sprache hinzu
    for (const [language, languageAlerts] of Object.entries(alertsByLanguage)) {
      if (languageAlerts.length === 0) continue

      const languageNames: Record<Language, string> = {
        de: "Deutsch",
        en: "Englisch",
        es: "Spanisch",
        fr: "Französisch",
        zh: "Chinesisch",
      }

      htmlContent += `
        <h2 style="margin-top: 20px;">${languageNames[language as Language]}</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #f7fafc;">
              <th style="padding: 8px; text-align: left; border: 1px solid #e2e8f0;">Keyword</th>
              <th style="padding: 8px; text-align: center; border: 1px solid #e2e8f0;">Alte Position</th>
              <th style="padding: 8px; text-align: center; border: 1px solid #e2e8f0;">Neue Position</th>
              <th style="padding: 8px; text-align: center; border: 1px solid #e2e8f0;">Änderung</th>
            </tr>
          </thead>
          <tbody>
      `

      languageAlerts.forEach((alert) => {
        const isPositive = alert.change > 0

        htmlContent += `
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">
              <a href="${alert.url}" style="color: #4299e1; text-decoration: none;">${alert.keyword}</a>
            </td>
            <td style="padding: 8px; text-align: center; border: 1px solid #e2e8f0;">${alert.oldPosition}</td>
            <td style="padding: 8px; text-align: center; border: 1px solid #e2e8f0;">${alert.newPosition}</td>
            <td style="padding: 8px; text-align: center; border: 1px solid #e2e8f0; color: ${isPositive ? "#48bb78" : "#f56565"};">
              ${isPositive ? "+" : ""}${alert.change}
            </td>
          </tr>
        `
      })

      htmlContent += `
          </tbody>
        </table>
      `
    }

    htmlContent += `
        <p style="margin-top: 20px;">
          <a href="https://www.rust-rocket.com/admin/dashboard/seo/keywords" style="color: #4299e1; text-decoration: none;">
            Zum Keyword-Dashboard
          </a>
        </p>
      </div>
    `

    // Sende die E-Mail
    await sendEmail({
      to: emails.join(", "),
      subject: `Keyword-Benachrichtigung: ${alerts.length} signifikante Änderungen`,
      html: htmlContent,
      text: `Es wurden ${alerts.length} signifikante Änderungen in Ihren Keyword-Rankings festgestellt. Bitte überprüfen Sie das Keyword-Dashboard für Details.`,
    })

    return true
  } catch (error) {
    console.error("Fehler beim Senden der Keyword-Benachrichtigungen:", error)
    return false
  }
}
