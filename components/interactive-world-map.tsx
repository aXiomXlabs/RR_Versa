"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Globe, Wifi, Clock, Server, X, ChevronRight, ExternalLink } from "lucide-react"

// Gateway-Daten für die 15 wichtigsten Städte
const GATEWAY_CITIES = [
  {
    id: 1,
    name: "Frankfurt",
    country: "Deutschland",
    continent: "Europa",
    coordinates: { x: 52, y: 30.5 },
    latency: 8,
    uptime: 99.99,
    capacity: 5000,
    transactions: 1250000,
    color: "#39FF14", // Neon
    description: "Zentraler europäischer Hub mit direkter Anbindung an wichtige Finanzknoten",
  },
  {
    id: 2,
    name: "London",
    country: "Großbritannien",
    continent: "Europa",
    coordinates: { x: 48, y: 28 },
    latency: 9,
    uptime: 99.98,
    capacity: 4800,
    transactions: 1180000,
    color: "#39FF14", // Neon
    description: "Strategischer Standort für europäische Finanzinstitutionen mit hoher Kapazität",
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    continent: "Nordamerika",
    coordinates: { x: 30, y: 32 },
    latency: 12,
    uptime: 99.97,
    capacity: 5200,
    transactions: 1320000,
    color: "#39FF14", // Neon
    description: "Primärer US-Hub mit direkter Anbindung an Wall Street und institutionelle Trader",
  },
  {
    id: 4,
    name: "Tokio",
    country: "Japan",
    continent: "Asien",
    coordinates: { x: 82, y: 34 },
    latency: 14,
    uptime: 99.95,
    capacity: 4600,
    transactions: 980000,
    color: "#00D1FF", // Blue
    description: "Asiatischer Hauptknotenpunkt mit optimierter Anbindung an japanische Börsen",
  },
  {
    id: 5,
    name: "Singapur",
    country: "Singapur",
    continent: "Asien",
    coordinates: { x: 76, y: 46 },
    latency: 15,
    uptime: 99.96,
    capacity: 4500,
    transactions: 950000,
    color: "#00D1FF", // Blue
    description: "Strategischer Standort für südostasiatische Märkte mit hoher Zuverlässigkeit",
  },
  {
    id: 6,
    name: "Sydney",
    country: "Australien",
    continent: "Ozeanien",
    coordinates: { x: 86, y: 58 },
    latency: 18,
    uptime: 99.93,
    capacity: 3800,
    transactions: 780000,
    color: "#00D1FF", // Blue
    description: "Primärer Hub für australische und ozeanische Trader mit niedriger Latenz",
  },
  {
    id: 7,
    name: "San Francisco",
    country: "USA",
    continent: "Nordamerika",
    coordinates: { x: 18, y: 34 },
    latency: 10,
    uptime: 99.98,
    capacity: 5100,
    transactions: 1280000,
    color: "#39FF14", // Neon
    description: "Direkter Zugang zu Silicon Valley und Solana-Entwicklern mit höchster Kapazität",
  },
  {
    id: 8,
    name: "Seoul",
    country: "Südkorea",
    continent: "Asien",
    coordinates: { x: 80, y: 32 },
    latency: 16,
    uptime: 99.94,
    capacity: 4200,
    transactions: 920000,
    color: "#00D1FF", // Blue
    description: "Optimiert für den koreanischen Markt mit hohem Handelsvolumen",
  },
  {
    id: 9,
    name: "Dubai",
    country: "VAE",
    continent: "Asien",
    coordinates: { x: 62, y: 38 },
    latency: 17,
    uptime: 99.92,
    capacity: 3900,
    transactions: 850000,
    color: "#D900FF", // Purple
    description: "Strategischer Mittlerer Osten Hub mit wachsender Bedeutung für Krypto-Handel",
  },
  {
    id: 10,
    name: "São Paulo",
    country: "Brasilien",
    continent: "Südamerika",
    coordinates: { x: 35, y: 55 },
    latency: 22,
    uptime: 99.9,
    capacity: 3500,
    transactions: 720000,
    color: "#D900FF", // Purple
    description: "Hauptknotenpunkt für lateinamerikanische Trader mit steigender Kapazität",
  },
  {
    id: 11,
    name: "Chicago",
    country: "USA",
    continent: "Nordamerika",
    coordinates: { x: 27, y: 31 },
    latency: 11,
    uptime: 99.97,
    capacity: 4900,
    transactions: 1150000,
    color: "#39FF14", // Neon
    description: "Optimiert für institutionelle Trader mit Fokus auf Hochfrequenzhandel",
  },
  {
    id: 12,
    name: "Amsterdam",
    country: "Niederlande",
    continent: "Europa",
    coordinates: { x: 51, y: 28 },
    latency: 10,
    uptime: 99.98,
    capacity: 4700,
    transactions: 1100000,
    color: "#39FF14", // Neon
    description: "Europäischer Knotenpunkt mit hervorragender Netzwerkinfrastruktur",
  },
  {
    id: 13,
    name: "Mumbai",
    country: "Indien",
    continent: "Asien",
    coordinates: { x: 68, y: 42 },
    latency: 19,
    uptime: 99.91,
    capacity: 3700,
    transactions: 800000,
    color: "#D900FF", // Purple
    description: "Wachsender Hub für den indischen Subkontinent mit steigender Bedeutung",
  },
  {
    id: 14,
    name: "Johannesburg",
    country: "Südafrika",
    continent: "Afrika",
    coordinates: { x: 55, y: 56 },
    latency: 24,
    uptime: 99.89,
    capacity: 3200,
    transactions: 650000,
    color: "#D900FF", // Purple
    description: "Primärer afrikanischer Hub mit wachsender Infrastruktur für Krypto-Handel",
  },
  {
    id: 15,
    name: "Toronto",
    country: "Kanada",
    continent: "Nordamerika",
    coordinates: { x: 28, y: 29 },
    latency: 13,
    uptime: 99.96,
    capacity: 4400,
    transactions: 950000,
    color: "#00D1FF", // Blue
    description: "Nordamerikanischer Hub mit Fokus auf institutionelle Trader und Stabilität",
  },
]

