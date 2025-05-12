"use client"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../hooks/use-media-query"

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 1.2
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Circuit node class
    class Node {
      x: number
      y: number
      radius: number
      color: string
      connections: Node[]
      glowing: boolean
      glowIntensity: number
      glowDirection: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.radius = Math.random() * 2 + 1
        this.color = Math.random() > 0.8 ? "#39FF14" : "#00D1FF"
        this.connections = []
        this.glowing = Math.random() > 0.7
        this.glowIntensity = Math.random() * 0.5
        this.glowDirection = Math.random() > 0.5 ? 0.005 : -0.005
      }

      draw() {
        if (!ctx) return

        // Update glow effect
        if (this.glowing) {
          this.glowIntensity += this.glowDirection
          if (this.glowIntensity > 0.5 || this.glowIntensity < 0.1) {
            this.glowDirection *= -1
          }
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Draw glow
        if (this.glowing) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, this.radius * 4)
          gradient.addColorStop(
            0,
            this.color === "#39FF14"
              ? `rgba(57, 255, 20, ${this.glowIntensity})`
              : `rgba(0, 209, 255, ${this.glowIntensity})`,
          )
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }

      drawConnections() {
        if (!ctx) return

        this.connections.forEach((node) => {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)

          // Create gradient for line
          const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y)
          gradient.addColorStop(0, this.color === "#39FF14" ? `rgba(57, 255, 20, 0.2)` : `rgba(0, 209, 255, 0.2)`)
          gradient.addColorStop(1, node.color === "#39FF14" ? `rgba(57, 255, 20, 0.2)` : `rgba(0, 209, 255, 0.2)`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 0.5
          ctx.stroke()
        })
      }
    }

    // Create nodes - fewer on mobile
    const nodes: Node[] = []
    const nodeCount = isMobile
      ? Math.floor(window.innerWidth / 40) // Fewer nodes on mobile
      : Math.floor(window.innerWidth / 20)

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      nodes.push(new Node(x, y))
    }

    // Create connections - fewer on mobile
    nodes.forEach((node) => {
      const connectionCount = isMobile
        ? Math.floor(Math.random() * 2) + 1 // Fewer connections on mobile
        : Math.floor(Math.random() * 3) + 1

      // Find closest nodes
      const sortedNodes = [...nodes]
        .filter((n) => n !== node)
        .sort((a, b) => {
          const distA = Math.hypot(a.x - node.x, a.y - node.y)
          const distB = Math.hypot(b.x - node.x, b.y - node.y)
          return distA - distB
        })

      // Connect to closest nodes
      for (let i = 0; i < Math.min(connectionCount, sortedNodes.length); i++) {
        if (Math.hypot(sortedNodes[i].x - node.x, sortedNodes[i].y - node.y) < 200) {
          node.connections.push(sortedNodes[i])
        }
      }
    })

    // Animation loop with reduced frame rate on mobile
    let frameCount = 0
    const frameSkip = isMobile ? 2 : 1 // Skip frames on mobile for better performance

    const animate = () => {
      if (!ctx || !isVisible) return

      frameCount++
      if (frameCount % frameSkip !== 0) {
        requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first (behind nodes)
      nodes.forEach((node) => node.drawConnections())

      // Draw nodes
      nodes.forEach((node) => node.draw())

      requestAnimationFrame(animate)
    }

    animate()

    // Visibility observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 },
    )

    if (canvas) {
      observer.observe(canvas)
    }

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (canvas) {
        observer.unobserve(canvas)
      }
    }
  }, [isMobile])

  return <canvas ref={canvasRef} className="absolute top-0 right-0 w-full h-full z-0 opacity-40" />
}
