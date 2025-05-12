"use client" // Als Client Component deklarieren

import { serviceClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { format, subDays, startOfDay, endOfDay } from "date-fns"
import { de } from "date-fns/locale"

async function getStats() {
  // Zeitraum: Letzte 7 Tage
  const startDate = startOfDay(subDays(new Date(), 6))
  const endDate = endOfDay(new Date())

  // Registrierungen pro Tag
  const registrationsData = []
  for (let i = 0; i < 7; i++) {
    const day = subDays(new Date(), i)
    const dayStart = startOfDay(day)
    const dayEnd = endOfDay(day)

    const { count } = await serviceClient
      .from("users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", dayStart.toISOString())
      .lte("created_at", dayEnd.toISOString())

    registrationsData.unshift({
      date: format(day, "dd.MM", { locale: de }),
      count: count || 0,
    })
  }

  // Newsletter-Anmeldungen pro Tag
  const newsletterData = []
  for (let i = 0; i < 7; i++) {
    const day = subDays(new Date(), i)
    const dayStart = startOfDay(day)
    const dayEnd = endOfDay(day)

    const { count } = await serviceClient
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true })
      .gte("created_at", dayStart.toISOString())
      .lte("created_at", dayEnd.toISOString())

    newsletterData.unshift({
      date: format(day, "dd.MM", { locale: de }),
      count: count || 0,
    })
  }

  // Kontaktanfragen pro Tag
  const contactData = []
  for (let i = 0; i < 7; i++) {
    const day = subDays(new Date(), i)
    const dayStart = startOfDay(day)
    const dayEnd = endOfDay(day)

    const { count } = await serviceClient
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", dayStart.toISOString())
      .lte("created_at", dayEnd.toISOString())

    contactData.unshift({
      date: format(day, "dd.MM", { locale: de }),
      count: count || 0,
    })
  }

  // Verteilung der Erfahrungslevel
  const { data: experienceLevels } = await serviceClient.from("users").select("experience_level")

  const experienceData = [
    { name: "Anfänger", value: 0 },
    { name: "Fortgeschritten", value: 0 },
    { name: "Experte", value: 0 },
    { name: "Profi", value: 0 },
  ]

  experienceLevels?.forEach((user) => {
    if (user.experience_level === "beginner") experienceData[0].value++
    else if (user.experience_level === "intermediate") experienceData[1].value++
    else if (user.experience_level === "advanced") experienceData[2].value++
    else if (user.experience_level === "professional") experienceData[3].value++
  })

  // Verteilung der Kontaktanfragen nach Typ
  const { data: inquiryTypes } = await serviceClient.from("contact_submissions").select("inquiry_type")

  const inquiryData = [
    { name: "Allgemein", value: 0 },
    { name: "Support", value: 0 },
    { name: "Preisanfrage", value: 0 },
    { name: "Partnerschaft", value: 0 },
    { name: "Feature", value: 0 },
  ]

  inquiryTypes?.forEach((contact) => {
    if (contact.inquiry_type === "general") inquiryData[0].value++
    else if (contact.inquiry_type === "support") inquiryData[1].value++
    else if (contact.inquiry_type === "pricing") inquiryData[2].value++
    else if (contact.inquiry_type === "partnership") inquiryData[3].value++
    else if (contact.inquiry_type === "feature") inquiryData[4].value++
  })

  return {
    registrationsData,
    newsletterData,
    contactData,
    experienceData,
    inquiryData,
  }
}

export default async function StatsPage() {
  const stats = await getStats()

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Statistiken</h1>
      <p className="text-gray-400">Übersicht der wichtigsten Kennzahlen</p>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Registrierungen (letzte 7 Tage)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.registrationsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="count" name="Registrierungen" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Newsletter-Anmeldungen (letzte 7 Tage)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.newsletterData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                    itemStyle={{ color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="count" name="Newsletter-Anmeldungen" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Kontaktanfragen (letzte 7 Tage)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.contactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                    itemStyle={{ color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="count" name="Kontaktanfragen" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Verteilung der Erfahrungslevel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.experienceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.experienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                    itemStyle={{ color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Verteilung der Kontaktanfragen nach Typ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.inquiryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.inquiryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                    itemStyle={{ color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
