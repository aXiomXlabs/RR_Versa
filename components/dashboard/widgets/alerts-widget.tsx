"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Bell, AlertTriangle, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { de } from "date-fns/locale"

type AlertsWidgetProps = {
  alerts: any[]
  isDarkMode: boolean
}

export function AlertsWidget({ alerts, isDarkMode }: AlertsWidgetProps) {
  // Beispiel-Alerts, falls keine vorhanden sind
  const alertsToDisplay =
    alerts.length > 0
      ? alerts
      : [
          {
            id: "alert-1",
            alert_type: "price",
            alert_condition: {
              token_symbol: "ETH",
              condition: "above",
              price: 4000,
            },
            is_active: true,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 Tag zuvor
          },
          {
            id: "alert-2",
            alert_type: "whale",
            alert_condition: {
              token_symbol: "BTC",
              min_amount: 100,
            },
            is_active: true,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 Tage zuvor
          },
          {
            id: "alert-3",
            alert_type: "volatility",
            alert_condition: {
              token_symbol: "SOL",
              threshold: 5,
            },
            is_active: true,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 Stunden zuvor
          },
        ]

  // Alert-Typ zu Icon und Farbe mappen
  const alertTypeMap: Record<string, { icon: JSX.Element; color: string; label: string }> = {
    price: {
      icon: <DollarSign className="w-4 h-4" />,
      color: isDarkMode ? "bg-blue-900/20 text-blue-400" : "bg-blue-100 text-blue-600",
      label: "Preis-Alert",
    },
    whale: {
      icon: <AlertTriangle className="w-4 h-4" />,
      color: isDarkMode ? "bg-purple-900/20 text-purple-400" : "bg-purple-100 text-purple-600",
      label: "Whale-Alert",
    },
    volatility: {
      icon: <TrendingUp className="w-4 h-4" />,
      color: isDarkMode ? "bg-orange-900/20 text-orange-400" : "bg-orange-100 text-orange-600",
      label: "Volatilitäts-Alert",
    },
    trend: {
      icon: <TrendingDown className="w-4 h-4" />,
      color: isDarkMode ? "bg-green-900/20 text-green-400" : "bg-green-100 text-green-600",
      label: "Trend-Alert",
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className={`rounded-lg overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}
    >
      <div className="p-4">
        <h3 className="font-bold mb-4">Aktive Alerts</h3>

        <div className="space-y-3">
          {alertsToDisplay.map((alert) => (
            <div key={alert.id} className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      alertTypeMap[alert.alert_type]?.color || "bg-gray-200"
                    }`}
                  >
                    {alertTypeMap[alert.alert_type]?.icon || <Bell className="w-4 h-4" />}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{alertTypeMap[alert.alert_type]?.label || "Alert"}</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Erstellt {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true, locale: de })}
                    </p>
                  </div>
                </div>

                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    alert.is_active
                      ? isDarkMode
                        ? "bg-green-900/20 text-green-400"
                        : "bg-green-100 text-green-600"
                      : isDarkMode
                        ? "bg-gray-600 text-gray-300"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {alert.is_active ? "Aktiv" : "Inaktiv"}
                </div>
              </div>

              <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {alert.alert_type === "price" && (
                  <p>
                    {alert.alert_condition.token_symbol}{" "}
                    {alert.alert_condition.condition === "above" ? "über" : "unter"} ${alert.alert_condition.price}
                  </p>
                )}
                {alert.alert_type === "whale" && (
                  <p>
                    Whale-Bewegung für {alert.alert_condition.token_symbol} über {alert.alert_condition.min_amount}{" "}
                    Coins
                  </p>
                )}
                {alert.alert_type === "volatility" && (
                  <p>
                    {alert.alert_condition.token_symbol} Volatilität über {alert.alert_condition.threshold}%
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {alertsToDisplay.length === 0 && (
          <div className={`p-6 text-center rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Keine aktiven Alerts vorhanden</p>
            <Link
              href="/dashboard/alerts/new"
              className={`inline-block mt-2 px-4 py-2 rounded-md text-sm ${
                isDarkMode ? "bg-neon hover:bg-neon/90 text-black" : "bg-neon hover:bg-neon/90 text-black"
              }`}
            >
              Alert erstellen
            </Link>
          </div>
        )}
      </div>

      <Link
        href="/dashboard/alerts"
        className={`flex items-center justify-center py-3 ${
          isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        <span className="text-sm">Alle Alerts anzeigen</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </motion.div>
  )
}
