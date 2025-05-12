"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BotIcon as Robot, BarChart3, RefreshCcw, Bell, Settings, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboardLanguage } from "@/contexts/dashboard-language-context"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  translationKey: string
}

export function DashboardNavigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useDashboardLanguage()

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      translationKey: "nav.dashboard",
    },
    {
      label: "Bots",
      href: "/dashboard/bots",
      icon: <Robot className="h-5 w-5" />,
      translationKey: "nav.bots",
    },
    {
      label: "Performance",
      href: "/dashboard/performance",
      icon: <BarChart3 className="h-5 w-5" />,
      translationKey: "nav.performance",
    },
    {
      label: "Transactions",
      href: "/dashboard/transactions",
      icon: <RefreshCcw className="h-5 w-5" />,
      translationKey: "nav.transactions",
    },
    {
      label: "Alerts",
      href: "/dashboard/alerts",
      icon: <Bell className="h-5 w-5" />,
      translationKey: "nav.alerts",
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      translationKey: "nav.settings",
    },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col h-full">
        <div className="space-y-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                pathname === item.href ? "bg-blue-800 text-white" : "text-gray-300 hover:bg-blue-700 hover:text-white",
              )}
            >
              {item.icon}
              <span className="ml-3">{t(item.translationKey)}</span>
            </Link>
          ))}
        </div>
        <div className="mt-auto pb-4">
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-blue-700 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">{t("nav.logout")}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden flex items-center p-4">
        <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-blue-900 bg-opacity-95">
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md w-full",
                  pathname === item.href
                    ? "bg-blue-800 text-white"
                    : "text-gray-300 hover:bg-blue-700 hover:text-white",
                )}
              >
                {item.icon}
                <span className="ml-3">{t(item.translationKey)}</span>
              </Link>
            ))}
            <form action="/api/auth/signout" method="post" className="w-full">
              <button
                type="submit"
                className="flex w-full items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-blue-700 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">{t("nav.logout")}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
