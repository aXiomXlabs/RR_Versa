"use client"

import type React from "react"

import { useState } from "react"
import { createClientSupabaseClient } from "@/lib/auth-utils"
import { Check, AlertCircle, Bell, Mail, MessageSquare } from "lucide-react"

type NotificationSettingsProps = {
  settings: any
  isDarkMode: boolean
}

export default function NotificationSettings({ settings, isDarkMode }: NotificationSettingsProps) {
  const [notificationPreferences, setNotificationPreferences] = useState(
    settings?.notification_preferences || {
      email: true,
      push: false,
      telegram: false,
    },
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClientSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Einstellungen aktualisieren
      const { error: updateError } = await supabase
        .from("user_settings")
        .update({
          notification_preferences: notificationPreferences,
        })
        .eq("id", settings.id)

      if (updateError) {
        throw updateError
      }

      setSuccess(true)

      // Erfolgsbenachrichtigung nach 3 Sekunden ausblenden
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten. Bitte versuche es erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  // Benachrichtigungstypen umschalten
  const toggleNotificationType = (type: string, category: string) => {
    setNotificationPreferences((prev: any) => {
      const newPreferences = { ...prev }

      if (!newPreferences[category]) {
        newPreferences[category] = {}
      }

      if (type === "all") {
        // Alle Typen in dieser Kategorie umschalten
        const allEnabled = Object.values(newPreferences[category]).every((val: any) => val === true)

        newPreferences[category] = {
          trade_executed: !allEnabled,
          price_alert: !allEnabled,
          bot_status: !allEnabled,
          security: !allEnabled,
        }
      } else {
        // Einzelnen Typ umschalten
        newPreferences[category][type] = !newPreferences[category][type]
      }

      return newPreferences
    })
  }

  // Benachrichtigungskanal umschalten
  const toggleNotificationChannel = (channel: string) => {
    setNotificationPreferences((prev: any) => ({
      ...prev,
      [channel]: !prev[channel],
    }))
  }

  // Prüfen, ob alle Typen in einer Kategorie aktiviert sind
  const areAllTypesEnabled = (category: string) => {
    if (!notificationPreferences[category]) return false

    return Object.values(notificationPreferences[category]).every((val: any) => val === true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Benachrichtigungen</h3>
        <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
          Verwalte, wie und wann du benachrichtigt werden möchtest
        </p>
      </div>

      {error && (
        <div
          className={`p-4 rounded-lg ${
            isDarkMode
              ? "bg-red-900/20 border border-red-900 text-red-400"
              : "bg-red-50 border border-red-200 text-red-600"
          }`}
        >
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div
          className={`p-4 rounded-lg ${
            isDarkMode
              ? "bg-green-900/20 border border-green-900 text-green-400"
              : "bg-green-50 border border-green-200 text-green-600"
          }`}
        >
          <div className="flex items-start">
            <Check className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>Deine Benachrichtigungseinstellungen wurden erfolgreich aktualisiert</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-4">Benachrichtigungskanäle</label>
          <div className="space-y-3">
            <div
              className={`p-4 rounded-lg border ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">E-Mail</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Erhalte Benachrichtigungen per E-Mail
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationPreferences.email}
                    onChange={() => toggleNotificationChannel("email")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      isDarkMode ? "bg-gray-700 peer-checked:bg-neon" : "bg-gray-300 peer-checked:bg-neon"
                    } peer-focus:outline-none peer-focus:ring-4 ${
                      isDarkMode ? "peer-focus:ring-neon/20" : "peer-focus:ring-neon/20"
                    } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                  ></div>
                </label>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg border ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Push-Benachrichtigungen</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Erhalte Benachrichtigungen im Browser
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationPreferences.push}
                    onChange={() => toggleNotificationChannel("push")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      isDarkMode ? "bg-gray-700 peer-checked:bg-neon" : "bg-gray-300 peer-checked:bg-neon"
                    } peer-focus:outline-none peer-focus:ring-4 ${
                      isDarkMode ? "peer-focus:ring-neon/20" : "peer-focus:ring-neon/20"
                    } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                  ></div>
                </label>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg border ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Telegram</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Erhalte Benachrichtigungen über Telegram
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationPreferences.telegram}
                    onChange={() => toggleNotificationChannel("telegram")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      isDarkMode ? "bg-gray-700 peer-checked:bg-neon" : "bg-gray-300 peer-checked:bg-neon"
                    } peer-focus:outline-none peer-focus:ring-4 ${
                      isDarkMode ? "peer-focus:ring-neon/20" : "peer-focus:ring-neon/20"
                    } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                  ></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-black bg-neon hover:bg-neon/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            } ${isDarkMode ? "focus:ring-offset-gray-900" : "focus:ring-offset-white"}`}
          >
            {isLoading ? "Wird gespeichert..." : "Speichern"}
          </button>
        </div>
      </form>
    </div>
  )
}
