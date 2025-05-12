"use client"

import { useState, useRef, useEffect } from "react"
import { X, Rocket, Wallet, FishIcon as Whale, ShoppingCart, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import AnimatedBotCard from "./animated-bot-card"
import CircuitBackground from "./circuit-background"
import AnimatedCTAButton from "./animated-cta-button"
import HeaderNavigation from "./header-navigation"
import { useMediaQuery } from "../hooks/use-media-query"
import WaitlistModal from "./waitlist-modal"
import { useLanguage } from "@/contexts/language-context"

export default function InteractiveHeader() {
  const { t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeBot, setActiveBot] = useState<string | null>(null)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.9])
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const headerRef = useRef<HTMLElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Bot cards data
  const bots = [
    {
      id: "sniper-bot",
      title: t("bots.sniper.title"),
      icon: <Rocket className="w-6 h-6 text-white" />,
      color: "neon",
      description: t("bots.sniper.description"),
      details:
        "Unser Sniper Bot nutzt bloxroute-Gateways für ultraschnelle Transaktionen und ermöglicht es dir, neue Token in weniger als 10 Millisekunden zu kaufen. Perfekt für Pump.fun und andere Token-Launch-Plattformen.",
    },
    {
      id: "wallet-bot",
      title: t("bots.wallet.title"),
      icon: <Wallet className="w-6 h-6 text-white" />,
      color: "blue",
      description: t("bots.wallet.description"),
      details:
        "Der Wallet Bot verfolgt die erfolgreichsten Trader und kopiert deren Trades automatisch in deine Wallet. Mit einer Erfolgsquote von über 80% kannst du von der Erfahrung der Profis profitieren, ohne selbst aktiv handeln zu müssen.",
    },
    {
      id: "whale-bot",
      title: t("bots.whale.title"),
      icon: <Whale className="w-6 h-6 text-white" />,
      color: "purple",
      description: t("bots.whale.description"),
      details:
        "Unser Whale Bot überwacht die Aktivitäten großer Wallet-Besitzer und informiert dich über deren Bewegungen. Mit integrierten Smart Exit-Strategien wie Stop-Loss und Take-Profit kannst du deine Gewinne maximieren und Verluste minimieren.",
    },
    {
      id: "buy-bot",
      title: t("bots.buy.title"),
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      color: "red",
      description: t("bots.buy.description"),
      details:
        "Der Buy Bot bietet eine leistungsstarke API zur Integration in deine eigenen Trading-Strategien. Definiere automatisierte Kaufregeln basierend auf technischen Indikatoren, Volumen, Zeit oder anderen Parametern und lasse den Bot für dich handeln.",
    },
  ]

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Handle bot card click
  const handleBotCardClick = (botId: string) => {
    setActiveBot(activeBot === botId ? null : botId)
  }

  // Close bot details when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeBot && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveBot(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeBot])

  return (
    <header ref={headerRef} className="relative bg-gradient-to-br from-[#0A0A1A] via-[#1A1A1A] to-black min-h-[133vh]">
      <CircuitBackground />

      {/* Navigation Bar */}
      <HeaderNavigation />

      {/* Header Content */}
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 items-center">
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight text-center md:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-neon glow-text">{t("header.title")}</span>
              </motion.h1>

              <motion.p
                className="text-silver text-lg md:text-xl mb-8 md:mb-10 text-center md:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("header.subtitle")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-center md:justify-start gap-4 flex-wrap"
              >
                <AnimatedCTAButton href="https://t.me/rustrocket">{t("header.cta")}</AnimatedCTAButton>
              </motion.div>

              {/* Floating logo animation - hidden on mobile */}
              <motion.div
                className="absolute -bottom-20 -left-20 opacity-10 hidden lg:block"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Image
                  src="/images/logo-full.png"
                  alt="Rust Rocket Logo - High Performance Trading Bot for Solana and Ethereum"
                  width={530}
                  height={530}
                />
              </motion.div>
            </motion.div>

            <div className="w-full md:w-1/2">
              {/* Mobile swipeable cards */}
              {isMobile ? (
                <div className="relative overflow-x-auto pb-6">
                  <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 px-2 -mx-2">
                    {bots.map((bot, index) => (
                      <div key={bot.id} className="snap-center shrink-0 w-[85vw] sm:w-[70vw] md:w-auto">
                        <AnimatedBotCard
                          title={bot.title}
                          icon={bot.icon}
                          color={bot.color}
                          description={bot.description}
                          delay={index + 1}
                          onClick={() => handleBotCardClick(bot.id)}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Swipe indicator */}
                  <div className="flex justify-center mt-2">
                    <motion.div
                      className="flex items-center text-silver/70 text-sm"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    >
                      <span>Swipe</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </motion.div>
                  </div>
                </div>
              ) : (
                // Desktop grid layout
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bots.map((bot, index) => (
                    <AnimatedBotCard
                      key={bot.title}
                      title={bot.title}
                      icon={bot.icon}
                      color={bot.color}
                      description={bot.description}
                      delay={index + 1}
                      onClick={() => handleBotCardClick(bot.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bot Details Modal */}
          <AnimatePresence>
            {activeBot && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActiveBot(null)} />

                {bots.map((bot) => {
                  if (bot.id === activeBot) {
                    return (
                      <motion.div
                        key={bot.id}
                        className={`bg-dark border-2 border-${bot.color} rounded-lg p-4 md:p-6 max-w-2xl w-full relative z-10 max-h-[90vh] overflow-y-auto`}
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-${bot.color} to-black/80 flex items-center justify-center`}
                            >
                              {bot.icon}
                            </div>
                            <h3 className={`text-xl md:text-2xl font-bold text-${bot.color}`}>{bot.title}</h3>
                          </div>
                          <button
                            onClick={() => setActiveBot(null)}
                            className="text-silver hover:text-white p-1"
                            data-cursor="button"
                            aria-label="Close"
                          >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                          </button>
                        </div>

                        <p className="text-silver mb-6 text-sm md:text-base">{bot.details}</p>

                        <div className="flex justify-end">
                          <AnimatedCTAButton href={`#${bot.id}`} color={bot.color as any}>
                            Mehr erfahren
                          </AnimatedCTAButton>
                        </div>
                      </motion.div>
                    )
                  }
                  return null
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll indicator - hidden on mobile */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1, duration: 1 },
              y: { delay: 1, duration: 1.5, repeat: Number.POSITIVE_INFINITY },
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5L12 19M12 19L19 12M12 19L5 12"
                stroke="#39FF14"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </header>
  )
}
