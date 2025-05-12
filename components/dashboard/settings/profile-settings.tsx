"use client"

import type React from "react"

import { useState } from "react"
import { createClientSupabaseClient } from "@/lib/auth-utils"
import { User, Mail, AtSign, AlertCircle, Check } from "lucide-react"

type ProfileSettingsProps = {
  user: any
  profile: any
  isDarkMode: boolean
}

export default function ProfileSettings({ user, profile, isDarkMode }: ProfileSettingsProps) {
  const [name, setName] = useState(profile?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [telegramHandle, setTelegramHandle] = useState(profile?.telegram_handle || "")
  const [bio, setBio] = useState(profile?.bio || "")

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
      // Profil aktualisieren
      const { error: profileError } = await supabase
        .from("user_profiles")
        .update({
          name,
          telegram_handle: telegramHandle,
          bio,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (profileError) {
        throw profileError
      }

      // E-Mail aktualisieren, falls geändert
      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email,
        })

        if (emailError) {
          throw emailError
        }
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profilinformationen</h3>
        <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Aktualisiere deine persönlichen Informationen</p>
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
            <p>Dein Profil wurde erfolgreich aktualisiert</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-neon focus:border-neon transition-colors ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
              }`}
              placeholder="Dein Name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            E-Mail-Adresse
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-neon focus:border-neon transition-colors ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
              }`}
              placeholder="deine@email.com"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Bei Änderung der E-Mail-Adresse erhältst du eine Bestätigungs-E-Mail
          </p>
        </div>

        <div>
          <label htmlFor="telegram" className="block text-sm font-medium mb-2">
            Telegram-Handle
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AtSign className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="telegram"
              name="telegram"
              type="text"
              value={telegramHandle}
              onChange={(e) => setTelegramHandle(e.target.value)}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-neon focus:border-neon transition-colors ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
              }`}
              placeholder="@dein_telegram_handle"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Für Benachrichtigungen und Support über Telegram</p>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            Über mich
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`block w-full p-3 border rounded-lg focus:ring-neon focus:border-neon transition-colors ${
              isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
            }`}
            placeholder="Erzähle etwas über dich und deine Trading-Erfahrung..."
          />
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
