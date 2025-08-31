"use client"

import { useState, useEffect } from "react"
import type { FavoriteMovie } from "@/lib/favorites"
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "@/lib/favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])
  const [watchlist, setWatchlist] = useState<FavoriteMovie[]>([])

  useEffect(() => {
    setFavorites(getFavorites())
    setWatchlist(getWatchlist())
  }, [])

  const toggleFavorite = (movie: FavoriteMovie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
    setFavorites(getFavorites())
  }

  const toggleWatchlist = (movie: FavoriteMovie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
    setWatchlist(getWatchlist())
  }

  return {
    favorites,
    watchlist,
    toggleFavorite,
    toggleWatchlist,
    isFavorite: (movieId: number) => favorites.some((fav) => fav.id === movieId),
    isInWatchlist: (movieId: number) => watchlist.some((item) => item.id === movieId),
  }
}
