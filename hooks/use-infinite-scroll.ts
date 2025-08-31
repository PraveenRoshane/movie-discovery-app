"use client"

import { useState, useEffect, useCallback } from "react"
import type { Movie, TMDBResponse, FilterOptions } from "@/lib/tmdb"
import { tmdbApi } from "@/lib/tmdb"

interface UseInfiniteScrollProps {
  category: string
  searchQuery?: string
  initialData: TMDBResponse<Movie>
  filters?: FilterOptions
}

export function useInfiniteScroll({ category, searchQuery, initialData, filters }: UseInfiniteScrollProps) {
  const [movies, setMovies] = useState<Movie[]>(initialData.results)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialData.total_pages > 1)
  const [error, setError] = useState<string | null>(null)

  // Reset when category, search, or filters change
  useEffect(() => {
    setMovies(initialData.results)
    setCurrentPage(1)
    setHasMore(initialData.total_pages > 1)
    setError(null)
  }, [category, searchQuery, initialData, filters])

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)

    try {
      const nextPage = currentPage + 1
      let newData: TMDBResponse<Movie>

      if (searchQuery) {
        newData = await tmdbApi.searchMovies(searchQuery, nextPage)
      } else if (category === "discover" && filters) {
        newData = await tmdbApi.discoverMovies(nextPage, filters)
      } else {
        switch (category) {
          case "popular":
            newData = await tmdbApi.getPopular(nextPage)
            break
          case "top-rated":
            newData = await tmdbApi.getTopRated(nextPage)
            break
          case "now-playing":
            newData = await tmdbApi.getNowPlaying(nextPage)
            break
          case "upcoming":
            newData = await tmdbApi.getUpcoming(nextPage)
            break
          case "trending":
          default:
            // Trending doesn't support pagination, so we don't load more
            setHasMore(false)
            return
        }
      }

      setMovies((prev) => [...prev, ...newData.results])
      setCurrentPage(nextPage)
      setHasMore(nextPage < newData.total_pages)
    } catch (err) {
      setError("Failed to load more movies")
      console.error("Error loading more movies:", err)
    } finally {
      setIsLoading(false)
    }
  }, [category, searchQuery, currentPage, isLoading, hasMore, filters])

  return {
    movies,
    isLoading,
    hasMore,
    error,
    loadMore,
  }
}
