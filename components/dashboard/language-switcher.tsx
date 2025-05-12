"use client"

import { useState } from "react"
import { Check, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useDashboardLanguage, type Language } from "@/contexts/dashboard-language-context"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useDashboardLanguage()
  const [open, setOpen] = useState(false)

  const languages = [
    { code: "de", name: "Deutsch" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "zh", name: "中文" },
  ]

  const handleSelectLanguage = (langCode: Language) => {
    setLanguage(langCode)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 md:gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline-block">{t("settings.language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleSelectLanguage(lang.code as Language)}
          >
            <span>{lang.name}</span>
            {language === lang.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
