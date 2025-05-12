"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { BotType } from "./types"
import { botDescriptions } from "./default-configs"
import { Rocket, Wallet, FishIcon as Whale, ShoppingCart, Zap, Shield, Gauge, Target } from "lucide-react"

interface StrategyExplainerProps {
  botType: BotType
}

export default function StrategyExplainer({ botType }: StrategyExplainerProps) {
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null)

  const toggleStrategy = (id: string) => {
    if (expandedStrategy === id) {
      setExpandedStrategy(null)
    } else {
      setExpandedStrategy(id)
    }
  }

  const getBotIcon = (type: BotType) => {
    switch (type) {
      case "sniper":
        return <Rocket className="w-5 h-5" />
      case "wallet":
        return <Wallet className="w-5 h-5" />
      case "whale":
        return <Whale className="w-5 h-5" />
      case "buy":
        return <ShoppingCart className="w-5 h-5" />
    }
  }

  const strategies = {
    sniper: [
      {
        id: "mempool",
        title: "Mempool Scanning",
        description: "Scannt den Mempool nach neuen Token-Listings und führt Trades mit minimaler Latenz aus.",
        details:
          "Der Sniper Bot überwacht kontinuierlich den Mempool nach neuen Token-Listings und Liquiditätshinzufügungen. Sobald ein neuer Token erkannt wird, analysiert der Bot blitzschnell die Tokenomics, Liquidität und Sicherheitsparameter. Bei positiver Bewertung führt er den Trade mit minimaler Latenz aus, oft unter 10ms, um vor dem Hauptansturm einzusteigen.",
      },
      {
        id: "bloxroute",
        title: "Bloxroute Integration",
        description: "Nutzt Bloxroute-Gateways für privilegierten Zugang zu Blockchain-Daten.",
        details:
          "Durch die Integration mit Bloxroute-Gateways erhält der Sniper Bot privilegierten Zugang zu Blockchain-Daten und Transaktionen, bevor sie im öffentlichen Mempool erscheinen. Dies verschafft einen entscheidenden Zeitvorteil von mehreren Sekunden, was im Bereich des Token-Snipings den Unterschied zwischen einem erfolgreichen und einem verpassten Trade ausmachen kann.",
      },
      {
        id: "antirug",
        title: "Anti-Rug Schutz",
        description: "Analysiert Smart Contracts auf potenzielle Rug-Pull-Risiken.",
        details:
          "Der Sniper Bot führt automatische Sicherheitsanalysen der Smart Contracts durch, um potenzielle Rug-Pull-Risiken zu identifizieren. Er prüft auf bekannte Betrugspatterns, ungewöhnliche Berechtigungen, versteckte Mint-Funktionen und andere Sicherheitsrisiken. Trades werden nur ausgeführt, wenn der Token bestimmte Sicherheitskriterien erfüllt, was das Risiko von Verlusten durch Betrug erheblich reduziert.",
      },
    ],
    wallet: [
      {
        id: "copytrading",
        title: "Copy Trading",
        description: "Kopiert die Trades erfolgreicher Wallets mit hoher Erfolgsquote.",
        details:
          "Der Wallet Bot überwacht kontinuierlich eine kuratierte Liste von Top-Trader-Wallets mit nachgewiesener Erfolgsgeschichte. Sobald eine dieser Wallets einen Trade ausführt, analysiert der Bot die Transaktion und repliziert sie mit optimierten Parametern. Die Auswahl der zu kopierenden Wallets basiert auf einer umfassenden Analyse historischer Performance, Risikoprofil und Konsistenz.",
      },
      {
        id: "optimization",
        title: "Timing-Optimierung",
        description: "Optimiert den Einstiegszeitpunkt basierend auf technischen Indikatoren.",
        details:
          "Anstatt Trades blind zu kopieren, optimiert der Wallet Bot den Einstiegszeitpunkt basierend auf technischen Indikatoren und Marktbedingungen. Dies kann bedeuten, dass der Bot auf einen günstigeren Einstiegspunkt wartet oder den Trade in mehrere kleinere Positionen aufteilt, um das Risiko zu reduzieren und die Gesamtperformance zu verbessern.",
      },
      {
        id: "smartexit",
        title: "Smart Exit",
        description: "Implementiert eigene Exit-Strategien unabhängig vom kopierten Trader.",
        details:
          "Der Wallet Bot implementiert eigene Exit-Strategien, die unabhängig vom kopierten Trader sind. Dies umfasst dynamische Take-Profit- und Stop-Loss-Levels, die auf der Volatilität des Assets, historischen Preisbewegungen und Marktbedingungen basieren. Dadurch kann der Bot oft bessere Exits erzielen als die kopierten Trader selbst.",
      },
    ],
    whale: [
      {
        id: "tracking",
        title: "Whale Tracking",
        description: "Überwacht große Wallets und identifiziert signifikante Bewegungen.",
        details:
          "Der Whale Bot überwacht kontinuierlich Tausende von Whale-Wallets (Wallets mit großen Holdings) auf verschiedenen Blockchains. Er identifiziert signifikante Bewegungen und Akkumulationsmuster, die auf bevorstehende Marktbewegungen hindeuten können. Die Analyse berücksichtigt nicht nur die Größe der Transaktionen, sondern auch historische Patterns und die Reputation der Wallet.",
      },
      {
        id: "analysis",
        title: "On-Chain Analyse",
        description: "Analysiert On-Chain-Daten zur Identifikation von Akkumulationsmustern.",
        details:
          "Durch tiefgehende On-Chain-Analyse identifiziert der Whale Bot Akkumulationsmuster und Netzwerkaktivitäten, die oft Preisbewegungen vorausgehen. Dies umfasst die Analyse von Token-Transfers zwischen Wallets, Exchange-Inflows und -Outflows, Smart Contract Interaktionen und Liquiditätsveränderungen. Diese Daten werden mit historischen Patterns verglichen, um die Wahrscheinlichkeit zukünftiger Preisbewegungen zu prognostizieren.",
      },
      {
        id: "positioning",
        title: "Strategische Positionierung",
        description: "Positioniert sich strategisch vor erwarteten Marktbewegungen.",
        details:
          "Basierend auf den gesammelten Daten und Analysen positioniert sich der Whale Bot strategisch vor erwarteten Marktbewegungen. Dies kann bedeuten, dass er Positionen aufbaut, bevor große Whales ihre Käufe öffentlich machen, oder Positionen reduziert, wenn Anzeichen für bevorstehende Verkäufe erkannt werden. Die Positionierung erfolgt graduell, um den Markteinfluss zu minimieren und optimale Einstiegspreise zu erzielen.",
      },
    ],
    buy: [
      {
        id: "technical",
        title: "Technische Analyse",
        description: "Nutzt technische Indikatoren für präzise Einstiegspunkte.",
        details:
          "Der Buy Bot verwendet eine Kombination aus technischen Indikatoren wie RSI, MACD, Bollinger Bänder und Moving Averages, um optimale Einstiegspunkte zu identifizieren. Diese Indikatoren werden dynamisch gewichtet basierend auf ihrer historischen Effektivität für das spezifische Asset und die aktuellen Marktbedingungen. Dies ermöglicht präzise Einstiegspunkte mit hoher Erfolgswahrscheinlichkeit.",
      },
      {
        id: "momentum",
        title: "Momentum Trading",
        description: "Identifiziert und nutzt Momentum-basierte Trading-Gelegenheiten.",
        details:
          "Der Buy Bot identifiziert Momentum-basierte Trading-Gelegenheiten durch die Analyse von Preisbewegungen, Volumen und sozialen Signalen. Er erkennt frühe Anzeichen von Momentum-Aufbau und positioniert sich entsprechend, um von der folgenden Preisbewegung zu profitieren. Die Strategie umfasst auch die Erkennung von Momentum-Erschöpfung, um rechtzeitig Gewinne zu sichern.",
      },
      {
        id: "api",
        title: "API Integration",
        description: "Ermöglicht die Integration eigener Trading-Strategien über API.",
        details:
          "Der Buy Bot bietet eine umfassende API, die es Nutzern ermöglicht, eigene Trading-Strategien zu integrieren und zu automatisieren. Dies umfasst die Definition eigener Einstiegs- und Ausstiegskriterien, Risikomanagement-Parameter und Benachrichtigungseinstellungen. Die API unterstützt auch die Integration mit externen Datenquellen und Analyseplattformen für erweiterte Strategien.",
      },
    ],
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-12"
    >
      <Card className="bg-dark/30 backdrop-blur-md border-white/10 p-6">
        <div className="flex items-center mb-6">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${botDescriptions[botType].color} to-black/80 flex items-center justify-center mr-4`}
          >
            {getBotIcon(botType)}
          </div>
          <div>
            <h3 className="text-xl font-bold">{botDescriptions[botType].title} Strategien</h3>
            <p className="text-sm text-silver">{botDescriptions[botType].description}</p>
          </div>
        </div>

        <Tabs defaultValue="strategies">
          <TabsList className="bg-white/5 border-b border-white/10 w-full justify-start mb-4">
            <TabsTrigger value="strategies" className="data-[state=active]:bg-white/10">
              Strategien
            </TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-white/10">
              Features
            </TabsTrigger>
            <TabsTrigger value="usecases" className="data-[state=active]:bg-white/10">
              Anwendungsfälle
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="mt-0">
            <div className="space-y-4">
              {strategies[botType].map((strategy) => (
                <div key={strategy.id} className="bg-white/5 rounded-lg overflow-hidden">
                  <button
                    className="w-full p-4 text-left flex items-center justify-between"
                    onClick={() => toggleStrategy(strategy.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full bg-${botDescriptions[botType].color}/20 flex items-center justify-center mr-3`}
                      >
                        <Target className={`w-4 h-4 text-${botDescriptions[botType].color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{strategy.title}</h4>
                        <p className="text-sm text-silver">{strategy.description}</p>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 transition-transform ${expandedStrategy === strategy.id ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {expandedStrategy === strategy.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-sm text-silver">{strategy.details}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard
                icon={<Zap className="w-5 h-5" />}
                title="Blitzschnelle Ausführung"
                description={
                  botType === "sniper"
                    ? "Unter 10ms Reaktionszeit für maximalen Vorteil bei neuen Listings."
                    : "Schnelle und präzise Ausführung ohne emotionale Verzögerungen."
                }
                color={botDescriptions[botType].color}
              />

              <FeatureCard
                icon={<Shield className="w-5 h-5" />}
                title="Risikomanagement"
                description="Automatische Take-Profit und Stop-Loss Mechanismen schützen dein Kapital."
                color={botDescriptions[botType].color}
              />

              <FeatureCard
                icon={<Gauge className="w-5 h-5" />}
                title="Anpassbare Parameter"
                description="Passe alle Bot-Parameter an deine Trading-Strategie und Risikobereitschaft an."
                color={botDescriptions[botType].color}
              />

              <FeatureCard
                icon={<Target className="w-5 h-5" />}
                title="Smart Routing"
                description="Automatische Auswahl der besten DEX für maximale Liquidität und minimale Slippage."
                color={botDescriptions[botType].color}
              />
            </div>
          </TabsContent>

          <TabsContent value="usecases" className="mt-0">
            <div className="space-y-4">
              {botType === "sniper" && (
                <>
                  <UseCaseItem
                    title="IDO und Token-Launches"
                    description="Sei der Erste bei neuen Token-Launches und Initial DEX Offerings (IDOs)."
                    color={botDescriptions[botType].color}
                  />
                  <UseCaseItem
                    title="Flash Opportunities"
                    description="Nutze kurzfristige Preis-Diskrepenzen und Flash-Crashes für schnelle Gewinne."
                    color={botDescriptions[botType].color}
                  />
                  <UseCaseItem
                    title="Liquiditätshinzufügungen"
                    description="Erkenne und nutze neue Liquiditätshinzufügungen bei bestehenden Tokens."
                    color={botDescriptions[botType].color}
                  />
                </>
              )}

              {botType === "wallet" && (
                <>
                  <UseCaseItem
                    title="Passives Copy Trading"
                    description="Kopiere erfolgreiche Trader ohne aktives Management deinerseits."
                    color={botDescriptions[botType].color}
                  />
                  <UseCaseItem
                    title="Diversifikation"
                    description="Kopiere mehrere erfolgreiche Wallets gleichzeitig für ein diversifiziertes Portfolio."
                    color={botDescriptions[botType].color}
                  />
                  <UseCaseItem
                    title="Lernmodus"
                    description="Verstehe die Strategien erfolgreicher Trader durch Analyse ihrer Trades."
                    color={botDescriptions[botType].color}
                  />
                </>
              )}

              {botType === "whale" && (
                <>
                  <UseCaseItem
                    title="Frühe Trend-Erkennung"
                    description="Erkenne neue Trends, bevor sie mainstream werden, durch Whale-Bewegungen."
                    color={botDescriptions[botType].color}
                  />
                  <UseCaseItem
                    title="Akkumulations-Erkennung"
                    description="Identifiziere Tokens, die von großen Playern still akkumuliert werden."
                    color={botDescriptions[botType].color}
                  />
                  <UseCaseItem
                    title="Dump-Prävention"
                    description="Erkenne frühzeitig, wenn Whales beginnen zu verkaufen, und schütze dein Portfolio."
                    color={botDescriptions[botType].color}
                  />
                </>
              )}

              {botType === "buy" && (
                <>
                  <UseCaseItem
                    title="Automatisierte Strategien"
                    description="Setze deine eigenen Trading-Strategien um, ohne manuell handeln zu müssen."
                    color={botDescriptions[botType].color}
                  />
                  <UseCaseItem
                    title="DCA-Strategien"
                    description="Implementiere Dollar-Cost-Averaging Strategien für langfristigen Vermögensaufbau."
                    color={botDescriptions[botType].color}
                  />
                  <UseCaseItem
                    title="Multi-Token Trading"
                    description="Handle mehrere Tokens gleichzeitig mit individuellen Strategien."
                    color={botDescriptions[botType].color}
                  />
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-full bg-${color}/20 flex items-center justify-center mr-3 shrink-0`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium mb-1">{title}</h4>
          <p className="text-sm text-silver">{description}</p>
        </div>
      </div>
    </div>
  )
}

interface UseCaseItemProps {
  title: string
  description: string
  color: string
}

function UseCaseItem({ title, description, color }: UseCaseItemProps) {
  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex items-start">
        <div className={`w-1 h-full bg-${color} rounded-full mr-3 shrink-0`}></div>
        <div>
          <h4 className="font-medium mb-1">{title}</h4>
          <p className="text-sm text-silver">{description}</p>
        </div>
      </div>
    </div>
  )
}
