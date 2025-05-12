"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { type KeywordData, getKeywordData } from "@/lib/seo/keyword-tracker"
import type { Language } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { KeywordTrendChart } from "@/app/admin/components/keyword-trend-chart"
import Link from "next/link"

export default function KeywordAnalysisPage() {
  const params = useParams()
  const keywordSlug = params.keyword as string
  const keyword = decodeURIComponent(keywordSlug)

  const [keywordData, setKeywordData] = useState<KeywordData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeLanguage, setActiveLanguage] = useState<Language>("de")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const allKeywords = await getKeywordData()
        const matchingKeyword = allKeywords.find((k) => k.keyword === keyword && k.language === activeLanguage)

        if (matchingKeyword) {
          setKeywordData(matchingKeyword)
        }
      } catch (error) {
        console.error("Fehler beim Laden der Keyword-Daten:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [keyword, activeLanguage])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>Lade Keyword-Daten...</p>
      </div>
    )
  }

  if (!keywordData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Link href="/admin/dashboard/seo/keywords">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Übersicht
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">Keyword nicht gefunden</p>
            <p className="text-muted-foreground">
              Das Keyword "{keyword}" wurde für die Sprache {activeLanguage.toUpperCase()} nicht gefunden.
            </p>
            <div className="mt-4">
              <Tabs value={activeLanguage} onValueChange={(value) => setActiveLanguage(value as Language)}>
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="de">DE</TabsTrigger>
                  <TabsTrigger value="en">EN</TabsTrigger>
                  <TabsTrigger value="es">ES</TabsTrigger>
                  <TabsTrigger value="fr">FR</TabsTrigger>
                  <TabsTrigger value="zh">ZH</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/dashboard/seo/keywords">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Übersicht
            </Button>
          </Link>
        </div>

        <Tabs value={activeLanguage} onValueChange={(value) => setActiveLanguage(value as Language)}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="de">DE</TabsTrigger>
            <TabsTrigger value="en">EN</TabsTrigger>
            <TabsTrigger value="es">ES</TabsTrigger>
            <TabsTrigger value="fr">FR</TabsTrigger>
            <TabsTrigger value="zh">ZH</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{keywordData.keyword}</CardTitle>
            <CardDescription>
              <a
                href={keywordData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                {keywordData.url}
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Aktuelle Position</p>
                <p className="text-3xl font-bold">{keywordData.position}</p>
              </div>

              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Vorherige Position</p>
                <p className="text-3xl font-bold">{keywordData.previousPosition || "N/A"}</p>
              </div>

              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Suchvolumen</p>
                <p className="text-3xl font-bold">{keywordData.searchVolume || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <KeywordTrendChart keyword={keywordData.keyword} language={activeLanguage} days={90} />

        <Card>
          <CardHeader>
            <CardTitle>Optimierungsempfehlungen</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {keywordData.position > 10 && (
                <li className="flex items-start">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mr-2">Wichtig</span>
                  <span>
                    Dieses Keyword ist nicht in den Top 10. Optimiere den Inhalt mit mehr relevanten Informationen.
                  </span>
                </li>
              )}

              {keywordData.position > 3 && keywordData.position <= 10 && (
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">Empfehlung</span>
                  <span>
                    Dieses Keyword ist in den Top 10, aber nicht in den Top 3. Verbessere die interne Verlinkung und
                    Metadaten.
                  </span>
                </li>
              )}

              {keywordData.position <= 3 && (
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">Gut</span>
                  <span>Dieses Keyword ist in den Top 3. Halte den Inhalt aktuell und baue weitere Backlinks auf.</span>
                </li>
              )}

              {keywordData.searchVolume && keywordData.searchVolume > 1000 && keywordData.position > 5 && (
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-2">Potenzial</span>
                  <span>Dieses Keyword hat ein hohes Suchvolumen. Priorisiere die Optimierung für mehr Traffic.</span>
                </li>
              )}

              <li className="flex items-start">
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs mr-2">Tipp</span>
                <span>
                  Überprüfe die Konkurrenz für dieses Keyword und analysiere deren Inhalte für Verbesserungsideen.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
