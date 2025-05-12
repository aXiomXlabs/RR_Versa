import { serviceClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { NewsletterSearch } from "../components/newsletter-search"
import Link from "next/link"

export const revalidate = 0

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string }
}) {
  const query = searchParams.q || ""
  const status = searchParams.status || ""

  let supabaseQuery = serviceClient.from("newsletter_subscribers").select("*").order("created_at", { ascending: false })

  if (query) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%`)
  }

  if (status) {
    if (status === "active") {
      supabaseQuery = supabaseQuery.eq("is_active", true)
    } else if (status === "inactive") {
      supabaseQuery = supabaseQuery.eq("is_active", false)
    }
  }

  const { data: subscribers, error } = await supabaseQuery

  // Hole die Newsletter-Kampagnen
  const { data: campaigns } = await serviceClient
    .from("newsletter_campaigns")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  if (error) {
    console.error("Error fetching newsletter subscribers:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Newsletter</h1>
        <div className="space-x-4">
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
            Abonnent hinzufügen
          </Button>
          <Link href="/admin/dashboard/newsletter/campaigns/new">
            <Button className="bg-neon hover:bg-neon/90 text-black">Neue Kampagne</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Abonnenten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">{subscribers?.length || 0}</div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Aktive Abonnenten: {subscribers?.filter((s) => s.is_active).length || 0}</span>
              <span>Abgemeldete: {subscribers?.filter((s) => !s.is_active).length || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Kampagnen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">{campaigns?.length || 0}</div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Gesendet: {campaigns?.filter((c) => c.status === "sent").length || 0}</span>
              <span>Geplant: {campaigns?.filter((c) => c.status === "scheduled").length || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Neueste Kampagnen</CardTitle>
        </CardHeader>
        <CardContent>
          {campaigns && campaigns.length > 0 ? (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                  <div>
                    <p className="font-medium">{campaign.title}</p>
                    <p className="text-sm text-gray-400">
                      {campaign.status === "draft" && "Entwurf"}
                      {campaign.status === "scheduled" &&
                        `Geplant für ${format(new Date(campaign.scheduled_for || ""), "dd.MM.yyyy HH:mm", { locale: de })}`}
                      {campaign.status === "sent" &&
                        `Gesendet am ${format(new Date(campaign.sent_at || ""), "dd.MM.yyyy HH:mm", { locale: de })}`}
                      {campaign.status === "cancelled" && "Abgebrochen"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="h-8 border-gray-600 hover:bg-gray-700">
                      Details
                    </Button>
                    {campaign.status === "draft" && (
                      <Button size="sm" className="h-8 bg-neon hover:bg-neon/90 text-black">
                        Bearbeiten
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Keine Kampagnen vorhanden</p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Abonnenten</CardTitle>
          <NewsletterSearch />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">E-Mail</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Angemeldet am</TableHead>
                  <TableHead className="text-gray-400">Abgemeldet am</TableHead>
                  <TableHead className="text-gray-400">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers && subscribers.length > 0 ? (
                  subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id} className="border-gray-700 hover:bg-gray-700">
                      <TableCell className="font-medium">{subscriber.name || "-"}</TableCell>
                      <TableCell>{subscriber.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            subscriber.is_active ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {subscriber.is_active ? "Aktiv" : "Abgemeldet"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {format(new Date(subscriber.subscribed_at), "dd.MM.yyyy HH:mm", { locale: de })}
                      </TableCell>
                      <TableCell>
                        {subscriber.unsubscribed_at
                          ? format(new Date(subscriber.unsubscribed_at), "dd.MM.yyyy HH:mm", { locale: de })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 border-gray-600 hover:bg-gray-700">
                            Details
                          </Button>
                          {subscriber.is_active ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-red-600 text-red-400 hover:bg-red-900/20"
                            >
                              Abmelden
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-green-600 text-green-400 hover:bg-green-900/20"
                            >
                              Aktivieren
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-400">
                      Keine Abonnenten gefunden
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
