"use client"

import type React from "react"

import { Heart, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"
import type { FavoriteMovie } from "@/lib/favorites"

interface MovieActionsProps {
  movie: FavoriteMovie
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export function MovieActions({ movie, size = "sm", variant = "ghost" }: MovieActionsProps) {
  const { toggleFavorite, toggleWatchlist, isFavorite, isInWatchlist } = useFavorites()

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(movie)
  }

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWatchlist(movie)
  }

  return (
    <div className="flex gap-1">
      <Button
        size={size}
        variant={variant}
        onClick={handleFavoriteClick}
        className={`${
          isFavorite(movie.id) ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"
        } transition-colors`}
        title={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`h-4 w-4 ${isFavorite(movie.id) ? "fill-current" : ""}`} />
      </Button>
      <Button
        size={size}
        variant={variant}
        onClick={handleWatchlistClick}
        className={`${
          isInWatchlist(movie.id) ? "text-blue-500 hover:text-blue-600" : "text-muted-foreground hover:text-blue-500"
        } transition-colors`}
        title={isInWatchlist(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
      >
        <Bookmark className={`h-4 w-4 ${isInWatchlist(movie.id) ? "fill-current" : ""}`} />
      </Button>
    </div>
  )
}
