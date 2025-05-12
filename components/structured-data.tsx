"use client"

import Script from "next/script"
import { useLanguage } from "@/contexts/language-context"

// Basis-URL für alle strukturierten Daten
const BASE_URL = "https://www.rust-rocket.com"

export default function StructuredData() {
  const { language } = useLanguage()

  // Sprachspezifische Structured Data
  const structuredData = {
    de: {
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Rust Rocket",
        description: "Hochleistungs-Trading & Sniping Bot für Solana und Ethereum",
        potentialAction: [
          {
            "@type": "SearchAction",
            target: `${BASE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "de-DE",
      },
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Rust Rocket",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/images/logo-full.png`,
          contentUrl: `${BASE_URL}/images/logo-full.png`,
          width: 320,
          height: 89,
          caption: "Rust Rocket Logo",
        },
        image: { "@id": `${BASE_URL}/#logo` },
        sameAs: ["https://twitter.com/rustrocket", "https://t.me/rustrocket", "https://discord.gg/rustrocket"],
      },
      product: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Rust Rocket Trading Bot",
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
        },
        description:
          "Rust Rocket ist ein Hochleistungs-Trading und Sniping Bot für Solana, Ethereum und andere Chains mit ultraschneller Ausführung und fortschrittlichen Funktionen.",
      },
      faq: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Was ist Rust Rocket?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket ist ein Hochleistungs-Trading und Sniping Bot für Solana, Ethereum und andere Blockchain-Netzwerke. Er bietet ultraschnelle Ausführung mit <10ms Latenz und fortschrittliche Funktionen wie Copy Trading, Smart Exits und eine Trader-API.",
            },
          },
          {
            "@type": "Question",
            name: "Wie schnell ist die Ausführung von Rust Rocket?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket bietet ultraschnelle Ausführung mit weniger als 10 Millisekunden Latenz, dank unseres globalen Netzwerks von Hochleistungs-Gateways und optimierter Rust-basierter Architektur.",
            },
          },
          {
            "@type": "Question",
            name: "Welche Blockchains unterstützt Rust Rocket?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket unterstützt derzeit Solana, Ethereum und mehrere andere wichtige Blockchain-Netzwerke. Wir erweitern ständig unsere Unterstützung für zusätzliche Chains.",
            },
          },
          {
            "@type": "Question",
            name: "Wie funktioniert Copy Trading?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mit unserer Copy-Trading-Funktion können Sie automatisch die Trades erfolgreicher Trader mit nachgewiesener Erfolgsbilanz replizieren. Sie können aus Tradern mit 80%+ Erfolgsraten auswählen und Ihre Copy-Einstellungen anpassen.",
            },
          },
          {
            "@type": "Question",
            name: "Ist Rust Rocket auf Telegram verfügbar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja, Rust Rocket wird hauptsächlich über unseren Telegram-Bot aufgerufen, sodass Sie bequem von überall mit Ihrem Mobilgerät oder Desktop handeln können.",
            },
          },
        ],
      },
    },
    en: {
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Rust Rocket",
        description: "High-Performance Trading & Sniping Bot for Solana and Ethereum",
        potentialAction: [
          {
            "@type": "SearchAction",
            target: `${BASE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "en-US",
      },
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Rust Rocket",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/images/logo-full.png`,
          contentUrl: `${BASE_URL}/images/logo-full.png`,
          width: 320,
          height: 89,
          caption: "Rust Rocket Logo",
        },
        image: { "@id": `${BASE_URL}/#logo` },
        sameAs: ["https://twitter.com/rustrocket", "https://t.me/rustrocket", "https://discord.gg/rustrocket"],
      },
      product: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Rust Rocket Trading Bot",
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
        },
        description:
          "Rust Rocket is a high-performance trading and sniping bot for Solana, Ethereum, and other chains with ultra-fast execution and advanced features.",
      },
      faq: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Rust Rocket?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket is a high-performance trading and sniping bot for Solana, Ethereum, and other blockchain networks. It offers ultra-fast execution with <10ms latency and advanced features like copy trading, smart exits, and a trader API.",
            },
          },
          {
            "@type": "Question",
            name: "How fast is Rust Rocket's execution?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket offers ultra-fast execution with less than 10 milliseconds latency, thanks to our global network of high-performance gateways and optimized Rust-based architecture.",
            },
          },
          {
            "@type": "Question",
            name: "Which blockchains does Rust Rocket support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket currently supports Solana, Ethereum, and several other major blockchain networks. We're constantly expanding our support for additional chains.",
            },
          },
          {
            "@type": "Question",
            name: "How does copy trading work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our copy trading feature allows you to automatically replicate the trades of successful traders with proven track records. You can select from traders with 80%+ success rates and customize your copy settings.",
            },
          },
          {
            "@type": "Question",
            name: "Is Rust Rocket available on Telegram?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Rust Rocket is primarily accessed through our Telegram bot, making it convenient to trade from anywhere using your mobile device or desktop.",
            },
          },
        ],
      },
    },
    es: {
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Rust Rocket",
        description: "Bot de Trading y Sniping de Alto Rendimiento para Solana y Ethereum",
        potentialAction: [
          {
            "@type": "SearchAction",
            target: `${BASE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "es-ES",
      },
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Rust Rocket",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/images/logo-full.png`,
          contentUrl: `${BASE_URL}/images/logo-full.png`,
          width: 320,
          height: 89,
          caption: "Rust Rocket Logo",
        },
        image: { "@id": `${BASE_URL}/#logo` },
        sameAs: ["https://twitter.com/rustrocket", "https://t.me/rustrocket", "https://discord.gg/rustrocket"],
      },
      product: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Rust Rocket Trading Bot",
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
        },
        description:
          "Rust Rocket es un bot de trading y sniping de alto rendimiento para Solana, Ethereum y otras cadenas con ejecución ultrarrápida y características avanzadas.",
      },
      faq: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Qué es Rust Rocket?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket es un bot de trading y sniping de alto rendimiento para Solana, Ethereum y otras redes blockchain. Ofrece una ejecución ultrarrápida con una latencia <10ms y características avanzadas como copy trading, salidas inteligentes y una API para traders.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué tan rápida es la ejecución de Rust Rocket?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket ofrece una ejecución ultrarrápida con menos de 10 milisegundos de latencia, gracias a nuestra red global de pasarelas de alto rendimiento y arquitectura optimizada basada en Rust.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué blockchains soporta Rust Rocket?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket actualmente soporta Solana, Ethereum y varias otras redes blockchain importantes. Estamos constantemente expandiendo nuestro soporte para cadenas adicionales.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cómo funciona el copy trading?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nuestra función de copy trading te permite replicar automáticamente las operaciones de traders exitosos con historial probado. Puedes seleccionar entre traders con tasas de éxito del 80%+ y personalizar tus configuraciones de copia.",
            },
          },
          {
            "@type": "Question",
            name: "¿Está Rust Rocket disponible en Telegram?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí, Rust Rocket se accede principalmente a través de nuestro bot de Telegram, lo que hace conveniente operar desde cualquier lugar usando tu dispositivo móvil o escritorio.",
            },
          },
        ],
      },
    },
    fr: {
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Rust Rocket",
        description: "Bot de Trading et de Sniping Haute Performance pour Solana et Ethereum",
        potentialAction: [
          {
            "@type": "SearchAction",
            target: `${BASE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "fr-FR",
      },
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Rust Rocket",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/images/logo-full.png`,
          contentUrl: `${BASE_URL}/images/logo-full.png`,
          width: 320,
          height: 89,
          caption: "Rust Rocket Logo",
        },
        image: { "@id": `${BASE_URL}/#logo` },
        sameAs: ["https://twitter.com/rustrocket", "https://t.me/rustrocket", "https://discord.gg/rustrocket"],
      },
      product: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Rust Rocket Trading Bot",
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
        },
        description:
          "Rust Rocket est un bot de trading et de sniping haute performance pour Solana, Ethereum et autres chaînes avec une exécution ultra-rapide et des fonctionnalités avancées.",
      },
      faq: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Qu'est-ce que Rust Rocket?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket est un bot de trading et de sniping haute performance pour Solana, Ethereum et autres réseaux blockchain. Il offre une exécution ultra-rapide avec une latence <10ms et des fonctionnalités avancées comme le copy trading, les sorties intelligentes et une API pour traders.",
            },
          },
          {
            "@type": "Question",
            name: "Quelle est la vitesse d'exécution de Rust Rocket?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket offre une exécution ultra-rapide avec moins de 10 millisecondes de latence, grâce à notre réseau mondial de passerelles haute performance et à notre architecture optimisée basée sur Rust.",
            },
          },
          {
            "@type": "Question",
            name: "Quelles blockchains Rust Rocket prend-il en charge?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket prend actuellement en charge Solana, Ethereum et plusieurs autres réseaux blockchain majeurs. Nous élargissons constamment notre support pour des chaînes supplémentaires.",
            },
          },
          {
            "@type": "Question",
            name: "Comment fonctionne le copy trading?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Notre fonctionnalité de copy trading vous permet de répliquer automatiquement les transactions de traders à succès avec des antécédents prouvés. Vous pouvez sélectionner parmi des traders avec des taux de réussite de 80%+ et personnaliser vos paramètres de copie.",
            },
          },
          {
            "@type": "Question",
            name: "Rust Rocket est-il disponible sur Telegram?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui, Rust Rocket est principalement accessible via notre bot Telegram, ce qui rend pratique le trading depuis n'importe où en utilisant votre appareil mobile ou votre ordinateur de bureau.",
            },
          },
        ],
      },
    },
    zh: {
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Rust Rocket",
        description: "索拉纳和以太坊高性能交易和狙击机器人",
        potentialAction: [
          {
            "@type": "SearchAction",
            target: `${BASE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "zh-CN",
      },
      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Rust Rocket",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/images/logo-full.png`,
          contentUrl: `${BASE_URL}/images/logo-full.png`,
          width: 320,
          height: 89,
          caption: "Rust Rocket Logo",
        },
        image: { "@id": `${BASE_URL}/#logo` },
        sameAs: ["https://twitter.com/rustrocket", "https://t.me/rustrocket", "https://discord.gg/rustrocket"],
      },
      product: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Rust Rocket Trading Bot",
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
        },
        description:
          "Rust Rocket是一款适用于Solana、以太坊和其他链的高性能交易和狙击机器人，具有超快速执行和高级功能。",
      },
      faq: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "什么是Rust Rocket？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket是一款适用于Solana、以太坊和其他区块链网络的高性能交易和狙击机器人。它提供<10ms延迟的超快速执行和高级功能，如复制交易、智能退出和交易者API。",
            },
          },
          {
            "@type": "Question",
            name: "Rust Rocket的执行速度有多快？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket提供不到10毫秒延迟的超快速执行，这要归功于我们的全球高性能网关网络和优化的基于Rust的架构。",
            },
          },
          {
            "@type": "Question",
            name: "Rust Rocket支持哪些区块链？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust Rocket目前支持Solana、以太坊和其他几个主要区块链网络。我们不断扩展对更多链的支持。",
            },
          },
          {
            "@type": "Question",
            name: "复制交易是如何工作的？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "我们的复制交易功能允许您自动复制有成功记录的交易者的交易。您可以从成功率80%+的交易者中选择，并自定义您的复制设置。",
            },
          },
          {
            "@type": "Question",
            name: "Rust Rocket在Telegram上可用吗？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "是的，Rust Rocket主要通过我们的Telegram机器人访问，使您可以方便地使用移动设备或桌面设备从任何地方进行交易。",
            },
          },
        ],
      },
    },
  }

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[language].website) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[language].organization) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[language].product) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[language].faq) }}
      />
    </>
  )
}
