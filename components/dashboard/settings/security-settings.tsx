"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Key, Eye, EyeOff, Lock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

type SecuritySettingsProps = {
  isDarkMode: boolean
  user: any
}

export default function SecuritySettings({ isDarkMode, user }: SecuritySettingsProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuliere API-Aufruf
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Passwort aktualisiert",
      description: "Dein Passwort wurde erfolgreich geändert.",
    })

    setIsLoading(false)
  }

  const handleTwoFactorToggle = async () => {
    setIsLoading(true)

    // Simuliere API-Aufruf
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setTwoFactorEnabled(!twoFactorEnabled)

    toast({
      title: twoFactorEnabled ? "Zwei-Faktor-Authentifizierung deaktiviert" : "Zwei-Faktor-Authentifizierung aktiviert",
      description: twoFactorEnabled
        ? "Die Zwei-Faktor-Authentifizierung wurde deaktiviert."
        : "Die Zwei-Faktor-Authentifizierung wurde aktiviert.",
    })

    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Sicherheitseinstellungen
        </h2>
        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
          Verwalte deine Passwörter und Sicherheitsoptionen
        </p>
      </div>

      {/* Passwort ändern */}
      <div className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Key className="mr-2 h-4 w-4" />
          Passwort ändern
        </h3>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <Label htmlFor="current-password">Aktuelles Passwort</Label>
            <div className="relative mt-1">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                className={`pr-10 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="new-password">Neues Passwort</Label>
            <div className="relative mt-1">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                className={`pr-10 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-xs mt-1 text-gray-500">
              Mindestens 8 Zeichen, mit Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen
            </p>
          </div>

          <div>
            <Label htmlFor="confirm-password">Passwort bestätigen</Label>
            <Input
              id="confirm-password"
              type="password"
              className={isDarkMode ? "bg-gray-700" : "bg-white"}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Wird aktualisiert..." : "Passwort aktualisieren"}
          </Button>
        </form>
      </div>

      {/* Zwei-Faktor-Authentifizierung */}
      <div className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            Zwei-Faktor-Authentifizierung
          </h3>
          <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} disabled={isLoading} />
        </div>

        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
          Erhöhe die Sicherheit deines Kontos durch einen zusätzlichen Verifizierungsschritt bei der Anmeldung.
        </p>

        {!twoFactorEnabled && (
          <div className={`p-3 rounded-md flex items-start ${isDarkMode ? "bg-yellow-900/20" : "bg-yellow-50"}`}>
            <AlertTriangle
              className={`h-5 w-5 mr-2 flex-shrink-0 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}
            />
            <p className={`text-sm ${isDarkMode ? "text-yellow-400" : "text-yellow-700"}`}>
              Wir empfehlen dringend, die Zwei-Faktor-Authentifizierung zu aktivieren, um dein Konto zu schützen.
            </p>
          </div>
        )}
      </div>

      {/* Sitzungseinstellungen */}
      <div className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
        <h3 className="text-lg font-medium mb-4">Sitzungseinstellungen</h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="session-timeout">Automatische Abmeldung nach Inaktivität (Minuten)</Label>
            <Input
              id="session-timeout"
              type="number"
              min="5"
              max="120"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(Number.parseInt(e.target.value))}
              className={`mt-1 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
            />
          </div>

          <Button
            onClick={() => {
              toast({
                title: "Einstellungen gespeichert",
                description: "Deine Sitzungseinstellungen wurden aktualisiert.",
              })
            }}
          >
            Einstellungen speichern
          </Button>
        </div>
      </div>

      {/* Aktive Sitzungen */}
      <div className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
        <h3 className="text-lg font-medium mb-4">Aktive Sitzungen</h3>

        <div className={`p-4 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Aktuelle Sitzung</p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Chrome auf Windows • Berlin, Deutschland
              </p>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? "bg-green-900/20 text-green-400" : "bg-green-100 text-green-600"}`}
            >
              Aktiv
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            toast({
              title: "Alle anderen Sitzungen beendet",
              description: "Alle anderen Geräte wurden abgemeldet.",
            })
          }}
        >
          Alle anderen Sitzungen beenden
        </Button>
      </div>
    </motion.div>
  )
}
