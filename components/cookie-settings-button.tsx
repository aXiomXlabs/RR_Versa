"use client"

import { Button } from "@/components/ui/button"
import { useCookieConsent } from "@/contexts/cookie-consent-context"
import { Settings } from "lucide-react"

interface CookieSettingsButtonProps {
  variant?: "default" | "outline" | "link" | "text" | "icon"
  label?: string
}

export function CookieSettingsButton({
  variant = "outline",
  label = "Cookie-Einstellungen",
}: CookieSettingsButtonProps) {
  const { setShowBanner } = useCookieConsent()

  const handleOpenSettings = () => {
    setShowBanner(true)
  }

  if (variant === "icon") {
    return (
      <Button variant="ghost" size="icon" onClick={handleOpenSettings} aria-label="Cookie-Einstellungen öffnen">
        <Settings className="h-5 w-5" />
      </Button>
    )
  }

  if (variant === "text") {
    return (
      <button onClick={handleOpenSettings} className="text-sm text-gray-500 hover:text-gray-700 underline">
        {label}
      </button>
    )
  }

  if (variant === "link") {
    return (
      <button onClick={handleOpenSettings} className="text-blue-600 hover:text-blue-800 hover:underline">
        {label}
      </button>
    )
  }

  return (
    <Button variant={variant === "default" ? "default" : "outline"} onClick={handleOpenSettings} size="sm">
      {label}
    </Button>
  )
}
