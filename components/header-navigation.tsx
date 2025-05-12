"use client"

import { useState, useEffect } from "react"
import { Menu, X, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function HeaderNavigation() {
  const { t, language, setLanguage } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  // Navigation links
  const navLinks = [
    { name: t("nav.home"), href: "#hero" },
    { name: t("nav.features"), href: "#features" },
    { name: t("nav.network"), href: "#global-network" },
    { name: t("nav.dashboard"), href: "#dashboard-demo" },
    { name: t("nav.testimonials"), href: "#testimonials" },
    { name: t("nav.contact"), href: "#cta" },
  ]

  // Sprachoptionen
  const languages = [
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ]

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Sprache ändern
  const changeLanguage = (langCode: string) => {
    setLanguage(langCode as any)
    setIsLanguageDropdownOpen(false)
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#121212]/95 backdrop-blur-sm shadow-md" : "bg-[#121212]"
      } border-b border-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center z-50" data-cursor="link">
          <Image
            src="/images/logo-full.png"
            alt="Rust Rocket - Leading Telegram Trading and Sniping Bot"
            width={320}
            height={89}
            className="h-[3.5rem] md:h-[4.5rem] w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-silver hover:text-neon transition-colors text-base font-medium px-5 py-2"
              data-cursor="link"
            >
              {link.name}
            </Link>
          ))}

          {/* Language Selector */}
          <div className="relative ml-4">
            <button
              className="flex items-center text-silver hover:text-neon transition-colors text-base font-medium px-3 py-2"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              data-cursor="button"
            >
              <span className="mr-2">{languages.find((lang) => lang.code === language)?.flag}</span>
              <Globe className="w-4 h-4" />
            </button>

            {/* Language Dropdown */}
            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-gray-800 rounded-md shadow-lg z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`flex items-center w-full px-4 py-2 text-sm ${
                          language === lang.code ? "text-neon bg-black/30" : "text-silver hover:text-white"
                        } hover:bg-black/20`}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center z-50">
          {/* Mobile Language Selector */}
          <button
            className="p-2 mr-2 text-silver"
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            aria-label="Change language"
          >
            <span className="text-lg">{languages.find((lang) => lang.code === language)?.flag}</span>
          </button>

          <button
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            data-cursor="button"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Language Dropdown */}
        <AnimatePresence>
          {isLanguageDropdownOpen && (
            <motion.div
              className="absolute top-full right-4 mt-2 w-48 bg-[#1A1A1A] border border-gray-800 rounded-md shadow-lg z-50 md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      language === lang.code ? "text-neon bg-black/30" : "text-silver hover:text-white"
                    } hover:bg-black/20`}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-[#121212]/95 backdrop-blur-lg flex flex-col items-center justify-center z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xl text-silver hover:text-neon transition-colors"
                    onClick={handleLinkClick}
                    data-cursor="link"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
