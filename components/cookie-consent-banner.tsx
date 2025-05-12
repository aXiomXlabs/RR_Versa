"use client"

import { useState, useEffect } from "react"
import { useCookieConsent, type CookieConsent } from "@/contexts/cookie-consent-context"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Shield, Lock, Settings2, Info, Cookie } from "lucide-react"
import { cookieConsentTranslations } from "@/translations/cookie-consent-translations"
import { useLanguage } from "@/contexts/language-context"
import { useMediaQuery } from "@/hooks/use-media-query"

export function CookieConsentBanner() {
  const { language } = useLanguage()
  const { consent, showBanner, saveConsent, setShowBanner } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [localConsent, setLocalConsent] = useState<Partial<CookieConsent>>({
    necessary: true,
    functional: consent?.functional || false,
    analytics: consent?.analytics || false,
    marketing: consent?.marketing || false,
    personalization: consent?.personalization || false,
  })

  // Responsive design helpers
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  const isVerySmallScreen = useMediaQuery("(max-width: 380px)")

  // Wähle die Übersetzungen basierend auf der Sprache
  const translations =
    cookieConsentTranslations[language as keyof typeof cookieConsentTranslations] || cookieConsentTranslations.de

  // Aktualisiere die lokalen Einstellungen, wenn sich der Consent ändert
  useEffect(() => {
    if (consent) {
      setLocalConsent({
        necessary: true,
        functional: consent.functional,
        analytics: consent.analytics,
        marketing: consent.marketing,
        personalization: consent.personalization,
      })
    }
  }, [consent])

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      personalization: true,
    })
  }

  const handleRejectAll = () => {
    saveConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      personalization: false,
    })
  }

  const handleSaveSettings = () => {
    saveConsent(localConsent)
  }

  const handleToggle = (category: keyof Omit<CookieConsent, "timestamp">) => {
    if (category === "necessary") return // Kann nicht geändert werden

    setLocalConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const openDetails = () => {
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
  }

  if (!showBanner && !showDetails) {
    return null
  }

  // Übersetzte Texte für spezifische Elemente
  const requiredText =
    language === "de"
      ? "Erforderlich"
      : language === "en"
        ? "Required"
        : language === "es"
          ? "Requerido"
          : language === "fr"
            ? "Requis"
            : language === "zh"
              ? "必需的"
              : "Required"

  const sessionDurationText =
    language === "de"
      ? "Sitzung / 1 Jahr"
      : language === "en"
        ? "Session / 1 Year"
        : language === "es"
          ? "Sesión / 1 Año"
          : language === "fr"
            ? "Session / 1 An"
            : language === "zh"
              ? "会话 / 1 年"
              : "Session / 1 Year"

  const yearDurationText =
    language === "de"
      ? "1 Jahr"
      : language === "en"
        ? "1 Year"
        : language === "es"
          ? "1 Año"
          : language === "fr"
            ? "1 An"
            : language === "zh"
              ? "1 年"
              : "1 Year"

  const longDurationText =
    language === "de"
      ? "1 Tag - 2 Jahre"
      : language === "en"
        ? "1 Day - 2 Years"
        : language === "es"
          ? "1 Día - 2 Años"
          : language === "fr"
            ? "1 Jour - 2 Ans"
            : language === "zh"
              ? "1 天 - 2 年"
              : "1 Day - 2 Years"

  const dataControllerText =
    language === "de"
      ? "Verantwortlicher"
      : language === "en"
        ? "Data Controller"
        : language === "es"
          ? "Responsable"
          : language === "fr"
            ? "Responsable"
            : language === "zh"
              ? "数据控制者"
              : "Data Controller"

  const yourRightsText =
    language === "de"
      ? "Ihre Rechte"
      : language === "en"
        ? "Your Rights"
        : language === "es"
          ? "Sus Derechos"
          : language === "fr"
            ? "Vos Droits"
            : language === "zh"
              ? "您的权利"
              : "Your Rights"

  const rightsDescriptionText =
    language === "de"
      ? "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Sie können Ihre Einwilligung jederzeit widerrufen."
      : language === "en"
        ? "You have the right to access, rectify, delete, and restrict the processing of your personal data. You can withdraw your consent at any time."
        : language === "es"
          ? "Tiene derecho a acceder, rectificar, eliminar y restringir el procesamiento de sus datos personales. Puede retirar su consentimiento en cualquier momento."
          : language === "fr"
            ? "Vous avez le droit d'accéder, de rectifier, de supprimer et de restreindre le traitement de vos données personnelles. Vous pouvez retirer votre consentement à tout moment."
            : language === "zh"
              ? "您有权访问、更正、删除和限制对您个人数据的处理。您可以随时撤回您的同意。"
              : "You have the right to access, rectify, delete, and restrict the processing of your personal data. You can withdraw your consent at any time."

  const closeText =
    language === "de"
      ? "Schließen"
      : language === "en"
        ? "Close"
        : language === "es"
          ? "Cerrar"
          : language === "fr"
            ? "Fermer"
            : language === "zh"
              ? "关闭"
              : "Close"

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-up">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="mb-3 sm:mb-4 overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl ring-1 ring-gray-700">
              <div className="relative">
                {/* Decorative elements - reduced for very small screens */}
                {!isVerySmallScreen && (
                  <>
                    <div className="absolute -top-24 -left-20 h-40 w-40 rounded-full bg-green-500/10 blur-3xl"></div>
                    <div className="absolute -bottom-8 right-10 h-32 w-32 rounded-full bg-green-500/20 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/3 h-24 w-24 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"></div>
                  </>
                )}

                <div className="relative px-4 py-4 sm:px-6 sm:py-6">
                  {/* Mobile-optimized layout */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      {/* Icon and title section - compact for mobile */}
                      <div
                        className={`flex ${isVerySmallScreen ? "items-start" : "items-center"} ${isVerySmallScreen ? "flex-col" : "flex-row"}`}
                      >
                        <div
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white ${isVerySmallScreen ? "mb-2" : "mr-3"}`}
                        >
                          <Cookie className="h-5 w-5" />
                        </div>
                        <div className={`${isVerySmallScreen ? "w-full" : "ml-1"} flex-1`}>
                          <h2 className="text-lg sm:text-xl font-bold text-white">{translations.title}</h2>
                          <p className="mt-1 text-xs sm:text-sm text-gray-300 max-w-[95%] sm:max-w-2xl">
                            {translations.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Buttons - stacked for very small screens, side by side for others */}
                    <div className={`flex ${isVerySmallScreen ? "flex-col" : "flex-row"} gap-2 mt-2 sm:mt-3`}>
                      {/* On very small screens, we show only icons in the first two buttons to save space */}
                      <Button
                        variant="outline"
                        onClick={openDetails}
                        className="flex items-center justify-center gap-2 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <Settings2 className="h-4 w-4" />
                        {!isVerySmallScreen && <span>{translations.manageCookies}</span>}
                        {isVerySmallScreen && <span className="sr-only">{translations.manageCookies}</span>}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleRejectAll}
                        className="flex items-center justify-center gap-2 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <Shield className="h-4 w-4" />
                        {!isVerySmallScreen && <span>{translations.rejectAll}</span>}
                        {isVerySmallScreen && <span className="sr-only">{translations.rejectAll}</span>}
                      </Button>
                      {/* Always show text for the primary action button */}
                      <Button
                        onClick={handleAcceptAll}
                        className="relative flex items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white transition-all hover:from-green-600 hover:to-green-700"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <Lock className="h-4 w-4" />
                        <span>{translations.acceptAll}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detaillierter Cookie-Dialog - optimized for mobile */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-h-[90vh] w-[95vw] sm:w-auto overflow-y-auto sm:max-w-[600px] p-4 sm:p-6">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900/30 via-transparent to-transparent opacity-30"></div>

          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white">
                <Cookie className="h-5 w-5" />
              </div>
              <DialogTitle className="text-lg sm:text-xl">{translations.title}</DialogTitle>
            </div>
            <DialogDescription className="text-xs sm:text-sm">{translations.description}</DialogDescription>
            <button
              onClick={closeDetails}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full bg-gray-100 p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={closeText}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{closeText}</span>
            </button>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full mt-2">
            <TabsList className="grid grid-cols-3 mb-4 bg-gray-100 h-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white py-1 text-xs sm:text-sm">
                {isVerySmallScreen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-layout-dashboard"
                    aria-label={translations.tabOverview}
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                ) : (
                  translations.tabOverview
                )}
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-white py-1 text-xs sm:text-sm">
                {isVerySmallScreen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-list-checks"
                    aria-label={translations.tabDetails}
                  >
                    <path d="m3 17 2 2 4-4" />
                    <path d="m3 7 2 2 4-4" />
                    <path d="M13 6h8" />
                    <path d="M13 12h8" />
                    <path d="M13 18h8" />
                  </svg>
                ) : (
                  translations.tabDetails
                )}
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-white py-1 text-xs sm:text-sm">
                {isVerySmallScreen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield"
                    aria-label={translations.tabPrivacyPolicy}
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                ) : (
                  translations.tabPrivacyPolicy
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-gray-500">{translations.description}</p>

              <div className="space-y-3 sm:space-y-4">
                {/* Cookie category cards - simplified for mobile */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-medium">{translations.necessary}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 sm:line-clamp-none">
                          {translations.necessaryDescription}
                        </p>
                      </div>
                    </div>
                    <Switch checked disabled className="data-[state=checked]:bg-blue-600" />
                  </div>
                </div>

                {/* Repeat for other categories with the same mobile optimizations */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <Settings2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-medium">{translations.functional}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 sm:line-clamp-none">
                          {translations.functionalDescription}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={localConsent.functional}
                      onCheckedChange={() => handleToggle("functional")}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                        <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-medium">{translations.analytics}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 sm:line-clamp-none">
                          {translations.analyticsDescription}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={localConsent.analytics}
                      onCheckedChange={() => handleToggle("analytics")}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                </div>

                {/* Marketing and Personalization categories follow the same pattern */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-megaphone sm:h-4 sm:w-4"
                        >
                          <path d="m3 11 18-5v12L3 13" />
                          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-medium">{translations.marketing}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 sm:line-clamp-none">
                          {translations.marketingDescription}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={localConsent.marketing}
                      onCheckedChange={() => handleToggle("marketing")}
                      className="data-[state=checked]:bg-orange-600"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-pink-100 text-pink-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-cog sm:h-4 sm:w-4"
                        >
                          <circle cx="18" cy="15" r="3" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                          <path d="m21.7 16.4-.9-.3" />
                          <path d="m15.2 13.9-.9-.3" />
                          <path d="m16.6 18.7.3-.9" />
                          <path d="m19.1 12.2.3-.9" />
                          <path d="m19.6 18.7-.4-1" />
                          <path d="m16.8 12.3-.4-1" />
                          <path d="m14.3 16.6 1-.4" />
                          <path d="m21.7 13.5 1-.4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-medium">{translations.personalization}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 sm:line-clamp-none">
                          {translations.personalizationDescription}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={localConsent.personalization}
                      onCheckedChange={() => handleToggle("personalization")}
                      className="data-[state=checked]:bg-pink-600"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Details tab content */}
            <TabsContent value="details" className="space-y-4">
              <div className="space-y-3 sm:space-y-6">
                {/* Necessary cookies */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <h3 className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </div>
                    {translations.necessary}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{translations.necessaryDescription}</p>
                  <div className="rounded-md bg-white p-2 sm:p-3 border border-gray-200">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <p className="text-xs font-mono font-semibold">session, csrf, auth</p>
                      <span className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-blue-100 text-blue-700">
                        {requiredText}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-building sm:w-12 sm:h-12"
                      >
                        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01" />
                        <path d="M16 6h.01" />
                        <path d="M12 6h.01" />
                        <path d="M12 10h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 10h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 10h.01" />
                        <path d="M8 14h.01" />
                      </svg>
                      {translations.cookieDetails?.provider || "Anbieter"}: Rust Rocket
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock sm:w-12 sm:h-12"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {translations.cookieDetails?.duration || "Speicherdauer"}: {sessionDurationText}
                    </p>
                  </div>
                </div>

                {/* Functional cookies */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <h3 className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <Settings2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </div>
                    {translations.functional}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{translations.functionalDescription}</p>
                  <div className="rounded-md bg-white p-2 sm:p-3 border border-gray-200">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <p className="text-xs font-mono font-semibold">preferences, language, theme</p>
                      <Switch
                        checked={localConsent.functional}
                        onCheckedChange={() => handleToggle("functional")}
                        className="h-4 w-8 data-[state=checked]:bg-green-600"
                      />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-building sm:w-12 sm:h-12"
                      >
                        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01" />
                        <path d="M16 6h.01" />
                        <path d="M12 6h.01" />
                        <path d="M12 10h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 10h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 10h.01" />
                        <path d="M8 14h.01" />
                      </svg>
                      {translations.cookieDetails?.provider || "Anbieter"}: Rust Rocket
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock sm:w-12 sm:h-12"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {translations.cookieDetails?.duration || "Speicherdauer"}: {yearDurationText}
                    </p>
                  </div>
                </div>

                {/* Analytics cookies */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <h3 className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                      <Info className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </div>
                    {translations.analytics}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{translations.analyticsDescription}</p>
                  <div className="rounded-md bg-white p-2 sm:p-3 border border-gray-200">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <p className="text-xs font-mono font-semibold">_ga, _gid, _gat</p>
                      <Switch
                        checked={localConsent.analytics}
                        onCheckedChange={() => handleToggle("analytics")}
                        className="h-4 w-8 data-[state=checked]:bg-purple-600"
                      />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-building sm:w-12 sm:h-12"
                      >
                        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01" />
                        <path d="M16 6h.01" />
                        <path d="M12 6h.01" />
                        <path d="M12 10h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 10h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 10h.01" />
                        <path d="M8 14h.01" />
                      </svg>
                      {translations.cookieDetails?.provider || "Anbieter"}: Google Analytics (G-6GRKXCYXWW)
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock sm:w-12 sm:h-12"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {translations.cookieDetails?.duration || "Speicherdauer"}: {longDurationText}
                    </p>
                  </div>
                </div>

                {/* Marketing cookies */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <h3 className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-megaphone h-2.5 w-2.5 sm:h-3 sm:w-3"
                      >
                        <path d="m3 11 18-5v12L3 13" />
                        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                      </svg>
                    </div>
                    {translations.marketing}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{translations.marketingDescription}</p>
                  <div className="rounded-md bg-white p-2 sm:p-3 border border-gray-200">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <p className="text-xs font-mono font-semibold">_fbp, fr, lidc, personalization_id, tt_*</p>
                      <Switch
                        checked={localConsent.marketing}
                        onCheckedChange={() => handleToggle("marketing")}
                        className="h-4 w-8 data-[state=checked]:bg-orange-600"
                      />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-building sm:w-12 sm:h-12"
                      >
                        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01" />
                        <path d="M16 6h.01" />
                        <path d="M12 6h.01" />
                        <path d="M12 10h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 10h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 10h.01" />
                        <path d="M8 14h.01" />
                      </svg>
                      {translations.cookieDetails?.provider || "Anbieter"}: Facebook, LinkedIn, Twitter, TikTok
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock sm:w-12 sm:h-12"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {translations.cookieDetails?.duration || "Speicherdauer"}: {longDurationText}
                    </p>
                  </div>
                </div>

                {/* Personalization cookies */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <h3 className="flex items-center gap-2 font-bold text-sm sm:text-base mb-2">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-pink-100 text-pink-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-cog h-2.5 w-2.5 sm:h-3 sm:w-3"
                      >
                        <circle cx="18" cy="15" r="3" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                        <path d="m21.7 16.4-.9-.3" />
                        <path d="m15.2 13.9-.9-.3" />
                        <path d="m16.6 18.7.3-.9" />
                        <path d="m19.1 12.2.3-.9" />
                        <path d="m19.6 18.7-.4-1" />
                        <path d="m16.8 12.3-.4-1" />
                        <path d="m14.3 16.6 1-.4" />
                        <path d="m21.7 13.5 1-.4" />
                      </svg>
                    </div>
                    {translations.personalization}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{translations.personalizationDescription}</p>
                  <div className="rounded-md bg-white p-2 sm:p-3 border border-gray-200">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <p className="text-xs font-mono font-semibold">user_preferences, content_views</p>
                      <Switch
                        checked={localConsent.personalization}
                        onCheckedChange={() => handleToggle("personalization")}
                        className="h-4 w-8 data-[state=checked]:bg-pink-600"
                      />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-building sm:w-12 sm:h-12"
                      >
                        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01" />
                        <path d="M16 6h.01" />
                        <path d="M12 6h.01" />
                        <path d="M12 10h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 10h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 10h.01" />
                        <path d="M8 14h.01" />
                      </svg>
                      {translations.cookieDetails?.provider || "Anbieter"}: Rust Rocket
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock sm:w-12 sm:h-12"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {translations.cookieDetails?.duration || "Speicherdauer"}: {yearDurationText}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-3 sm:space-y-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                <p className="text-xs sm:text-sm">
                  {translations.privacyPolicyText}{" "}
                  <a href="/privacy-policy" className="text-green-600 hover:underline font-medium">
                    {translations.privacyPolicyLink}
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                <h3 className="font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-building-2 sm:w-16 sm:h-16"
                  >
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                    <path d="M10 6h4" />
                    <path d="M10 10h4" />
                    <path d="M10 14h4" />
                    <path d="M10 18h4" />
                  </svg>
                  {dataControllerText}
                </h3>
                <div className="bg-white rounded-md p-2 sm:p-3 border border-gray-200">
                  <p className="text-xs sm:text-sm">
                    Rust Rocket GmbH
                    <br />
                    Musterstraße 123
                    <br />
                    10115 Berlin
                    <br />
                    Deutschland
                  </p>
                  <p className="text-xs sm:text-sm mt-2 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-mail sm:w-14 sm:h-14"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    E-Mail:{" "}
                    <a href="mailto:privacy@rust-rocket.com" className="text-green-600 hover:underline">
                      privacy@rust-rocket.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                <h3 className="font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield-check sm:w-16 sm:h-16"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {yourRightsText}
                </h3>
                <div className="bg-white rounded-md p-2 sm:p-3 border border-gray-200">
                  <p className="text-xs sm:text-sm">{rightsDescriptionText}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer buttons - stacked for very small screens */}
          <DialogFooter
            className={`flex ${isVerySmallScreen ? "flex-col" : "flex-row"} gap-2 sm:gap-3 mt-3 sm:mt-4 ${isVerySmallScreen ? "" : "sm:justify-between"}`}
          >
            <div className={`flex gap-2 ${isVerySmallScreen ? "w-full" : ""}`}>
              <Button
                variant="outline"
                onClick={handleRejectAll}
                className={`${isVerySmallScreen ? "flex-1" : ""} text-xs sm:text-sm border-gray-300 hover:bg-gray-100 hover:text-gray-900`}
              >
                <Shield className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {translations.rejectAll}
              </Button>
              <Button
                onClick={handleAcceptAll}
                className={`${isVerySmallScreen ? "flex-1" : ""} text-xs sm:text-sm bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700`}
              >
                <Lock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {translations.acceptAll}
              </Button>
            </div>
            <Button
              onClick={handleSaveSettings}
              className={`${isVerySmallScreen ? "w-full" : ""} text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-save mr-1 sm:mr-2 sm:h-4 sm:w-4"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              {translations.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
