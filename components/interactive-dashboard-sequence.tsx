"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clock,
  BarChart3,
  Percent,
  Users,
  Check,
  AlertTriangle,
  Wallet,
  Zap,
  Settings,
  ArrowRight,
  RefreshCw,
  Filter,
  Star,
  Copy,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import AnimatedCTAButton from "./animated-cta-button"

// Types
interface WalletData {
  id: string
  alias: string
  address: string
  roi24h: number
  roi7d: number
  winRate: number
  followers: number
  dexSplit: {
    name: string
    percentage: number
    color: string
  }[]
  sparkline: number[]
}

interface PresetData {
  id: string
  name: string
  copyRatio: number
  slippage: number
  stopLoss: number
  takeProfit: number
  gasBoost: "Low" | "Medium" | "High"
  dexMode: string
}

// Mock data
const TOP_WALLETS: WalletData[] = [
  {
    id: "wallet1",
    alias: "SolanaWhale42",
    address: "6h29...Xa8C",
    roi24h: 18.4,
    roi7d: 72.1,
    winRate: 67.3,
    followers: 1921,
    dexSplit: [
      { name: "Phoenix", percentage: 55, color: "#FF2D55" },
      { name: "Raydium", percentage: 30, color: "#00D1FF" },
      { name: "Orca", percentage: 15, color: "#D900FF" },
    ],
    sparkline: [100, 109, 115, 120, 118, 125, 128],
  },
  {
    id: "wallet2",
    alias: "PixelDegen",
    address: "9dE7...Tm3L",
    roi24h: 32.7,
    roi7d: 128.9,
    winRate: 54.8,
    followers: 2978,
    dexSplit: [
      { name: "Raydium", percentage: 46, color: "#00D1FF" },
      { name: "Orca", percentage: 38, color: "#D900FF" },
      { name: "Jupiter", percentage: 16, color: "#39FF14" },
    ],
    sparkline: [100, 118, 126, 140, 133, 150, 160],
  },
  {
    id: "wallet3",
    alias: "EthTrader365",
    address: "0x42...F7a9",
    roi24h: 12.5,
    roi7d: 58.3,
    winRate: 72.1,
    followers: 1456,
    dexSplit: [
      { name: "Uniswap", percentage: 65, color: "#FF2D55" },
      { name: "Sushiswap", percentage: 25, color: "#00D1FF" },
      { name: "Balancer", percentage: 10, color: "#D900FF" },
    ],
    sparkline: [100, 105, 112, 108, 115, 120, 125],
  },
]

const PRESETS: PresetData[] = [
  {
    id: "preset1",
    name: "Beginner",
    copyRatio: 50,
    slippage: 0.5,
    stopLoss: 15,
    takeProfit: 30,
    gasBoost: "Low",
    dexMode: "Auto (Best Price)",
  },
  {
    id: "preset2",
    name: "Degen",
    copyRatio: 75,
    slippage: 1.0,
    stopLoss: 20,
    takeProfit: 100,
    gasBoost: "High",
    dexMode: "Auto (Best Price)",
  },
  {
    id: "preset3",
    name: "Whale Shadow",
    copyRatio: 100,
    slippage: 0.2,
    stopLoss: 8,
    takeProfit: 50,
    gasBoost: "Medium",
    dexMode: "Mirror Wallet's DEX",
  },
  {
    id: "preset4",
    name: "Quant Lab",
    copyRatio: 60,
    slippage: 0.3,
    stopLoss: 5,
    takeProfit: 25,
    gasBoost: "Medium",
    dexMode: "Auto (Lowest Fees)",
  },
]

