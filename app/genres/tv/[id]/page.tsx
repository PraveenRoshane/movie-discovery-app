import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { tmdbApi } from "@/lib/tmdb"
import { InfiniteTVGrid } from "@/components/infinite-tv-grid"
import { FilterControls } from "@/components/filter-controls"
import { LoadingGrid } from "@/components/loading-grid"
import { Button } from "@/components/ui/button"

interface GenreTVPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ name?: string; year?: string; rating?: string; language?: string; sortBy?: string }>
}

export default async function GenreTVPage({ params, searchParams }: GenreTVPageProps) {
  const { id } = await params
  const genreId = Number.parseInt(id)

  const { name, year, rating, language, sortBy } = await searchParams
  const genreName = name || "TV Series"

  const filters = {
    genres: [genreId],
    year: year ? Number.parseInt(year) : undefined,
    rating: rating ? Number.parseFloat(rating) : undefined,
    language: language,
    sortBy: sortBy as any,
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/genres" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Genres
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground mb-2">{genreName} TV Series</h1>
        <FilterControls type="tv" />
      </div>

      <Suspense fallback={<LoadingGrid />}>
        <GenreTVWrapper genreId={genreId} filters={filters} />
      </Suspense>
    </main>
  )
}

async function GenreTVWrapper({ genreId, filters }: { genreId: number; filters: any }) {
  try {
    const tvData = await tmdbApi.discoverTV(1, filters)
    return <InfiniteTVGrid initialData={tvData} category="discover" filters={filters} />
  } catch (error) {
    console.error("Error fetching genre TV series:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load TV series. Please try again.</p>
      </div>
    )
  }
}
