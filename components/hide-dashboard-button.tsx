"use client"

import { useEffect } from "react"

export default function HideDashboardButton() {
  useEffect(() => {
    // Function to find and hide ONLY the header.dashboard button
    const hideOnlyDashboardButton = () => {
      try {
        // Get all elements that might be buttons
        const elements = document.querySelectorAll("button, a, div")

        // Loop through each element
        elements.forEach((el) => {
          // Only check elements that have text content
          if (el.textContent) {
            // Check if the text content EXACTLY matches "header.dashboard"
            // or contains ONLY "header.dashboard" (with possible whitespace)
            const text = el.textContent.trim()
            if (text === "header.dashboard") {
              console.log("Found exact match for header.dashboard button:", el)
              // Only hide this specific element
              el.style.display = "none"
            }
          }
        })
      } catch (error) {
        console.error("Error in hideOnlyDashboardButton:", error)
      }
    }

    // Run after DOM is fully loaded
    if (document.readyState === "complete") {
      hideOnlyDashboardButton()
    } else {
      window.addEventListener("load", hideOnlyDashboardButton)
    }

    // Run again after a short delay to catch any late-rendered elements
    const timeoutId = setTimeout(hideOnlyDashboardButton, 1000)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("load", hideOnlyDashboardButton)
    }
  }, [])

  return null
}
