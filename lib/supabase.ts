import { createClient } from "@supabase/supabase-js"

// Verwende die Umgebungsvariablen für die Supabase-Verbindung
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client für clientseitige Operationen (mit eingeschränkten Rechten)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client mit Service-Rolle für serverseitige Operationen (mit vollen Rechten)
export const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

// Exportiere eine Funktion, die den passenden Client zurückgibt
export function createServiceClient() {
  return serviceClient
}
