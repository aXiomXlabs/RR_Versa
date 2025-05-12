"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X } from "lucide-react"

// Define theme types
export type MenuTheme = "default" | "dark" | "light" | "neon" | "cyberpunk" | "pastel"

// Define theme color schemes
export const themeColors: Record<
  MenuTheme,
  {
    main: "neon" | "blue" | "purple" | "red" | "custom"
    options: Array<"neon" | "blue" | "purple" | "red" | "custom">
    customColors?: {
      main: {
        bg: string
        text: string
        hover: string
        shadow: string
      }
      options: Array<{
        bg: string
        text: string
        hover: string
        shadow: string
      }>
    }
  }
> = {
  default: {
    main: "neon",
    options: ["neon", "blue", "purple", "red"],
  },
  dark: {
    main: "custom",
    options: ["custom", "custom", "custom", "custom", "custom"],
    customColors: {
      main: {
        bg: "bg-gray-800",
        text: "text-white",
        hover: "hover:bg-gray-700",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.5)]",
      },
      options: [
        {
          bg: "bg-gray-700",
          text: "text-white",
          hover: "hover:bg-gray-600",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
        },
        {
          bg: "bg-gray-700",
          text: "text-white",
          hover: "hover:bg-gray-600",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
        },
        {
          bg: "bg-gray-700",
          text: "text-white",
          hover: "hover:bg-gray-600",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
        },
        {
          bg: "bg-gray-700",
          text: "text-white",
          hover: "hover:bg-gray-600",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
        },
        {
          bg: "bg-gray-700",
          text: "text-white",
          hover: "hover:bg-gray-600",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
        },
      ],
    },
  },
  light: {
    main: "custom",
    options: ["custom", "custom", "custom", "custom", "custom"],
    customColors: {
      main: {
        bg: "bg-white",
        text: "text-gray-800",
        hover: "hover:bg-gray-100",
        shadow: "shadow-[0_0_15px_rgba(0,0,0,0.2)]",
      },
      options: [
        {
          bg: "bg-gray-100",
          text: "text-gray-800",
          hover: "hover:bg-gray-200",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
        },
        {
          bg: "bg-gray-100",
          text: "text-gray-800",
          hover: "hover:bg-gray-200",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
        },
        {
          bg: "bg-gray-100",
          text: "text-gray-800",
          hover: "hover:bg-gray-200",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
        },
        {
          bg: "bg-gray-100",
          text: "text-gray-800",
          hover: "hover:bg-gray-200",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
        },
        {
          bg: "bg-gray-100",
          text: "text-gray-800",
          hover: "hover:bg-gray-200",
          shadow: "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
        },
      ],
    },
  },
  neon: {
    main: "neon",
    options: ["neon", "neon", "neon", "neon", "neon"],
  },
  cyberpunk: {
    main: "custom",
    options: ["custom", "custom", "custom", "custom", "custom"],
    customColors: {
      main: {
        bg: "bg-[#FF00FF]",
        text: "text-black",
        hover: "hover:bg-[#FF00FF]/90",
        shadow: "shadow-[0_0_20px_rgba(255,0,255,0.7)]",
      },
      options: [
        {
          bg: "bg-[#00FFFF]",
          text: "text-black",
          hover: "hover:bg-[#00FFFF]/90",
          shadow: "shadow-[0_0_20px_rgba(0,255,255,0.7)]",
        },
        {
          bg: "bg-[#FF00FF]",
          text: "text-black",
          hover: "hover:bg-[#FF00FF]/90",
          shadow: "shadow-[0_0_20px_rgba(255,0,255,0.7)]",
        },
        {
          bg: "bg-[#FFFF00]",
          text: "text-black",
          hover: "hover:bg-[#FFFF00]/90",
          shadow: "shadow-[0_0_20px_rgba(255,255,0,0.7)]",
        },
        {
          bg: "bg-[#00FF00]",
          text: "text-black",
          hover: "hover:bg-[#00FF00]/90",
          shadow: "shadow-[0_0_20px_rgba(0,255,0,0.7)]",
        },
        {
          bg: "bg-[#FF8800]",
          text: "text-black",
          hover: "hover:bg-[#FF8800]/90",
          shadow: "shadow-[0_0_20px_rgba(255,136,0,0.7)]",
        },
      ],
    },
  },
  pastel: {
    main: "custom",
    options: ["custom", "custom", "custom", "custom", "custom"],
    customColors: {
      main: {
        bg: "bg-[#FFB6C1]", // Light pink
        text: "text-gray-800",
        hover: "hover:bg-[#FFB6C1]/90",
        shadow: "shadow-[0_0_15px_rgba(255,182,193,0.5)]",
      },
      options: [
        {
          bg: "bg-[#AFEEEE]", // Pale turquoise
          text: "text-gray-800",
          hover: "hover:bg-[#AFEEEE]/90",
          shadow: "shadow-[0_0_15px_rgba(175,238,238,0.5)]",
        },
        {
          bg: "bg-[#FFFACD]", // Lemon chiffon
          text: "text-gray-800",
          hover: "hover:bg-[#FFFACD]/90",
          shadow: "shadow-[0_0_15px_rgba(255,250,205,0.5)]",
        },
        {
          bg: "bg-[#D8BFD8]", // Thistle
          text: "text-gray-800",
          hover: "hover:bg-[#D8BFD8]/90",
          shadow: "shadow-[0_0_15px_rgba(216,191,216,0.5)]",
        },
        {
          bg: "bg-[#98FB98]", // Pale green
          text: "text-gray-800",
          hover: "hover:bg-[#98FB98]/90",
          shadow: "shadow-[0_0_15px_rgba(152,251,152,0.5)]",
        },
        {
          bg: "bg-[#B0E0E6]", // Powder blue
          text: "text-gray-800",
          hover: "hover:bg-[#B0E0E6]/90",
          shadow: "shadow-[0_0_15px_rgba(176,224,230,0.5)]",
        },
      ],
    },
  },
}

