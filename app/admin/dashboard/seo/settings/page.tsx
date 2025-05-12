"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function SeoSettingsPage() {
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    recipients: "seo@rust-rocket.com, admin@rust-rocket.com",
    threshold: "5",
    frequency: "daily",
  })

  const [trackingSettings, setTrackingSettings] = useState({
    enabled: true,
    updateFrequency: "daily",
    maxKeywordsPerLanguage: "100",
    trackCompetitors: true,
  })

  const [apiSettings, setApiSettings] = useState({
    provider: "semrush",
    apiKey: "••••••••••••••••",
    projectId: "rust-rocket-seo",
  })

  const handleEmailSettingsChange = (field: string, value: string | boolean) => {
    setEmailSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleTrackingSettingsChange = (field: string, value: string | boolean) => {
    setTrackingSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleApiSettingsChange = (field: string, value: string) => {
    setApiSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    // Hier würden die Einstellungen gespeichert werden
    toast({
      title: "Einstellungen gespeichert",
      description: "Die SEO-Einstellungen wurden erfolgreich aktualisiert.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">SEO-Einstellungen</h1>
        <p className="text-muted-foreground">
          Konfigurieren Sie die Einstellungen für das Keyword-Monitoring und die SEO-Benachrichtigungen.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Allgemein</TabsTrigger>
          <TabsTrigger value="email">E-Mail-Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="api">API-Konfiguration</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tracking-Einstellungen</CardTitle>
              <CardDescription>Konfigurieren Sie, wie Keywords verfolgt werden sollen.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="tracking-enabled">Keyword-Tracking aktivieren</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktiviert die automatische Verfolgung von Keyword-Rankings.
                  </p>
                </div>
                <Switch
                  id="tracking-enabled"
                  checked={trackingSettings.enabled}
                  onCheckedChange={(value) => handleTrackingSettingsChange("enabled", value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="update-frequency">Aktualisierungshäufigkeit</Label>
                <Select
                  value={trackingSettings.updateFrequency}
                  onValueChange={(value) => handleTrackingSettingsChange("updateFrequency", value)}
                >
                  <SelectTrigger id="update-frequency">
                    <SelectValue placeholder="Wählen Sie eine Häufigkeit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Täglich</SelectItem>
                    <SelectItem value="weekly">Wöchentlich</SelectItem>
                    <SelectItem value="monthly">Monatlich</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="max-keywords">Maximale Keywords pro Sprache</Label>
                <Input
                  id="max-keywords"
                  type="number"
                  value={trackingSettings.maxKeywordsPerLanguage}
                  onChange={(e) => handleTrackingSettingsChange("maxKeywordsPerLanguage", e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="track-competitors">Wettbewerber verfolgen</Label>
                  <p className="text-sm text-muted-foreground">
                    Verfolgt auch die Rankings von Wettbewerbern für Vergleichszwecke.
                  </p>
                </div>
                <Switch
                  id="track-competitors"
                  checked={trackingSettings.trackCompetitors}
                  onCheckedChange={(value) => handleTrackingSettingsChange("trackCompetitors", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>E-Mail-Benachrichtigungen</CardTitle>
              <CardDescription>
                Konfigurieren Sie, wann und an wen E-Mail-Benachrichtigungen gesendet werden sollen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-enabled">E-Mail-Benachrichtigungen aktivieren</Label>
                  <p className="text-sm text-muted-foreground">
                    Sendet automatische Benachrichtigungen bei signifikanten Änderungen.
                  </p>
                </div>
                <Switch
                  id="email-enabled"
                  checked={emailSettings.enabled}
                  onCheckedChange={(value) => handleEmailSettingsChange("enabled", value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email-recipients">Empfänger</Label>
                <Textarea
                  id="email-recipients"
                  placeholder="E-Mail-Adressen (durch Kommas getrennt)"
                  value={emailSettings.recipients}
                  onChange={(e) => handleEmailSettingsChange("recipients", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="threshold">Schwellenwert für Benachrichtigungen</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={emailSettings.threshold}
                  onChange={(e) => handleEmailSettingsChange("threshold", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Minimale Positionsänderung, die eine Benachrichtigung auslöst.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email-frequency">Benachrichtigungshäufigkeit</Label>
                <Select
                  value={emailSettings.frequency}
                  onValueChange={(value) => handleEmailSettingsChange("frequency", value)}
                >
                  <SelectTrigger id="email-frequency">
                    <SelectValue placeholder="Wählen Sie eine Häufigkeit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Echtzeit</SelectItem>
                    <SelectItem value="daily">Täglich</SelectItem>
                    <SelectItem value="weekly">Wöchentlich</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API-Konfiguration</CardTitle>
              <CardDescription>Konfigurieren Sie die Verbindung zu externen SEO-Tools.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="api-provider">SEO-Tool-Anbieter</Label>
                <Select
                  value={apiSettings.provider}
                  onValueChange={(value) => handleApiSettingsChange("provider", value)}
                >
                  <SelectTrigger id="api-provider">
                    <SelectValue placeholder="Wählen Sie einen Anbieter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semrush">SEMrush</SelectItem>
                    <SelectItem value="ahrefs">Ahrefs</SelectItem>
                    <SelectItem value="moz">Moz</SelectItem>
                    <SelectItem value="sistrix">SISTRIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="api-key">API-Schlüssel</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={apiSettings.apiKey}
                  onChange={(e) => handleApiSettingsChange("apiKey", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="project-id">Projekt-ID</Label>
                <Input
                  id="project-id"
                  value={apiSettings.projectId}
                  onChange={(e) => handleApiSettingsChange("projectId", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Einstellungen speichern</Button>
      </div>
    </div>
  )
}
