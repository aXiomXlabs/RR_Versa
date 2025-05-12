"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"

interface DynamicAnalyticsProps {
  cookieConsent?: boolean
}

export default function DynamicAnalytics({ cookieConsent = false }: DynamicAnalyticsProps) {
  const [showAnalytics, setShowAnalytics] = useState(false)

  useEffect(() => {
    // Only load analytics if user has given consent
    if (cookieConsent) {
      setShowAnalytics(true)
    }
  }, [cookieConsent])

  if (!showAnalytics) {
    return null
  }

  return <Analytics />
}
