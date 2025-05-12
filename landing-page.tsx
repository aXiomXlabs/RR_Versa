"use client"

import { useState } from "react"
import InteractiveHeader from "./components/interactive-header"
import AnimatedCTAButton from "./components/animated-cta-button"
import InteractiveTestimonialCard from "./components/interactive-testimonial-card"
import InteractiveFooter from "./components/interactive-footer"
import InteractiveFeatureShowcase from "./components/interactive-feature-showcase"
import InteractiveDashboardSequence from "./components/interactive-dashboard-sequence"
import InteractiveWorldMap from "./components/interactive-world-map"
import ContactFormModal from "./components/contact-form-modal"
import StructuredData from "./components/structured-data"
import EventTracker from "./components/event-tracker"
import ExpandableFloatingMenu, { type MenuTheme } from "./components/expandable-floating-menu"
import ThemePreviewModal from "./components/theme-preview-modal"
import LanguageSelectorModal from "./components/language-selector-modal"
import WaitlistModal from "./components/waitlist-modal"
import SeoHead from "./components/seo-head"
import { LanguageProvider, useLanguage } from "./contexts/language-context"
import { Rocket, MessageSquare, ArrowUp, Users, Zap, PaintbrushIcon as PaintBrush, Globe } from "lucide-react"

// Particles Background Component
const ParticlesBackground = () => {
  // ... (unverändert)
  return <canvas id="particles" className="absolute inset-0 z-0" style={{ opacity: 0.3 }} />
}

