import type { Metadata } from "next"
import type { Language } from "@/contexts/language-context"

// Basis-URL für alle Metadaten
export const BASE_URL = "https://www.rust-rocket.com"

// Sprachspezifische Metadaten
export const seoMetadata: Record<Language, Metadata> = {
  de: {
    title: "Rust Rocket | Hochleistungs-Trading & Sniping Bot für Solana",
    description:
      "Rust Rocket ist der führende Telegram Trading und Sniping Bot für Solana, Ethereum und andere Chains. Erlebe ultraschnelle Ausführung mit <10ms Latenz und maximiere deine Gewinne mit unseren fortschrittlichen Trading-Funktionen.",
    keywords: [
      "Trading Bot",
      "Sniping Bot",
      "Solana Bot",
      "Ethereum Bot",
      "Krypto Trading",
      "DeFi Bot",
      "Telegram Bot",
      "Copy Trading",
      "Rust Rocket",
      "Hochleistungs-Trading",
      "Blockchain Trading",
      "Automatisiertes Trading",
    ],
    openGraph: {
      title: "Rust Rocket | Hochleistungs-Trading & Sniping Bot",
      description:
        "Maximiere deine Trading-Gewinne mit Rust Rocket, dem schnellsten und zuverlässigsten Trading Bot für Solana und Ethereum.",
      locale: "de_DE",
      url: `${BASE_URL}/de`,
      siteName: "Rust Rocket",
      images: [
        {
          url: `${BASE_URL}/images/og-image-de.jpg`,
          width: 1200,
          height: 630,
          alt: "Rust Rocket Trading Bot",
        },
      ],
    },
    twitter: {
      title: "Rust Rocket | Hochleistungs-Trading & Sniping Bot",
      description:
        "Maximiere deine Trading-Gewinne mit Rust Rocket, dem schnellsten und zuverlässigsten Trading Bot für Solana und Ethereum.",
      card: "summary_large_image",
      images: [`${BASE_URL}/images/twitter-image-de.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/de`,
      languages: {
        "de-DE": `${BASE_URL}/de`,
        "en-US": `${BASE_URL}/en`,
        "es-ES": `${BASE_URL}/es`,
        "fr-FR": `${BASE_URL}/fr`,
        "zh-CN": `${BASE_URL}/zh`,
      },
    },
  },
  en: {
    title: "Rust Rocket | High-Performance Trading & Sniping Bot for Solana",
    description:
      "Rust Rocket is the leading Telegram trading and sniping bot for Solana, Ethereum, and other chains. Experience ultra-fast execution with <10ms latency and maximize your profits with our advanced trading features.",
    keywords: [
      "trading bot",
      "sniping bot",
      "Solana bot",
      "Ethereum bot",
      "crypto trading",
      "DeFi bot",
      "Telegram bot",
      "copy trading",
      "Rust Rocket",
      "high-performance trading",
      "blockchain trading",
      "automated trading",
    ],
    openGraph: {
      title: "Rust Rocket | High-Performance Trading & Sniping Bot",
      description:
        "Maximize your trading profits with Rust Rocket, the fastest and most reliable trading bot for Solana and Ethereum.",
      locale: "en_US",
      url: `${BASE_URL}/en`,
      siteName: "Rust Rocket",
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Rust Rocket Trading Bot",
        },
      ],
    },
    twitter: {
      title: "Rust Rocket | High-Performance Trading & Sniping Bot",
      description:
        "Maximize your trading profits with Rust Rocket, the fastest and most reliable trading bot for Solana and Ethereum.",
      card: "summary_large_image",
      images: [`${BASE_URL}/images/twitter-image.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/en`,
      languages: {
        "de-DE": `${BASE_URL}/de`,
        "en-US": `${BASE_URL}/en`,
        "es-ES": `${BASE_URL}/es`,
        "fr-FR": `${BASE_URL}/fr`,
        "zh-CN": `${BASE_URL}/zh`,
      },
    },
  },
  es: {
    title: "Rust Rocket | Bot de Trading y Sniping de Alto Rendimiento para Solana",
    description:
      "Rust Rocket es el bot líder de trading y sniping de Telegram para Solana, Ethereum y otras cadenas. Experimenta una ejecución ultrarrápida con una latencia de <10ms y maximiza tus ganancias con nuestras funciones avanzadas de trading.",
    keywords: [
      "bot de trading",
      "bot de sniping",
      "bot de Solana",
      "bot de Ethereum",
      "trading de criptomonedas",
      "bot DeFi",
      "bot de Telegram",
      "copy trading",
      "Rust Rocket",
      "trading de alto rendimiento",
      "trading de blockchain",
      "trading automatizado",
    ],
    openGraph: {
      title: "Rust Rocket | Bot de Trading y Sniping de Alto Rendimiento",
      description:
        "Maximiza tus ganancias de trading con Rust Rocket, el bot de trading más rápido y confiable para Solana y Ethereum.",
      locale: "es_ES",
      url: `${BASE_URL}/es`,
      siteName: "Rust Rocket",
      images: [
        {
          url: `${BASE_URL}/images/og-image-es.jpg`,
          width: 1200,
          height: 630,
          alt: "Rust Rocket Trading Bot",
        },
      ],
    },
    twitter: {
      title: "Rust Rocket | Bot de Trading y Sniping de Alto Rendimiento",
      description:
        "Maximiza tus ganancias de trading con Rust Rocket, el bot de trading más rápido y confiable para Solana y Ethereum.",
      card: "summary_large_image",
      images: [`${BASE_URL}/images/twitter-image-es.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/es`,
      languages: {
        "de-DE": `${BASE_URL}/de`,
        "en-US": `${BASE_URL}/en`,
        "es-ES": `${BASE_URL}/es`,
        "fr-FR": `${BASE_URL}/fr`,
        "zh-CN": `${BASE_URL}/zh`,
      },
    },
  },
  fr: {
    title: "Rust Rocket | Bot de Trading et de Sniping Haute Performance pour Solana",
    description:
      "Rust Rocket est le bot de trading et de sniping Telegram leader pour Solana, Ethereum et autres chaînes. Profitez d'une exécution ultra-rapide avec une latence <10ms et maximisez vos profits avec nos fonctionnalités de trading avancées.",
    keywords: [
      "bot de trading",
      "bot de sniping",
      "bot Solana",
      "bot Ethereum",
      "trading crypto",
      "bot DeFi",
      "bot Telegram",
      "copy trading",
      "Rust Rocket",
      "trading haute performance",
      "trading blockchain",
      "trading automatisé",
    ],
    openGraph: {
      title: "Rust Rocket | Bot de Trading et de Sniping Haute Performance",
      description:
        "Maximisez vos profits de trading avec Rust Rocket, le bot de trading le plus rapide et le plus fiable pour Solana et Ethereum.",
      locale: "fr_FR",
      url: `${BASE_URL}/fr`,
      siteName: "Rust Rocket",
      images: [
        {
          url: `${BASE_URL}/images/og-image-fr.jpg`,
          width: 1200,
          height: 630,
          alt: "Rust Rocket Trading Bot",
        },
      ],
    },
    twitter: {
      title: "Rust Rocket | Bot de Trading et de Sniping Haute Performance",
      description:
        "Maximisez vos profits de trading avec Rust Rocket, le bot de trading le plus rapide et le plus fiable pour Solana et Ethereum.",
      card: "summary_large_image",
      images: [`${BASE_URL}/images/twitter-image-fr.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/fr`,
      languages: {
        "de-DE": `${BASE_URL}/de`,
        "en-US": `${BASE_URL}/en`,
        "es-ES": `${BASE_URL}/es`,
        "fr-FR": `${BASE_URL}/fr`,
        "zh-CN": `${BASE_URL}/zh`,
      },
    },
  },
  zh: {
    title: "Rust Rocket | 索拉纳高性能交易和狙击机器人",
    description:
      "Rust Rocket 是索拉纳、以太坊和其他链上领先的电报交易和狙击机器人。体验超快速执行，延迟低于10毫秒，并通过我们的高级交易功能最大化您的利润。",
    keywords: [
      "交易机器人",
      "狙击机器人",
      "索拉纳机器人",
      "以太坊机器人",
      "加密货币交易",
      "DeFi机器人",
      "电报机器人",
      "复制交易",
      "Rust Rocket",
      "高性能交易",
      "区块链交易",
      "自动化交易",
    ],
    openGraph: {
      title: "Rust Rocket | 高性能交易和狙击机器人",
      description: "使用Rust Rocket最大化您的交易利润，这是索拉纳和以太坊最快速、最可靠的交易机器人。",
      locale: "zh_CN",
      url: `${BASE_URL}/zh`,
      siteName: "Rust Rocket",
      images: [
        {
          url: `${BASE_URL}/images/og-image-zh.jpg`,
          width: 1200,
          height: 630,
          alt: "Rust Rocket Trading Bot",
        },
      ],
    },
    twitter: {
      title: "Rust Rocket | 高性能交易和狙击机器人",
      description: "使用Rust Rocket最大化您的交易利润，这是索拉纳和以太坊最快速、最可靠的交易机器人。",
      card: "summary_large_image",
      images: [`${BASE_URL}/images/twitter-image-zh.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/zh`,
      languages: {
        "de-DE": `${BASE_URL}/de`,
        "en-US": `${BASE_URL}/en`,
        "es-ES": `${BASE_URL}/es`,
        "fr-FR": `${BASE_URL}/fr`,
        "zh-CN": `${BASE_URL}/zh`,
      },
    },
  },
}

// Sprachspezifische Viewport-Einstellungen
export const viewportConfig = {
  themeColor: "#39FF14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// Funktion zum Abrufen der Metadaten basierend auf der Sprache
export function getMetadataForLanguage(language: Language): Metadata {
  return {
    ...seoMetadata[language],
    metadataBase: new URL(BASE_URL),
    authors: [{ name: "Rust Rocket Team" }],
    creator: "Rust Rocket",
    publisher: "Rust Rocket",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "Technology",
    verification: {
      google: "google-site-verification-code",
      yandex: "yandex-verification-code",
      yahoo: "yahoo-verification-code",
      other: {
        me: ["support@rust-rocket.com"],
      },
    },
  }
}
