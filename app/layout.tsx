import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { viewportConfig } from "@/lib/seo-metadata"
import "@/lib/init-server"
import { CookieConsentProvider } from "@/contexts/cookie-consent-context"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"
import { ConditionalScripts } from "@/components/conditional-scripts"
import { LanguageProvider } from "@/contexts/language-context"
import { ConditionalAnalytics } from "@/components/conditional-analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

// Basis-Metadaten (werden durch die dynamischen Metadaten überschrieben)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.rust-rocket.com"),
  title: "Rust Rocket | High-Performance Trading & Sniping Bot for Solana",
  description:
    "Rust Rocket is the leading Telegram trading and sniping bot for Solana, Ethereum, and other chains. Experience ultra-fast execution with <10ms latency and maximize your profits with our advanced trading features.",
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: ["support@rust-rocket.com"],
    },
  },
    generator: 'v0.dev'
}

// Viewport-Einstellungen
export const viewport: Viewport = viewportConfig

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>{/* Keine Tracking-Skripte hier - sie werden durch ConditionalScripts geladen */}</head>
      <body className={inter.className}>
        <LanguageProvider>
          <CookieConsentProvider>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Suspense fallback={<div>Loading consent...</div>}>
              <CookieConsentBanner />
            </Suspense>
            <Suspense fallback={null}>
              <ConditionalScripts />
            </Suspense>
            <Suspense fallback={null}>
              <ConditionalAnalytics />
            </Suspense>
          </CookieConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