// Hauptkomponente mit Sprachkontext
function LandingPageContent() {
  const { t } = useLanguage()
  const [currentTheme, setCurrentTheme] = useState<MenuTheme>("default")
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  const handleThemeSelect = (theme: MenuTheme) => {
    setCurrentTheme(theme)
  }

  // Handlers für Menüoptionen
  const handleWaitlistButtonClick = () => {
    setIsWaitlistModalOpen(true)
  }

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true)
  }

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false)
  }

  const handleTelegramClick = () => {
    window.open("https://t.me/rustrocket", "_blank")
  }

  const handleFeaturesClick = () => {
    const featuresSection = document.getElementById("features")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleOpenLanguageModal = () => {
    setIsLanguageModalOpen(true)
  }

  // Floating menu options
  const menuOptions = [
    {
      id: "waitlist",
      icon: <Rocket className="w-5 h-5" />,
      label: t("menu.waitlist"),
      color: "neon",
      onClick: handleWaitlistButtonClick,
    },
    {
      id: "contact",
      icon: <MessageSquare className="w-5 h-5" />,
      label: t("menu.contact"),
      color: "blue",
      onClick: handleOpenContactModal,
    },
    {
      id: "telegram",
      icon: <Zap className="w-5 h-5" />,
      label: t("menu.telegram"),
      color: "purple",
      onClick: handleTelegramClick,
    },
    {
      id: "features",
      icon: <Users className="w-5 h-5" />,
      label: t("menu.features"),
      color: "red",
      onClick: handleFeaturesClick,
    },
    {
      id: "theme",
      icon: <PaintBrush className="w-5 h-5" />,
      label: `${t("menu.theme")}: ${currentTheme}`,
      color: "blue",
      onClick: () => setIsThemeModalOpen(true),
    },
    {
      id: "language",
      icon: <Globe className="w-5 h-5" />,
      label: t("menu.language"),
      color: "purple",
      onClick: handleOpenLanguageModal,
    },
    {
      id: "top",
      icon: <ArrowUp className="w-5 h-5" />,
      label: t("menu.top"),
      color: "blue",
      onClick: handleScrollToTop,
    },
  ]

  const testimonialCards = [
    {
      name: "Alice Johnson",
      role: "Professional Trader",
      text: "Rust Rocket has completely transformed my trading strategy. The speed and reliability are unmatched!",
      color: "neon",
    },
    {
      name: "Bob Williams",
      role: "Software Engineer",
      text: "As a developer, I appreciate the robust architecture of Rust Rocket. It's a game-changer for automated trading.",
      color: "blue",
    },
    {
      name: "Charlie Davis",
      role: "Financial Analyst",
      text: "The insights provided by Rust Rocket have significantly improved my decision-making process. Highly recommended!",
      color: "purple",
    },
  ]

  return (
    <>
      {/* SEO Head mit dynamischen Metadaten */}
      <SeoHead />

      {/* Structured Data */}
      <StructuredData />

      {/* Event Tracker */}
      <EventTracker />

      <main className="bg-dark text-white font-['Plus Jakarta Sans']">
        {/* Interactive Header (formerly Bot Showcase) */}
        <InteractiveHeader />

        {/* Features Section */}
        <section id="features" className="py-24 md:py-32 px-6">
          <h2 className="text-center text-[24px] md:text-[32px] font-bold mb-12">
            <span className="text-neon glow-text">{t("sections.features")}</span>
          </h2>
          <div className="max-w-7xl mx-auto">
            <InteractiveFeatureShowcase />
          </div>
        </section>

        {/* Dashboard Demo Section */}
        <section
          id="dashboard-demo"
          className="min-h-screen scroll-mt-16 py-24 px-6 flex flex-col items-center justify-center bg-black"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-neon glow-text">{t("sections.dashboard")}</span>
              </h2>
              <p className="text-silver max-w-2xl mx-auto">{t("sections.dashboard.subtitle")}</p>
            </div>

            <InteractiveDashboardSequence />

            <div className="mt-12 text-center">
              <AnimatedCTAButton
                href="/register"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "try_it_yourself_click", {
                      event_category: "Conversion",
                      event_label: "Dashboard Demo CTA",
                    })
                  }
                }}
              >
                {t("sections.dashboard.cta")}
              </AnimatedCTAButton>
            </div>
          </div>
        </section>

        {/* Global Gateway Network Section */}
        <section
          id="global-network"
          className="min-h-screen scroll-mt-16 py-24 px-6 flex flex-col items-center justify-center"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-neon glow-text">{t("sections.network")}</span>
              </h2>
              <p className="text-silver max-w-2xl mx-auto">{t("sections.network.subtitle")}</p>
            </div>

            <InteractiveWorldMap />

            <div className="mt-12 text-center">
              <p className="text-silver max-w-2xl mx-auto mb-6">{t("sections.network.description")}</p>
              <AnimatedCTAButton
                href="/network"
                color="blue"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "network_details_click", {
                      event_category: "Navigation",
                      event_label: "Network Details CTA",
                    })
                  }
                }}
              >
                {t("sections.network.cta")}
              </AnimatedCTAButton>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="min-h-screen scroll-mt-16 py-24 px-6 flex flex-col items-center justify-center"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-neon glow-text">{t("sections.testimonials")}</span>
              </h2>
              <p className="text-silver max-w-2xl mx-auto">{t("sections.testimonials.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonialCards.map((card, index) => (
                <InteractiveTestimonialCard
                  key={index}
                  name={card.name}
                  role={card.role}
                  text={card.text}
                  color={card.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          className="min-h-screen scroll-mt-16 py-24 px-6 flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#1A1A1A] relative"
        >
          <ParticlesBackground />

          <div className="max-w-4xl mx-auto w-full text-center z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-neon glow-text">{t("sections.cta")}</span>
            </h2>
            <p className="text-xl text-silver max-w-2xl mx-auto mb-8">{t("sections.cta.subtitle")}</p>

            <AnimatedCTAButton href="#" className="px-8 py-6 text-lg" onClick={handleOpenContactModal}>
              {t("header.cta")}
            </AnimatedCTAButton>
          </div>
        </section>

        {/* Footer */}
        <InteractiveFooter />
      </main>

      {/* Expandable Floating Menu */}
      <ExpandableFloatingMenu
        options={menuOptions}
        scrollThreshold={500}
        position="bottom-right"
        mainButtonColor="neon"
        expandDirection="vertical"
        theme={currentTheme}
      />

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={isContactModalOpen} onClose={handleCloseContactModal} />

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />

      {/* Theme Modal */}
      <ThemePreviewModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleThemeSelect}
      />

      {/* Language Modal */}
      <LanguageSelectorModal isOpen={isLanguageModalOpen} onClose={() => setIsLanguageModalOpen(false)} />
    </>
  )
}

// Wrapper-Komponente mit LanguageProvider
export default function LandingPage() {
  return (
    <LanguageProvider>
      <LandingPageContent />
    </LanguageProvider>
  )
}
