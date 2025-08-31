"use client"

import { useState, useEffect, useCallback } from "react"
import type { TVSeries, TMDBResponse, FilterOptions } from "@/lib/tmdb"
import { tmdbApi } from "@/lib/tmdb"

interface UseInfiniteTVScrollProps {
  category: string
  searchQuery?: string
  initialData: TMDBResponse<TVSeries>
  filters?: FilterOptions
}

export function useInfiniteTVScroll({ category, searchQuery, initialData, filters }: UseInfiniteTVScrollProps) {
  const [tvSeries, setTVSeries] = useState<TVSeries[]>(initialData.results)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialData.total_pages > 1)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setTVSeries(initialData.results)
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
      let newData: TMDBResponse<TVSeries>

      if (searchQuery) {
        newData = await tmdbApi.searchTV(searchQuery, nextPage)
      } else if (category === "discover" && filters) {
        newData = await tmdbApi.discoverTV(nextPage, filters)
      } else {
        switch (category) {
          case "popular":
            newData = await tmdbApi.getTVPopular(nextPage)
            break
          case "top-rated":
            newData = await tmdbApi.getTVTopRated(nextPage)
            break
          case "on-the-air":
            newData = await tmdbApi.getTVOnTheAir(nextPage)
            break
          case "airing-today":
            newData = await tmdbApi.getTVAiringToday(nextPage)
            break
          case "trending":
          default:
            setHasMore(false)
            return
        }
      }

      setTVSeries((prev) => [...prev, ...newData.results])
      setCurrentPage(nextPage)
      setHasMore(nextPage < newData.total_pages)
    } catch (err) {
      setError("Failed to load more TV series")
      console.error("Error loading more TV series:", err)
    } finally {
      setIsLoading(false)
    }
  }, [category, searchQuery, currentPage, isLoading, hasMore, filters])

  return {
    tvSeries,
    isLoading,
    hasMore,
    error,
    loadMore,
  }
}
