"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Check, Rocket, MessageSquare, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { MenuTheme } from "./expandable-floating-menu"

// Define theme color schemes (simplified version of what's in expandable-floating-menu.tsx)
const themeColors: Record<
  MenuTheme,
  {
    main: {
      bg: string
      text: string
      shadow: string
    }
    options: Array<{
      bg: string
      text: string
      shadow: string
    }>
    name: string
    description: string
  }
> = {
  default: {
    main: {
      bg: "bg-neon",
      text: "text-black",
      shadow: "shadow-[0_0_15px_rgba(57,255,20,0.5)]",
    },
    options: [
      {
        bg: "bg-neon",
        text: "text-black",
        shadow: "shadow-[0_0_15px_rgba(57,255,20,0.5)]",
      },
      {
        bg: "bg-blue",
        text: "text-black",
        shadow: "shadow-[0_0_15px_rgba(0,209,255,0.5)]",
      },
      {
        bg: "bg-purple",
        text: "text-white",
        shadow: "shadow-[0_0_15px_rgba(217,0,255,0.5)]",
      },
      {
        bg: "bg-red",
        text: "text-white",
        shadow: "shadow-[0_0_15px_rgba(255,45,85,0.5)]",
      },
    ],
    name: "Default",
    description: "The original color scheme with varied button colors",
  },
  dark: {
    main: {
      bg: "bg-gray-800",
      text: "text-white",
      shadow: "shadow-[0_0_15px_rgba(0,0,0,0.5)]",
    },
    options: [
      {
        bg: "bg-gray-700",
        text: "text-white",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
      },
      {
        bg: "bg-gray-700",
        text: "text-white",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
      },
      {
        bg: "bg-gray-700",
        text: "text-white",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
      },
      {
        bg: "bg-gray-700",
        text: "text-white",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
      },
    ],
    name: "Dark",
    description: "Sleek dark gray buttons with subtle shadows",
  },
  light: {
    main: {
      bg: "bg-white",
      text: "text-gray-800",
      shadow: "shadow-[0_0_15px_rgba(0,0,0,0.2)]",
    },
    options: [
      {
        bg: "bg-gray-100",
        text: "text-gray-800",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
      },
      {
        bg: "bg-gray-100",
        text: "text-gray-800",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
      },
      {
        bg: "bg-gray-100",
        text: "text-gray-800",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
      },
      {
        bg: "bg-gray-100",
        text: "text-gray-800",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
      },
    ],
    name: "Light",
    description: "Clean white and light gray buttons for minimal interfaces",
  },
  neon: {
    main: {
      bg: "bg-neon",
      text: "text-black",
      shadow: "shadow-[0_0_15px_rgba(57,255,20,0.5)]",
    },
    options: [
      {
        bg: "bg-neon",
        text: "text-black",
        shadow: "shadow-[0_0_15px_rgba(57,255,20,0.5)]",
      },
      {
        bg: "bg-neon",
        text: "text-black",
        shadow: "shadow-[0_0_15px_rgba(57,255,20,0.5)]",
      },
      {
        bg: "bg-neon",
        text: "text-black",
        shadow: "shadow-[0_0_15px_rgba(57,255,20,0.5)]",
      },
      {
        bg: "bg-neon",
        text: "text-black",
        shadow: "shadow-[0_0_15px_rgba(57,255,20,0.5)]",
      },
    ],
    name: "Neon",
    description: "All buttons in vibrant neon green for high visibility",
  },
  cyberpunk: {
    main: {
      bg: "bg-[#FF00FF]",
      text: "text-black",
      shadow: "shadow-[0_0_20px_rgba(255,0,255,0.7)]",
    },
    options: [
      {
        bg: "bg-[#00FFFF]",
        text: "text-black",
        shadow: "shadow-[0_0_20px_rgba(0,255,255,0.7)]",
      },
      {
        bg: "bg-[#FF00FF]",
        text: "text-black",
        shadow: "shadow-[0_0_20px_rgba(255,0,255,0.7)]",
      },
      {
        bg: "bg-[#FFFF00]",
        text: "text-black",
        shadow: "shadow-[0_0_20px_rgba(255,255,0,0.7)]",
      },
      {
        bg: "bg-[#00FF00]",
        text: "text-black",
        shadow: "shadow-[0_0_20px_rgba(0,255,0,0.7)]",
      },
    ],
    name: "Cyberpunk",
    description: "Bold, high-contrast colors with bright glowing effects",
  },
  pastel: {
    main: {
      bg: "bg-[#FFB6C1]", // Light pink
      text: "text-gray-800",
      shadow: "shadow-[0_0_15px_rgba(255,182,193,0.5)]",
    },
    options: [
      {
        bg: "bg-[#AFEEEE]", // Pale turquoise
        text: "text-gray-800",
        shadow: "shadow-[0_0_15px_rgba(175,238,238,0.5)]",
      },
      {
        bg: "bg-[#FFFACD]", // Lemon chiffon
        text: "text-gray-800",
        shadow: "shadow-[0_0_15px_rgba(255,250,205,0.5)]",
      },
      {
        bg: "bg-[#D8BFD8]", // Thistle
        text: "text-gray-800",
        shadow: "shadow-[0_0_15px_rgba(216,191,216,0.5)]",
      },
      {
        bg: "bg-[#98FB98]", // Pale green
        text: "text-gray-800",
        shadow: "shadow-[0_0_15px_rgba(152,251,152,0.5)]",
      },
    ],
    name: "Pastel",
    description: "Soft, muted colors for a gentle, approachable look",
  },
}

