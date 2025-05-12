import type { ReactNode } from "react"
import { validateSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Überprüfe, ob der Benutzer angemeldet ist
  const session = await validateSession()

  // Wenn der Benutzer nicht angemeldet ist, leite zur Login-Seite weiter
  if (!session) {
    redirect("/admin/login")
  }

  return children
}
