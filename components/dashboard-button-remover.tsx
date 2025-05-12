"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamic import with ssr: false
const HideDashboardButton = dynamic(() => import("@/components/hide-dashboard-button"), {
  ssr: false,
})

export default function DashboardButtonRemover() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only render on client
  if (!isClient) return null

  return <HideDashboardButton />
}
