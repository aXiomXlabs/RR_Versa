"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { registerUser } from "@/app/actions/auth-actions"
import { useLanguage } from "@/contexts/language-context"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [telegramHandle, setTelegramHandle] = useState("")
  const [experience, setExperience] = useState("beginner")
  const [newsletter, setNewsletter] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await registerUser({
        email,
        name,
        telegramHandle,
        experience,
        newsletter: true,
      })

      if (result.success) {
        setIsSubmitted(true)
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setEmail("")
    setName("")
    setTelegramHandle("")
    setExperience("beginner")
    setNewsletter(true)
    setIsSubmitted(false)
    setError(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="bg-[#121212] border border-neon/30 rounded-xl w-full max-w-md relative z-10 overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-silver hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold mb-1">{t("footer.waitlist")}</h2>
                  <p className="text-silver mb-6">{t("footer.earlyaccess.subtitle")}</p>

                  {error && <div className="bg-red/10 border border-red/30 text-red p-3 rounded mb-4">{error}</div>}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-silver mb-1">
                        Email Address <span className="text-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-neon/50"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-silver mb-1">
                        Full Name <span className="text-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-neon/50"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="telegram" className="block text-sm font-medium text-silver mb-1">
                        Telegram Handle <span className="text-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="telegram"
                        value={telegramHandle}
                        onChange={(e) => setTelegramHandle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-neon/50"
                        placeholder="@username"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-silver mb-1">
                        Trading Experience
                      </label>
                      <select
                        id="experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-neon/50"
                      >
                        <option value="beginner">Beginner (0-1 year)</option>
                        <option value="intermediate">Intermediate (1-3 years)</option>
                        <option value="advanced">Advanced (3+ years)</option>
                        <option value="professional">Professional Trader</option>
                      </select>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          type="checkbox"
                          checked={newsletter}
                          onChange={(e) => setNewsletter(e.target.checked)}
                          className="w-4 h-4 bg-black/50 border border-white/10 rounded focus:ring-neon focus:ring-2"
                        />
                      </div>
                      <label htmlFor="newsletter" className="ml-2 text-sm text-silver">
                        Subscribe to newsletter for updates
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-neon hover:bg-neon/90 text-black font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-neon" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">You're on the list!</h2>
                  <p className="text-silver mb-6">
                    Thanks for joining our waitlist. We'll notify you when you've been granted access to Rust Rocket.
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-neon hover:bg-neon/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>

            {/* Bottom border glow */}
            <div className="h-1 w-full bg-gradient-to-r from-neon/0 via-neon to-neon/0" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
