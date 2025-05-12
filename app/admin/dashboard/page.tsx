import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { serviceClient } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"
import { de } from "date-fns/locale"

export const revalidate = 0

async function getStats() {
  // Warteliste-Statistiken
  const { count: waitlistCount } = await serviceClient
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("status", "waitlist")

  // Newsletter-Statistiken
  const { count: newsletterCount } = await serviceClient
    .from("newsletter_subscribers")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true)

  // Kontaktanfragen-Statistiken
  const { count: contactCount } = await serviceClient
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("status", "new")

  // Neueste Wartelisten-Anmeldungen
  const { data: latestWaitlist } = await serviceClient
    .from("users")
    .select("*")
    .eq("status", "waitlist")
    .order("created_at", { ascending: false })
    .limit(5)

  // Neueste Kontaktanfragen
  const { data: latestContacts } = await serviceClient
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Neueste Newsletter-Anmeldungen
  const { data: latestNewsletter } = await serviceClient
    .from("newsletter_subscribers")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(5)

  return {
    waitlistCount: waitlistCount || 0,
    newsletterCount: newsletterCount || 0,
    contactCount: contactCount || 0,
    latestWaitlist: latestWaitlist || [],
    latestContacts: latestContacts || [],
    latestNewsletter: latestNewsletter || [],
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-400">Willkommen im Rust Rocket Admin-Dashboard</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Warteliste</CardTitle>
            <CardDescription className="text-gray-400">Benutzer auf der Warteliste</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.waitlistCount}</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/dashboard/waitlist" passHref>
              <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
                Details anzeigen
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Newsletter</CardTitle>
            <CardDescription className="text-gray-400">Aktive Abonnenten</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.newsletterCount}</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/dashboard/newsletter" passHref>
              <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
                Details anzeigen
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Kontaktanfragen</CardTitle>
            <CardDescription className="text-gray-400">Neue Anfragen</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.contactCount}</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/dashboard/contacts" passHref>
              <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
                Details anzeigen
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Neueste Wartelisten-Anmeldungen</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.latestWaitlist.length > 0 ? (
              <div className="space-y-4">
                {stats.latestWaitlist.map((user) => (
                  <div key={user.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatDistanceToNow(new Date(user.created_at), { addSuffix: true, locale: de })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Keine Anmeldungen vorhanden</p>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/admin/dashboard/waitlist" passHref>
              <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
                Alle anzeigen
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Neueste Kontaktanfragen</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.latestContacts.length > 0 ? (
              <div className="space-y-4">
                {stats.latestContacts.map((contact) => (
                  <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-400">{contact.inquiry_type}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatDistanceToNow(new Date(contact.created_at), { addSuffix: true, locale: de })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Keine Kontaktanfragen vorhanden</p>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/admin/dashboard/contacts" passHref>
              <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
                Alle anzeigen
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Neueste Newsletter-Anmeldungen</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.latestNewsletter.length > 0 ? (
            <div className="space-y-4">
              {stats.latestNewsletter.map((subscriber) => (
                <div key={subscriber.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                  <div>
                    <p className="font-medium">{subscriber.name || "Kein Name"}</p>
                    <p className="text-sm text-gray-400">{subscriber.email}</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(subscriber.created_at), { addSuffix: true, locale: de })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Keine Newsletter-Anmeldungen vorhanden</p>
          )}
        </CardContent>
        <CardFooter>
          <Link href="/admin/dashboard/newsletter" passHref>
            <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
              Alle anzeigen
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
