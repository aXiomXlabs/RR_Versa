"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Rocket } from "lucide-react"

interface FloatingActionButtonProps {
  scrollThreshold?: number
  position?: "bottom-right" | "bottom-left"
  icon?: "arrow" | "rocket"
  color?: "neon" | "blue" | "purple" | "red"
  label?: string
  showLabel?: boolean
  onClick?: () => void
}

export default function FloatingActionButton({
  scrollThreshold = 300,
  position = "bottom-right",
  icon = "rocket",
  color = "neon",
  label = "Back to Top",
  showLabel = true,
  onClick,
}: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

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
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollThreshold])

  // Default scroll to top handler
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed bottom-6 ${positionClass} z-50 ${colorMap[color].bg} ${colorMap[color].text} ${
            colorMap[color].hover
          } ${colorMap[color].shadow} rounded-full p-3 flex items-center gap-2 transition-all duration-300`}
          onClick={handleClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="button"
        >
          {icon === "arrow" ? <ArrowUp className="w-5 h-5" /> : <Rocket className="w-5 h-5" />}
          {showLabel && <span className="text-sm font-medium">{label}</span>}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
