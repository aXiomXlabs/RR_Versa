"use client"

import { useState } from "react"
import { createAdminAccount } from "../actions/create-admin-account"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CreateAdminAccountPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success?: boolean
    message?: string
    userId?: string
  } | null>(null)

  const handleCreateAdmin = async () => {
    setIsLoading(true)
    try {
      // Verwende die vorgegebenen Daten
      const email = "admin@admin.de"
      const username = "admin"
      const password = "passwort"

      const response = await createAdminAccount(email, username, password)
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        message: "Ein unerwarteter Fehler ist aufgetreten",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin-Account erstellen</CardTitle>
          <CardDescription className="text-gray-400">
            Erstellt einen Admin-Benutzer mit den vorgegebenen Zugangsdaten
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-700 p-3 rounded-md font-mono text-sm">
            <p>
              E-Mail: <span className="text-neon">admin@admin.de</span>
            </p>
            <p>
              Benutzername: <span className="text-neon">admin</span>
            </p>
            <p>
              Passwort: <span className="text-neon">passwort</span>
            </p>
          </div>

          {result && (
            <Alert
              variant={result.success ? "default" : "destructive"}
              className={`${
                result.success
                  ? "bg-green-900/20 border-green-900 text-green-300"
                  : "bg-red-900/20 border-red-900 text-red-300"
              }`}
            >
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{result.success ? "Erfolg" : "Fehler"}</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleCreateAdmin}
            className="w-full bg-neon hover:bg-neon/90 text-black"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird erstellt...
              </span>
            ) : (
              "Admin-Benutzer erstellen"
            )}
          </Button>

          {result?.success && (
            <div className="flex space-x-4 w-full">
              <Button asChild variant="outline" className="flex-1 border-gray-700 hover:bg-gray-700">
                <Link href="/admin/login">Admin Login</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 border-gray-700 hover:bg-gray-700">
                <Link href="/dashboard/login">Dashboard Login</Link>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
