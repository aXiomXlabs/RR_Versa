"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Laptop, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { updateUserSettings } from "@/app/dashboard/actions/user-actions"
import { useDashboardLanguage, type Language } from "@/contexts/dashboard-language-context"
import { toast } from "@/components/ui/use-toast"

export default function AppearanceSettings({ settings, isDarkMode }: { settings: any; isDarkMode: boolean }) {
  const [theme, setTheme] = useState<string>(settings?.theme || "dark")
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const { language, setLanguage, t } = useDashboardLanguage()

  const themes = [
    {
      value: "light",
      label: t("settings.theme.light"),
      icon: <Sun className="mr-2 h-4 w-4" />,
    },
    {
      value: "dark",
      label: t("settings.theme.dark"),
      icon: <Moon className="mr-2 h-4 w-4" />,
    },
    {
      value: "system",
      label: t("settings.theme.system"),
      icon: <Laptop className="mr-2 h-4 w-4" />,
    },
  ]

  const languages = [
    { code: "de", name: "Deutsch" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "zh", name: "中文" },
  ]

  const saveSettings = async () => {
    try {
      setIsUpdating(true)
      await updateUserSettings({ theme, language })
      toast({
        title: t("success.saved"),
        description: t("settings.saved"),
      })
      router.refresh()
    } catch (error) {
      console.error("Fehler beim Speichern der Einstellungen:", error)
      toast({
        title: t("error.general"),
        description: String(error),
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div>
      <Card className={isDarkMode ? "bg-gray-800 text-white border-gray-700" : ""}>
        <CardHeader>
          <CardTitle>{t("settings.appearance")}</CardTitle>
          <CardDescription className={isDarkMode ? "text-gray-400" : ""}>
            {t("settings.theme")} & {t("settings.language")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="theme"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("settings.theme")}
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start ${isDarkMode ? "border-gray-700 bg-gray-700" : ""}`}
                  >
                    {themes.find((t) => t.value === theme)?.icon}
                    {themes.find((t) => t.value === theme)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {themes.map((themeOption) => (
                    <DropdownMenuItem
                      key={themeOption.value}
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setTheme(themeOption.value)}
                    >
                      {themeOption.icon}
                      {themeOption.label}
                      {theme === themeOption.value && <Check className="ml-auto h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="language"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("settings.language")}
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start ${isDarkMode ? "border-gray-700 bg-gray-700" : ""}`}
                  >
                    {languages.find((l) => l.code === language)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setLanguage(lang.code as Language)}
                    >
                      {lang.name}
                      {language === lang.code && <Check className="ml-auto h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={saveSettings}
            disabled={isUpdating}
            className={isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            {isUpdating ? `${t("settings.saving")}...` : t("settings.save")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
