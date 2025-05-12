import { createClient } from "@supabase/supabase-js"

// Erstelle einen Supabase-Client für die Clientseite
export const createClientSupabaseClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
} 