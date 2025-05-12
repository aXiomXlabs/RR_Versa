"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage, type Language } from "@/contexts/language-context"

// Sprachoptionen mit Flaggen
const languageOptions: {
  code: Language
  flag: string
  nativeName: string
}[] = [
  {
    code: "de",
    flag: "🇩🇪",
    nativeName: "Deutsch",
  },
  {
    code: "en",
    flag: "🇬🇧",
    nativeName: "English",
  },
  {
    code: "es",
    flag: "🇪🇸",
    nativeName: "Español",
  },
  {
    code: "fr",
    flag: "🇫🇷",
    nativeName: "Français",
  },
  {
    code: "zh",
    flag: "🇨🇳",
    nativeName: "中文",
  },
]

interface LanguageSelectorModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LanguageSelectorModal({ isOpen, onClose }: LanguageSelectorModalProps) {
  const { language, setLanguage, t } = useLanguage()
  const [hoveredLanguage, setHoveredLanguage] = useState<Language | null>(null)

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    // Optional: Modal nach Auswahl schließen
    // onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Hintergrund */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="bg-[#121212] border border-neon/30 rounded-xl w-full max-w-md relative z-10 overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Glüheffekt */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent pointer-events-none" />

            {/* Schließen-Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-silver hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-1">{t("language.title")}</h2>
              <p className="text-silver mb-6">{t("language.subtitle")}</p>

              <div className="space-y-2 mb-6">
                {languageOptions.map((option) => {
                  const isActive = language === option.code
                  const isHovered = hoveredLanguage === option.code

                  return (
                    <motion.div
                      key={option.code}
                      className={`relative rounded-lg p-4 border-2 transition-all cursor-pointer flex items-center ${
                        isActive
                          ? "border-neon"
                          : isHovered
                            ? "border-white/30"
                            : "border-transparent hover:border-white/10"
                      }`}
                      onClick={() => handleLanguageSelect(option.code)}
                      onMouseEnter={() => setHoveredLanguage(option.code)}
                      onMouseLeave={() => setHoveredLanguage(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Aktiv-Indikator */}
                      {isActive && (
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-neon text-black rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      )}

                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{option.flag}</span>
                        <div>
                          <p className="font-medium">{option.nativeName}</p>
                          <p className="text-xs text-silver">{t(`language.${option.code}`)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-white/10 hover:border-white/30 text-silver hover:text-white"
                >
                  {t("theme.cancel")}
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-neon hover:bg-neon/90 text-black font-bold transition-all duration-200"
                >
                  {t("theme.apply")}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
