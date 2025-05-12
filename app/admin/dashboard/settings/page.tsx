import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Einstellungen</h1>
      <p className="text-gray-400">Verwalte die Einstellungen deiner Website</p>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="general" className="data-[state=active]:bg-gray-700">
            Allgemein
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-gray-700">
            E-Mail
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gray-700">
            Sicherheit
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-gray-700">
            Erweitert
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Allgemeine Einstellungen</CardTitle>
              <CardDescription className="text-gray-400">
                Verwalte die grundlegenden Einstellungen deiner Website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Website-Name</Label>
                <Input id="site-name" defaultValue="Rust Rocket" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Website-Beschreibung</Label>
                <Input
                  id="site-description"
                  defaultValue="Trading Bots für Krypto-Märkte"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Kontakt-E-Mail</Label>
                <Input
                  id="contact-email"
                  type="email"
                  defaultValue="contact@rust-rocket.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Wartungsmodus aktivieren</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-neon hover:bg-neon/90 text-black">Speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>E-Mail-Einstellungen</CardTitle>
              <CardDescription className="text-gray-400">Konfiguriere den E-Mail-Versand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP-Host</Label>
                <Input
                  id="smtp-host"
                  defaultValue="smtp.example.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP-Port</Label>
                <Input id="smtp-port" defaultValue="587" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-user">SMTP-Benutzername</Label>
                <Input
                  id="smtp-user"
                  defaultValue="user@example.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP-Passwort</Label>
                <Input
                  id="smtp-password"
                  type="password"
                  defaultValue="password"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-email">Absender-E-Mail</Label>
                <Input
                  id="from-email"
                  type="email"
                  defaultValue="noreply@rust-rocket.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-name">Absender-Name</Label>
                <Input id="from-name" defaultValue="Rust Rocket" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="email-test" />
                <Label htmlFor="email-test">Test-E-Mail senden</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-neon hover:bg-neon/90 text-black">Speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Sicherheitseinstellungen</CardTitle>
              <CardDescription className="text-gray-400">
                Verwalte die Sicherheitseinstellungen deiner Website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-password">Admin-Passwort ändern</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Neues Passwort"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password-confirm">Passwort bestätigen</Label>
                <Input
                  id="admin-password-confirm"
                  type="password"
                  placeholder="Passwort bestätigen"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Zwei-Faktor-Authentifizierung aktivieren</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="ip-restriction" />
                <Label htmlFor="ip-restriction">IP-Beschränkung aktivieren</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowed-ips">Erlaubte IP-Adressen (durch Komma getrennt)</Label>
                <Input
                  id="allowed-ips"
                  placeholder="z.B. 192.168.1.1, 10.0.0.1"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-neon hover:bg-neon/90 text-black">Speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Erweiterte Einstellungen</CardTitle>
              <CardDescription className="text-gray-400">
                Verwalte erweiterte Einstellungen deiner Website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-analytics">Google Analytics ID</Label>
                <Input
                  id="google-analytics"
                  placeholder="z.B. UA-XXXXXXXXX-X"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-css">Benutzerdefiniertes CSS</Label>
                <textarea
                  id="custom-css"
                  rows={5}
                  placeholder="/* Benutzerdefiniertes CSS */"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white"
                ></textarea>
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-js">Benutzerdefiniertes JavaScript</Label>
                <textarea
                  id="custom-js"
                  rows={5}
                  placeholder="// Benutzerdefiniertes JavaScript"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white"
                ></textarea>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="cache" />
                <Label htmlFor="cache">Caching aktivieren</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="minify" />
                <Label htmlFor="minify">CSS und JavaScript minimieren</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-neon hover:bg-neon/90 text-black">Speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
