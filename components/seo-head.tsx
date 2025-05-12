"use client"

import { useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { seoMetadata } from "@/lib/seo-metadata"

export default function SeoHead() {
  const { language } = useLanguage()
  const metadata = seoMetadata[language]

  // Aktualisiere die Metadaten im document.head
  useEffect(() => {
    // Titel aktualisieren
    document.title = metadata.title as string

    // Beschreibung aktualisieren
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", metadata.description as string)
    } else {
      const newMetaDescription = document.createElement("meta")
      newMetaDescription.setAttribute("name", "description")
      newMetaDescription.setAttribute("content", metadata.description as string)
      document.head.appendChild(newMetaDescription)
    }

    // Keywords aktualisieren
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute("content", (metadata.keywords as string[]).join(", "))
    } else {
      const newMetaKeywords = document.createElement("meta")
      newMetaKeywords.setAttribute("name", "keywords")
      newMetaKeywords.setAttribute("content", (metadata.keywords as string[]).join(", "))
      document.head.appendChild(newMetaKeywords)
    }

    // Open Graph Metadaten aktualisieren
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute("content", metadata.openGraph?.title as string)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute("content", metadata.openGraph?.description as string)
    }

    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) {
      ogLocale.setAttribute("content", metadata.openGraph?.locale as string)
    }

    // Twitter Metadaten aktualisieren
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute("content", metadata.twitter?.title as string)
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute("content", metadata.twitter?.description as string)
    }

    // Hreflang-Tags aktualisieren
    // Entferne vorhandene Hreflang-Tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())

    // Füge neue Hreflang-Tags hinzu
    const alternates = metadata.alternates?.languages
    if (alternates) {
      Object.entries(alternates).forEach(([lang, href]) => {
        const link = document.createElement("link")
        link.setAttribute("rel", "alternate")
        link.setAttribute("hreflang", lang)
        link.setAttribute("href", `https://rustrocket.com${href}`)
        document.head.appendChild(link)
      })
    }

    // Kanonischen Link aktualisieren
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute("href", `https://rustrocket.com${metadata.alternates?.canonical || "/"}`)
    } else {
      const newCanonicalLink = document.createElement("link")
      newCanonicalLink.setAttribute("rel", "canonical")
      newCanonicalLink.setAttribute("href", `https://rustrocket.com${metadata.alternates?.canonical || "/"}`)
      document.head.appendChild(newCanonicalLink)
    }

    // HTML lang-Attribut aktualisieren
    document.documentElement.lang = language
  }, [language, metadata])

  return null
}
