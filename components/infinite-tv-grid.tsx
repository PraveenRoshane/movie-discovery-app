"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"
import type { TVSeries, TMDBResponse, FilterOptions } from "@/lib/tmdb"
import { useInfiniteTVScroll } from "@/hooks/use-infinite-tv-scroll"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { TVCard } from "@/components/tv-card"
import { LoadingGrid } from "@/components/loading-grid"
import { Button } from "@/components/ui/button"
import { MovieCard } from "./movie-card"
import Link from "next/link"

interface InfiniteTVGridProps {
  initialData: TMDBResponse<TVSeries>
  category: string
  searchQuery?: string
  filters?: FilterOptions
}

export function InfiniteTVGrid({ initialData, category, searchQuery, filters }: InfiniteTVGridProps) {
  const { tvSeries, isLoading, hasMore, error, loadMore } = useInfiniteTVScroll({
    category,
    searchQuery,
    initialData,
    filters,
  })

  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "200px",
  })

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (tvSeries.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {searchQuery ? `No TV series found for "${searchQuery}"` : "No TV series found"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {searchQuery && <div className="text-sm text-muted-foreground">Found results for "{searchQuery}"</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {tvSeries.map((series, index) => (
          <div
            key={`${series.id}-${index}`}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${(index % 18) * 50}ms` }}
          >
            <Link href={`/tv/${series.id}`} className="h-full block p-0 m-0">
              <MovieCard movie={
                {
                  ...series,
                  title: series.name,
                  release_date: series.first_air_date,
                  original_title: series.name,
                  video: false,
                }
              } />
            </Link>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="py-8">
          <LoadingGrid />
        </div>
      )}

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

      {hasMore && !isLoading && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading more TV series...</div>
        </div>
      )}

      {!hasMore && tvSeries.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You've reached the end of the results</p>
        </div>
      )}
    </div>
  )
}
