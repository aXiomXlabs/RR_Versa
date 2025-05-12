"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useLanguage, type Language } from "@/contexts/language-context"

// Cookie-Consent-Typ
export interface CookieConsent {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
  timestamp: number
}

// Kontext-Typ
interface CookieConsentContextType {
  consent: CookieConsent | null
  showBanner: boolean
  saveConsent: (consent: Partial<CookieConsent>) => void
  setShowBanner: (show: boolean) => void
}

// Erstellen des Kontexts
const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: null,
  showBanner: false,
  saveConsent: () => {},
  setShowBanner: () => {},
})

// Hook für den einfachen Zugriff auf den Kontext
export const useCookieConsent = () => useContext(CookieConsentContext)

// Provider-Komponente
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const { language } = useLanguage()

  // Beim ersten Laden die gespeicherten Einstellungen abrufen
  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent")
    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent)
        setConsent(parsedConsent)
      } catch (error) {
        console.error("Fehler beim Parsen der Cookie-Einstellungen:", error)
        setShowBanner(true)
      }
    } else {
      // Keine gespeicherten Einstellungen gefunden, Banner anzeigen
      setShowBanner(true)
    }
  }, [])

  // Funktion zum Speichern der Einstellungen
  const saveConsent = (newConsent: Partial<CookieConsent>) => {
    const fullConsent: CookieConsent = {
      necessary: true, // Immer erforderlich
      functional: newConsent.functional || false,
      analytics: newConsent.analytics || false,
      marketing: newConsent.marketing || false,
      personalization: newConsent.personalization || false,
      timestamp: Date.now(),
    }

    // Speichern im localStorage
    localStorage.setItem("cookieConsent", JSON.stringify(fullConsent))
    setConsent(fullConsent)
    setShowBanner(false)

    // Cookies löschen, wenn die Zustimmung widerrufen wurde
    if (!fullConsent.analytics) {
      deleteCookies(["_ga", "_gid", "_gat"])
    }
    if (!fullConsent.marketing) {
      deleteCookies(["_fbp", "fr", "personalization_id", "_twitter_sess", "lidc"])
    }
    if (!fullConsent.functional) {
      deleteCookies(["_hjid", "_hjSessionUser", "_hjSession", "_hjAbsoluteSessionInProgress"])
    }
  }

  // Hilfsfunktion zum Löschen von Cookies
  const deleteCookies = (cookieNames: string[]) => {
    cookieNames.forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}; SameSite=Lax;`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`
    })
  }

  // Übersetzungen für Cookie-Kategorien basierend auf der aktuellen Sprache
  const getCategoryName = (category: keyof Omit<CookieConsent, "timestamp">) => {
    const translations: Record<Language, Record<string, string>> = {
      de: {
        necessary: "Notwendige Cookies",
        functional: "Funktionale Cookies",
        analytics: "Analytische Cookies",
        marketing: "Marketing Cookies",
        personalization: "Personalisierungs-Cookies",
      },
      en: {
        necessary: "Necessary Cookies",
        functional: "Functional Cookies",
        analytics: "Analytical Cookies",
        marketing: "Marketing Cookies",
        personalization: "Personalization Cookies",
      },
      es: {
        necessary: "Cookies Necesarias",
        functional: "Cookies Funcionales",
        analytics: "Cookies Analíticas",
        marketing: "Cookies de Marketing",
        personalization: "Cookies de Personalización",
      },
      fr: {
        necessary: "Cookies Nécessaires",
        functional: "Cookies Fonctionnels",
        analytics: "Cookies Analytiques",
        marketing: "Cookies Marketing",
        personalization: "Cookies de Personnalisation",
      },
      zh: {
        necessary: "必要 Cookie",
        functional: "功能性 Cookie",
        analytics: "分析 Cookie",
        marketing: "营销 Cookie",
        personalization: "个性化 Cookie",
      },
    }

    return translations[language]?.[category] || translations.de[category]
  }

  return (
    <CookieConsentContext.Provider value={{ consent, showBanner, saveConsent, setShowBanner }}>
      {children}
    </CookieConsentContext.Provider>
  )
}
