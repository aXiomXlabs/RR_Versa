"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceWidget } from "./widgets/performance-widget"
import { ActiveBotsWidget } from "./widgets/active-bots-widget"
import { AlertsWidget } from "./widgets/alerts-widget"
import { TransactionsWidget } from "./widgets/transactions-widget"
import { Plus, LayoutGrid, LayoutList } from "lucide-react"

export function DashboardOverview({ user, botData, transactionData, performanceData, alertData }: any) {
  const [activeTab, setActiveTab] = useState("overview")
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid")
  const [isMobile, setIsMobile] = useState(false)
  const isDarkMode = false; // Platzhalter, später korrekt implementieren

  // Überprüfen Sie die Bildschirmgröße
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Automatisch auf Listenansicht für mobile Geräte umstellen
      if (mobile && layoutMode === "grid") {
        setLayoutMode("list")
      }
    }

    // Initial überprüfen
    checkScreenSize()

    // Event-Listener für Größenänderungen hinzufügen
    window.addEventListener("resize", checkScreenSize)

    // Event-Listener entfernen, wenn die Komponente nicht mehr gerendert wird
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [layoutMode])

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Willkommen zurück, {user?.email?.split("@")[0] || "Benutzer"}!</p>
        </div>

        <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3 h-9">
              <TabsTrigger value="overview" className="text-xs md:text-sm px-2 md:px-3">
                Übersicht
              </TabsTrigger>
              <TabsTrigger value="active" className="text-xs md:text-sm px-2 md:px-3">
                Aktive Bots
              </TabsTrigger>
              <TabsTrigger value="recent" className="text-xs md:text-sm px-2 md:px-3">
                Transaktionen
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center">
            <button
              onClick={() => setLayoutMode(layoutMode === "grid" ? "list" : "grid")}
              className="p-2 rounded-md hover:bg-muted"
              aria-label={layoutMode === "grid" ? "Switch to list view" : "Switch to grid view"}
            >
              {layoutMode === "grid" ? <LayoutList className="h-5 w-5" /> : <LayoutGrid className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`gap-4 ${layoutMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2" : "space-y-4"}`}
      >
        <TabsContent
          value="overview"
          className={layoutMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2" : "space-y-4"}
        >
          {/* @ts-ignore Annahme: performanceData enthält performanceData und aggregatedData als Eigenschaften */}
          <PerformanceWidget performanceData={performanceData?.performanceData} aggregatedData={performanceData?.aggregatedData} />
          <ActiveBotsWidget data={botData} compact={isMobile} />
          <TransactionsWidget data={transactionData} compact={isMobile} />
          <AlertsWidget alerts={alertData} isDarkMode={isDarkMode} />
        </TabsContent>

        <TabsContent value="active" className="space-y-4 col-span-2">
          <ActiveBotsWidget data={botData} expanded={true} />
        </TabsContent>

        <TabsContent value="recent" className="space-y-4 col-span-2">
          <TransactionsWidget data={transactionData} expanded={true} />
        </TabsContent>
      </div>

      {/* Mobile-optimierter "Add" Floating Action Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-10">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          aria-label="Neuen Bot erstellen"
          onClick={() => (window.location.href = "/dashboard/bots/new")}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
