import type { Movie } from "@/lib/tmdb"

export interface FavoriteMovie extends Pick<Movie, "id" | "title" | "poster_path" | "release_date" | "vote_average"> {}

const FAVORITES_KEY = "movie-discovery-favorites"
const WATCHLIST_KEY = "movie-discovery-watchlist"

// Favorites functions
export function getFavorites(): FavoriteMovie[] {
  if (typeof window === "undefined") return []
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch {
    return []
  }
}

export function addToFavorites(movie: FavoriteMovie): void {
  if (typeof window === "undefined") return
  const favorites = getFavorites()
  const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id)
  if (!isAlreadyFavorite) {
    const updatedFavorites = [...favorites, movie]
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
  }
}

export function removeFromFavorites(movieId: number): void {
  if (typeof window === "undefined") return
  const favorites = getFavorites()
  const updatedFavorites = favorites.filter((fav) => fav.id !== movieId)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
}

export function isFavorite(movieId: number): boolean {
  const favorites = getFavorites()
  return favorites.some((fav) => fav.id === movieId)
}

// Watchlist functions
export function getWatchlist(): FavoriteMovie[] {
  if (typeof window === "undefined") return []
  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY)
    return watchlist ? JSON.parse(watchlist) : []
  } catch {
    return []
  }
}

export function addToWatchlist(movie: FavoriteMovie): void {
  if (typeof window === "undefined") return
  const watchlist = getWatchlist()
  const isAlreadyInWatchlist = watchlist.some((item) => item.id === movie.id)
  if (!isAlreadyInWatchlist) {
    const updatedWatchlist = [...watchlist, movie]
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist))
  }
}

export function removeFromWatchlist(movieId: number): void {
  if (typeof window === "undefined") return
  const watchlist = getWatchlist()
  const updatedWatchlist = watchlist.filter((item) => item.id !== movieId)
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist))
}

export function isInWatchlist(movieId: number): boolean {
  const watchlist = getWatchlist()
  return watchlist.some((item) => item.id === movieId)
}
