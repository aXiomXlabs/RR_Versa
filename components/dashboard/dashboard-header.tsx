"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, User, ChevronDown } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "./language-switcher"
import { useDashboardLanguage } from "@/contexts/dashboard-language-context"

export function DashboardHeader() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { t } = useDashboardLanguage()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email)
      }
    }

    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/dashboard/login")
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
    if (isNotificationsOpen) setIsNotificationsOpen(false)
  }

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
    if (isUserMenuOpen) setIsUserMenuOpen(false)
  }

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="Rust Rocket Logo" width={40} height={40} className="w-10 h-10" />
          <span className="text-xl font-bold hidden sm:inline-block">Rust Rocket</span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <LanguageSwitcher />

          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full hover:bg-blue-800 focus:outline-none"
              aria-label={t("notifications.title")}
            >
              <Bell className="h-5 w-5" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-semibold">{t("notifications.title")}</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium">{t("notifications.empty")}</p>
                  </div>
                </div>
                <div className="px-4 py-2 text-center">
                  <Link href="/dashboard/alerts" className="text-xs text-blue-600 hover:text-blue-800">
                    {t("notifications.view_all")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-blue-800 focus:outline-none"
              aria-label="User menu"
            >
              <User className="h-5 w-5" />
              <span className="hidden md:inline-block text-sm">{userEmail || t("nav.dashboard")}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800">
                <Link href="/dashboard/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  {t("nav.settings")}
                </Link>
                <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  {t("nav.logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
