import type { ReactNode } from "react"
import { AdminSidebar } from "../components/admin-sidebar"
import { AdminHeader } from "../components/admin-header"
import { requireAuth } from "@/lib/auth"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // Stelle sicher, dass der Benutzer angemeldet ist
  const admin = await requireAuth()

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar admin={admin} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader admin={admin} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">{children}</main>
      </div>
    </div>
  )
}
