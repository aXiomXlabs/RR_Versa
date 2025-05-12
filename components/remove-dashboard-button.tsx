"use client"

import { useEffect } from "react"

export default function RemoveDashboardButton() {
  useEffect(() => {
    // Function to safely remove the button
    const removeButton = () => {
      // Function to check if an element contains the text
      const hasText = (element, text) => {
        return element.textContent && element.textContent.includes(text)
      }

      // Target text to find
      const targetText = "header.dashboard"

      // Store elements to remove
      const elementsToRemove = []

      // First, collect all elements that match our criteria
      try {
        // Try specific selectors first
        const specificSelectors = [
          '[data-id="header-dashboard"]',
          '[id="header-dashboard"]',
          '[class*="header-dashboard"]',
          '[aria-label="header.dashboard"]',
        ]

        for (const selector of specificSelectors) {
          document.querySelectorAll(selector).forEach((el) => {
            if (!elementsToRemove.includes(el)) {
              elementsToRemove.push(el)
            }
          })
        }

        // If no elements found with specific selectors, try common elements
        if (elementsToRemove.length === 0) {
          const commonSelectors = ["button", "a", "div"]

          for (const selector of commonSelectors) {
            document.querySelectorAll(selector).forEach((el) => {
              if (hasText(el, targetText) && !elementsToRemove.includes(el)) {
                elementsToRemove.push(el)
              }
            })
          }
        }

        // Last resort: check all elements
        if (elementsToRemove.length === 0) {
          document.querySelectorAll("*").forEach((el) => {
            if (el.nodeType === 1 && hasText(el, targetText) && !elementsToRemove.includes(el)) {
              elementsToRemove.push(el)
            }
          })
        }
      } catch (e) {
        console.error("Error finding elements:", e)
      }

      // Now safely remove the collected elements
      elementsToRemove.forEach((el) => {
        try {
          // Check if element is still in the DOM
          if (el && el.parentNode) {
            // Use parentNode.removeChild instead of element.remove()
            // This is more compatible and less prone to errors
            el.parentNode.removeChild(el)
            console.log("Successfully removed element")
          }
        } catch (e) {
          console.error("Error removing element:", e)
        }
      })
    }

    // Wait for DOM to be fully loaded
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // DOM already loaded, run immediately
      setTimeout(removeButton, 100)
    } else {
      // Wait for DOM to load
      window.addEventListener("DOMContentLoaded", () => {
        setTimeout(removeButton, 100)
      })
    }

    // Also run after a delay to catch late-loaded elements
    const timeout = setTimeout(removeButton, 1000)

    // Set up a mutation observer with error handling
    let observer
    try {
      observer = new MutationObserver(() => {
        try {
          removeButton()
        } catch (e) {
          console.error("Error in mutation observer callback:", e)
        }
      })

      // Start observing with error handling
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        })
      }
    } catch (e) {
      console.error("Error setting up mutation observer:", e)
    }

    return () => {
      clearTimeout(timeout)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return null
}
