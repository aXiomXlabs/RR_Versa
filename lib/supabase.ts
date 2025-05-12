import { createClient } from "@supabase/supabase-js"
import type { CookieOptions } from "@supabase/auth-helpers-nextjs"

// Use environment variables for Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for client-side operations (with limited rights)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client with service role for server-side operations (with full rights)
export const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

// Export a function that returns the appropriate client
export function createServiceClient() {
  return serviceClient
}

// Function to create a server client for Server Components
export async function createServerClient() {
  // Dynamic import to avoid "next/headers" being imported at module level
  const { cookies } = await import("next/headers")
  const cookieStore = cookies()

  return createClient(supabaseUrl, supabaseServiceKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}
