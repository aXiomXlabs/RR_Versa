import { serviceClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { WaitlistSearch } from "../components/waitlist-search"

export const revalidate = 0

export default async function WaitlistPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; experience?: string }
}) {
  const query = searchParams.q || ""
  const status = searchParams.status || ""
  const experience = searchParams.experience || ""

  let supabaseQuery = serviceClient.from("users").select("*").order("created_at", { ascending: false })

  if (query) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%,telegram_handle.ilike.%${query}%`)
  }

  if (status) {
    supabaseQuery = supabaseQuery.eq("status", status)
  }

  if (experience) {
    supabaseQuery = supabaseQuery.eq("experience_level", experience)
  }

  const { data: users, error } = await supabaseQuery

  if (error) {
    console.error("Error fetching waitlist:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Warteliste</h1>
        <Button className="bg-neon hover:bg-neon/90 text-black">Benutzer hinzufügen</Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Benutzer filtern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WaitlistSearch />

            <Select defaultValue={status}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="waitlist">Warteliste</SelectItem>
                <SelectItem value="active">Aktiv</SelectItem>
                <SelectItem value="inactive">Inaktiv</SelectItem>
                <SelectItem value="banned">Gesperrt</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue={experience}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Erfahrungslevel" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="all">Alle Level</SelectItem>
                <SelectItem value="beginner">Anfänger</SelectItem>
                <SelectItem value="intermediate">Fortgeschritten</SelectItem>
                <SelectItem value="advanced">Experte</SelectItem>
                <SelectItem value="professional">Profi</SelectItem>
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
                  <TableHead className="text-gray-400">Telegram</TableHead>
                  <TableHead className="text-gray-400">Erfahrungslevel</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Registriert am</TableHead>
                  <TableHead className="text-gray-400">Newsletter</TableHead>
                  <TableHead className="text-gray-400">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id} className="border-gray-700 hover:bg-gray-700">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.telegram_handle || "-"}</TableCell>
                      <TableCell>
                        {user.experience_level === "beginner" && "Anfänger"}
                        {user.experience_level === "intermediate" && "Fortgeschritten"}
                        {user.experience_level === "advanced" && "Experte"}
                        {user.experience_level === "professional" && "Profi"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "waitlist"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : user.status === "active"
                                ? "bg-green-500/20 text-green-300"
                                : user.status === "inactive"
                                  ? "bg-gray-500/20 text-gray-300"
                                  : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {user.status === "waitlist" && "Warteliste"}
                          {user.status === "active" && "Aktiv"}
                          {user.status === "inactive" && "Inaktiv"}
                          {user.status === "banned" && "Gesperrt"}
                        </span>
                      </TableCell>
                      <TableCell>{format(new Date(user.created_at), "dd.MM.yyyy HH:mm", { locale: de })}</TableCell>
                      <TableCell>{user.newsletter_opt_in ? "Ja" : "Nein"}</TableCell>
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
                    <TableCell colSpan={8} className="text-center py-4 text-gray-400">
                      Keine Benutzer gefunden
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
