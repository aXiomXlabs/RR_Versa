"use client"

import { useMemo } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useDashboardLanguage } from "@/contexts/dashboard-language-context"
import type { PerformanceMetric, AggregatedPerformance } from "@/types/dashboard"

// Registriere die benötigten Chart.js Komponenten
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface PerformanceWidgetProps {
  performanceData: PerformanceMetric[]
  aggregatedData: AggregatedPerformance
}

export function PerformanceWidget({ performanceData, aggregatedData }: PerformanceWidgetProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { t } = useDashboardLanguage()

  // Daten für das Chart aufbereiten
  const chartData = useMemo(() => {
    // Sortiere nach Datum und begrenze die Anzahl der Datenpunkte auf mobilen Geräten
    const sortedData = [...performanceData].sort(
      (a, b) => new Date(a.period_start).getTime() - new Date(b.period_start).getTime(),
    )

    const limitedData = isMobile ? sortedData.slice(-7) : sortedData

    return {
      labels: limitedData.map((item) => {
        const date = new Date(item.period_start)
        return date.toLocaleDateString()
      }),
      datasets: [
        {
          label: t("performance.total_profit"),
          data: limitedData.map((item) => item.profit_loss_usd || 0),
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    }
  }, [performanceData, isMobile, t])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !isMobile,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        ticks: {
          // Kürze die Zahlen auf mobilen Geräten
          callback: (value: any) => {
            if (isMobile) {
              return Math.abs(value) >= 1000
                ? `$${Math.sign(value) * (Math.abs(value) / 1000).toFixed(1)}k`
                : `$${value}`
            }
            return `$${value}`
          },
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{t("widget.performance")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{t("performance.total_profit")}</span>
            <span className="text-xl font-bold">${aggregatedData.totalProfitLoss.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{t("performance.average_roi")}</span>
            <span className="text-xl font-bold">{aggregatedData.averageRoi.toFixed(2)}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{t("performance.win_rate")}</span>
            <span className="text-xl font-bold">{aggregatedData.winRate.toFixed(2)}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{t("performance.total_transactions")}</span>
            <span className="text-xl font-bold">{aggregatedData.totalTransactions}</span>
          </div>
        </div>

        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}
