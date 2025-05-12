"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Mail, MessageSquare, BarChart2, Settings, LogOut, UserCog, Search } from "lucide-react"
import { logout } from "../actions/auth-actions"

type AdminUser = {
  id: string
  username: string
  email: string
  role: string
}

export function AdminSidebar({ admin }: { admin: AdminUser }) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Rust Rocket</h1>
        <p className="text-sm text-gray-400">Admin Dashboard</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          href="/admin/dashboard"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive("/admin/dashboard") &&
              !isActive("/admin/dashboard/waitlist") &&
              !isActive("/admin/dashboard/newsletter") &&
              !isActive("/admin/dashboard/contacts") &&
              !isActive("/admin/dashboard/stats") &&
              !isActive("/admin/dashboard/settings") &&
              !isActive("/admin/dashboard/admins") &&
              !isActive("/admin/dashboard/seo")
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700",
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/dashboard/waitlist"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive("/admin/dashboard/waitlist")
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700",
          )}
        >
          <Users className="h-5 w-5" />
          <span>Warteliste</span>
        </Link>
        <Link
          href="/admin/dashboard/newsletter"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive("/admin/dashboard/newsletter")
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700",
          )}
        >
          <Mail className="h-5 w-5" />
          <span>Newsletter</span>
        </Link>
        <Link
          href="/admin/dashboard/contacts"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive("/admin/dashboard/contacts")
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700",
          )}
        >
          <MessageSquare className="h-5 w-5" />
          <span>Kontaktanfragen</span>
        </Link>
        <Link
          href="/admin/dashboard/stats"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive("/admin/dashboard/stats")
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700",
          )}
        >
          <BarChart2 className="h-5 w-5" />
          <span>Statistiken</span>
        </Link>

        {admin.role === "admin" && (
          <Link
            href="/admin/dashboard/admins"
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive("/admin/dashboard/admins")
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700",
            )}
          >
            <UserCog className="h-5 w-5" />
            <span>Admin-Benutzer</span>
          </Link>
        )}

        <Link
          href="/admin/dashboard/seo/keywords"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive("/admin/dashboard/seo/keywords")
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700",
          )}
        >
          <Search className="h-5 w-5" />
          <span>Keyword-Monitoring</span>
        </Link>

        <Link
          href="/admin/dashboard/seo/settings"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive("/admin/dashboard/seo/settings")
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700",
          )}
        >
          <Settings className="h-5 w-5" />
          <span>SEO-Einstellungen</span>
        </Link>

        <Link
          href="/admin/dashboard/settings"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive("/admin/dashboard/settings")
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700",
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Einstellungen</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 w-full rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Abmelden</span>
        </button>
      </div>
    </div>
  )
}
