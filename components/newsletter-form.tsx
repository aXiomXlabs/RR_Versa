"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { subscribeToNewsletter } from "@/app/actions/auth-actions"
import { useLanguage } from "@/contexts/language-context"

export default function NewsletterForm() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        setIsSubmitted(true)
        setMessage(result.message || "Thanks for subscribing!")
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue/50"
              required
            />
            {error && <p className="text-red text-xs mt-1">{error}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue hover:bg-blue/90 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Subscribe <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue/10 border border-blue/30 rounded-lg p-3 flex items-center"
        >
          <CheckCircle className="w-5 h-5 text-blue mr-2 flex-shrink-0" />
          <p className="text-sm">{message || "Thanks for subscribing! You'll receive our latest updates."}</p>
        </motion.div>
      )}
    </div>
  )
}
