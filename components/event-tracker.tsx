"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function EventTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    if (pathname) {
      // Google Analytics
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_path: pathname,
          page_title: document.title,
          page_location: window.location.href,
        })
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq("track", "PageView")
      }

      // LinkedIn
      if (window.lintrk) {
        window.lintrk("track", { conversion_id: 12345678 })
      }

      // Twitter
      if (window.twq) {
        window.twq("track", "PageView")
      }

      // TikTok
      if (window.ttq) {
        window.ttq.page()
      }

      // Snap
      if (window.snaptr) {
        window.snaptr("track", "PAGE_VIEW")
      }

      console.log(`Page view tracked: ${pathname}`)
    }
  }, [pathname, searchParams])

  // Track user interactions
  useEffect(() => {
    const trackButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const button = target.closest("button, a, [role='button']")

      if (button) {
        const buttonText = button.textContent?.trim() || "Unknown"
        const buttonId = button.id || "Unknown"
        const buttonClass = button.className || "Unknown"
        const buttonHref = (button as HTMLAnchorElement).href || "Unknown"

        // Google Analytics
        if (window.gtag) {
          window.gtag("event", "button_click", {
            event_category: "User Interaction",
            event_label: buttonText,
            button_id: buttonId,
            button_class: buttonClass,
            button_href: buttonHref,
          })
        }

        // Track specific buttons
        if (buttonText.includes("Join Waitlist") || buttonText.includes("Launch Your Account")) {
          // Google Analytics
          if (window.gtag) {
            window.gtag("event", "generate_lead", {
              event_category: "Conversion",
              event_label: buttonText,
            })
          }

          // Facebook Pixel
          if (window.fbq) {
            window.fbq("track", "Lead")
          }

          // LinkedIn
          if (window.lintrk) {
            window.lintrk("track", { conversion_id: 12345679 })
          }
        }
      }
    }

    // Track form submissions
    const trackFormSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement
      const formId = form.id || "Unknown"

      // Google Analytics
      if (window.gtag) {
        window.gtag("event", "form_submit", {
          event_category: "Form",
          event_label: formId,
        })
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq("track", "Lead")
      }
    }

    // Track scroll depth
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      )

      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100

      if (scrollPercentage >= 25 && !window.tracked25) {
        window.tracked25 = true
        if (window.gtag) {
          window.gtag("event", "scroll_depth", {
            event_category: "User Engagement",
            event_label: "25%",
            value: 25,
          })
        }
      }

      if (scrollPercentage >= 50 && !window.tracked50) {
        window.tracked50 = true
        if (window.gtag) {
          window.gtag("event", "scroll_depth", {
            event_category: "User Engagement",
            event_label: "50%",
            value: 50,
          })
        }
      }

      if (scrollPercentage >= 75 && !window.tracked75) {
        window.tracked75 = true
        if (window.gtag) {
          window.gtag("event", "scroll_depth", {
            event_category: "User Engagement",
            event_label: "75%",
            value: 75,
          })
        }
      }

      if (scrollPercentage >= 90 && !window.tracked90) {
        window.tracked90 = true
        if (window.gtag) {
          window.gtag("event", "scroll_depth", {
            event_category: "User Engagement",
            event_label: "90%",
            value: 90,
          })
        }
      }
    }

    // Track time on page
    let timeOnPageInterval: NodeJS.Timeout
    const trackTimeOnPage = () => {
      let timeSpent = 0

      timeOnPageInterval = setInterval(() => {
        timeSpent += 10

        if (timeSpent === 30) {
          if (window.gtag) {
            window.gtag("event", "time_on_page", {
              event_category: "User Engagement",
              event_label: "30 seconds",
              value: 30,
            })
          }
        }

        if (timeSpent === 60) {
          if (window.gtag) {
            window.gtag("event", "time_on_page", {
              event_category: "User Engagement",
              event_label: "1 minute",
              value: 60,
            })
          }
        }

        if (timeSpent === 180) {
          if (window.gtag) {
            window.gtag("event", "time_on_page", {
              event_category: "User Engagement",
              event_label: "3 minutes",
              value: 180,
            })
          }
        }
      }, 10000) // Check every 10 seconds
    }

    // Add event listeners
    document.addEventListener("click", trackButtonClick)
    document.addEventListener("submit", trackFormSubmit)
    window.addEventListener("scroll", trackScrollDepth)
    trackTimeOnPage()

    // Declare global types
    declare global {
      interface Window {
        gtag: any
        fbq: any
        lintrk: any
        twq: any
        ttq: any
        snaptr: any
        tracked25: boolean
        tracked50: boolean
        tracked75: boolean
        tracked90: boolean
      }
    }

    // Cleanup
    return () => {
      document.removeEventListener("click", trackButtonClick)
      document.removeEventListener("submit", trackFormSubmit)
      window.removeEventListener("scroll", trackScrollDepth)
      clearInterval(timeOnPageInterval)
    }
  }, [])

  return null
}
