"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function InteractiveCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .interactive-card, [data-cursor="button"], [data-cursor="link"]',
    )

    const mouseEnterInteractive = () => setCursorVariant("interactive")
    const mouseLeaveInteractive = () => setCursorVariant("default")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", mouseEnterInteractive)
      el.addEventListener("mouseleave", mouseLeaveInteractive)
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", mouseEnterInteractive)
        el.removeEventListener("mouseleave", mouseLeaveInteractive)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(57, 255, 20, 0)",
      border: "2px solid rgba(57, 255, 20, 0.3)",
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 30,
      },
    },
    interactive: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(57, 255, 20, 0.1)",
      border: "2px solid rgba(57, 255, 20, 0.5)",
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 30,
      },
    },
  }

  // Only show custom cursor on desktop
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
      variants={variants}
      animate={cursorVariant}
    />
  )
}
