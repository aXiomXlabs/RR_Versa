"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface FeatureCard3DProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  index: number
}

export default function FeatureCard3D({ icon, title, description, color, index }: FeatureCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for the 3D rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 })

  // Handle mouse move for 3D effect
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5
    const normalizedY = (e.clientY - rect.top) / height - 0.5

    x.set(normalizedX)
    y.set(normalizedY)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="interactive-card"
      data-cursor="button"
    >
      <motion.div
        ref={cardRef}
        className="h-full perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          x.set(0)
          y.set(0)
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className={`backdrop-blur bg-white/5 ring-1 ring-${color}/30 hover:ring-${color}/70 p-8 transition-all duration-300 h-full relative overflow-hidden group`}
        >
          {/* Background glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-${color}/0 via-${color}/5 to-${color}/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Floating icon with 3D effect */}
          <motion.div
            className={`text-${color} mb-4`}
            style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
            animate={isHovered ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>

          {/* Title with 3D effect */}
          <motion.h3
            className="text-xl font-bold mb-2"
            style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          >
            {title}
          </motion.h3>

          {/* Description with 3D effect */}
          <motion.p
            className="text-sm text-silver"
            style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
          >
            {description}
          </motion.p>

          {/* Animated corner accent */}
          <motion.div
            className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-${color}/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            style={{
              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            }}
          />

          {/* Bottom highlight on hover */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-${color}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}
