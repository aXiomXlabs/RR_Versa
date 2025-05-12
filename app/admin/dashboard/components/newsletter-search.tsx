"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useCallback } from "react"

export function NewsletterSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams],
  )

  const handleSearch = (term: string) => {
    router.push(`${pathname}?${createQueryString("q", term)}`)
  }

  return (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Suchen..."
        className="pl-10 bg-gray-700 border-gray-600 text-white"
        defaultValue={searchParams.get("q") || ""}
        onChange={(e) => {
          const value = e.target.value
          if (value === "") {
            handleSearch("")
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch((e.target as HTMLInputElement).value)
          }
        }}
      />
    </div>
  )
}