interface MenuOption {
  id: string
  icon: React.ReactNode
  label: string
  color: "neon" | "blue" | "purple" | "red"
  onClick: () => void
}

interface ExpandableFloatingMenuProps {
  options: MenuOption[]
  position?: "bottom-right" | "bottom-left"
  scrollThreshold?: number
  mainButtonColor?: "neon" | "blue" | "purple" | "red"
  expandDirection?: "vertical" | "radial"
  theme?: MenuTheme
}

export default function ExpandableFloatingMenu({
  options,
  position = "bottom-right",
  scrollThreshold = 300,
  mainButtonColor = "neon",
  expandDirection = "vertical",
  theme = "default",
}: ExpandableFloatingMenuProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Get the theme configuration
  const themeConfig = themeColors[theme]

  // Use the theme's main button color if specified
  const effectiveMainButtonColor = themeConfig.main

  // Color mapping
  const colorMap = {
    neon: {
      bg: "bg-neon",
      text: "text-black",
      hover: "hover:bg-neon/90",
      shadow: "shadow-[0_0_15px_rgba(57,255,20,0.5)]",
    },
    blue: {
      bg: "bg-blue",
      text: "text-black",
      hover: "hover:bg-blue/90",
      shadow: "shadow-[0_0_15px_rgba(0,209,255,0.5)]",
    },
    purple: {
      bg: "bg-purple",
      text: "text-white",
      hover: "hover:bg-purple/90",
      shadow: "shadow-[0_0_15px_rgba(217,0,255,0.5)]",
    },
    red: {
      bg: "bg-red",
      text: "text-white",
      hover: "hover:bg-red/90",
      shadow: "shadow-[0_0_15px_rgba(255,45,85,0.5)]",
    },
    custom: {
      bg: themeConfig.customColors?.main.bg || "bg-gray-500",
      text: themeConfig.customColors?.main.text || "text-white",
      hover: themeConfig.customColors?.main.hover || "hover:bg-gray-400",
      shadow: themeConfig.customColors?.main.shadow || "shadow-[0_0_15px_rgba(0,0,0,0.5)]",
    },
  }

  // Get color classes for a specific option based on theme
  const getOptionColorClasses = (index: number, optionColor: "neon" | "blue" | "purple" | "red") => {
    // If using a theme with custom colors, use those
    if (themeConfig.options[index] === "custom" && themeConfig.customColors) {
      const customOption = themeConfig.customColors.options[index]
      return {
        bg: customOption.bg,
        text: customOption.text,
        hover: customOption.hover,
        shadow: customOption.shadow,
      }
    }

    // Otherwise use the color specified in the option or the theme
    const color = themeConfig.options[index] || optionColor
    return colorMap[color]
  }

  // Position mapping
  const positionClass = position === "bottom-right" ? "right-6" : "left-6"

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false) // Close menu when scrolling back to top
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollThreshold])

  // Close menu when clicking outside
  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(".floating-menu")) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isExpanded])

  // Toggle menu expansion
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  // Handle option click
  const handleOptionClick = (option: MenuOption) => (e: React.MouseEvent) => {
    e.stopPropagation()
    option.onClick()
    setIsExpanded(false)
  }

  // Calculate positions for radial menu items
  const getRadialPosition = (index: number, total: number) => {
    if (expandDirection !== "radial") return {}

    const radius = 80 // Distance from main button
    const angleStep = Math.PI / 2 / (total - 1) // Quarter circle distribution
    const baseAngle = position === "bottom-right" ? Math.PI : Math.PI * 1.5 // Starting angle based on position

    const angle = baseAngle - index * angleStep
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return {
      x,
      y,
    }
  }

  // Calculate positions for vertical menu items
  const getVerticalPosition = (index: number) => {
    if (expandDirection !== "vertical") return {}

    return {
      x: 0,
      y: -((index + 1) * 60), // 60px spacing between buttons
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={`fixed bottom-6 ${positionClass} z-50 floating-menu`}>
          {/* Menu options */}
          <AnimatePresence>
            {isExpanded && (
              <>
                {options.map((option, index) => {
                  const colorClasses = getOptionColorClasses(index, option.color)

                  return (
                    <motion.button
                      key={option.id}
                      className={`absolute bottom-0 ${positionClass === "right-6" ? "right-0" : "left-0"} ${
                        colorClasses.bg
                      } ${colorClasses.text} ${colorClasses.hover} ${
                        colorClasses.shadow
                      } rounded-full p-3 flex items-center gap-2 transition-all duration-300`}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                        ...getVerticalPosition(index),
                        ...getRadialPosition(index, options.length),
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        ...getVerticalPosition(index),
                        ...getRadialPosition(index, options.length),
                      }}
                      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                      onClick={handleOptionClick(option)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="button"
                    >
                      {option.icon}
                      <span className="text-sm font-medium whitespace-nowrap">{option.label}</span>
                    </motion.button>
                  )
                })}
              </>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.button
            className={`${colorMap[effectiveMainButtonColor].bg} ${colorMap[effectiveMainButtonColor].text} ${
              colorMap[effectiveMainButtonColor].hover
            } ${colorMap[effectiveMainButtonColor].shadow} rounded-full p-3 relative z-10`}
            onClick={toggleMenu}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="button"
          >
            <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.2 }}>
              {isExpanded ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}
