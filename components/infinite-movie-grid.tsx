"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import type { Movie, TMDBResponse } from "@/lib/tmdb"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { MovieCard } from "@/components/movie-card"
import { LoadingGrid } from "@/components/loading-grid"
import { Button } from "@/components/ui/button"

interface InfiniteMovieGridProps {
  initialData: TMDBResponse<Movie>
  category: string
  searchQuery?: string
}

export function InfiniteMovieGrid({ initialData, category, searchQuery }: InfiniteMovieGridProps) {
  const { movies, isLoading, hasMore, error, loadMore } = useInfiniteScroll({
    category,
    searchQuery,
    initialData,
  })

  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "200px",
  })

  // Load more when intersection observer triggers
  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (movies.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {searchQuery ? `No movies found for "${searchQuery}"` : "No movies found"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {searchQuery && <div className="text-sm text-muted-foreground">Found results for "{searchQuery}"</div>}

      {/* Movie Grid with staggered animation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-0">
        {movies.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full p-0 m-0"
            style={{ animationDelay: `${(index % 18) * 50}ms` }}
          >
            <Link href={`/movie/${movie.id}`} className="h-full block p-0 m-0">
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-8">
          <LoadingGrid />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 text-destructive mb-4">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
          <Button onClick={loadMore} variant="outline">
            Try Again
          </Button>
        </div>
      )}

      {/* Load More Trigger */}
      {hasMore && !isLoading && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading more movies...</div>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && movies.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You've reached the end of the results</p>
        </div>
      )}
    </div>
  )
}
