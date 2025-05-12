"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useCookieConsent } from "@/contexts/cookie-consent-context"

export function ConditionalAnalytics() {
  const { consent } = useCookieConsent()
  const [AnalyticsComponent, setAnalyticsComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Nur Analytics laden, wenn der Benutzer analytischen Cookies zugestimmt hat
    if (consent?.analytics) {
      // Dynamischer Import der Analytics-Komponente
      import("@vercel/analytics/react").then(({ Analytics }) => {
        setAnalyticsComponent(() => Analytics)
      })
    }
  }, [consent?.analytics])

  // Wenn keine Zustimmung oder die Komponente noch nicht geladen ist, nichts rendern
  if (!AnalyticsComponent) return null

  // Andernfalls die Analytics-Komponente rendern
  return <AnalyticsComponent />
}
