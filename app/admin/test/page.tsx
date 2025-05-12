"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { testDatabaseConnection, testEmailSending } from "../actions/test-actions"

export default function TestPage() {
  const [dbResult, setDbResult] = useState<{ success: boolean; message: string } | null>(null)
  const [emailResult, setEmailResult] = useState<{ success: boolean; message: string } | null>(null)
  const [email, setEmail] = useState("")
  const [isTestingDb, setIsTestingDb] = useState(false)
  const [isTestingEmail, setIsTestingEmail] = useState(false)

  const handleTestDatabase = async () => {
    setIsTestingDb(true)
    try {
      const result = await testDatabaseConnection()
      setDbResult(result)
    } catch (error) {
      setDbResult({
        success: false,
        message: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
      })
    } finally {
      setIsTestingDb(false)
    }
  }

  const handleTestEmail = async () => {
    if (!email) {
      setEmailResult({
        success: false,
        message: "Bitte gib eine E-Mail-Adresse ein",
      })
      return
    }

    setIsTestingEmail(true)
    try {
      const result = await testEmailSending(email)
      setEmailResult(result)
    } catch (error) {
      setEmailResult({
        success: false,
        message: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
      })
    } finally {
      setIsTestingEmail(false)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Systemtest</h1>
      <p className="text-gray-500">Teste die Datenbankverbindung und E-Mail-Funktionalität</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Datenbankverbindung testen</CardTitle>
            <CardDescription>Überprüft die Verbindung zur Supabase-Datenbank</CardDescription>
          </CardHeader>
          <CardContent>
            {dbResult && (
              <div
                className={`p-4 mb-4 rounded-md ${
                  dbResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {dbResult.message}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleTestDatabase} disabled={isTestingDb}>
              {isTestingDb ? "Teste..." : "Datenbankverbindung testen"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>E-Mail-Versand testen</CardTitle>
            <CardDescription>Sendet eine Test-E-Mail an die angegebene Adresse</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail-Adresse</Label>
              <Input
                id="email"
                type="email"
                placeholder="deine@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {emailResult && (
              <div
                className={`p-4 rounded-md ${
                  emailResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {emailResult.message}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleTestEmail} disabled={isTestingEmail}>
              {isTestingEmail ? "Sende..." : "Test-E-Mail senden"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
