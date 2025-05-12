"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Zap } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface InteractiveTestimonialCardProps {
  name: string
  role: string
  text: string
  color: string
  index: number
}

export default function InteractiveTestimonialCard({
  name,
  role,
  text,
  color,
  index,
}: InteractiveTestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for the 3D rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

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
          className={`bg-dark/50 border-${color}/30 hover:border-${color}/70 p-6 transition-all duration-300 h-full relative overflow-hidden group`}
        >
          {/* Animated gradient background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br from-${color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            animate={
              isHovered
                ? {
                    background: [
                      `radial-gradient(circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, ${
                        color === "neon"
                          ? "#39FF14"
                          : color === "blue"
                            ? "#00D1FF"
                            : color === "purple"
                              ? "#D900FF"
                              : "#FF2D55"
                      }20 0%, transparent 50%)`,
                    ],
                  }
                : {}
            }
          />

          <div className="flex flex-col gap-4 relative z-10">
            {/* User info with 3D effect */}
            <div
              className="flex items-center gap-3"
              style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
            >
              <motion.div
                className={`w-12 h-12 rounded-full bg-gradient-to-br from-${color} to-black/80 border border-${color}/50 flex items-center justify-center`}
                animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              >
                {name.charAt(0)}
              </motion.div>
              <div>
                <h4 className="font-bold">{name}</h4>
                <p className="text-sm text-silver">{role}</p>
              </div>
            </div>

            {/* Testimonial text with 3D effect */}
            <motion.p className="text-silver" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
              "{text}"
            </motion.p>

            {/* Rating stars with animation */}
            <motion.div className="flex" style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={
                    isHovered
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, 0],
                          transition: { delay: i * 0.1, duration: 0.3 },
                        }
                      : {}
                  }
                >
                  <Zap key={i} className={`w-4 h-4 text-${color}`} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quote mark decoration */}
          <motion.div
            className={`absolute -bottom-6 -right-6 text-6xl font-serif text-${color}/10 select-none`}
            animate={isHovered ? { scale: 1.2, opacity: 0.2 } : { scale: 1, opacity: 0.1 }}
          >
            "
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
