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
      href: "https://t.me/rustxrocket",
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
      id: "x",
      name: "X",
      href: "https://x.com/aX_RustRocket",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "#FFFFFF",
    },
    {
      id: "discord",
      name: "Discord: Rust_Rocket",
      href: "#",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-5 h-5"
        >
          <path d="M19.27 5.33C17.94 4.7 16.5 4.26 15 4V4C15 4 14.84 4.04 14.67 4.08C14.5 4.12 14.33 4.16 14.17 4.2C13.17 4.38 12.42 4.78 11.91 5.11C11.83 5.15 11.75 5.19 11.67 5.22C10.27 6.12 9.38 7.43 9.03 9.37C8.99 9.54 8.95 9.72 8.92 9.89C8.88 10.07 8.86 10.25 8.83 10.43C8.81 10.56 8.8 10.68 8.79 10.81C8.69 11.43 8.58 12.54 8.58 12.54C8.58 12.54 8.54 12.71 8.5 12.89C8.38 13.67 8.25 14.42 8.12 15.14C8.08 15.37 8.05 15.6 8.02 15.83C7.98 16.11 7.92 16.41 7.83 16.73C7.8 16.83 7.77 16.93 7.74 17.03C7.71 17.13 7.68 17.23 7.65 17.33C7.62 17.43 7.59 17.53 7.56 17.63C7.03 19.28 5.88 20.27 5.19 20.7C5.15 20.73 5.11 20.76 5.07 20.79C4.91 20.89 4.75 20.99 4.58 21.08C4.58 21.08 4.58 21.08 4.58 21.08C4.58 21.08 4.52 21.04 4.52 21.04C4.52 21.04 4.52 21.04 4.52 21.04C6.42 22.95 8.91 24 11.67 24C11.67 24 11.67 24 11.67 24C11.75 24 11.83 24 11.91 24C12 24 12.08 24 12.17 24C12.17 24 12.17 24 12.17 24C16.91 24 20.69 20.57 21.62 15.98C21.67 15.72 21.71 15.46 21.75 15.19C21.84 14.55 21.92 13.88 21.99 13.19C22.02 12.92 22.05 12.66 22.08 12.39C22.09 12.32 22.1 12.26 22.11 12.19C22.11 12.19 22.11 12.19 22.11 12.19C22.13 11.75 22.16 11.31 22.17 10.87C22.17 10.87 22.17 10.87 22.17 10.87C22.17 10.87 22.17 10.79 22.17 10.71C22.16 10.27 22.13 9.83 22.08 9.39C22.04 8.95 21.99 8.51 21.92 8.08C21.92 8.08 21.92 8.08 21.92 8.08C21.92 8.08 21.86 7.58 21.78 7.08C21.57 6.33 21.36 5.83 21.36 5.83C21.36 5.83 21.36 5.83 21.36 5.83C20.97 5.49 19.81 5.11 19.27 5.33ZM14.79 16.18C14.04 16.18 13.43 15.57 13.43 14.82C13.43 14.07 14.04 13.46 14.79 13.46C15.54 13.46 16.15 14.07 16.15 14.82C16.15 15.57 15.54 16.18 14.79 16.18ZM9.68 16.18C8.93 16.18 8.32 15.57 8.32 14.82C8.32 14.07 8.93 13.46 9.68 13.46C10.43 13.46 11.04 14.07 11.04 14.82C11.04 15.57 10.43 16.18 9.68 16.18Z"/>
        </svg>
      ),
      color: "#5865F2",
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
                    link.id === "telegram" ? "neon" : link.id === "x" ? "white" : link.id === "discord" ? "purple" : "purple"
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
