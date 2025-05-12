"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileSettings from "./profile-settings"
import AppearanceSettings from "./appearance-settings"
import NotificationSettings from "./notification-settings"
import WalletSettings from "./wallet-settings"
// import SecuritySettings from "./security-settings" // Auskommentiert, da Datei fehlt

type SettingsFormProps = {
  user: any
  profile: any
  settings: any
  wallets: any[]
}

export default function SettingsForm({ user, profile, settings, wallets }: SettingsFormProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const isDarkMode = settings?.theme === "dark"

  return (
    <div className={`rounded-lg overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className={`px-4 py-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <TabsList className={`grid grid-cols-5 gap-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <TabsTrigger
              value="profile"
              className={`data-[state=active]:${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
            >
              Profil
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className={`data-[state=active]:${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
            >
              Darstellung
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className={`data-[state=active]:${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
            >
              Benachrichtigungen
            </TabsTrigger>
            <TabsTrigger
              value="wallets"
              className={`data-[state=active]:${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
            >
              Wallets
            </TabsTrigger>
            {/* <TabsTrigger
              value="security"
              className={`data-[state=active]:${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
            >
              Sicherheit
            </TabsTrigger> */}
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="profile" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileSettings user={user} profile={profile} isDarkMode={isDarkMode} />
            </motion.div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AppearanceSettings settings={settings} isDarkMode={isDarkMode} />
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NotificationSettings settings={settings} isDarkMode={isDarkMode} />
            </motion.div>
          </TabsContent>

          <TabsContent value="wallets" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WalletSettings wallets={wallets} userId={user.id} isDarkMode={isDarkMode} />
            </motion.div>
          </TabsContent>

          {/* <TabsContent value="security" className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SecuritySettings user={user} isDarkMode={isDarkMode} />
            </motion.div>
          </TabsContent> */}
        </div>
      </Tabs>
    </div>
  )
}
