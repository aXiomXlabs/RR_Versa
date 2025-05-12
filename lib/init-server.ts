import { getCronSecret } from "./env-utils"

/**
 * Initialisiert Serverumgebungsvariablen
 * Diese Funktion wird beim Import ausgeführt
 */
function initializeServer() {
  // Stelle sicher, dass CRON_SECRET gesetzt ist
  const cronSecret = getCronSecret()
  console.log(`Server initialisiert. CRON_SECRET ist ${cronSecret.length} Zeichen lang.`)

  // Hier können weitere Initialisierungen hinzugefügt werden
}

// Führe die Initialisierung aus
initializeServer()
