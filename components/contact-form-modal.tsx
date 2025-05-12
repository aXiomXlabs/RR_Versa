"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, Loader2, Send, User, Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "@/app/actions/contact-actions"
import { useLanguage } from "@/contexts/language-context"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "general",
    message: "",
    privacyPolicy: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.privacyPolicy) {
      setError("Please accept the privacy policy to continue.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        message: formData.message,
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
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "general",
      message: "",
      privacyPolicy: false,
    })
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
            className="bg-[#121212] border border-neon/30 rounded-xl w-full max-w-lg relative z-10 overflow-hidden"
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
                  <h2 className="text-2xl font-bold mb-1">Contact Us</h2>
                  <p className="text-silver mb-6">
                    Fill out the form below to get in touch with our team. We'll get back to you as soon as possible.
                  </p>

                  {error && <div className="bg-red/10 border border-red/30 text-red p-3 rounded mb-4">{error}</div>}

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-silver mb-1">
                        Full Name <span className="text-red">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-neon/50"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-silver mb-1">
                        Email Address <span className="text-red">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-neon/50"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-silver mb-1">
                        Phone Number (optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-neon/50"
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-silver mb-1">
                        Inquiry Type <span className="text-red">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-neon/50"
                        required
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="pricing">Pricing Information</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="feature">Feature Request</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-silver mb-1">
                        Message <span className="text-red">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-neon/50"
                          placeholder="How can we help you?"
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="privacyPolicy"
                          name="privacyPolicy"
                          type="checkbox"
                          checked={formData.privacyPolicy}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 bg-black/50 border border-white/10 rounded focus:ring-neon focus:ring-2"
                        />
                      </div>
                      <label htmlFor="privacyPolicy" className="ml-2 text-sm text-silver">
                        I agree to the{" "}
                        <a href="#" className="text-neon hover:underline">
                          privacy policy
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-neon hover:underline">
                          terms of service
                        </a>
                        . <span className="text-red">*</span>
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
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-neon" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                  <p className="text-silver mb-6">
                    Thank you for reaching out to us. We'll get back to you as soon as possible.
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
