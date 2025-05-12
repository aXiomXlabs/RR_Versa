"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useMediaQuery } from "../hooks/use-media-query"

interface AnimatedBotCardProps {
  title: string
  icon: React.ReactNode
  color: string
  description: string
  delay: number
  onClick?: () => void
}

export default function AnimatedBotCard({ title, icon, color, description, delay, onClick }: AnimatedBotCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Mouse position for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for the 3D rotation - reduced intensity on mobile
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], isMobile ? [5, -5] : [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], isMobile ? [-5, 5] : [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  // Particle state - fewer particles on mobile
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])

  // Handle mouse move for 3D effect
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5
    const normalizedY = (e.clientY - rect.top) / height - 0.5

    x.set(normalizedX)
    y.set(normalizedY)
  }

  // Handle touch move for mobile
  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!cardRef.current || !isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const touch = e.touches[0]

    // Calculate normalized touch position (-0.5 to 0.5)
    const normalizedX = (touch.clientX - rect.left) / width - 0.5
    const normalizedY = (touch.clientY - rect.top) / height - 0.5

    x.set(normalizedX * 0.7) // Reduce intensity for mobile
    y.set(normalizedY * 0.7) // Reduce intensity for mobile
  }

  // Generate particles on hover
  useEffect(() => {
    if (isHovered) {
      const particleCount = isMobile ? 5 : 10 // Fewer particles on mobile
      const newParticles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
      }))
      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [isHovered, isMobile])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="interactive-card h-full"
      data-cursor="button"
    >
      <motion.div
        ref={cardRef}
        className="h-full perspective-1000"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          x.set(0)
          y.set(0)
        }}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: isMobile ? 1.01 : 1.02 }} // Smaller scale on mobile
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className={`bg-dark/30 backdrop-blur-md border-${color}/30 hover:border-${color} p-4 md:p-6 transition-all duration-300 cursor-pointer group relative overflow-hidden h-full`}
        >
          {/* 3D floating elements - reduced on mobile */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          >
            {isHovered && (
              <>
                {particles.map((particle, i) => (
                  <motion.div
                    key={i}
                    className={`absolute rounded-full bg-${color}`}
                    initial={{
                      x: `${particle.x}%`,
                      y: `${particle.y}%`,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: `${particle.x + (Math.random() * 20 - 10)}%`,
                      y: `${particle.y - particle.speed * 20}%`,
                      opacity: [0, 1, 0],
                      scale: [0, particle.size / 10, 0],
                    }}
                    transition={{
                      duration: 1 + Math.random(),
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                    style={{
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-${color}/0 via-${color}/10 to-${color}/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`}
            style={{
              transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
              transition: "transform 1.5s ease-in-out",
            }}
          />

          <div className="flex items-start gap-3 md:gap-4 relative z-10">
            <motion.div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-${color} to-black/80 flex items-center justify-center`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
            >
              {icon}
            </motion.div>
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
              <div className="flex items-center">
                <span className="text-xs md:text-sm text-silver/70">Rust Rocket</span>
              </div>
              <motion.h3
                className={`text-xl md:text-2xl font-bold mb-1 md:mb-2 text-${color} group-hover:text-white transition-colors`}
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              >
                {title}
              </motion.h3>
              <p className="text-xs md:text-sm text-silver">{description}</p>
            </div>
          </div>

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
