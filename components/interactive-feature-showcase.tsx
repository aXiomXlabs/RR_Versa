"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Rocket, Users, ArrowRightLeft, Code, ChevronRight, Clock, Zap, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface FeatureProps {
  icon: React.ReactNode
  secondaryIcon: React.ReactNode
  title: string
  description: string
  color: string
  stats: {
    value: string
    label: string
  }[]
  details: string
  index: number
}

const FeatureCard = ({ icon, secondaryIcon, title, description, color, stats, details, index }: FeatureProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <Card
        className={`bg-dark/30 backdrop-blur-md border-${color}/30 hover:border-${color} p-6 transition-all duration-300 cursor-pointer group relative overflow-hidden h-full`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Background glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Feature header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex items-center gap-4">
            <motion.div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${color} to-black/80 flex items-center justify-center`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
            <div>
              <h3 className={`text-2xl font-bold text-${color} group-hover:text-white transition-colors`}>{title}</h3>
              <p className="text-silver text-sm">{description}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className={`text-${color} flex-shrink-0`}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Stats row - always visible */}
        <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <motion.p
                className={`text-xl font-bold text-${color}`}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 + i * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <motion.p
                className="text-xs text-silver/70"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + i * 0.1 }}
              >
                {stat.label}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden relative z-10"
            >
              <div className="pt-4 border-t border-gray-700/30">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full bg-${color}/20 flex items-center justify-center flex-shrink-0`}>
                    {secondaryIcon}
                  </div>
                  <p className="text-silver text-sm">{details}</p>
                </div>

                {/* Interactive element specific to each feature */}
                <div className={`mt-4 p-3 rounded-lg bg-${color}/10 flex items-center justify-between`}>
                  {title === "Fast Sniping" && (
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-silver">Execution Speed</span>
                        <span className={`text-xs font-bold text-${color}`}>{"<10ms"}</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                        <motion.div
                          className={`bg-${color} h-1.5 rounded-full`}
                          initial={{ width: "0%" }}
                          animate={{ width: "95%" }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  )}

                  {title === "Copy Trading" && (
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-silver mb-1">
                        <span>Success Rate</span>
                        <span className={`font-bold text-${color}`}>80%</span>
                      </div>
                      <div className="flex gap-1 w-full">
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`h-2 rounded-sm flex-1 ${i < 8 ? `bg-${color}` : "bg-gray-700/50"}`}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {title === "Smart Exits" && (
                    <div className="w-full">
                      <div className="relative h-12">
                        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-700/50 transform -translate-y-1/2" />
                        <motion.div
                          className={`absolute left-1/4 top-1/2 w-3 h-3 rounded-full bg-red border-2 border-dark transform -translate-x-1/2 -translate-y-1/2`}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-red font-bold">
                            Stop
                          </div>
                        </motion.div>
                        <motion.div
                          className={`absolute right-1/4 top-1/2 w-3 h-3 rounded-full bg-${color} border-2 border-dark transform -translate-x-1/2 -translate-y-1/2`}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          <div
                            className={`absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-${color} font-bold`}
                          >
                            Profit
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {title === "Trader API" && (
                    <div className="w-full font-mono text-xs overflow-x-auto">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`text-${color}`}
                      >
                        <div>{"{"}</div>
                        <div className="pl-4">"action": "buy",</div>
                        <div className="pl-4">"token": "0x...",</div>
                        <div className="pl-4">"amount": "0.5 ETH",</div>
                        <div className="pl-4">"slippage": "1%"</div>
                        <div>{"}"}</div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom highlight on hover */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-${color}`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isExpanded ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      </Card>
    </motion.div>
  )
}

export default function InteractiveFeatureShowcase() {
  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      secondaryIcon: <Clock className="w-4 h-4 text-neon" />,
      title: "Fast Sniping",
      description: "Snipe Tokens in <10 ms mit Bloxroute-Gateways",
      color: "neon",
      stats: [
        { value: "<10ms", label: "Execution" },
        { value: "99.8%", label: "Success Rate" },
        { value: "24/7", label: "Availability" },
      ],
      details:
        "Unser Sniper Bot nutzt Bloxroute-Gateways für ultraschnelle Transaktionen und ermöglicht es dir, neue Token in weniger als 10 Millisekunden zu kaufen. Perfekt für Pump.fun und andere Token-Launch-Plattformen.",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      secondaryIcon: <BarChart3 className="w-4 h-4 text-blue" />,
      title: "Copy Trading",
      description: "Kopiere Top-Trader mit 80%+ Erfolgsquote",
      color: "blue",
      stats: [
        { value: "80%", label: "Trefferquote" },
        { value: "100+", label: "Top Trader" },
        { value: "Nansen", label: "Intelligence" },
      ],
      details:
        "Kopiere die erfolgreichsten Trader mit einer nachgewiesenen Trefferquote von 80% gemäß Nansen Wallet Intelligence. Unser System analysiert kontinuierlich die Performance und wählt nur die profitabelsten Strategien aus.",
    },
    {
      icon: <ArrowRightLeft className="w-6 h-6 text-white" />,
      secondaryIcon: <Zap className="w-4 h-4 text-red" />,
      title: "Smart Exits",
      description: "Stop-Loss & Take-Profit nach deinen Regeln",
      color: "red",
      stats: [
        { value: "100%", label: "Anpassbar" },
        { value: "24/7", label: "Monitoring" },
        { value: "0.5s", label: "Reaktionszeit" },
      ],
      details:
        "Definiere deine eigenen Stop-Loss- und Take-Profit-Regeln, um Risiken zu minimieren und Gewinne zu sichern. Unser System überwacht deine Positionen rund um die Uhr und reagiert sofort auf Marktveränderungen.",
    },
    {
      icon: <Code className="w-6 h-6 text-white" />,
      secondaryIcon: <Zap className="w-4 h-4 text-purple" />,
      title: "Trader API",
      description: "Erweitere deine Strategie mit unserer API",
      color: "purple",
      stats: [
        { value: "REST", label: "API Type" },
        { value: "500+", label: "Endpoints" },
        { value: "99.9%", label: "Uptime" },
      ],
      details:
        "Integriere unsere leistungsstarke API in deine eigenen Trading-Tools und Strategien. Mit über 500 Endpunkten und umfassender Dokumentation kannst du deine Trading-Erfahrung vollständig personalisieren.",
    },
  ]

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            secondaryIcon={feature.secondaryIcon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
            stats={feature.stats}
            details={feature.details}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
