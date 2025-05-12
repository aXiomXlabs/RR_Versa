"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"

export default function ChatSettings() {
  const { language } = useLanguage()
  const [settings, setSettings] = useState({
    autoOpen: false,
    saveHistory: true,
    notifyNewMessages: true,
    responseLength: 50,
    theme: "auto",
  })

  const handleSwitchChange = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handleSliderChange = (value: number[]) => {
    setSettings((prev) => ({ ...prev, responseLength: value[0] }))
  }

  const handleSelectChange = (value: string) => {
    setSettings((prev) => ({ ...prev, theme: value }))
  }

  const saveSettings = () => {
    // In einer echten Anwendung würden die Einstellungen gespeichert werden
    localStorage.setItem("chatSettings", JSON.stringify(settings))
    alert("Einstellungen gespeichert!")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chat-Einstellungen</CardTitle>
        <CardDescription>Passen Sie Ihren Grok-Assistenten an Ihre Bedürfnisse an</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-open">Automatisch öffnen</Label>
            <p className="text-sm text-gray-500">Chat beim Laden der Seite automatisch öffnen</p>
          </div>
          <Switch id="auto-open" checked={settings.autoOpen} onCheckedChange={() => handleSwitchChange("autoOpen")} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="save-history">Chatverlauf speichern</Label>
            <p className="text-sm text-gray-500">Speichern Sie Ihre Unterhaltungen für spätere Besuche</p>
          </div>
          <Switch
            id="save-history"
            checked={settings.saveHistory}
            onCheckedChange={() => handleSwitchChange("saveHistory")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notify">Benachrichtigungen</Label>
            <p className="text-sm text-gray-500">Benachrichtigungen für neue Nachrichten erhalten</p>
          </div>
          <Switch
            id="notify"
            checked={settings.notifyNewMessages}
            onCheckedChange={() => handleSwitchChange("notifyNewMessages")}
          />
        </div>

        <div className="space-y-2">
          <Label>Antwortlänge</Label>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Kurz</span>
            <Slider
              value={[settings.responseLength]}
              min={0}
              max={100}
              step={10}
              onValueChange={handleSliderChange}
              className="flex-1"
            />
            <span className="text-sm text-gray-500">Ausführlich</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select value={settings.theme} onValueChange={handleSelectChange}>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Wählen Sie ein Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Hell</SelectItem>
              <SelectItem value="dark">Dunkel</SelectItem>
              <SelectItem value="auto">Automatisch (Systemeinstellung)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={saveSettings} className="w-full">
          Einstellungen speichern
        </Button>
      </CardContent>
    </Card>
  )
}
