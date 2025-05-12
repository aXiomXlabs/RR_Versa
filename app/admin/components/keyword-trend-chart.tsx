"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Language } from "@/contexts/language-context"
import { createServiceClient } from "@/lib/supabase"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type KeywordHistoryData = {
  date: string
  position: number
}

type KeywordTrendProps = {
  keyword: string
  language: Language
  days?: number
}

export function KeywordTrendChart({ keyword, language, days = 30 }: KeywordTrendProps) {
  const [historyData, setHistoryData] = useState<KeywordHistoryData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchKeywordHistory = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const supabase = createServiceClient()

        // Hole die Keyword-ID
        const { data: keywordData, error: keywordError } = await supabase
          .from("keyword_rankings")
          .select("id")
          .eq("keyword", keyword)
          .eq("language", language)
          .single()

        if (keywordError || !keywordData) {
          throw new Error("Keyword nicht gefunden")
        }

        // Hole die historischen Daten
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        const { data: historyData, error: historyError } = await supabase
          .from("keyword_history")
          .select("position, snapshot_date")
          .eq("keyword_id", keywordData.id)
          .gte("snapshot_date", startDate.toISOString().split("T")[0])
          .order("snapshot_date", { ascending: true })

        if (historyError) {
          throw historyError
        }

        // Transformiere die Daten für das Chart
        const formattedData = historyData.map((item) => ({
          date: new Date(item.snapshot_date).toLocaleDateString(),
          position: item.position,
        }))

        setHistoryData(formattedData)
      } catch (err) {
        console.error("Fehler beim Laden der Keyword-Historie:", err)
        setError("Fehler beim Laden der Daten")
      } finally {
        setIsLoading(false)
      }
    }

    fetchKeywordHistory()
  }, [keyword, language, days])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Keyword-Trend: {keyword}</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p>Lade Daten...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Keyword-Trend: {keyword}</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (historyData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Keyword-Trend: {keyword}</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p>Keine historischen Daten verfügbar</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword-Trend: {keyword}</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis reversed domain={[1, "dataMax"]} />
            <Tooltip
              formatter={(value) => [`Position: ${value}`, "Ranking"]}
              labelFormatter={(label) => `Datum: ${label}`}
            />
            <Legend />
            <Line type="monotone" dataKey="position" name="Position" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
