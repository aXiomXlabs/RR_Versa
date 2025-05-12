import { requireAuth, getUserProfile, initUserSettings, createServerSupabaseClient } from "@/lib/supabase-server"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export const metadata = {
  title: "Dashboard | Rust Rocket",
  description: "Manage your trading bots and monitor performance",
}

export default async function DashboardPage() {
  // Authentifizierung überprüfen
  const user = await requireAuth()

  // Benutzerprofil abrufen
  const profile = await getUserProfile(user.id)

  // Benutzereinstellungen initialisieren, falls nicht vorhanden
  await initUserSettings(user.id)

  // Supabase-Client erstellen
  const supabase = createServerSupabaseClient()

  // Dashboard-Daten abrufen
  const { data: userSettings } = await supabase.from("user_settings").select("*").eq("id", user.id).single()

  const { data: activeBots } = await supabase
    .from("user_bots")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("updated_at", { ascending: false })

  const { data: recentTransactions } = await supabase
    .from("trading_transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("executed_at", { ascending: false })
    .limit(5)

  const { data: performanceMetrics } = await supabase
    .from("performance_metrics")
    .select("*")
    .eq("user_id", user.id)
    .order("period_end", { ascending: false })
    .limit(1)

  const { data: userAlerts } = await supabase
    .from("user_alerts")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  return (
    <DashboardLayout user={user} profile={profile} settings={userSettings}>
      <DashboardOverview
        activeBots={activeBots || []}
        recentTransactions={recentTransactions || []}
        performanceMetrics={performanceMetrics?.[0] || null}
        userAlerts={userAlerts || []}
        settings={userSettings}
      />
    </DashboardLayout>
  )
}
