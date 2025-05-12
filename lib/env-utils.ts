/**
 * Umgebungsvariablen-Hilfsfunktionen
 */

import crypto from "crypto"

/**
 * Generiert ein sicheres CRON_SECRET, falls keines existiert
 * @returns Das vorhandene oder neu generierte CRON_SECRET
 */
export function getCronSecret(): string {
  // Wenn die Umgebungsvariable existiert, verwende sie
  if (process.env.CRON_SECRET) {
    return process.env.CRON_SECRET
  }

  // Ansonsten generiere ein neues Secret
  // Im Entwicklungsmodus speichern wir es in einer Konstante, damit es bei Neustarts erhalten bleibt
  if (process.env.NODE_ENV === "development") {
    // In Entwicklung verwenden wir ein konstantes Secret für einfachere Tests
    const devSecret = "dev_cron_secret_8e7d6c5b4a3f2e1d"
    // Setze die Umgebungsvariable für die aktuelle Laufzeit
    process.env.CRON_SECRET = devSecret
    console.log("Development CRON_SECRET wurde generiert")
    return devSecret
  } else {
    // In Produktion generieren wir ein zufälliges Secret
    const prodSecret = crypto.randomBytes(32).toString("hex")
    // Setze die Umgebungsvariable für die aktuelle Laufzeit
    process.env.CRON_SECRET = prodSecret
    console.log("Produktion CRON_SECRET wurde generiert")
    return prodSecret
  }
}

/**
 * Überprüft, ob ein gegebenes Secret mit dem CRON_SECRET übereinstimmt
 * @param secret Das zu überprüfende Secret
 * @returns true, wenn das Secret übereinstimmt, sonst false
 */
export function validateCronSecret(secret: string | null | undefined): boolean {
  const cronSecret = getCronSecret()
  return secret === cronSecret
}
