import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="bg-background items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Movie Not Found</h2>
          <p className="text-muted-foreground">
            The movie you're looking for doesn't exist or has been removed from our database.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/?search=">
              <Search className="h-4 w-4 mr-2" />
              Search Movies
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
