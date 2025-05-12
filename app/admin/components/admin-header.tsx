"use client"

import { useState } from "react"
import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminSidebar } from "./admin-sidebar"

type AdminUser = {
  id: string
  username: string
  email: string
  role: string
}

export function AdminHeader({ admin }: { admin: AdminUser }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="text-gray-400 hover:text-white"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menü öffnen</span>
        </Button>
      </div>
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Suchen..."
            className="pl-10 bg-gray-700 border-gray-600 text-white w-full"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          <span className="sr-only">Benachrichtigungen</span>
        </Button>
        <div className="hidden md:flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-neon flex items-center justify-center text-black font-bold">
            {admin.username.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <p className="font-medium">{admin.username}</p>
            <p className="text-xs text-gray-400">{admin.role}</p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 z-50">
            <AdminSidebar admin={admin} />
          </div>
        </div>
      )}
    </header>
  )
}
