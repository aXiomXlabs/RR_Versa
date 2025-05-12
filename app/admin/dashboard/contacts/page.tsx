import { serviceClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { ContactSearch } from "../components/contact-search"

export const revalidate = 0

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; type?: string }
}) {
  const query = searchParams.q || ""
  const status = searchParams.status || ""
  const type = searchParams.type || ""

  let supabaseQuery = serviceClient.from("contact_submissions").select("*").order("created_at", { ascending: false })

  if (query) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%,message.ilike.%${query}%`)
  }

  if (status) {
    supabaseQuery = supabaseQuery.eq("status", status)
  }

  if (type) {
    supabaseQuery = supabaseQuery.eq("inquiry_type", type)
  }

  const { data: contacts, error } = await supabaseQuery

  if (error) {
    console.error("Error fetching contacts:", error)
  }

  // Statistiken
  const { count: newCount } = await serviceClient
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("status", "new")

  const { count: inProgressCount } = await serviceClient
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("status", "in_progress")

  const { count: resolvedCount } = await serviceClient
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("status", "resolved")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kontaktanfragen</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Neue Anfragen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{newCount || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>In Bearbeitung</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{inProgressCount || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Erledigt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{resolvedCount || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Anfragen filtern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ContactSearch />

            <Select defaultValue={status}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="new">Neu</SelectItem>
                <SelectItem value="in_progress">In Bearbeitung</SelectItem>
                <SelectItem value="resolved">Erledigt</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue={type}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Anfragetyp" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="all">Alle Typen</SelectItem>
                <SelectItem value="general">Allgemeine Anfrage</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="pricing">Preisanfrage</SelectItem>
                <SelectItem value="partnership">Partnerschaft</SelectItem>
                <SelectItem value="feature">Feature-Anfrage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">E-Mail</TableHead>
                  <TableHead className="text-gray-400">Anfragetyp</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Eingereicht am</TableHead>
                  <TableHead className="text-gray-400">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts && contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <TableRow key={contact.id} className="border-gray-700 hover:bg-gray-700">
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>
                        {contact.inquiry_type === "general" && "Allgemeine Anfrage"}
                        {contact.inquiry_type === "support" && "Support"}
                        {contact.inquiry_type === "pricing" && "Preisanfrage"}
                        {contact.inquiry_type === "partnership" && "Partnerschaft"}
                        {contact.inquiry_type === "feature" && "Feature-Anfrage"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            contact.status === "new"
                              ? "bg-blue-500/20 text-blue-300"
                              : contact.status === "in_progress"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : contact.status === "resolved"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {contact.status === "new" && "Neu"}
                          {contact.status === "in_progress" && "In Bearbeitung"}
                          {contact.status === "resolved" && "Erledigt"}
                          {contact.status === "spam" && "Spam"}
                        </span>
                      </TableCell>
                      <TableCell>{format(new Date(contact.created_at), "dd.MM.yyyy HH:mm", { locale: de })}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 border-gray-600 hover:bg-gray-700">
                            Details
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 border-gray-600 hover:bg-gray-700">
                            Bearbeiten
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-400">
                      Keine Kontaktanfragen gefunden
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