interface ThemePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  currentTheme: MenuTheme
  onSelectTheme: (theme: MenuTheme) => void
}

export default function ThemePreviewModal({ isOpen, onClose, currentTheme, onSelectTheme }: ThemePreviewModalProps) {
  const [hoveredTheme, setHoveredTheme] = useState<MenuTheme | null>(null)

  // Sample icons for the preview
  const icons = [<Rocket key="rocket" />, <MessageSquare key="message" />, <Users key="users" />, <Zap key="zap" />]

  const handleThemeSelect = (theme: MenuTheme) => {
    onSelectTheme(theme)
    // Optional: close the modal after selection
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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="bg-[#121212] border border-neon/30 rounded-xl w-full max-w-4xl relative z-10 overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-silver hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-1">Choose a Theme</h2>
              <p className="text-silver mb-6">
                Select a theme for the floating menu to match your preference or website style.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {Object.entries(themeColors).map(([themeKey, theme]) => {
                  const isActive = currentTheme === themeKey
                  const isHovered = hoveredTheme === themeKey

                  return (
                    <motion.div
                      key={themeKey}
                      className={`relative rounded-lg p-4 border-2 transition-all cursor-pointer ${
                        isActive
                          ? "border-neon"
                          : isHovered
                            ? "border-white/30"
                            : "border-transparent hover:border-white/10"
                      }`}
                      onClick={() => handleThemeSelect(themeKey as MenuTheme)}
                      onMouseEnter={() => setHoveredTheme(themeKey as MenuTheme)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute top-2 right-2 bg-neon text-black rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      )}

                      <div className="mb-4">
                        <h3 className="text-lg font-bold">{theme.name}</h3>
                        <p className="text-xs text-silver">{theme.description}</p>
                      </div>

                      {/* Theme preview */}
                      <div className="relative h-32 bg-black/50 rounded-lg p-4 overflow-hidden">
                        {/* Main button preview */}
                        <div
                          className={`absolute bottom-4 right-4 ${theme.main.bg} ${theme.main.text} ${theme.main.shadow} rounded-full p-2 z-10`}
                        >
                          <Plus className="w-5 h-5" />
                        </div>

                        {/* Option buttons preview */}
                        {theme.options.map((option, index) => (
                          <div
                            key={index}
                            className={`absolute ${option.bg} ${option.text} ${
                              option.shadow
                            } rounded-full p-2 flex items-center gap-2 ${
                              index === 0
                                ? "bottom-16 right-4"
                                : index === 1
                                  ? "bottom-28 right-4"
                                  : index === 2
                                    ? "bottom-4 right-16"
                                    : "bottom-4 right-28"
                            }`}
                            style={{ transform: "scale(0.8)" }}
                          >
                            <span className="flex items-center justify-center w-5 h-5">
                              {icons[index % icons.length]}
                            </span>
                            {index < 2 && <span className="text-xs whitespace-nowrap">Option {index + 1}</span>}
                          </div>
                        ))}
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
                  Cancel
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-neon hover:bg-neon/90 text-black font-bold transition-all duration-200"
                >
                  Apply Theme
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
