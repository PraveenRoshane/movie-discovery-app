import { Suspense } from "react"
import { tmdbApi } from "@/lib/tmdb"
import { LoadingGrid } from "@/components/loading-grid"
import { CategoryTabs } from "@/components/category-tabs"
import { InfiniteMovieGrid } from "@/components/infinite-movie-grid"

export default async function MoviesPage({ searchParams }: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>
}) {
  const { category, search } = await searchParams

  return (
    <main className="container mx-auto px-4 py-6">
      {!search && (
        <div className="mb-6">
          <CategoryTabs currentCategory={category || "trending"} />
        </div>
      )}

      <Suspense fallback={<LoadingGrid />}>
        <MovieGridWrapper category={category || "trending"} searchQuery={search} />
      </Suspense>
    </main>
  )
}

async function MovieGridWrapper({
  category,
  searchQuery,
}: {
  category: string
  searchQuery?: string
}) {
  try {
    let moviesData

    if (searchQuery) {
      moviesData = await tmdbApi.searchMovies(searchQuery, 1)
    } else {
      switch (category) {
        case "popular":
          moviesData = await tmdbApi.getPopular(1)
          break
        case "top-rated":
          moviesData = await tmdbApi.getTopRated(1)
          break
        case "now-playing":
          moviesData = await tmdbApi.getNowPlaying(1)
          break
        case "upcoming":
          moviesData = await tmdbApi.getUpcoming(1)
          break
        case "trending":
        default:
          moviesData = await tmdbApi.getTrending()
          break
      }
    }

    return <InfiniteMovieGrid initialData={moviesData} category={category} searchQuery={searchQuery} />
  } catch (error) {
    console.error("Error fetching movies:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load movies. Please check your TMDB API key and try again.</p>
      </div>
    )
  }
}
