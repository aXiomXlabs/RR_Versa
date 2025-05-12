import { requireAuth, getUserProfile } from "@/lib/auth-utils"
import { createServerSupabaseClient } from "@/lib/auth-utils"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import SettingsForm from "@/components/dashboard/settings/settings-form"

export default async function SettingsPage() {
  // Authentifizierung überprüfen
  const user = await requireAuth()

  // Benutzerprofil abrufen
  const profile = await getUserProfile(user.id)

  // Supabase-Client erstellen
  const supabase = createServerSupabaseClient()

  // Benutzereinstellungen abrufen
  const { data: userSettings } = await supabase.from("user_settings").select("*").eq("id", user.id).single()

  // Benutzer-Wallets abrufen
  const { data: userWallets } = await supabase
    .from("user_wallets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <DashboardLayout user={user} profile={profile} settings={userSettings}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Einstellungen</h1>
          <p className="text-gray-400">Verwalte dein Konto und deine Präferenzen</p>
        </div>

        <SettingsForm user={user} profile={profile} settings={userSettings} wallets={userWallets || []} />
      </div>
    </DashboardLayout>
  )
}
