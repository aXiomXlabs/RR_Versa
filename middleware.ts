import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Überprüfe, ob der Benutzer ein Admin ist
  let isAdmin = false
  if (session) {
    const { data } = await supabase.from("user_profiles").select("is_admin").eq("id", session.user.id).single()

    isAdmin = data?.is_admin === true
  }

  // Check if the request is for the dashboard and the user is not authenticated
  // Erlaube Zugriff für Admins auf alle Bereiche
  if (
    req.nextUrl.pathname.startsWith("/dashboard") &&
    !req.nextUrl.pathname.startsWith("/dashboard/login") &&
    !req.nextUrl.pathname.startsWith("/dashboard/register") &&
    !session &&
    !isAdmin
  ) {
    const redirectUrl = new URL("/dashboard/login", req.url)
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
