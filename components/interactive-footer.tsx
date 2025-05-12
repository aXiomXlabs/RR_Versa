"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import NewsletterForm from "./newsletter-form"
import WaitlistModal from "./waitlist-modal"

export default function InteractiveFooter() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  const socialLinks = [
    {
      id: "telegram",
      name: "Telegram",
      href: "https://t.me/rustrocket",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M21.5 15.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
          <path d="M12 12a9 9 0 0 1 9 9"></path>
          <path d="M8.5 8.5a5.5 5.5 0 1 1 7.78 7.78"></path>
          <path d="M7 15a2 2 0 0 0-2 2"></path>
        </svg>
      ),
      color: "#39FF14",
    },
    {
      id: "twitter",
      name: "Twitter",
      href: "https://twitter.com/rustrocket",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      ),
      color: "#00D1FF",
    },
    {
      id: "tiktok",
      name: "TikTok",
      href: "https://tiktok.com/@rustrocket",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M9 10v8a3 3 0 1 1-3-3h3"></path>
          <path d="M12 19V5l3.5-1.5C17 3 18.5 5 18.5 5v10.5a3 3 0 1 1-3-3h3"></path>
        </svg>
      ),
      color: "#D900FF",
    },
  ]

  const quickLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
  ]

  return (
    <footer className="py-6 px-4 sm:px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter and Waitlist Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-b border-white/10 pb-6">
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <span className="text-blue mr-2">✉</span> Newsletter
            </h3>
            <p className="text-silver text-sm mb-3">
              Subscribe to get updates on new features and trading opportunities.
            </p>
            <NewsletterForm />
          </div>

          {/* Waitlist */}
          <div>
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <span className="text-neon mr-2">🚀</span> Early Access
            </h3>
            <p className="text-silver text-sm mb-3">
              Join our waitlist to get early access to our exclusive trading features.
            </p>
            <Button
              onClick={() => setIsWaitlistModalOpen(true)}
              className="bg-neon hover:bg-neon/90 text-black font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
              data-cursor="button"
            >
              Join Waitlist
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:space-y-0 space-y-4">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Link href="#hero" data-cursor="link">
              <Image
                src="/images/logo-full.png"
                alt="Rust Rocket Trading Bot Logo"
                width={150}
                height={50}
                className="h-auto"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="hidden md:flex space-x-8">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-silver hover:text-neon transition-colors text-sm"
                data-cursor="link"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                onMouseEnter={() => setHoveredIcon(link.id)}
                onMouseLeave={() => setHoveredIcon(null)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                data-cursor="link"
              >
                <span
                  className={`absolute inset-0 rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300`}
                  style={{
                    backgroundColor: link.color,
                    filter: "blur(6px)",
                    transform: "scale(1.2)",
                  }}
                ></span>
                <span
                  className={`relative z-10 text-white group-hover:text-${
                    link.id === "telegram" ? "neon" : link.id === "twitter" ? "blue" : "purple"
                  } transition-colors duration-300 flex items-center justify-center`}
                >
                  {link.icon}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile Quick Links */}
        <div className="md:hidden flex justify-center space-x-5 mt-4">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-silver hover:text-neon transition-colors text-xs"
              data-cursor="link"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 text-silver/50 text-xs">
          &copy; {new Date().getFullYear()} Rust Rocket. All rights reserved.
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </footer>
  )
}