// Helper components
const SparklineChart = ({
  data,
  color = "#39FF14",
  height = 40,
}: { data: number[]; color?: string; height?: number }) => {
  if (!data || data.length === 0) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width="100%" height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sparkline-gradient-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area under the line */}
      <path
        d={`M0,100 L0,${100 - ((data[0] - min) / range) * 100} ${points} ${100},${100 - ((data[data.length - 1] - min) / range) * 100} L100,100 Z`}
        fill={`url(#sparkline-gradient-${color.replace("#", "")})`}
      />

      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* End point */}
      <circle cx="100" cy={100 - ((data[data.length - 1] - min) / range) * 100} r="2" fill={color} />
    </svg>
  )
}

const DexSplitBar = ({ dexSplit }: { dexSplit: WalletData["dexSplit"] }) => {
  return (
    <div className="w-full h-2 rounded-full overflow-hidden flex">
      {dexSplit.map((dex, index) => (
        <motion.div
          key={dex.name}
          className="h-full"
          style={{ backgroundColor: dex.color, width: `${dex.percentage}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        />
      ))}
    </div>
  )
}

const WalletCard = ({
  wallet,
  isSelected,
  onClick,
}: {
  wallet: WalletData
  isSelected: boolean
  onClick: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card
        className={`p-4 cursor-pointer transition-all duration-300 ${
          isSelected ? "border-neon shadow-[0_0_15px_rgba(57,255,20,0.3)]" : "hover:border-neon/50"
        }`}
        onClick={onClick}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">{wallet.alias}</h3>
              <div className="text-xs text-silver/70 bg-white/5 px-2 py-0.5 rounded">{wallet.address}</div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center">
                <Clock className="w-3 h-3 text-silver/70 mr-1" />
                <span className={`text-sm font-medium ${wallet.roi24h > 0 ? "text-neon" : "text-red"}`}>
                  {wallet.roi24h > 0 ? "+" : ""}
                  {wallet.roi24h}%
                </span>
                <span className="text-xs text-silver/70 ml-1">24h</span>
              </div>
              <div className="flex items-center">
                <BarChart3 className="w-3 h-3 text-silver/70 mr-1" />
                <span className={`text-sm font-medium ${wallet.roi7d > 0 ? "text-neon" : "text-red"}`}>
                  {wallet.roi7d > 0 ? "+" : ""}
                  {wallet.roi7d}%
                </span>
                <span className="text-xs text-silver/70 ml-1">7d</span>
              </div>
              <div className="flex items-center">
                <Percent className="w-3 h-3 text-silver/70 mr-1" />
                <span className="text-sm font-medium text-blue">{wallet.winRate}%</span>
                <span className="text-xs text-silver/70 ml-1">Win</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Users className="w-3 h-3 text-silver/70 mr-1" />
              <span className="text-sm text-silver">{wallet.followers}</span>
            </div>
            <button className="bg-neon/10 hover:bg-neon/20 text-neon text-xs font-medium px-2 py-1 rounded transition-colors duration-200">
              <Copy className="w-3 h-3 inline mr-1" />
              Copy
            </button>
          </div>
        </div>

        <div className="mb-2">
          <DexSplitBar dexSplit={wallet.dexSplit} />
          <div className="flex justify-between mt-1 text-xs text-silver/70">
            {wallet.dexSplit.map((dex) => (
              <div key={dex.name} className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: dex.color }}></div>
                {dex.name} {dex.percentage}%
              </div>
            ))}
          </div>
        </div>

        <div className="h-10">
          <SparklineChart data={wallet.sparkline} color={wallet.roi24h > 0 ? "#39FF14" : "#FF2D55"} />
        </div>
      </Card>
    </motion.div>
  )
}

const PresetTab = ({
  preset,
  isActive,
  onClick,
}: {
  preset: PresetData
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
        isActive ? "bg-neon/10 text-neon border-t border-l border-r border-neon/30" : "text-silver hover:text-white"
      }`}
      onClick={onClick}
    >
      {preset.name}
    </button>
  )
}

const PresetDetails = ({ preset }: { preset: PresetData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg mt-2"
    >
      <div>
        <div className="text-xs text-silver/70 mb-1">Copy Ratio</div>
        <div className="flex items-center">
          <div className="text-lg font-bold">{preset.copyRatio}%</div>
          <div className="ml-2 w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neon"
              initial={{ width: 0 }}
              animate={{ width: `${preset.copyRatio}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs text-silver/70 mb-1">Slippage</div>
        <div className="text-lg font-bold">{preset.slippage}%</div>
      </div>

      <div>
        <div className="text-xs text-silver/70 mb-1">Stop-Loss</div>
        <div className="text-lg font-bold text-red">-{preset.stopLoss}%</div>
      </div>

      <div>
        <div className="text-xs text-silver/70 mb-1">Take-Profit</div>
        <div className="text-lg font-bold text-neon">+{preset.takeProfit}%</div>
      </div>

      <div>
        <div className="text-xs text-silver/70 mb-1">Gas Boost</div>
        <div className="flex items-center">
          <div className="text-lg font-bold">{preset.gasBoost}</div>
          <div className="ml-2 flex gap-1">
            <div
              className={`w-2 h-4 rounded-sm ${preset.gasBoost === "Low" || preset.gasBoost === "Medium" || preset.gasBoost === "High" ? "bg-neon" : "bg-white/10"}`}
            ></div>
            <div
              className={`w-2 h-4 rounded-sm ${preset.gasBoost === "Medium" || preset.gasBoost === "High" ? "bg-neon" : "bg-white/10"}`}
            ></div>
            <div className={`w-2 h-4 rounded-sm ${preset.gasBoost === "High" ? "bg-neon" : "bg-white/10"}`}></div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs text-silver/70 mb-1">DEX Mode</div>
        <div className="text-lg font-bold">{preset.dexMode}</div>
      </div>
    </motion.div>
  )
}

// Activity log component
interface ActivityLogItem {
  id: string
  type: "info" | "warning" | "success"
  message: string
  timestamp: string
  details?: string
}

const ActivityLog = ({ items }: { items: ActivityLogItem[] }) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`p-3 rounded-lg border-l-4 ${
            item.type === "info"
              ? "bg-blue/10 border-blue"
              : item.type === "warning"
                ? "bg-red/10 border-red"
                : "bg-neon/10 border-neon"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              {item.type === "info" && <Zap className="w-4 h-4 text-blue mt-0.5" />}
              {item.type === "warning" && <AlertTriangle className="w-4 h-4 text-red mt-0.5" />}
              {item.type === "success" && <Check className="w-4 h-4 text-neon mt-0.5" />}
              <div>
                <div className="text-sm font-medium">{item.message}</div>
                {item.details && <div className="text-xs text-silver/70 mt-1">{item.details}</div>}
              </div>
            </div>
            <div className="text-xs text-silver/70">{item.timestamp}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Main component
export default function InteractiveDashboardSequence() {
  const [step, setStep] = useState(1)
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<PresetData>(PRESETS[2]) // Whale Shadow preset
  const [isTrading, setIsTrading] = useState(false)
  const [tradeProgress, setTradeProgress] = useState(0)
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([])
  const [sortBy, setSortBy] = useState<"roi24h" | "roi7d" | "winRate" | "followers">("roi24h")
  const [profit, setProfit] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [executionTime, setExecutionTime] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [showFinalSummary, setShowFinalSummary] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Sort wallets based on selected criteria
  const sortedWallets = [...TOP_WALLETS].sort((a, b) => {
    if (sortBy === "roi24h") return b.roi24h - a.roi24h
    if (sortBy === "roi7d") return b.roi7d - a.roi7d
    if (sortBy === "winRate") return b.winRate - a.winRate
    return b.followers - a.followers
  })

  // Handle wallet selection
  const handleWalletSelect = (wallet: WalletData) => {
    setSelectedWallet(wallet)
    setStep(2)
  }

  // Handle preset selection
  const handlePresetSelect = (preset: PresetData) => {
    setSelectedPreset(preset)
  }

  // Start copy trading
  const startCopyTrading = () => {
    setIsTrading(true)
    setStep(3)
    setExecutionTime(Math.floor(Math.random() * 15) + 10) // 10-25ms

    // Add initial activity log
    setActivityLogs([
      {
        id: "1",
        type: "info",
        message: `${selectedWallet?.alias} bought Token X on ${selectedWallet?.dexSplit[0].name} at ${new Date().toLocaleTimeString()}`,
        timestamp: "Just now",
        details: "Monitoring transaction...",
      },
    ])

    // Simulate trade progress
    const interval = setInterval(() => {
      setTradeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)

          // Add mirrored trade log after a short delay
          setTimeout(() => {
            setActivityLogs((prev) => [
              ...prev,
              {
                id: "2",
                type: "success",
                message: `Rust Rocket mirrored trade in ≤ ${executionTime} ms`,
                timestamp: "Just now",
                details: `Filled on ${selectedWallet?.dexSplit[0].name}: Best pool found (${selectedWallet?.dexSplit[0].percentage}% liquidity)`,
              },
            ])

            // Set initial profit
            setProfit(5.2)

            // Move to exit phase after a delay
            setTimeout(() => {
              setIsExiting(true)
              setStep(4)

              // Add liquidity warning
              setActivityLogs((prev) => [
                ...prev,
                {
                  id: "3",
                  type: "warning",
                  message: `Liquidity on ${selectedWallet?.dexSplit[0].name} dropped below 20%`,
                  timestamp: "Just now",
                },
              ])

              // Add re-routing log
              setTimeout(() => {
                setActivityLogs((prev) => [
                  ...prev,
                  {
                    id: "4",
                    type: "info",
                    message: `Rust Rocket re-routed exit to ${selectedWallet?.dexSplit[1].name} (${selectedWallet?.dexSplit[1].percentage}% liquidity)`,
                    timestamp: "Just now",
                  },
                ])

                // Add final result
                setTimeout(() => {
                  const finalProfit = 42
                  setProfit(finalProfit)
                  setTotalProfit((prev) => prev + finalProfit)

                  setActivityLogs((prev) => [
                    ...prev,
                    {
                      id: "5",
                      type: "success",
                      message: `Trade closed: +${finalProfit}% profit (Take-Profit triggered at +${selectedPreset.takeProfit}%)`,
                      timestamp: "Just now",
                      details: `Total Profit: +${finalProfit}% • Trade Duration: 3 minutes • DEX Path: ${selectedWallet?.dexSplit[0].name} → ${selectedWallet?.dexSplit[1].name}`,
                    },
                  ])

                  // Show final summary
                  setTimeout(() => {
                    setShowFinalSummary(true)
                    setStep(5)
                  }, 2000)
                }, 2000)
              }, 2000)
            }, 5000)
          }, 1000)

          return 100
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }

  // Reset to dashboard
  const resetToDashboard = () => {
    setStep(1)
    setSelectedWallet(null)
    setIsTrading(false)
    setTradeProgress(0)
    setActivityLogs([])
    setProfit(0)
    setIsExiting(false)
    setShowFinalSummary(false)
  }

  // Scroll to top when step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [step])

  return (
    <div className="bg-dark/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
      {/* Dashboard Header */}
      <div className="bg-black/50 p-4 border-b border-white/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">
              Rust Rocket <span className="text-neon">Dashboard</span>
            </h2>
            <div className="hidden md:flex gap-4">
              <button className={`text-sm ${step === 1 ? "text-neon" : "text-silver/70"}`}>Wallets</button>
              <button className="text-sm text-silver/70">Settings</button>
              <button className="text-sm text-silver/70">API</button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs bg-neon/20 text-neon px-2 py-1 rounded-full">
              <Zap className="w-3 h-3 inline mr-1" />
              Nansen Intelligence
            </div>
            <button className="p-2 text-silver/70 hover:text-white">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="max-h-[600px] overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Dashboard Overview */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">
                  Top Wallets <span className="text-neon">(Nansen Feed)</span>
                </h3>

                {/* Filter chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="text-sm text-silver/70 mr-2 flex items-center">
                    <Filter className="w-4 h-4 mr-1" />
                    Sort by:
                  </div>
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${sortBy === "roi24h" ? "bg-neon text-black" : "bg-white/10 text-silver hover:bg-white/20"}`}
                    onClick={() => setSortBy("roi24h")}
                  >
                    24h ROI
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${sortBy === "roi7d" ? "bg-neon text-black" : "bg-white/10 text-silver hover:bg-white/20"}`}
                    onClick={() => setSortBy("roi7d")}
                  >
                    7d ROI
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${sortBy === "winRate" ? "bg-neon text-black" : "bg-white/10 text-silver hover:bg-white/20"}`}
                    onClick={() => setSortBy("winRate")}
                  >
                    Win Rate
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${sortBy === "followers" ? "bg-neon text-black" : "bg-white/10 text-silver hover:bg-white/20"}`}
                    onClick={() => setSortBy("followers")}
                  >
                    Followers
                  </button>
                </div>

                {/* Wallet cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sortedWallets.map((wallet) => (
                    <WalletCard
                      key={wallet.id}
                      wallet={wallet}
                      isSelected={selectedWallet?.id === wallet.id}
                      onClick={() => handleWalletSelect(wallet)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Wallet Details and Preset Selection */}
          {step === 2 && selectedWallet && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <button
                  className="text-silver hover:text-white flex items-center text-sm mb-4"
                  onClick={resetToDashboard}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Wallets
                </button>

                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold flex items-center">
                        {selectedWallet.alias}
                        <div className="ml-2 bg-neon/20 text-neon text-xs px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 inline mr-1" />
                          Top Performer
                        </div>
                      </h3>
                      <div className="text-sm text-silver/70">{selectedWallet.address}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-silver/70 hover:text-white p-1">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="text-silver/70 hover:text-white p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-silver/70">24h ROI</div>
                      <div className={`text-xl font-bold ${selectedWallet.roi24h > 0 ? "text-neon" : "text-red"}`}>
                        {selectedWallet.roi24h > 0 ? "+" : ""}
                        {selectedWallet.roi24h}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-silver/70">7d ROI</div>
                      <div className={`text-xl font-bold ${selectedWallet.roi7d > 0 ? "text-neon" : "text-red"}`}>
                        {selectedWallet.roi7d > 0 ? "+" : ""}
                        {selectedWallet.roi7d}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-silver/70">Win Rate</div>
                      <div className="text-xl font-bold text-blue">{selectedWallet.winRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-silver/70">Followers</div>
                      <div className="text-xl font-bold">{selectedWallet.followers}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-silver/70 mb-1">DEX Split</div>
                    <DexSplitBar dexSplit={selectedWallet.dexSplit} />
                    <div className="flex justify-between mt-1 text-xs text-silver/70">
                      {selectedWallet.dexSplit.map((dex) => (
                        <div key={dex.name} className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: dex.color }}></div>
                          {dex.name} {dex.percentage}%
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-40 bg-white/5 rounded-lg p-2">
                    <div className="text-xs text-silver/70 mb-1">Performance (7d)</div>
                    <SparklineChart
                      data={selectedWallet.sparkline}
                      color={selectedWallet.roi7d > 0 ? "#39FF14" : "#FF2D55"}
                      height={120}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4">Copy Trading Options</h3>

                  <div className="border-b border-white/10">
                    <div className="flex">
                      {PRESETS.map((preset) => (
                        <PresetTab
                          key={preset.id}
                          preset={preset}
                          isActive={selectedPreset.id === preset.id}
                          onClick={() => handlePresetSelect(preset)}
                        />
                      ))}
                    </div>
                  </div>

                  <PresetDetails preset={selectedPreset} />
                </div>

                <div className="flex justify-center">
                  <AnimatedCTAButton
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      startCopyTrading()
                    }}
                    color="neon"
                  >
                    Start Copying
                  </AnimatedCTAButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Copy Trading in Action */}
          {step === 3 && selectedWallet && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    Copy Trading <span className="text-neon">Active</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-neon animate-pulse mr-1"></div>
                      <span className="text-xs text-silver">Live</span>
                    </div>
                    <button
                      className="text-xs bg-white/10 hover:bg-white/20 text-silver px-2 py-1 rounded"
                      onClick={resetToDashboard}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="col-span-2">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center mr-2">
                            <Wallet className="w-4 h-4 text-neon" />
                          </div>
                          <div>
                            <div className="font-medium">{selectedWallet.alias}</div>
                            <div className="text-xs text-silver/70">{selectedWallet.address}</div>
                          </div>
                        </div>
                        <div className="text-xs bg-neon/20 text-neon px-2 py-1 rounded-full">Copying</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-silver/70 mb-1">Trade Progress</div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-neon"
                            initial={{ width: 0 }}
                            animate={{ width: `${tradeProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-silver/70 mb-1">Activity Log</div>
                        <ActivityLog items={activityLogs} />
                      </div>

                      {profit > 0 && (
                        <div className="bg-neon/10 rounded-lg p-3 border border-neon/30">
                          <div className="text-xs text-silver/70 mb-1">Current Trade</div>
                          <div className="text-xl font-bold text-neon">+{profit.toFixed(1)}%</div>
                          <div className="text-xs text-silver/70">in progress</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-sm font-medium mb-3">Preset: {selectedPreset.name}</div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-silver/70 mb-1">Copy Ratio</div>
                          <div className="text-sm">{selectedPreset.copyRatio}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-silver/70 mb-1">Slippage</div>
                          <div className="text-sm">{selectedPreset.slippage}%</div>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <div className="text-xs text-silver/70 mb-1">Stop-Loss</div>
                            <div className="text-sm text-red">-{selectedPreset.stopLoss}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-silver/70 mb-1">Take-Profit</div>
                            <div className="text-sm text-neon">+{selectedPreset.takeProfit}%</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-silver/70 mb-1">Monitoring</div>
                          <div className="text-sm flex items-center">
                            <div className="w-2 h-2 rounded-full bg-neon animate-pulse mr-1"></div>
                            Smart Exits Active
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Smart Exit and Result */}
          {step === 4 && selectedWallet && (
            <motion.div
              key="step4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    Smart Exit <span className="text-neon">in Progress</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red animate-pulse mr-1"></div>
                      <span className="text-xs text-silver">Exiting</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="col-span-2">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center mr-2">
                            <Wallet className="w-4 h-4 text-neon" />
                          </div>
                          <div>
                            <div className="font-medium">{selectedWallet.alias}</div>
                            <div className="text-xs text-silver/70">{selectedWallet.address}</div>
                          </div>
                        </div>
                        <div className="text-xs bg-red/20 text-red px-2 py-1 rounded-full">Smart Exit</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-silver/70 mb-1">Activity Log</div>
                        <ActivityLog items={activityLogs} />
                      </div>

                      {profit > 0 && (
                        <div className="bg-neon/10 rounded-lg p-3 border border-neon/30">
                          <div className="text-xs text-silver/70 mb-1">Trade Result</div>
                          <div className="text-xl font-bold text-neon">+{profit.toFixed(1)}%</div>
                          <div className="text-xs text-silver/70">Execution Time: ≤{executionTime}ms</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-sm font-medium mb-3">Smart Exit Details</div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-silver/70 mb-1">Initial DEX</div>
                          <div className="text-sm flex items-center">
                            <div
                              className="w-2 h-2 rounded-full mr-1"
                              style={{ backgroundColor: selectedWallet.dexSplit[0].color }}
                            ></div>
                            {selectedWallet.dexSplit[0].name} ({selectedWallet.dexSplit[0].percentage}% liquidity)
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-silver/70 mb-1">Exit DEX</div>
                          <div className="text-sm flex items-center">
                            <div
                              className="w-2 h-2 rounded-full mr-1"
                              style={{ backgroundColor: selectedWallet.dexSplit[1].color }}
                            ></div>
                            {selectedWallet.dexSplit[1].name} ({selectedWallet.dexSplit[1].percentage}% liquidity)
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <div className="text-xs text-silver/70 mb-1">Stop-Loss</div>
                            <div className="text-sm text-red">-{selectedPreset.stopLoss}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-silver/70 mb-1">Take-Profit</div>
                            <div className="text-sm text-neon">+{selectedPreset.takeProfit}%</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-silver/70 mb-1">Routing</div>
                          <div className="text-sm">Cross-DEX Smart Routing Active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Summary and Next Steps */}
          {step === 5 && selectedWallet && showFinalSummary && (
            <motion.div
              key="step5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    Trade <span className="text-neon">Completed</span>
                  </h3>
                  <button
                    className="text-xs bg-white/10 hover:bg-white/20 text-silver px-2 py-1 rounded flex items-center"
                    onClick={resetToDashboard}
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Back to Dashboard
                  </button>
                </div>

                <div className="bg-white/5 rounded-lg p-6 mb-6">
                  <div className="flex flex-col items-center justify-center text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-neon/20 flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-neon" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">Trade Successfully Completed</h3>
                    <p className="text-silver">Your copy trade with {selectedWallet.alias} has been executed</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-xs text-silver/70 mb-1">Total Profit</div>
                      <div className="text-2xl font-bold text-neon">+{profit}%</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-xs text-silver/70 mb-1">Execution Time</div>
                      <div className="text-2xl font-bold">≤{executionTime}ms</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-xs text-silver/70 mb-1">DEX Path</div>
                      <div className="text-lg font-bold flex items-center justify-center">
                        <span className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-1"
                            style={{ backgroundColor: selectedWallet.dexSplit[0].color }}
                          ></div>
                          {selectedWallet.dexSplit[0].name}
                        </span>
                        <ArrowRight className="w-4 h-4 mx-2" />
                        <span className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-1"
                            style={{ backgroundColor: selectedWallet.dexSplit[1].color }}
                          ></div>
                          {selectedWallet.dexSplit[1].name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4 mb-6">
                    <div className="text-sm font-medium mb-2">Trade Summary</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-silver/70">Wallet</span>
                        <span>{selectedWallet.alias}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-silver/70">Preset</span>
                        <span>{selectedPreset.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-silver/70">Copy Ratio</span>
                        <span>{selectedPreset.copyRatio}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-silver/70">Take-Profit Triggered</span>
                        <span className="text-neon">Yes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-silver/70">Smart Routing Used</span>
                        <span className="text-neon">Yes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <AnimatedCTAButton
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        resetToDashboard()
                      }}
                      color="blue"
                    >
                      Explore More Wallets
                    </AnimatedCTAButton>
                    <AnimatedCTAButton
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setStep(2)
                      }}
                      color="neon"
                    >
                      Continue Copying {selectedWallet.alias}
                    </AnimatedCTAButton>
                  </div>
                </div>

                <div className="bg-neon/10 border border-neon/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-neon" />
                    <div className="font-medium">New Activity Detected</div>
                  </div>
                  <p className="text-sm text-silver mb-2">
                    {selectedWallet.alias} opened new position on {selectedWallet.dexSplit[1].name}
                  </p>
                  <button className="text-xs text-neon underline">View Details</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Helper component for ChevronLeft icon
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
)
