import { Card, CardContent } from "@/components/ui/card"

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 18 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-0">
            <div
              className="aspect-[2/3] bg-gradient-to-br from-muted to-muted/50 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