// Kontinente für die Filterung
const CONTINENTS = [
  { id: "all", name: "Alle Standorte" },
  { id: "europa", name: "Europa" },
  { id: "nordamerika", name: "Nordamerika" },
  { id: "asien", name: "Asien" },
  { id: "südamerika", name: "Südamerika" },
  { id: "afrika", name: "Afrika" },
  { id: "ozeanien", name: "Ozeanien" },
]

export default function InteractiveWorldMap() {
  const [selectedCity, setSelectedCity] = useState<number | null>(null)
  const [hoveredCity, setHoveredCity] = useState<number | null>(null)
  const [activeContinent, setActiveContinent] = useState("all")
  const [isAnimating, setIsAnimating] = useState(true)
  const [showPulse, setShowPulse] = useState(true)
  const mapRef = useRef<HTMLDivElement>(null)

  // Filter cities based on selected continent
  const filteredCities = GATEWAY_CITIES.filter(
    (city) => activeContinent === "all" || city.continent.toLowerCase() === activeContinent.toLowerCase(),
  )

  // Start animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Pulse animation for cities
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setShowPulse((prev) => !prev)
    }, 1500)

    return () => clearInterval(pulseInterval)
  }, [])

  // Handle city selection
  const handleCityClick = (cityId: number) => {
    setSelectedCity(cityId === selectedCity ? null : cityId)
  }

  // Close city details
  const handleCloseDetails = () => {
    setSelectedCity(null)
  }

  // Get selected city data
  const selectedCityData = selectedCity ? GATEWAY_CITIES.find((city) => city.id === selectedCity) : null

  return (
    <div className="relative w-full h-full">
      {/* Continent filter */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {CONTINENTS.map((continent) => (
          <button
            key={continent.id}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeContinent === continent.id ? "bg-neon text-black" : "bg-white/10 text-silver hover:bg-white/20"
            }`}
            onClick={() => setActiveContinent(continent.id)}
          >
            {continent.name}
          </button>
        ))}
      </div>

      {/* World map container */}
      <div
        ref={mapRef}
        className="relative w-full aspect-[2/1] bg-[#0A0A1A] rounded-xl overflow-hidden border border-white/10"
      >
        {/* Map background with grid lines */}
        <div className="absolute inset-0 bg-[url('/dark-blue-world-map.png')] bg-cover bg-center opacity-40"></div>

        {/* Glowing connections between cities */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection lines between cities */}
          {filteredCities.map((city, i) =>
            filteredCities
              .slice(i + 1, i + 3)
              .map((connectedCity, j) => (
                <motion.line
                  key={`${city.id}-${connectedCity.id}`}
                  x1={`${city.coordinates.x}%`}
                  y1={`${city.coordinates.y}%`}
                  x2={`${connectedCity.coordinates.x}%`}
                  y2={`${connectedCity.coordinates.y}%`}
                  stroke={city.color}
                  strokeWidth="0.15"
                  strokeOpacity="0.5"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                />
              )),
          )}
        </svg>

        {/* City markers */}
        {filteredCities.map((city) => (
          <div
            key={city.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
            style={{ left: `${city.coordinates.x}%`, top: `${city.coordinates.y}%` }}
            onClick={() => handleCityClick(city.id)}
            onMouseEnter={() => setHoveredCity(city.id)}
            onMouseLeave={() => setHoveredCity(null)}
          >
            {/* Pulse animation */}
            <motion.div
              className="absolute rounded-full"
              style={{
                backgroundColor: city.color,
                width: "100%",
                height: "100%",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: showPulse ? [1, 1.5, 1] : [1, 1.2, 1],
                opacity: showPulse ? [0.7, 0, 0.7] : [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
            />

            {/* City dot */}
            <motion.div
              className={`w-3 h-3 rounded-full flex items-center justify-center transition-transform duration-200 ${
                selectedCity === city.id || hoveredCity === city.id ? "scale-150" : ""
              }`}
              style={{ backgroundColor: city.color }}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Inner dot */}
              <div className="w-1 h-1 rounded-full bg-white" />
            </motion.div>

            {/* City name tooltip */}
            <AnimatePresence>
              {(hoveredCity === city.id || selectedCity === city.id) && (
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs whitespace-nowrap z-20"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-bold" style={{ color: city.color }}>
                    {city.name}
                  </div>
                  <div className="text-silver text-[10px]">{city.country}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Animated data packets */}
        {isAnimating &&
          filteredCities.map((city) => (
            <motion.div
              key={`packet-${city.id}`}
              className="absolute w-1 h-1 rounded-full bg-neon z-5"
              style={{
                left: `${city.coordinates.x}%`,
                top: `${city.coordinates.y}%`,
                boxShadow: "0 0 5px #39FF14, 0 0 10px #39FF14",
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 100],
                opacity: [1, 0],
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          ))}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm p-2 rounded-lg text-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-neon"></div>
            <span className="text-silver">{"<10ms Latenz"}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue"></div>
            <span className="text-silver">10-20ms Latenz</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple"></div>
            <span className="text-silver">{">20ms Latenz"}</span>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm p-2 rounded-lg text-xs">
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-3 h-3 text-neon" />
            <span className="text-silver">15 Global Gateways</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-3 h-3 text-neon" />
            <span className="text-silver">Ø 15ms Latenz</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-neon" />
            <span className="text-silver">99.95% Uptime</span>
          </div>
        </div>
      </div>

      {/* City details panel */}
      <AnimatePresence>
        {selectedCityData && (
          <motion.div
            className="mt-6 bg-dark/50 backdrop-blur-md border border-white/10 rounded-xl p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-silver hover:text-white"
              onClick={handleCloseDetails}
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${selectedCityData.color}20` }}
              >
                <Globe className="w-6 h-6" style={{ color: selectedCityData.color }} />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold flex items-center">
                  {selectedCityData.name}
                  <span className="ml-2 text-sm text-silver/70">{selectedCityData.country}</span>
                </h3>

                <p className="text-silver mt-1 mb-4">{selectedCityData.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-silver/70 mb-1">
                      <Clock className="w-3 h-3" />
                      <span>Latenz</span>
                    </div>
                    <div className="text-xl font-bold" style={{ color: selectedCityData.color }}>
                      {selectedCityData.latency} ms
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-silver/70 mb-1">
                      <Wifi className="w-3 h-3" />
                      <span>Uptime</span>
                    </div>
                    <div className="text-xl font-bold" style={{ color: selectedCityData.color }}>
                      {selectedCityData.uptime}%
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-silver/70 mb-1">
                      <Server className="w-3 h-3" />
                      <span>Kapazität</span>
                    </div>
                    <div className="text-xl font-bold" style={{ color: selectedCityData.color }}>
                      {selectedCityData.capacity} TPS
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-xs text-silver/70 mb-1">
                      <Zap className="w-3 h-3" />
                      <span>Transaktionen/Tag</span>
                    </div>
                    <div className="text-xl font-bold" style={{ color: selectedCityData.color }}>
                      {(selectedCityData.transactions / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div
                    className="px-2 py-1 rounded text-black font-medium"
                    style={{ backgroundColor: selectedCityData.color }}
                  >
                    {selectedCityData.latency < 10
                      ? "Ultra-Low Latency"
                      : selectedCityData.latency < 20
                        ? "Low Latency"
                        : "Standard Latency"}
                  </div>
                  <a
                    href="#"
                    className="flex items-center text-silver hover:text-white transition-colors"
                    data-cursor="link"
                  >
                    Standort testen
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-silver hover:text-white transition-colors"
                    data-cursor="link"
                  >
                    Technische Details
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
