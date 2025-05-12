"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { createClientSupabaseClient } from "@/lib/auth-utils"
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Check } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const supabase = createClientSupabaseClient()

  // Passwort-Stärke überprüfen
  const passwordStrength = (): { score: number; message: string } => {
    if (!password) return { score: 0, message: "Kein Passwort eingegeben" }

    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    const messages = ["Sehr schwach", "Schwach", "Mittel", "Stark", "Sehr stark"]

    return { score, message: messages[score - 1] || "Ungültig" }
  }

  const strength = passwordStrength()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Passwörter überprüfen
    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein")
      setIsLoading(false)
      return
    }

    // Passwort-Stärke überprüfen
    if (strength.score < 3) {
      setError(
        "Das Passwort ist zu schwach. Verwende mindestens 8 Zeichen, Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen.",
      )
      setIsLoading(false)
      return
    }

    try {
      // Benutzer registrieren
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else {
        // Benutzerprofil erstellen
        if (data.user) {
          await supabase.from("user_profiles").insert({
            id: data.user.id,
            name,
            email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          // Benutzereinstellungen initialisieren
          await supabase.from("user_settings").insert({
            id: data.user.id,
            theme: "dark",
            language: "de",
            notification_preferences: { email: true, push: false, telegram: false },
            dashboard_layout: { widgets: ["performance", "active_bots", "transactions", "alerts"] },
          })
        }

        setSuccess(true)

        // Nach erfolgreicher Registrierung zur Login-Seite weiterleiten
        setTimeout(() => {
          router.push("/dashboard/login")
        }, 3000)
      }
    } catch (err) {
      setError("Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src="/images/logo-full.png"
                alt="Rust Rocket"
                width={200}
                height={60}
                className="mx-auto h-16 w-auto"
              />
            </Link>
            <h1 className="mt-6 text-3xl font-bold">Registrieren</h1>
            <p className="mt-2 text-gray-400">Erstelle ein Konto, um das Rust Rocket Trading-Dashboard zu nutzen</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-900 text-red-400"
            >
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-green-900/20 border border-green-900 text-green-400"
            >
              <div className="flex items-start">
                <Check className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Registrierung erfolgreich!</p>
                  <p className="text-sm mt-1">Du wirst zur Login-Seite weitergeleitet...</p>
                </div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
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
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 focus:ring-neon focus:border-neon transition-colors"
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
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 focus:ring-neon focus:border-neon transition-colors"
                  placeholder="deine@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Passwort
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-lg bg-gray-800 focus:ring-neon focus:border-neon transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>

              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Passwort-Stärke: {strength.message}</span>
                    <span className="text-xs text-gray-400">{strength.score}/5</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        strength.score <= 1
                          ? "bg-red-500"
                          : strength.score === 2
                            ? "bg-yellow-500"
                            : strength.score === 3
                              ? "bg-yellow-400"
                              : strength.score === 4
                                ? "bg-green-400"
                                : "bg-green-500"
                      }`}
                      style={{ width: `${(strength.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                Passwort bestätigen
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 focus:ring-neon focus:border-neon transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="mt-2 text-xs text-red-400">Die Passwörter stimmen nicht überein</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-neon focus:ring-neon"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                Ich stimme den{" "}
                <Link href="/terms" className="text-neon hover:text-neon/90">
                  Nutzungsbedingungen
                </Link>{" "}
                und der{" "}
                <Link href="/privacy" className="text-neon hover:text-neon/90">
                  Datenschutzerklärung
                </Link>{" "}
                zu
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || success}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-neon hover:bg-neon/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon focus:ring-offset-gray-900 transition-colors ${
                  isLoading || success ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Wird registriert..." : success ? "Registriert!" : "Registrieren"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Bereits registriert?{" "}
              <Link href="/dashboard/login" className="text-neon hover:text-neon/90 font-medium">
                Jetzt anmelden
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Rust Rocket. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  )
}
