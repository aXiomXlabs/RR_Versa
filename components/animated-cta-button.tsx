"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useMediaQuery } from "../hooks/use-media-query"

interface AnimatedCTAButtonProps {
  children: React.ReactNode
  href: string
  className?: string
  color?: "neon" | "blue" | "purple" | "red"
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function AnimatedCTAButton({
  children,
  href,
  className = "",
  color = "neon",
  onClick,
}: AnimatedCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Color mapping
  const colorMap = {
    neon: {
      bg: "bg-neon",
      text: "text-black",
      shadow: "shadow-[0_0_20px_#39FF14]",
      hoverShadow: "hover:shadow-[0_0_30px_#39FF14]",
      particleColor: "#39FF14",
    },
    blue: {
      bg: "bg-blue",
      text: "text-black",
      shadow: "shadow-[0_0_20px_#00D1FF]",
      hoverShadow: "hover:shadow-[0_0_30px_#00D1FF]",
      particleColor: "#00D1FF",
    },
    purple: {
      bg: "bg-purple",
      text: "text-white",
      shadow: "shadow-[0_0_20px_#D900FF]",
      hoverShadow: "hover:shadow-[0_0_30px_#D900FF]",
      particleColor: "#D900FF",
    },
    red: {
      bg: "bg-red",
      text: "text-white",
      shadow: "shadow-[0_0_20px_#FF2D55]",
      hoverShadow: "hover:shadow-[0_0_30px_#FF2D55]",
      particleColor: "#FF2D55",
    },
  }

  const { bg, text, shadow, hoverShadow, particleColor } = colorMap[color]

  // Reduce particle count on mobile
  const particleCount = isMobile ? 5 : 10

  return (
    <div className="relative" data-cursor="button">
      {/* Particle effects - only on desktop */}
      {isHovered && !isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: particleColor,
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: "50%",
                top: "50%",
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        whileHover={{ scale: isMobile ? 1.03 : 1.05 }} // Smaller scale on mobile
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative"
      >
        <Button
          asChild
          size={isMobile ? "default" : "lg"}
          className={`${bg} ${text} ${shadow} ${hoverShadow} hover:scale-105 transition-all duration-200 relative overflow-hidden ${className}`}
        >
          <a href={href} onClick={onClick}>
            {/* Animated gradient overlay */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, transparent, ${particleColor}80, transparent)`,
                transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
                transition: "transform 0.8s ease-in-out",
              }}
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
          </a>
        </Button>
      </motion.div>
    </div>
  )
}
