"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useCookieConsent } from "@/contexts/cookie-consent-context"

export function ConditionalAnalytics() {
  const { consent } = useCookieConsent()
  const [AnalyticsComponent, setAnalyticsComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Only load analytics if the user has consented to analytics cookies
    if (consent?.analytics) {
      // Dynamically import the Analytics component
      import("@vercel/analytics/react")
        .then(({ Analytics }) => {
          setAnalyticsComponent(() => Analytics)
        })
        .catch((error) => {
          console.error("Error loading analytics:", error)
        })
    }
  }, [consent?.analytics])

  // If no consent or component not loaded yet, render nothing
  if (!AnalyticsComponent) return null

  // Otherwise render the Analytics component
  return <AnalyticsComponent />
}
