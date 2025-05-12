"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Unterstützte Sprachen
export type Language = "de" | "en" | "es" | "fr" | "zh"

// Sprachkontext-Typ
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Erstellen des Kontexts mit Standardwerten
const LanguageContext = createContext<LanguageContextType>({
  language: "de",
  setLanguage: () => {},
  t: (key) => key,
})

// Hook für den einfachen Zugriff auf den Sprachkontext
export const useLanguage = () => useContext(LanguageContext)

// Übersetzungen
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.features": "Funktionen",
    "nav.network": "Netzwerk",
    "nav.dashboard": "Dashboard",
    "nav.testimonials": "Erfahrungen",
    "nav.contact": "Kontakt",

    // Header
    "header.title": "Der führende Telegram Trading und Sniping Bot",
    "header.subtitle":
      "Entdecke Rust Rocket, den Top-Telegram-Trading-Bot, der DeFi auf Ethereum, Solana und anderen Chains revolutioniert. Unsere fortschrittliche Rust-Technologie bietet unübertroffene Geschwindigkeit und Präzision für maximale Gewinne.",
    "header.cta": "Jetzt auf Telegram starten",

    // Bots
    "bots.sniper.title": "Sniper Bot",
    "bots.sniper.description": "Snipe Tokens in <10 ms mit bloxroute-Gateways für maximale Gewinne.",
    "bots.wallet.title": "Wallet Bot",
    "bots.wallet.description": "Kopiere Top-Trader mit 80%+ Erfolgsquote automatisch in deine Wallet.",
    "bots.whale.title": "Whale Bot",
    "bots.whale.description": "Verfolge Whale-Bewegungen und nutze Smart Exits mit Stop-Loss & Take-Profit.",
    "bots.buy.title": "Buy Bot",
    "bots.buy.description": "Erweitere deine Strategien mit unserer API und automatisierten Kaufregeln.",

    // Sections
    "sections.features": "Funktionen",
    "sections.network": "Globales Netzwerk",
    "sections.network.subtitle":
      "Unsere 15 strategisch platzierten Gateways garantieren minimale Latenz und maximale Ausführungsgeschwindigkeit für Solana-Trader weltweit.",
    "sections.network.description":
      "Mit unserem globalen Netzwerk von High-Performance-Gateways bieten wir dir unübertroffene Geschwindigkeit und Zuverlässigkeit, egal wo du handelst.",
    "sections.network.cta": "Netzwerk-Details anzeigen",
    "sections.dashboard": "Copy Trading Dashboard",
    "sections.dashboard.subtitle":
      "Experience how Rust Rocket helps you copy top-performing wallets with Nansen Intelligence for maximum profits.",
    "sections.dashboard.cta": "Selbst ausprobieren",
    "sections.testimonials": "Was unsere Nutzer sagen",
    "sections.testimonials.subtitle":
      "Schließe dich tausenden von Tradern an, die bereits Rust Rocket nutzen, um ihre Trading-Performance zu verbessern.",
    "sections.faq": "Häufig gestellte Fragen",
    "sections.cta": "Bereit für den Start?",
    "sections.cta.subtitle": "Starte noch heute mit Rust Rocket und erlebe Trading auf einem neuen Level.",

    // Footer
    "footer.newsletter": "Newsletter",
    "footer.newsletter.subtitle": "Abonniere, um Updates zu neuen Funktionen und Trading-Möglichkeiten zu erhalten.",
    "footer.earlyaccess": "Früher Zugang",
    "footer.earlyaccess.subtitle":
      "Trage dich in unsere Warteliste ein, um frühen Zugang zu unseren exklusiven Trading-Funktionen zu erhalten.",
    "footer.waitlist": "Warteliste beitreten",
    "footer.copyright": "Alle Rechte vorbehalten.",

    // Floating Menu
    "menu.waitlist": "Warteliste",
    "menu.contact": "Kontakt",
    "menu.telegram": "Telegram",
    "menu.features": "Funktionen",
    "menu.theme": "Design",
    "menu.language": "Sprache",
    "menu.top": "Nach oben",

    // Theme Modal
    "theme.title": "Design wählen",
    "theme.subtitle": "Wähle ein Design für das schwebende Menü, das deinen Vorlieben oder Website-Stil entspricht.",
    "theme.cancel": "Abbrechen",
    "theme.apply": "Anwenden",

    // Language Modal
    "language.title": "Sprache wählen",
    "language.subtitle": "Wähle deine bevorzugte Sprache für die Website.",
    "language.de": "Deutsch",
    "language.en": "Englisch",
    "language.es": "Spanisch",
    "language.fr": "Französisch",
    "language.zh": "Chinesisch",

    // Bots Demo
    "botdemo.title": "Trading Bot Demo",
    "botdemo.subtitle":
      "Erlebe die Leistungsfähigkeit unserer Trading Bots in einer interaktiven Simulation. Wähle einen Bot-Typ, passe die Parameter an und sieh dir die Ergebnisse in Echtzeit an.",
    "botdemo.cta": "Jetzt zur Warteliste anmelden",
    "botdemo.ready": "Bereit, mit echten Assets zu handeln?",

    // Bot Typen
    "bot.sniper.title": "Sniper Bot",
    "bot.sniper.description":
      "Blitzschnelle Ausführung für neue Token-Listings und Flash-Opportunities mit minimaler Latenz.",
    "bot.wallet.title": "Wallet Bot",
    "bot.wallet.description":
      "Kopiert die Strategien erfolgreicher Trader mit präziser Timing-Optimierung und Smart Routing.",
    "bot.whale.title": "Whale Bot",
    "bot.whale.description": "Verfolgt große Wallet-Bewegungen und positioniert sich strategisch vor Marktbewegungen.",
    "bot.buy.title": "Buy Bot",
    "bot.buy.description": "Automatisierte Kaufstrategien basierend auf technischen Indikatoren und Marktbedingungen.",

    // Bot Konfiguration
    "bot.config.title": "Bot Konfiguration",
    "bot.config.type": "Bot-Typ auswählen",
    "bot.config.aggressiveness": "Aggressivität",
    "bot.config.safety": "Sicherheitslevel",
    "bot.config.slippage": "Max. Slippage",
    "bot.config.gas": "Gas Boost",
    "bot.config.start": "Simulation starten",
    "bot.config.running": "Simulation läuft...",
    "bot.config.conservative": "Konservativ",
    "bot.config.aggressive": "Aggressiv",
    "bot.config.risky": "Riskant",
    "bot.config.safe": "Sicher",
    "bot.config.gasLow": "Niedrig (günstigere Gebühren)",
    "bot.config.gasMedium": "Mittel (ausgewogen)",
    "bot.config.gasHigh": "Hoch (schnellere Ausführung)",
    "bot.config.takeProfit": "Auto Take-Profit",
    "bot.config.stopLoss": "Auto Stop-Loss",

    // Simulation
    "simulation.title": "Simulation",
    "simulation.loading": "Simulation läuft...",
    "simulation.configure": "Konfiguriere den Bot und starte die Simulation, um die Ergebnisse zu sehen.",
    "simulation.timeframe": "Timeframe",
    "simulation.roi": "ROI",
    "simulation.winRate": "Win Rate",
    "simulation.trades": "Trades",
    "simulation.execTime": "Ausführungszeit",

    // Ergebnisse
    "results.title": "Simulationsergebnisse",
    "results.compare": "Vergleich mit manuellem Trading",
    "results.summary": "Zusammenfassung",
    "results.trades": "Trades",
    "results.metrics": "Metriken",
    "results.performance": "Performance",
    "results.startCapital": "Startkapital",
    "results.endCapital": "Endkapital",
    "results.absoluteProfit": "Absoluter Gewinn/Verlust",
    "results.tradeCount": "Anzahl Trades",
    "results.avgExecTime": "Durchschn. Ausführungszeit",
    "results.advantages": "Bot-Vorteile",
    "results.fastExecution": "Blitzschnelle Ausführung",
    "results.fastExecutionDesc":
      "Unter 10ms Reaktionszeit für maximalen Vorteil bei neuen Listings und Flash-Opportunities.",
    "results.optimizedStrategies": "Optimierte Strategien",
    "results.optimizedStrategiesDesc": "Datenbasierte Entscheidungen ohne emotionale Beeinflussung.",
    "results.riskManagement": "Risikomanagement",
    "results.riskManagementDesc":
      "Automatische Take-Profit und Stop-Loss Mechanismen schützen dein Kapital und maximieren Gewinne.",
    "results.download": "Vollständigen Bericht herunterladen",

    // Vergleich
    "compare.title": "Bot vs. Manuelles Trading",
    "compare.manual": "Manuelles Trading",
    "compare.result": "Ergebnis",
    "compare.resultDesc":
      "Mit dem Bot hättest du mehr verdient als mit manuellem Trading. Das entspricht einer besseren Performance.",
    "compare.emotional": "Emotionale Entscheidungen",
    "compare.emotionalDesc":
      "Beim manuellen Trading wurden emotionale Entscheidungen getroffen, die zu suboptimalen Ergebnissen führten.",
    "compare.missed": "Verpasste Chancen",
    "compare.missedDesc": "Beim manuellen Trading wurden profitable Gelegenheiten verpasst, die der Bot genutzt hat.",
    "compare.consistent": "Konsistente Ausführung",
    "compare.consistentDesc":
      "Der Bot führte alle Trades mit 100% Präzision aus, während beim manuellen Trading Ausführungsfehler auftraten.",

    // Strategie Tabs
    "strategy.strategies": "Strategien",
    "strategy.features": "Features",
    "strategy.usecases": "Anwendungsfälle",

    // Allgemeine Trading-Begriffe
    "trading.time": "Zeit",
    "trading.token": "Token",
    "trading.entry": "Einstieg",
    "trading.exit": "Ausstieg",
    "trading.volume": "Volumen",
    "trading.pl": "G/V",
    "trading.exchange": "Börse",
    "trading.execTime": "Zeit (ms)",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.network": "Network",
    "nav.dashboard": "Dashboard",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",

    // Header
    "header.title": "The Leading Telegram Trading and Sniping Bot",
    "header.subtitle":
      "Discover Rust Rocket, the top Telegram trading bot revolutionizing DeFi on Ethereum, Solana, and other chains. Our advanced Rust technology offers unmatched speed and precision for maximum profits.",
    "header.cta": "Start on Telegram Now",

    // Bots
    "bots.sniper.title": "Sniper Bot",
    "bots.sniper.description": "Snipe tokens in <10 ms with bloxroute gateways for maximum profits.",
    "bots.wallet.title": "Wallet Bot",
    "bots.wallet.description": "Automatically copy top traders with 80%+ success rate into your wallet.",
    "bots.whale.title": "Whale Bot",
    "bots.whale.description": "Track whale movements and use Smart Exits with Stop-Loss & Take-Profit.",
    "bots.buy.title": "Buy Bot",
    "bots.buy.description": "Extend your strategies with our API and automated buying rules.",

    // Sections
    "sections.features": "Features",
    "sections.network": "Global Network",
    "sections.network.subtitle":
      "Our 15 strategically placed gateways guarantee minimal latency and maximum execution speed for Solana traders worldwide.",
    "sections.network.description":
      "With our global network of high-performance gateways, we offer you unmatched speed and reliability, no matter where you trade.",
    "sections.network.cta": "View Network Details",
    "sections.dashboard": "Copy Trading Dashboard",
    "sections.dashboard.subtitle":
      "Experience how Rust Rocket helps you copy top-performing wallets with Nansen Intelligence for maximum profits.",
    "sections.dashboard.cta": "Try It Yourself",
    "sections.testimonials": "What Our Users Say",
    "sections.testimonials.subtitle":
      "Join thousands of traders who are already using Rust Rocket to boost their trading performance.",
    "sections.faq": "Frequently Asked Questions",
    "sections.cta": "Ready to Launch?",
    "sections.cta.subtitle": "Start with Rust Rocket today and experience trading on a new level.",

    // Footer
    "footer.newsletter": "Newsletter",
    "footer.newsletter.subtitle": "Subscribe to get updates on new features and trading opportunities.",
    "footer.earlyaccess": "Early Access",
    "footer.earlyaccess.subtitle": "Join our waitlist to get early access to our exclusive trading features.",
    "footer.waitlist": "Join Waitlist",
    "footer.copyright": "All rights reserved.",

    // Floating Menu
    "menu.waitlist": "Join Waitlist",
    "menu.contact": "Contact Us",
    "menu.telegram": "Telegram",
    "menu.features": "Features",
    "menu.theme": "Theme",
    "menu.language": "Language",
    "menu.top": "Back to Top",

    // Theme Modal
    "theme.title": "Choose a Theme",
    "theme.subtitle": "Select a theme for the floating menu to match your preference or website style.",
    "theme.cancel": "Cancel",
    "theme.apply": "Apply",

    // Language Modal
    "language.title": "Choose Language",
    "language.subtitle": "Select your preferred language for the website.",
    "language.de": "German",
    "language.en": "English",
    "language.es": "Spanish",
    "language.fr": "French",
    "language.zh": "Chinese",

    // Bots Demo
    "botdemo.title": "Trading Bot Demo",
    "botdemo.subtitle":
      "Experience the power of our trading bots in an interactive simulation. Choose a bot type, adjust parameters, and see the results in real-time.",
    "botdemo.cta": "Join Waitlist Now",
    "botdemo.ready": "Ready to trade with real assets?",

    // Bot Types
    "bot.sniper.title": "Sniper Bot",
    "bot.sniper.description":
      "Lightning-fast execution for new token listings and flash opportunities with minimal latency.",
    "bot.wallet.title": "Wallet Bot",
    "bot.wallet.description":
      "Copies strategies of successful traders with precise timing optimization and smart routing.",
    "bot.whale.title": "Whale Bot",
    "bot.whale.description": "Tracks large wallet movements and positions strategically before market movements.",
    "bot.buy.title": "Buy Bot",
    "bot.buy.description": "Automated buying strategies based on technical indicators and market conditions.",

    // Bot Configuration
    "bot.config.title": "Bot Configuration",
    "bot.config.type": "Select Bot Type",
    "bot.config.aggressiveness": "Aggressiveness",
    "bot.config.safety": "Safety Level",
    "bot.config.slippage": "Max Slippage",
    "bot.config.gas": "Gas Boost",
    "bot.config.start": "Start Simulation",
    "bot.config.running": "Simulation Running...",
    "bot.config.conservative": "Conservative",
    "bot.config.aggressive": "Aggressive",
    "bot.config.risky": "Risky",
    "bot.config.safe": "Safe",
    "bot.config.gasLow": "Low (cheaper fees)",
    "bot.config.gasMedium": "Medium (balanced)",
    "bot.config.gasHigh": "High (faster execution)",
    "bot.config.takeProfit": "Auto Take-Profit",
    "bot.config.stopLoss": "Auto Stop-Loss",

    // Simulation
    "simulation.title": "Simulation",
    "simulation.loading": "Simulation running...",
    "simulation.configure": "Configure the bot and start the simulation to see the results.",
    "simulation.timeframe": "Timeframe",
    "simulation.roi": "ROI",
    "simulation.winRate": "Win Rate",
    "simulation.trades": "Trades",
    "simulation.execTime": "Execution Time",

    // Results
    "results.title": "Simulation Results",
    "results.compare": "Compare with Manual Trading",
    "results.summary": "Summary",
    "results.trades": "Trades",
    "results.metrics": "Metrics",
    "results.performance": "Performance",
    "results.startCapital": "Starting Capital",
    "results.endCapital": "Ending Capital",
    "results.absoluteProfit": "Absolute Profit/Loss",
    "results.tradeCount": "Number of Trades",
    "results.avgExecTime": "Avg. Execution Time",
    "results.advantages": "Bot Advantages",
    "results.fastExecution": "Lightning-Fast Execution",
    "results.fastExecutionDesc":
      "Under 10ms reaction time for maximum advantage in new listings and flash opportunities.",
    "results.optimizedStrategies": "Optimized Strategies",
    "results.optimizedStrategiesDesc": "Data-driven decisions without emotional influence.",
    "results.riskManagement": "Risk Management",
    "results.riskManagementDesc":
      "Automatic take-profit and stop-loss mechanisms protect your capital and maximize profits.",
    "results.download": "Download Full Report",

    // Comparison
    "compare.title": "Bot vs. Manual Trading",
    "compare.manual": "Manual Trading",
    "compare.result": "Result",
    "compare.resultDesc":
      "With the bot, you would have earned more than with manual trading. This represents better performance.",
    "compare.emotional": "Emotional Decisions",
    "compare.emotionalDesc": "In manual trading, emotional decisions were made that led to suboptimal results.",
    "compare.missed": "Missed Opportunities",
    "compare.missedDesc": "In manual trading, profitable opportunities were missed that the bot capitalized on.",
    "compare.consistent": "Consistent Execution",
    "compare.consistentDesc":
      "The bot executed all trades with 100% precision, while manual trading had execution errors.",

    // Strategy Tabs
    "strategy.strategies": "Strategies",
    "strategy.features": "Features",
    "strategy.usecases": "Use Cases",

    // General Trading Terms
    "trading.time": "Time",
    "trading.token": "Token",
    "trading.entry": "Entry",
    "trading.exit": "Exit",
    "trading.volume": "Volume",
    "trading.pl": "P/L",
    "trading.exchange": "Exchange",
    "trading.execTime": "Time (ms)",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.features": "Características",
    "nav.network": "Red",
    "nav.dashboard": "Panel",
    "nav.testimonials": "Testimonios",
    "nav.contact": "Contacto",

    // Header
    "header.title": "El Bot Líder de Trading y Sniping en Telegram",
    "header.subtitle":
      "Descubre Rust Rocket, el mejor bot de trading de Telegram que revoluciona DeFi en Ethereum, Solana y otras cadenas. Nuestra avanzada tecnología Rust ofrece velocidad y precisión inigualables para máximos beneficios.",
    "header.cta": "Comienza en Telegram Ahora",

    // Bots
    "bots.sniper.title": "Bot Sniper",
    "bots.sniper.description": "Captura tokens en <10 ms con gateways bloxroute para máximos beneficios.",
    "bots.wallet.title": "Bot Wallet",
    "bots.wallet.description": "Copia automáticamente a los mejores traders con 80%+ de éxito en tu wallet.",
    "bots.whale.title": "Bot Whale",
    "bots.whale.description": "Sigue movimientos de ballenas y usa Smart Exits con Stop-Loss y Take-Profit.",
    "bots.buy.title": "Bot Buy",
    "bots.buy.description": "Amplía tus estrategias con nuestra API y reglas de compra automatizadas.",

    // Sections
    "sections.features": "Características",
    "sections.network": "Red Global",
    "sections.network.subtitle":
      "Nuestras 15 puertas de enlace estratégicamente ubicadas garantizan latencia mínima y máxima velocidad de ejecución para traders de Solana en todo el mundo.",
    "sections.network.description":
      "Con nuestra red global de puertas de enlace de alto rendimiento, te ofrecemos velocidad y fiabilidad inigualables, sin importar dónde operes.",
    "sections.network.cta": "Ver Detalles de la Red",
    "sections.dashboard": "Panel de Copy Trading",
    "sections.dashboard.subtitle":
      "Experimenta cómo Rust Rocket te ayuda a copiar carteras de alto rendimiento con Nansen Intelligence para máximos beneficios.",
    "sections.dashboard.cta": "Pruébalo Tú Mismo",
    "sections.testimonials": "Lo Que Dicen Nuestros Usuarios",
    "sections.testimonials.subtitle":
      "Únete a miles de traders que ya están usando Rust Rocket para mejorar su rendimiento de trading.",
    "sections.faq": "Preguntas Frecuentes",
    "sections.cta": "¿Listo para Despegar?",
    "sections.cta.subtitle": "Comienza con Rust Rocket hoy y experimenta el trading en un nuevo nivel.",

    // Footer
    "footer.newsletter": "Boletín",
    "footer.newsletter.subtitle":
      "Suscríbete para recibir actualizaciones sobre nuevas funciones y oportunidades de trading.",
    "footer.earlyaccess": "Acceso Anticipado",
    "footer.earlyaccess.subtitle":
      "Únete a nuestra lista de espera para obtener acceso anticipado a nuestras funciones exclusivas de trading.",
    "footer.waitlist": "Unirse a la Lista",
    "footer.copyright": "Todos los derechos reservados.",

    // Floating Menu
    "menu.waitlist": "Lista de Espera",
    "menu.contact": "Contacto",
    "menu.telegram": "Telegram",
    "menu.features": "Características",
    "menu.theme": "Tema",
    "menu.language": "Idioma",
    "menu.top": "Volver Arriba",

    // Theme Modal
    "theme.title": "Elegir un Tema",
    "theme.subtitle": "Selecciona un tema para el menú flotante que coincida con tu preferencia o estilo de sitio web.",
    "theme.cancel": "Cancelar",
    "theme.apply": "Aplicar",

    // Language Modal
    "language.title": "Elegir Idioma",
    "language.subtitle": "Selecciona tu idioma preferido para el sitio web.",
    "language.de": "Alemán",
    "language.en": "Inglés",
    "language.es": "Español",
    "language.fr": "Francés",
    "language.zh": "Chino",

    // Bots Demo
    "botdemo.title": "Demo de Bot de Trading",
    "botdemo.subtitle":
      "Experimenta el poder de nuestros bots de trading en una simulación interactiva. Elige un tipo de bot, ajusta los parámetros y ve los resultados en tiempo real.",
    "botdemo.cta": "Únete a la Lista de Espera",
    "botdemo.ready": "¿Listo para operar con activos reales?",

    // Bot Types
    "bot.sniper.title": "Bot Sniper",
    "bot.sniper.description":
      "Ejecución ultrarrápida para nuevos listados de tokens y oportunidades flash con latencia mínima.",
    "bot.wallet.title": "Bot Wallet",
    "bot.wallet.description":
      "Copia estrategias de traders exitosos con optimización precisa de tiempo y enrutamiento inteligente.",
    "bot.whale.title": "Bot Whale",
    "bot.whale.description":
      "Rastrea movimientos de grandes carteras y se posiciona estratégicamente antes de movimientos del mercado.",
    "bot.buy.title": "Bot Buy",
    "bot.buy.description":
      "Estrategias de compra automatizadas basadas en indicadores técnicos y condiciones del mercado.",

    // Bot Configuration
    "bot.config.title": "Configuración del Bot",
    "bot.config.type": "Seleccionar Tipo de Bot",
    "bot.config.aggressiveness": "Agresividad",
    "bot.config.safety": "Nivel de Seguridad",
    "bot.config.slippage": "Deslizamiento Máx",
    "bot.config.gas": "Impulso de Gas",
    "bot.config.start": "Iniciar Simulación",
    "bot.config.running": "Simulación en Curso...",
    "bot.config.conservative": "Conservador",
    "bot.config.aggressive": "Agresivo",
    "bot.config.risky": "Arriesgado",
    "bot.config.safe": "Seguro",
    "bot.config.gasLow": "Bajo (tarifas más económicas)",
    "bot.config.gasMedium": "Medio (equilibrado)",
    "bot.config.gasHigh": "Alto (ejecución más rápida)",
    "bot.config.takeProfit": "Auto Take-Profit",
    "bot.config.stopLoss": "Auto Stop-Loss",

    // Simulation
    "simulation.title": "Simulación",
    "simulation.loading": "Simulación en curso...",
    "simulation.configure": "Configura el bot e inicia la simulación para ver los resultados.",
    "simulation.timeframe": "Marco temporal",
    "simulation.roi": "ROI",
    "simulation.winRate": "Tasa de Éxito",
    "simulation.trades": "Operaciones",
    "simulation.execTime": "Tiempo de Ejecución",

    // Results
    "results.title": "Resultados de la Simulación",
    "results.compare": "Comparar con Trading Manual",
    "results.summary": "Resumen",
    "results.trades": "Operaciones",
    "results.metrics": "Métricas",
    "results.performance": "Rendimiento",
    "results.startCapital": "Capital Inicial",
    "results.endCapital": "Capital Final",
    "results.absoluteProfit": "Beneficio/Pérdida Absoluta",
    "results.tradeCount": "Número de Operaciones",
    "results.avgExecTime": "Tiempo de Ejecución Promedio",
    "results.advantages": "Ventajas del Bot",
    "results.fastExecution": "Ejecución Ultrarrápida",
    "results.fastExecutionDesc":
      "Tiempo de reacción inferior a 10ms para máxima ventaja en nuevos listados y oportunidades flash.",
    "results.optimizedStrategies": "Estrategias Optimizadas",
    "results.optimizedStrategiesDesc": "Decisiones basadas en datos sin influencia emocional.",
    "results.riskManagement": "Gestión de Riesgos",
    "results.riskManagementDesc":
      "Mecanismos automáticos de take-profit y stop-loss protegen tu capital y maximizan beneficios.",
    "results.download": "Descargar Informe Completo",

    // Comparison
    "compare.title": "Bot vs. Trading Manual",
    "compare.manual": "Trading Manual",
    "compare.result": "Resultado",
    "compare.resultDesc":
      "Con el bot, habrías ganado más que con trading manual. Esto representa un mejor rendimiento.",
    "compare.emotional": "Decisiones Emocionales",
    "compare.emotionalDesc":
      "En el trading manual, se tomaron decisiones emocionales que llevaron a resultados subóptimos.",
    "compare.missed": "Oportunidades Perdidas",
    "compare.missedDesc": "En el trading manual, se perdieron oportunidades rentables que el bot aprovechó.",
    "compare.consistent": "Ejecución Consistente",
    "compare.consistentDesc":
      "El bot ejecutó todas las operaciones con 100% de precisión, mientras que el trading manual tuvo errores de ejecución.",

    // Strategy Tabs
    "strategy.strategies": "Estrategias",
    "strategy.features": "Características",
    "strategy.usecases": "Casos de Uso",

    // General Trading Terms
    "trading.time": "Hora",
    "trading.token": "Token",
    "trading.entry": "Entrada",
    "trading.exit": "Salida",
    "trading.volume": "Volumen",
    "trading.pl": "G/P",
    "trading.exchange": "Intercambio",
    "trading.execTime": "Tiempo (ms)",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.features": "Fonctionnalités",
    "nav.network": "Réseau",
    "nav.dashboard": "Tableau de bord",
    "nav.testimonials": "Témoignages",
    "nav.contact": "Contact",

    // Header
    "header.title": "Le Bot de Trading et de Sniping Telegram Leader",
    "header.subtitle":
      "Découvrez Rust Rocket, le meilleur bot de trading Telegram révolutionnant la DeFi sur Ethereum, Solana et autres chaînes. Notre technologie Rust avancée offre une vitesse et une précision inégalées pour des profits maximaux.",
    "header.cta": "Commencer sur Telegram",

    // Bots
    "bots.sniper.title": "Bot Sniper",
    "bots.sniper.description": "Snipe des tokens en <10 ms avec les passerelles bloxroute pour des profits maximaux.",
    "bots.wallet.title": "Bot Wallet",
    "bots.wallet.description":
      "Copiez automatiquement les meilleurs traders avec 80%+ de taux de réussite dans votre portefeuille.",
    "bots.whale.title": "Bot Whale",
    "bots.whale.description":
      "Suivez les mouvements des baleines et utilisez Smart Exits avec Stop-Loss et Take-Profit.",
    "bots.buy.title": "Bot Buy",
    "bots.buy.description": "Étendez vos stratégies avec notre API et des règles d'achat automatisées.",

    // Sections
    "sections.features": "Fonctionnalités",
    "sections.network": "Réseau Global",
    "sections.network.subtitle":
      "Nos 15 passerelles stratégiquement placées garantissent une latence minimale et une vitesse d'exécution maximale pour les traders Solana dans le monde entier.",
    "sections.network.description":
      "Avec notre réseau mondial de passerelles haute performance, nous vous offrons une vitesse et une fiabilité inégalées, peu importe où vous tradez.",
    "sections.network.cta": "Voir les Détails du Réseau",
    "sections.dashboard": "Tableau de Bord Copy Trading",
    "sections.dashboard.subtitle":
      "Découvrez comment Rust Rocket vous aide à copier les portefeuilles les plus performants avec Nansen Intelligence pour des profits maximaux.",
    "sections.dashboard.cta": "Essayez-le Vous-même",
    "sections.testimonials": "Ce Que Disent Nos Utilisateurs",
    "sections.testimonials.subtitle":
      "Rejoignez des milliers de traders qui utilisent déjà Rust Rocket pour améliorer leurs performances de trading.",
    "sections.faq": "Questions Fréquemment Posées",
    "sections.cta": "Prêt à Décoller?",
    "sections.cta.subtitle": "Commencez avec Rust Rocket aujourd'hui et expérimentez le trading à un nouveau niveau.",

    // Footer
    "footer.newsletter": "Newsletter",
    "footer.newsletter.subtitle":
      "Abonnez-vous pour recevoir des mises à jour sur les nouvelles fonctionnalités et opportunités de trading.",
    "footer.earlyaccess": "Accès Anticipé",
    "footer.earlyaccess.subtitle":
      "Rejoignez notre liste d'attente pour obtenir un accès anticipé à nos fonctionnalités de trading exclusives.",
    "footer.waitlist": "Rejoindre la Liste",
    "footer.copyright": "Tous droits réservés.",

    // Floating Menu
    "menu.waitlist": "Liste d'Attente",
    "menu.contact": "Contact",
    "menu.telegram": "Telegram",
    "menu.features": "Fonctionnalités",
    "menu.theme": "Thème",
    "menu.language": "Langue",
    "menu.top": "Retour en Haut",

    // Theme Modal
    "theme.title": "Choisir un Thème",
    "theme.subtitle":
      "Sélectionnez un thème pour le menu flottant qui correspond à votre préférence ou au style de votre site web.",
    "theme.cancel": "Annuler",
    "theme.apply": "Appliquer",

    // Language Modal
    "language.title": "Choisir la Langue",
    "language.subtitle": "Sélectionnez votre langue préférée pour le site web.",
    "language.de": "Allemand",
    "language.en": "Anglais",
    "language.es": "Espagnol",
    "language.fr": "Français",
    "language.zh": "Chinois",

    // Bots Demo
    "botdemo.title": "Démo de Bot de Trading",
    "botdemo.subtitle":
      "Découvrez la puissance de nos bots de trading dans une simulation interactive. Choisissez un type de bot, ajustez les paramètres et voyez les résultats en temps réel.",
    "botdemo.cta": "Rejoindre la Liste d'Attente",
    "botdemo.ready": "Prêt à trader avec des actifs réels?",

    // Bot Types
    "bot.sniper.title": "Bot Sniper",
    "bot.sniper.description":
      "Exécution ultra-rapide pour les nouveaux tokens et opportunités flash avec latence minimale.",
    "bot.wallet.title": "Bot Wallet",
    "bot.wallet.description":
      "Copie les stratégies des traders à succès avec optimisation précise du timing et routage intelligent.",
    "bot.whale.title": "Bot Whale",
    "bot.whale.description":
      "Suit les mouvements des grandes wallets et se positionne stratégiquement avant les mouvements du marché.",
    "bot.buy.title": "Bot Buy",
    "bot.buy.description":
      "Stratégies d'achat automatisées basées sur des indicateurs techniques et conditions de marché.",

    // Bot Configuration
    "bot.config.title": "Configuration du Bot",
    "bot.config.type": "Sélectionner Type de Bot",
    "bot.config.aggressiveness": "Agressivité",
    "bot.config.safety": "Niveau de Sécurité",
    "bot.config.slippage": "Slippage Max",
    "bot.config.gas": "Boost de Gas",
    "bot.config.start": "Démarrer Simulation",
    "bot.config.running": "Simulation en Cours...",
    "bot.config.conservative": "Conservateur",
    "bot.config.aggressive": "Agressif",
    "bot.config.risky": "Risqué",
    "bot.config.safe": "Sûr",
    "bot.config.gasLow": "Bas (frais moins chers)",
    "bot.config.gasMedium": "Moyen (équilibré)",
    "bot.config.gasHigh": "Élevé (exécution plus rapide)",
    "bot.config.takeProfit": "Auto Take-Profit",
    "bot.config.stopLoss": "Auto Stop-Loss",

    // Simulation
    "simulation.title": "Simulation",
    "simulation.loading": "Simulation en cours...",
    "simulation.configure": "Configurez le bot et démarrez la simulation pour voir les résultats.",
    "simulation.timeframe": "Période",
    "simulation.roi": "ROI",
    "simulation.winRate": "Taux de Réussite",
    "simulation.trades": "Trades",
    "simulation.execTime": "Temps d'Exécution",

    // Results
    "results.title": "Résultats de Simulation",
    "results.compare": "Comparer avec Trading Manuel",
    "results.summary": "Résumé",
    "results.trades": "Trades",
    "results.metrics": "Métriques",
    "results.performance": "Performance",
    "results.startCapital": "Capital Initial",
    "results.endCapital": "Capital Final",
    "results.absoluteProfit": "Profit/Perte Absolue",
    "results.tradeCount": "Nombre de Trades",
    "results.avgExecTime": "Temps d'Exécution Moyen",
    "results.advantages": "Avantages du Bot",
    "results.fastExecution": "Exécution Ultra-rapide",
    "results.fastExecutionDesc":
      "Temps de réaction inférieur à 10ms pour un avantage maximal sur les nouveaux listings et opportunités flash.",
    "results.optimizedStrategies": "Stratégies Optimisées",
    "results.optimizedStrategiesDesc": "Décisions basées sur les données sans influence émotionnelle.",
    "results.riskManagement": "Gestion des Risques",
    "results.riskManagementDesc":
      "Les mécanismes automatiques de take-profit et stop-loss protègent votre capital et maximisent les profits.",
    "results.download": "Télécharger Rapport Complet",

    // Comparison
    "compare.title": "Bot vs. Trading Manuel",
    "compare.manual": "Trading Manuel",
    "compare.result": "Résultat",
    "compare.resultDesc":
      "Avec le bot, vous auriez gagné plus qu'avec le trading manuel. Cela représente une meilleure performance.",
    "compare.emotional": "Décisions Émotionnelles",
    "compare.emotionalDesc":
      "Dans le trading manuel, des décisions émotionnelles ont été prises qui ont conduit à des résultats sous-optimaux.",
    "compare.missed": "Opportunités Manquées",
    "compare.missedDesc":
      "Dans le trading manuel, des opportunités rentables ont été manquées que le bot a exploitées.",
    "compare.consistent": "Exécution Constante",
    "compare.consistentDesc":
      "Le bot a exécuté tous les trades avec 100% de précision, tandis que le trading manuel a eu des erreurs d'exécution.",

    // Strategy Tabs
    "strategy.strategies": "Stratégies",
    "strategy.features": "Fonctionnalités",
    "strategy.usecases": "Cas d'Utilisation",

    // General Trading Terms
    "trading.time": "Heure",
    "trading.token": "Token",
    "trading.entry": "Entrée",
    "trading.exit": "Sortie",
    "trading.volume": "Volume",
    "trading.pl": "P/L",
    "trading.exchange": "Échange",
    "trading.execTime": "Temps (ms)",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.features": "功能",
    "nav.network": "网络",
    "nav.dashboard": "仪表板",
    "nav.testimonials": "用户评价",
    "nav.contact": "联系我们",

    // Header
    "header.title": "领先的电报交易和狙击机器人",
    "header.subtitle":
      "探索Rust Rocket，这款顶级电报交易机器人正在革新以太坊、Solana和其他链上的DeFi。我们先进的Rust技术提供无与伦比的速度和精度，实现最大利润。",
    "header.cta": "立即在电报上开始",

    // Bots
    "bots.sniper.title": "狙击机器人",
    "bots.sniper.description": "使用bloxroute网关在<10毫秒内狙击代币，获取最大利润。",
    "bots.wallet.title": "钱包机器人",
    "bots.wallet.description": "自动将成功率80%+的顶级交易者复制到您的钱包中。",
    "bots.whale.title": "鲸鱼机器人",
    "bots.whale.description": "跟踪鲸鱼动向，使用止损和止盈进行智能退出。",
    "bots.buy.title": "购买机器人",
    "bots.buy.description": "通过我们的API和自动购买规则扩展您的策略。",

    // Sections
    "sections.features": "功能",
    "sections.network": "全球网络",
    "sections.network.subtitle": "我们战略性布局的15个网关保证全球Solana交易者的最小延迟和最大执行速度。",
    "sections.network.description":
      "通过我们的全球高性能网关网络，无论您在哪里交易，我们都能提供无与伦比的速度和可靠性。",
    "sections.network.cta": "查看网络详情",
    "sections.dashboard": "复制交易仪表板",
    "sections.dashboard.subtitle": "体验Rust Rocket如何帮助您复制Nansen Intelligence的顶级表现钱包，获取最大利润。",
    "sections.dashboard.cta": "亲自尝试",
    "sections.testimonials": "用户评价",
    "sections.testimonials.subtitle": "加入已经使用Rust Rocket提升交易表现的数千名交易者。",
    "sections.faq": "常见问题",
    "sections.cta": "准备好启动了吗？",
    "sections.cta.subtitle": "今天就开始使用Rust Rocket，体验新水平的交易。",

    // Footer
    "footer.newsletter": "新闻通讯",
    "footer.newsletter.subtitle": "订阅以获取有关新功能和交易机会的更新。",
    "footer.earlyaccess": "早期访问",
    "footer.earlyaccess.subtitle": "加入我们的等待名单，获取我们独家交易功能的早期访问权。",
    "footer.waitlist": "加入等待名单",
    "footer.copyright": "保留所有权利。",

    // Floating Menu
    "menu.waitlist": "等待名单",
    "menu.contact": "联系我们",
    "menu.telegram": "电报",
    "menu.features": "功能",
    "menu.theme": "主题",
    "menu.language": "语言",
    "menu.top": "返回顶部",

    // Theme Modal
    "theme.title": "选择主题",
    "theme.subtitle": "为浮动菜单选择一个符合您偏好或网站风格的主题。",
    "theme.cancel": "取消",
    "theme.apply": "应用",

    // Language Modal
    "language.title": "选择语言",
    "language.subtitle": "选择您偏好的网站语言。",
    "language.de": "德语",
    "language.en": "英语",
    "language.es": "西班牙语",
    "language.fr": "法语",
    "language.zh": "中文",

    // Bots Demo
    "botdemo.title": "交易机器人演示",
    "botdemo.subtitle": "在交互式模拟中体验我们交易机器人的强大功能。选择机器人类型，调整参数，实时查看结果。",
    "botdemo.cta": "立即加入等待名单",
    "botdemo.ready": "准备好用真实资产交易了吗？",

    // Bot Types
    "bot.sniper.title": "狙击机器人",
    "bot.sniper.description": "以最小延迟为新代币上市和闪电机会提供闪电般的执行速度。",
    "bot.wallet.title": "钱包机器人",
    "bot.wallet.description": "通过精确的时间优化和智能路由复制成功交易者的策略。",
    "bot.whale.title": "鲸鱼机器人",
    "bot.whale.description": "跟踪大型钱包动向，在市场变动前进行战略性布局。",
    "bot.buy.title": "购买机器人",
    "bot.buy.description": "基于技术指标和市场条件的自动购买策略。",

    // Bot Configuration
    "bot.config.title": "机器人配置",
    "bot.config.type": "选择机器人类型",
    "bot.config.aggressiveness": "激进程度",
    "bot.config.safety": "安全级别",
    "bot.config.slippage": "最大滑点",
    "bot.config.gas": "Gas提升",
    "bot.config.start": "开始模拟",
    "bot.config.running": "模拟运行中...",
    "bot.config.conservative": "保守",
    "bot.config.aggressive": "激进",
    "bot.config.risky": "风险",
    "bot.config.safe": "安全",
    "bot.config.gasLow": "低（更便宜的费用）",
    "bot.config.gasMedium": "中（平衡）",
    "bot.config.gasHigh": "高（更快的执行）",
    "bot.config.takeProfit": "自动止盈",
    "bot.config.stopLoss": "自动止损",

    // Simulation
    "simulation.title": "模拟",
    "simulation.loading": "模拟运行中...",
    "simulation.configure": "配置机器人并开始模拟以查看结果。",
    "simulation.timeframe": "时间框架",
    "simulation.roi": "投资回报率",
    "simulation.winRate": "胜率",
    "simulation.trades": "交易",
    "simulation.execTime": "执行时间",

    // Results
    "results.title": "模拟结果",
    "results.compare": "与手动交易比较",
    "results.summary": "摘要",
    "results.trades": "交易",
    "results.metrics": "指标",
    "results.performance": "表现",
    "results.startCapital": "起始资本",
    "results.endCapital": "最终资本",
    "results.absoluteProfit": "绝对利润/损失",
    "results.tradeCount": "交易次数",
    "results.avgExecTime": "平均执行时间",
    "results.advantages": "机器人优势",
    "results.fastExecution": "闪电般的执行",
    "results.fastExecutionDesc": "在新上市和闪电机会中，反应时间低于10毫秒，获得最大优势。",
    "results.optimizedStrategies": "优化策略",
    "results.optimizedStrategiesDesc": "数据驱动决策，没有情绪影响。",
    "results.riskManagement": "风险管理",
    "results.riskManagementDesc": "自动止盈和止损机制保护您的资本并最大化利润。",
    "results.download": "下载完整报告",

    // Comparison
    "compare.title": "机器人 vs. 手动交易",
    "compare.manual": "手动交易",
    "compare.result": "结果",
    "compare.resultDesc": "使用机器人，您将比手动交易赚取更多。这代表更好的表现。",
    "compare.emotional": "情绪决策",
    "compare.emotionalDesc": "在手动交易中，做出了情绪决策，导致次优结果。",
    "compare.missed": "错过的机会",
    "compare.missedDesc": "在手动交易中，错过了机器人利用的有利可图的机会。",
    "compare.consistent": "一致执行",
    "compare.consistentDesc": "机器人以100%的精度执行所有交易，而手动交易存在执行错误。",

    // Strategy Tabs
    "strategy.strategies": "策略",
    "strategy.features": "特点",
    "strategy.usecases": "使用案例",

    // General Trading Terms
    "trading.time": "时间",
    "trading.token": "代币",
    "trading.entry": "入场",
    "trading.exit": "出场",
    "trading.volume": "交易量",
    "trading.pl": "盈亏",
    "trading.exchange": "交易所",
    "trading.execTime": "时间（毫秒）",
  },
}

// Provider-Komponente
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Standardsprache ist Deutsch, aber wir versuchen, die gespeicherte Sprache zu laden
  const [language, setLanguageState] = useState<Language>("de")

  // Beim ersten Laden die gespeicherte Sprache abrufen
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    } else {
      // Versuche, die Browsersprache zu erkennen
      const browserLang = navigator.language.split("-")[0] as Language
      if (Object.keys(translations).includes(browserLang)) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  // Sprache ändern und speichern
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Übersetzungsfunktion
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
