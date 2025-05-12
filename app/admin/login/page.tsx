"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "../actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(username, password)
      if (result.success) {
        router.push("/admin/dashboard")
      } else {
        setError(result.error || "Ungültige Anmeldedaten")
      }
    } catch (err) {
      setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription className="text-gray-400">
            Gib deine Anmeldedaten ein, um auf das Admin-Dashboard zuzugreifen
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Benutzername</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Benutzername eingeben"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort eingeben"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-neon hover:bg-neon/90 text-black" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird angemeldet...
                  </span>
                ) : (
                  "Anmelden"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400 text-center w-full">
            Rust Rocket Admin-Dashboard © {new Date().getFullYear()}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
