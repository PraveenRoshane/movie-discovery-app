"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart, ArrowLeft } from "lucide-react"
import { getFavorites, type FavoriteMovie } from "@/lib/favorites"
import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setFavorites(getFavorites())
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500 fill-current" />
            <h1 className="text-2xl font-bold">My Favorites</h1>
            <span className="text-sm text-muted-foreground">({favorites.length} movies)</span>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-4">Start adding movies to your favorites to see them here.</p>
            <Button asChild>
              <Link href="/">Browse Movies</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {favorites.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <MovieCard movie={movie as any} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
