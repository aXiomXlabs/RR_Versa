"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface InteractiveFAQItemProps {
  question: string
  answer: string
}

export default function InteractiveFAQItem({ question, answer }: InteractiveFAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border-b border-silver/10 py-4 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
    >
      {/* Hover highlight */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-neon"
        initial={{ scaleY: 0 }}
        animate={isOpen ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.3 }}
      />

      <button
        className="flex justify-between items-center w-full text-left px-2 relative"
        onClick={() => setIsOpen(!isOpen)}
        data-cursor="button"
      >
        <motion.h3 className="text-lg font-medium" animate={isOpen ? { color: "#39FF14" } : { color: "#FFFFFF" }}>
          {question}
        </motion.h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, type: "spring" }}>
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? "text-neon" : ""}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div
              className="mt-2 text-silver px-2"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
