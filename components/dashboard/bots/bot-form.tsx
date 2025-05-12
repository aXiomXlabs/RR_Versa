"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, ArrowLeft, HelpCircle, Info, Save } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BotFormProps {
  initialData?: any
  isEditing?: boolean
}

export function BotForm({ initialData, isEditing = false }: BotFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [botType, setBotType] = useState(initialData?.bot_type || "grid")
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Überprüfen Sie die Bildschirmgröße
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial überprüfen
    checkScreenSize()

    // Event-Listener für Größenänderungen hinzufügen
    window.addEventListener("resize", checkScreenSize)

    // Event-Listener entfernen, wenn die Komponente nicht mehr gerendert wird
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuliere API-Aufruf
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    router.push("/dashboard/bots")
  }

  return (
    <form onSubmit={handleSave}>
      <div className="flex flex-col space-y-4">
        {/* Mobile-optimierter Header */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Zurück</span>
          </Button>

          <h1 className="text-xl md:text-2xl font-bold">{isEditing ? "Bot bearbeiten" : "Neuen Bot erstellen"}</h1>

          <Button type="submit" size="sm" disabled={isLoading} className="md:hidden">
            {isLoading ? "Speichern..." : "Speichern"}
          </Button>
        </div>

        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile-optimierte Tab-Leiste */}
          <TabsList className="grid w-full grid-cols-4 h-12 mb-4">
            <TabsTrigger value="basic" className={`${isMobile ? "text-xs px-1" : ""}`}>
              {isMobile ? (
                <div className="flex flex-col items-center">
                  <span>Basis</span>
                </div>
              ) : (
                "Basiseinstellungen"
              )}
            </TabsTrigger>
            <TabsTrigger value="strategy" className={`${isMobile ? "text-xs px-1" : ""}`}>
              {isMobile ? (
                <div className="flex flex-col items-center">
                  <span>Strategie</span>
                </div>
              ) : (
                "Strategie"
              )}
            </TabsTrigger>
            <TabsTrigger value="limits" className={`${isMobile ? "text-xs px-1" : ""}`}>
              {isMobile ? (
                <div className="flex flex-col items-center">
                  <span>Limits</span>
                </div>
              ) : (
                "Handelslimits"
              )}
            </TabsTrigger>
            <TabsTrigger value="advanced" className={`${isMobile ? "text-xs px-1" : ""}`}>
              {isMobile ? (
                <div className="flex flex-col items-center">
                  <span>Erweitert</span>
                </div>
              ) : (
                "Erweitert"
              )}
            </TabsTrigger>
          </TabsList>

          {/* Tab-Inhalte */}
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basiseinstellungen</CardTitle>
                <CardDescription>Konfigurieren Sie die grundlegenden Eigenschaften Ihres Trading-Bots</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">Bot-Name</Label>
                    <Input
                      id="bot-name"
                      placeholder="Geben Sie Ihrem Bot einen Namen"
                      defaultValue={initialData?.name || ""}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bot-type">Bot-Typ</Label>
                    <Select defaultValue={botType} onValueChange={setBotType}>
                      <SelectTrigger id="bot-type">
                        <SelectValue placeholder="Wählen Sie einen Bot-Typ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid Trading</SelectItem>
                        <SelectItem value="dca">Dollar-Cost-Averaging</SelectItem>
                        <SelectItem value="scalping">Scalping</SelectItem>
                        <SelectItem value="arbitrage">Arbitrage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    placeholder="Beschreiben Sie Ihren Bot (optional)"
                    rows={3}
                    defaultValue={initialData?.description || ""}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="base-token">Basis-Token</Label>
                    <Select defaultValue={initialData?.base_token || "btc"}>
                      <SelectTrigger id="base-token">
                        <SelectValue placeholder="Wählen Sie einen Basis-Token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="sol">Solana (SOL)</SelectItem>
                        <SelectItem value="bnb">Binance Coin (BNB)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quote-token">Quote-Token</Label>
                    <Select defaultValue={initialData?.quote_token || "usdt"}>
                      <SelectTrigger id="quote-token">
                        <SelectValue placeholder="Wählen Sie einen Quote-Token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                        <SelectItem value="busd">Binance USD (BUSD)</SelectItem>
                        <SelectItem value="dai">Dai (DAI)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-start">Automatisch starten</Label>
                    <Switch id="auto-start" defaultChecked={initialData?.auto_start || false} />
                  </div>
                  <p className="text-xs text-muted-foreground">Bot nach dem Speichern sofort aktivieren</p>
                </div>
              </CardContent>
            </Card>

            {/* Mobile-optimierte Navigation */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.back()} className="hidden md:flex">
                Abbrechen
              </Button>

              <Button type="button" onClick={() => setActiveTab("strategy")} className="ml-auto">
                Weiter zu Strategie
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strategie-Einstellungen</CardTitle>
                <CardDescription>Passen Sie die Trading-Strategie Ihres Bots an</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {botType === "grid" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="grid-levels">Grid-Levels</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <HelpCircle className="h-4 w-4" />
                                <span className="sr-only">Info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Anzahl der Preisstufen im Grid. Mehr Stufen = feinere Preisraster.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="pt-2">
                        <Slider
                          defaultValue={[initialData?.grid_levels || 5]}
                          min={3}
                          max={15}
                          step={1}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>3</span>
                          <span>9</span>
                          <span>15</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price-range">Preisbereich (%)</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="number"
                          id="lower-price"
                          placeholder="Unterer Wert"
                          defaultValue={initialData?.lower_price || 5}
                        />
                        <Input
                          type="number"
                          id="upper-price"
                          placeholder="Oberer Wert"
                          defaultValue={initialData?.upper_price || 5}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Abweichung vom aktuellen Preis in Prozent</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rebalance">Auto-Rebalance</Label>
                        <Switch id="rebalance" defaultChecked={initialData?.rebalance || true} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Automatisches Neuausgleichen des Grids, wenn der Preis aus dem definierten Bereich tritt
                      </p>
                    </div>
                  </div>
                )}

                {botType === "dca" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="interval">Kaufintervall</Label>
                      <Select defaultValue={initialData?.interval || "daily"}>
                        <SelectTrigger id="interval">
                          <SelectValue placeholder="Wählen Sie ein Intervall" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Stündlich</SelectItem>
                          <SelectItem value="daily">Täglich</SelectItem>
                          <SelectItem value="weekly">Wöchentlich</SelectItem>
                          <SelectItem value="monthly">Monatlich</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount-per-buy">Betrag pro Kauf (USD)</Label>
                      <Input
                        type="number"
                        id="amount-per-buy"
                        placeholder="Betrag eingeben"
                        defaultValue={initialData?.amount_per_buy || 50}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="market-condition">Nur bei fallenden Preisen kaufen</Label>
                        <Switch id="market-condition" defaultChecked={initialData?.market_condition || false} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nur kaufen, wenn der Preis seit dem letzten Kauf gefallen ist
                      </p>
                    </div>
                  </div>
                )}

                {/* Weitere Bot-Typen hier... */}
              </CardContent>
            </Card>

            {/* Mobile-optimierte Navigation */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                Zurück
              </Button>

              <Button type="button" onClick={() => setActiveTab("limits")}>
                Weiter zu Limits
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="limits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Handelslimits</CardTitle>
                <CardDescription>Legen Sie Limits für den Bot fest, um Ihr Risiko zu kontrollieren</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="max-investment">Maximale Investition (USD)</Label>
                  <Input
                    type="number"
                    id="max-investment"
                    placeholder="Maximaler Betrag"
                    defaultValue={initialData?.max_investment || 1000}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stop-loss">Stop-Loss (%)</Label>
                  <Input
                    type="number"
                    id="stop-loss"
                    placeholder="Stop-Loss Prozentsatz"
                    defaultValue={initialData?.stop_loss || 5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Verlustprozentsatz, bei dem der Bot automatisch verkauft
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="take-profit">Take-Profit (%)</Label>
                  <Input
                    type="number"
                    id="take-profit"
                    placeholder="Take-Profit Prozentsatz"
                    defaultValue={initialData?.take_profit || 10}
                  />
                  <p className="text-xs text-muted-foreground">
                    Gewinnprozentsatz, bei dem der Bot automatisch verkauft
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="use-trailing-stop">Trailing Stop-Loss verwenden</Label>
                    <Switch id="use-trailing-stop" defaultChecked={initialData?.use_trailing_stop || false} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatisches Nachziehen des Stop-Loss bei steigenden Preisen
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Bei Fehler</Label>
                  <RadioGroup defaultValue={initialData?.on_error || "pause"}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pause" id="error-pause" />
                      <Label htmlFor="error-pause">Bot pausieren</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="continue" id="error-continue" />
                      <Label htmlFor="error-continue">Weitermachen und benachrichtigen</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="stop" id="error-stop" />
                      <Label htmlFor="error-stop">Bot stoppen</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Mobile-optimierte Navigation */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setActiveTab("strategy")}>
                Zurück
              </Button>

              <Button type="button" onClick={() => setActiveTab("advanced")}>
                Weiter zu Erweitert
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Erweiterte Einstellungen</CardTitle>
                <CardDescription>Detaileinstellungen für fortgeschrittene Nutzer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="use-leverage">Hebelwirkung aktivieren</Label>
                    <Switch id="use-leverage" defaultChecked={initialData?.use_leverage || false} />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1 text-amber-500" />
                    Erhöhtes Risiko: Verwenden Sie diese Funktion mit Vorsicht
                  </p>
                </div>

                {/* Wird nur angezeigt, wenn Hebelwirkung aktiviert ist */}
                {initialData?.use_leverage && (
                  <div className="space-y-2">
                    <Label htmlFor="leverage">Hebel</Label>
                    <Select defaultValue={initialData?.leverage || "2x"}>
                      <SelectTrigger id="leverage">
                        <SelectValue placeholder="Wählen Sie einen Hebel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2x">2x</SelectItem>
                        <SelectItem value="5x">5x</SelectItem>
                        <SelectItem value="10x">10x</SelectItem>
                        <SelectItem value="20x">20x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="slippage">Slippage-Toleranz (%)</Label>
                  <Input
                    type="number"
                    id="slippage"
                    placeholder="Slippage eingeben"
                    defaultValue={initialData?.slippage || 1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximal akzeptierte Preisabweichung bei Auftragsausführung
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gas-price">Gas-Preis-Strategie</Label>
                  <Select defaultValue={initialData?.gas_price_strategy || "normal"}>
                    <SelectTrigger id="gas-price">
                      <SelectValue placeholder="Wählen Sie eine Strategie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Langsam (günstiger)</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="fast">Schnell (teurer)</SelectItem>
                      <SelectItem value="custom">Benutzerdefiniert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-transactions">Transaktionsbenachrichtigungen</Label>
                    <Switch id="notify-transactions" defaultChecked={initialData?.notify_transactions || true} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Benachrichtigungen für alle durchgeführten Transaktionen erhalten
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="advanced-json">Benutzerdefinierte Einstellungen (JSON)</Label>
                  <Textarea
                    id="advanced-json"
                    placeholder="{}"
                    rows={4}
                    defaultValue={initialData?.advanced_json || "{}"}
                  />
                  <p className="text-xs text-muted-foreground">Erweiterte Konfiguration im JSON-Format</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="flex items-center rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700 w-full">
                  <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p>Erweiterte Einstellungen können die Leistung und das Risiko Ihres Bots erheblich beeinflussen.</p>
                </div>
              </CardFooter>
            </Card>

            {/* Submit-Buttons für mobile und Desktop */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setActiveTab("limits")}>
                Zurück
              </Button>

              <Button type="submit" disabled={isLoading} className="hidden md:flex">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Speichern..." : isEditing ? "Änderungen speichern" : "Bot erstellen"}
              </Button>
            </div>

            {/* Mobiler Footer mit Submit-Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
              <Button type="submit" disabled={isLoading} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Speichern..." : isEditing ? "Änderungen speichern" : "Bot erstellen"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  )
}
