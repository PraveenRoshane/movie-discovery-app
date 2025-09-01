import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { tmdbApi } from "@/lib/tmdb"
import { InfiniteMovieGrid } from "@/components/infinite-movie-grid"
import { FilterControls } from "@/components/filter-controls"
import { LoadingGrid } from "@/components/loading-grid"
import { Button } from "@/components/ui/button"

interface GenreMoviesPageProps {
  params: { id: string }
  searchParams: { name?: string; year?: string; rating?: string; language?: string; sortBy?: string }
}

export default async function GenreMoviesPage({ params, searchParams }: GenreMoviesPageProps) {
  const genreId = Number.parseInt(params.id)
  const genreName = searchParams.name || "Movies"

  const filters = {
    genres: [genreId],
    year: searchParams.year ? Number.parseInt(searchParams.year) : undefined,
    rating: searchParams.rating ? Number.parseFloat(searchParams.rating) : undefined,
    language: searchParams.language,
    sortBy: searchParams.sortBy as any,
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
        <h1 className="text-2xl font-bold text-foreground mb-2">{genreName} Movies</h1>
        <FilterControls type="movie" />
      </div>

      <Suspense fallback={<LoadingGrid />}>
        <GenreMoviesWrapper genreId={genreId} filters={filters} />
      </Suspense>
    </main>
  )
}

async function GenreMoviesWrapper({ genreId, filters }: { genreId: number; filters: any }) {
  try {
    const moviesData = await tmdbApi.discoverMovies(1, filters)
    return <InfiniteMovieGrid initialData={moviesData} category="discover" filters={filters} />
  } catch (error) {
    console.error("Error fetching genre movies:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load movies. Please try again.</p>
      </div>
    )
  }
}
