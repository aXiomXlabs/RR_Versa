import type { Language } from "@/contexts/language-context"
import { createServiceClient } from "@/lib/supabase"

export type KeywordData = {
  keyword: string
  language: Language
  position: number
  searchVolume?: number
  url: string
  lastUpdated: Date
  previousPosition?: number
  change?: number
}

export type KeywordReport = {
  topKeywords: KeywordData[]
  improvingKeywords: KeywordData[]
  decliningKeywords: KeywordData[]
  opportunities: KeywordData[]
  languageSummary: Record<
    Language,
    {
      averagePosition: number
      keywordsInTop10: number
      keywordsInTop3: number
      totalKeywords: number
    }
  >
}

/**
 * Speichert Keyword-Daten in der Datenbank
 */
export async function storeKeywordData(data: Omit<KeywordData, "lastUpdated" | "change">[]) {
  const supabase = createServiceClient()

  // Bereite die Daten für das Einfügen vor
  const keywordsToInsert = data.map((item) => ({
    keyword: item.keyword,
    language: item.language,
    position: item.position,
    search_volume: item.searchVolume || 0,
    url: item.url,
    previous_position: item.previousPosition || null,
    updated_at: new Date().toISOString(),
  }))

  // Füge die Daten in die Datenbank ein
  const { error } = await supabase.from("keyword_rankings").upsert(keywordsToInsert, {
    onConflict: "keyword,language",
    ignoreDuplicates: false,
  })

  if (error) {
    console.error("Fehler beim Speichern der Keyword-Daten:", error)
    throw error
  }

  return { success: true }
}

/**
 * Holt die neuesten Keyword-Daten aus der Datenbank
 */
export async function getKeywordData(language?: Language): Promise<KeywordData[]> {
  const supabase = createServiceClient()

  let query = supabase.from("keyword_rankings").select("*").order("updated_at", { ascending: false })

  if (language) {
    query = query.eq("language", language)
  }

  const { data, error } = await query

  if (error) {
    console.error("Fehler beim Abrufen der Keyword-Daten:", error)
    throw error
  }

  // Transformiere die Daten in das richtige Format
  return data.map((item) => ({
    keyword: item.keyword,
    language: item.language as Language,
    position: item.position,
    searchVolume: item.search_volume,
    url: item.url,
    lastUpdated: new Date(item.updated_at),
    previousPosition: item.previous_position,
    change: item.previous_position ? item.previous_position - item.position : 0,
  }))
}

/**
 * Generiert einen Keyword-Bericht für eine bestimmte Sprache
 */
export async function generateKeywordReport(language: Language): Promise<KeywordReport> {
  const keywords = await getKeywordData(language)

  // Sortiere Keywords nach Position
  const sortedKeywords = [...keywords].sort((a, b) => a.position - b.position)

  // Top Keywords (Top 10)
  const topKeywords = sortedKeywords.filter((k) => k.position <= 10).slice(0, 10)

  // Verbesserte Keywords (positive Veränderung)
  const improvingKeywords = [...keywords]
    .filter((k) => k.change && k.change > 0)
    .sort((a, b) => (b.change || 0) - (a.change || 0))
    .slice(0, 10)

  // Verschlechterte Keywords (negative Veränderung)
  const decliningKeywords = [...keywords]
    .filter((k) => k.change && k.change < 0)
    .sort((a, b) => (a.change || 0) - (b.change || 0))
    .slice(0, 10)

  // Chancen (Keywords mit hohem Suchvolumen aber schlechter Position)
  const opportunities = [...keywords]
    .filter((k) => k.position > 10 && k.searchVolume && k.searchVolume > 100)
    .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, 10)

  // Berechne Zusammenfassung
  const totalKeywords = keywords.length
  const keywordsInTop10 = keywords.filter((k) => k.position <= 10).length
  const keywordsInTop3 = keywords.filter((k) => k.position <= 3).length
  const averagePosition = keywords.reduce((sum, k) => sum + k.position, 0) / totalKeywords

  return {
    topKeywords,
    improvingKeywords,
    decliningKeywords,
    opportunities,
    languageSummary: {
      [language]: {
        averagePosition,
        keywordsInTop10,
        keywordsInTop3,
        totalKeywords,
      },
    },
  }
}
