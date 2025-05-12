"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Beispieldaten - in einer echten Anwendung würden diese aus einer Datenbank kommen
const mockData = {
  dailyChats: [
    { day: "Mo", count: 12 },
    { day: "Di", count: 19 },
    { day: "Mi", count: 15 },
    { day: "Do", count: 22 },
    { day: "Fr", count: 30 },
    { day: "Sa", count: 18 },
    { day: "So", count: 14 },
  ],
  topQuestions: [
    { name: "Wie funktioniert der Sniper Bot?", value: 28 },
    { name: "Was kostet der Zugang?", value: 22 },
    { name: "Wie kann ich mit dem Trading beginnen?", value: 18 },
    { name: "Was sind die Vorteile von Rust Rocket?", value: 15 },
    { name: "Andere", value: 17 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function ChatAnalytics() {
  const [data, setData] = useState(mockData)

  // In einer echten Anwendung würden hier Daten aus einer API geladen
  useEffect(() => {
    // Beispiel für API-Aufruf:
    // const fetchData = async () => {
    //   const response = await fetch('/api/chat/analytics')
    //   const data = await response.json()
    //   setData(data)
    // }
    // fetchData()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chat-Analysen</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Tägliche Chats</TabsTrigger>
            <TabsTrigger value="questions">Häufige Fragen</TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.dailyChats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="questions">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.topQuestions}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.topQuestions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
