import { serviceClient } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import Link from "next/link"

export const revalidate = 0

export default async function AdminUsersPage() {
  const { data: admins, error } = await serviceClient
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching admin users:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin-Benutzer</h1>
        <Link href="/admin/dashboard/admins/new">
          <Button className="bg-neon hover:bg-neon/90 text-black">Neuen Admin hinzufügen</Button>
        </Link>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-400">Benutzername</TableHead>
                  <TableHead className="text-gray-400">E-Mail</TableHead>
                  <TableHead className="text-gray-400">Rolle</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Letzter Login</TableHead>
                  <TableHead className="text-gray-400">Erstellt am</TableHead>
                  <TableHead className="text-gray-400">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins && admins.length > 0 ? (
                  admins.map((admin) => (
                    <TableRow key={admin.id} className="border-gray-700 hover:bg-gray-700">
                      <TableCell className="font-medium">{admin.username}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            admin.role === "admin"
                              ? "bg-purple-500/20 text-purple-300"
                              : admin.role === "editor"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {admin.role === "admin" && "Administrator"}
                          {admin.role === "editor" && "Editor"}
                          {admin.role === "viewer" && "Betrachter"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            admin.is_active ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {admin.is_active ? "Aktiv" : "Inaktiv"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {admin.last_login
                          ? format(new Date(admin.last_login), "dd.MM.yyyy HH:mm", { locale: de })
                          : "Nie"}
                      </TableCell>
                      <TableCell>{format(new Date(admin.created_at), "dd.MM.yyyy", { locale: de })}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 border-gray-600 hover:bg-gray-700">
                            Bearbeiten
                          </Button>
                          {admin.username !== "admin" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-red-600 text-red-400 hover:bg-red-900/20"
                            >
                              Deaktivieren
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-400">
                      Keine Admin-Benutzer gefunden
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
