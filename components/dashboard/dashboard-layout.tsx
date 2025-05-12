"use client"

import { useState, type ReactNode, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BotIcon as Robot,
  BarChart2,
  Wallet,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Moon,
  Sun,
  ChevronLeft,
} from "lucide-react"
import { createClientSupabaseClient } from "@/lib/auth-utils"

type DashboardLayoutProps = {
  children: ReactNode
  user: any
  profile: any
  settings: any
}

export default function DashboardLayout({ children, user, profile, settings }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(settings?.theme === "dark")
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  const supabase = createClientSupabaseClient()

  useEffect(() => {
    // Überprüfen Sie die Bildschirmgröße
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial überprüfen
    checkScreenSize()

    // Event-Listener für Größenänderungen hinzufügen
    window.addEventListener("resize", checkScreenSize)

    // Event-Listener entfernen, wenn die Komponente nicht mehr gerendert wird
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Sidebar automatisch schließen, wenn ein Benutzer auf einem mobilen Gerät zu einer neuen Seite navigiert
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false)
    }
  }, [pathname, isMobile])

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Meine Bots", href: "/dashboard/bots", icon: <Robot className="w-5 h-5" /> },
    { name: "Performance", href: "/dashboard/performance", icon: <BarChart2 className="w-5 h-5" /> },
    { name: "Wallets", href: "/dashboard/wallets", icon: <Wallet className="w-5 h-5" /> },
    { name: "Alerts", href: "/dashboard/alerts", icon: <Bell className="w-5 h-5" /> },
    { name: "Einstellungen", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setIsDarkMode(!isDarkMode)

    // Aktualisiere Benutzereinstellungen in der Datenbank
    await supabase.from("user_settings").update({ theme: newTheme }).eq("id", user.id)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Mobile Header - Verbesserte mobile Darstellung */}
      <header
        className={`md:hidden flex items-center justify-between p-4 ${isDarkMode ? "bg-gray-800" : "bg-white"} border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} sticky top-0 z-50`}
      >
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full transition-colors duration-200 mr-2"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/dashboard" className="flex items-center">
            <Image src="/images/logo-full.png" alt="Rust Rocket" width={120} height={40} className="h-8 w-auto" />
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link
            href="/dashboard/settings"
            className={`p-2 rounded-full transition-colors duration-200 ${pathname.includes("/dashboard/settings") ? (isDarkMode ? "bg-gray-700" : "bg-gray-200") : ""}`}
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Sidebar - Verbesserte mobile Darstellung */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 ${isDarkMode ? "bg-gray-800" : "bg-white"} border-r ${isDarkMode ? "border-gray-700" : "border-gray-200"} transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 overflow-y-auto`}
        style={{ height: isMobile ? "100%" : "calc(100% - 0px)", top: isMobile ? "0" : "0" }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile-Nur-Schließen-Button */}
          {isMobile && (
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <Link href="/dashboard" className="flex items-center">
                <Image src="/images/logo-full.png" alt="Rust Rocket" width={150} height={50} className="h-10 w-auto" />
              </Link>
              <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-700" aria-label="Close menu">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Desktop Logo */}
          {!isMobile && (
            <div className="p-4 border-b border-gray-700">
              <Link href="/dashboard" className="flex items-center">
                <Image src="/images/logo-full.png" alt="Rust Rocket" width={150} height={50} className="h-10 w-auto" />
              </Link>
            </div>
          )}

          {/* Navigation - Verbesserte Touchziele */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-900"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile - Verbesserte mobile Darstellung */}
          <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
              >
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url || "/placeholder.svg"}
                    alt={profile.name || user.email}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{profile?.name || user.email}</p>
                <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{user.email}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={toggleTheme}
                className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm ${
                  isDarkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="sr-only md:not-sr-only">{isDarkMode ? "Hell" : "Dunkel"}</span>
              </button>

              <button
                onClick={handleLogout}
                className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm ${
                  isDarkMode
                    ? "bg-red-900/20 text-red-400 hover:bg-red-900/30"
                    : "bg-red-100 text-red-600 hover:bg-red-200"
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span className="sr-only md:not-sr-only">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Verbesserte mobile Abstände */}
      <main
        className={`md:ml-72 min-h-screen ${isSidebarOpen && isMobile ? "opacity-50" : ""} transition-opacity duration-300`}
      >
        {/* Content Spacing angepasst für Mobile */}
        <div className="p-3 md:p-6 lg:p-8 pt-3 md:pt-6 lg:pt-8">{children}</div>
      </main>

      {/* Mobile Sidebar Backdrop mit Verbesserter Touch-Interaktion */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}
    </div>
  )
}
