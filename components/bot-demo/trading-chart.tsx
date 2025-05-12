"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Registriere alle benötigten Chart.js-Komponenten
Chart.register(...registerables)

interface TradingChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
      fill?: boolean
      tension?: number
    }[]
  }
}

export default function TradingChart({ data }: TradingChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data) return

    // Zerstöre vorhandenes Chart, falls vorhanden
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Erstelle neues Chart
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || ""
                if (label) {
                  label += ": "
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(context.parsed.y)
                }
                return label
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 8,
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
              callback: (value) =>
                new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value as number),
            },
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 5,
          },
          line: {
            tension: 0.4,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} className="w-full h-full" />
}
