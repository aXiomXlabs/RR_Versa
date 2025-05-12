"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Language } from "@/contexts/language-context"
import { type KeywordData, type KeywordReport, generateKeywordReport } from "@/lib/seo/keyword-tracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Minus, Download, RefreshCw, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function KeywordMonitoringPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeLanguage, setActiveLanguage] = useState<Language>("de")
  const [report, setReport] = useState<KeywordReport | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredKeywords, setFilteredKeywords] = useState<KeywordData[]>([])

  // Lade den Bericht beim ersten Rendern und bei Sprachänderungen
  useEffect(() => {
    const lang = (searchParams.get("lang") as Language) || "de"
    setActiveLanguage(lang)
    loadReport(lang)
  }, [searchParams])

  // Filtere Keywords basierend auf dem Suchbegriff
  useEffect(() => {
    if (!report) return

    const allKeywords = [
      ...report.topKeywords,
      ...report.improvingKeywords,
      ...report.decliningKeywords,
      ...report.opportunities,
    ]

    // Entferne Duplikate
    const uniqueKeywords = Array.from(new Map(allKeywords.map((item) => [item.keyword, item])).values())

    if (!searchTerm) {
      setFilteredKeywords(uniqueKeywords)
      return
    }

    const filtered = uniqueKeywords.filter(
      (kw) =>
        kw.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kw.url.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setFilteredKeywords(filtered)
  }, [report, searchTerm])

  const loadReport = async (language: Language) => {
    setIsLoading(true)
    try {
      const keywordReport = await generateKeywordReport(language)
      setReport(keywordReport)
    } catch (error) {
      console.error("Fehler beim Laden des Keyword-Berichts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (language: Language) => {
    router.push(`/admin/dashboard/seo/keywords?lang=${language}`)
  }

  const handleRefresh = () => {
    loadReport(activeLanguage)
  }

  const exportToCsv = () => {
    if (!filteredKeywords.length) return

    const headers = ["Keyword", "Position", "Vorherige Position", "Änderung", "Suchvolumen", "URL"]
    const rows = filteredKeywords.map((kw) => [
      kw.keyword,
      kw.position.toString(),
      kw.previousPosition?.toString() || "N/A",
      kw.change?.toString() || "0",
      kw.searchVolume?.toString() || "N/A",
      kw.url,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `keyword-report-${activeLanguage}-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderChangeIndicator = (change?: number) => {
    if (!change) return <Minus className="h-4 w-4 text-gray-400" />
    if (change > 0) return <ArrowUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <ArrowDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4">Lade Keyword-Daten...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Keyword-Monitoring</h1>

        <div className="flex items-center gap-4">
          <Select value={activeLanguage} onValueChange={(value) => handleLanguageChange(value as Language)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sprache wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="en">Englisch</SelectItem>
              <SelectItem value="es">Spanisch</SelectItem>
              <SelectItem value="fr">Französisch</SelectItem>
              <SelectItem value="zh">Chinesisch</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Aktualisieren
          </Button>

          <Button variant="outline" onClick={exportToCsv}>
            <Download className="h-4 w-4 mr-2" />
            CSV exportieren
          </Button>
        </div>
      </div>

      {report && (
        <>
          {/* Zusammenfassung */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Durchschnittliche Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {report.languageSummary[activeLanguage].averagePosition.toFixed(1)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Keywords in Top 3</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{report.languageSummary[activeLanguage].keywordsInTop3}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Keywords in Top 10</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{report.languageSummary[activeLanguage].keywordsInTop10}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Gesamt Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{report.languageSummary[activeLanguage].totalKeywords}</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs für verschiedene Keyword-Kategorien */}
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Alle Keywords</TabsTrigger>
              <TabsTrigger value="top">Top Keywords</TabsTrigger>
              <TabsTrigger value="improving">Verbesserte Keywords</TabsTrigger>
              <TabsTrigger value="declining">Verschlechterte Keywords</TabsTrigger>
              <TabsTrigger value="opportunities">Chancen</TabsTrigger>
            </TabsList>

            <div className="my-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Keywords durchsuchen..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="all">
              <KeywordTable keywords={filteredKeywords} renderChangeIndicator={renderChangeIndicator} />
            </TabsContent>

            <TabsContent value="top">
              <KeywordTable
                keywords={report.topKeywords.filter(
                  (kw) => !searchTerm || kw.keyword.toLowerCase().includes(searchTerm.toLowerCase()),
                )}
                renderChangeIndicator={renderChangeIndicator}
              />
            </TabsContent>

            <TabsContent value="improving">
              <KeywordTable
                keywords={report.improvingKeywords.filter(
                  (kw) => !searchTerm || kw.keyword.toLowerCase().includes(searchTerm.toLowerCase()),
                )}
                renderChangeIndicator={renderChangeIndicator}
              />
            </TabsContent>

            <TabsContent value="declining">
              <KeywordTable
                keywords={report.decliningKeywords.filter(
                  (kw) => !searchTerm || kw.keyword.toLowerCase().includes(searchTerm.toLowerCase()),
                )}
                renderChangeIndicator={renderChangeIndicator}
              />
            </TabsContent>

            <TabsContent value="opportunities">
              <KeywordTable
                keywords={report.opportunities.filter(
                  (kw) => !searchTerm || kw.keyword.toLowerCase().includes(searchTerm.toLowerCase()),
                )}
                renderChangeIndicator={renderChangeIndicator}
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

type KeywordTableProps = {
  keywords: KeywordData[]
  renderChangeIndicator: (change?: number) => React.ReactNode
}

function KeywordTable({ keywords, renderChangeIndicator }: KeywordTableProps) {
  if (!keywords.length) {
    return <p className="text-center py-8 text-muted-foreground">Keine Keywords gefunden.</p>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Keyword</TableHead>
            <TableHead className="w-[100px] text-right">Position</TableHead>
            <TableHead className="w-[100px] text-right">Vorherige</TableHead>
            <TableHead className="w-[80px] text-center">Änderung</TableHead>
            <TableHead className="w-[100px] text-right">Suchvolumen</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-[120px]">Zuletzt aktualisiert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keywords.map((keyword) => (
            <TableRow key={`${keyword.keyword}-${keyword.language}`}>
              <TableCell className="font-medium">{keyword.keyword}</TableCell>
              <TableCell className="text-right">{keyword.position}</TableCell>
              <TableCell className="text-right">{keyword.previousPosition || "N/A"}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center">
                  {renderChangeIndicator(keyword.change)}
                  {keyword.change ? <span className="ml-1">{Math.abs(keyword.change)}</span> : ""}
                </div>
              </TableCell>
              <TableCell className="text-right">{keyword.searchVolume || "N/A"}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                <a
                  href={keyword.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {keyword.url}
                </a>
              </TableCell>
              <TableCell>{new Date(keyword.lastUpdated).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
