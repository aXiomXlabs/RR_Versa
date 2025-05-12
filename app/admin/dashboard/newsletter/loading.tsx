import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function NewsletterLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Newsletter</h1>
          <p className="text-gray-400">Verwalte Newsletter-Abonnenten</p>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-64 bg-gray-700" />
          <Skeleton className="h-10 w-32 bg-gray-700" />
          <Skeleton className="h-10 w-32 bg-gray-700" />
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Newsletter-Abonnenten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full bg-gray-700" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
