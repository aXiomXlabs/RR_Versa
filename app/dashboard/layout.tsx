import type React from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNavigation } from "@/components/dashboard/dashboard-navigation"
import { DashboardLanguageProvider } from "@/contexts/dashboard-language-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLanguageProvider>
      <div className="min-h-screen bg-gray-100">
        <DashboardHeader />
        <div className="flex h-[calc(100vh-64px)]">
          <aside className="w-64 bg-blue-900 text-white hidden md:block">
            <DashboardNavigation />
          </aside>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </DashboardLanguageProvider>
  )
}
