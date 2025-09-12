import Image from "next/image"
import { Star, Calendar, Clock, Tag } from "lucide-react"
import type { MovieDetails } from "@/lib/tmdb"
import { tmdbApi } from "@/lib/tmdb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MovieActions } from "@/components/movie-actions"

interface MovieHeroProps {
  movie: MovieDetails
}

export function MovieHero({ movie }: MovieHeroProps) {
  const posterUrl = tmdbApi.getImageUrl(movie.poster_path, "w500")
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"

  const favoriteMovie = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  }

  return (
    <div className="relative">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="w-64 mx-auto md:mx-0">
                <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                  <Image
                    src={posterUrl || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{movie.title}</h1>
                    {movie.tagline && <p className="text-lg text-muted-foreground italic">"{movie.tagline}"</p>}
                  </div>
                  <MovieActions movie={favoriteMovie} size="default" variant="outline" />
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{releaseYear}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{runtime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                  <span className="text-xs">({movie.vote_count.toLocaleString()} votes)</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* Overview */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{movie.overview || "No overview available."}</p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h3 className="font-medium text-sm text-foreground">Status</h3>
                  <p className="text-sm text-muted-foreground">{movie.status}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">Original Language</h3>
                  <p className="text-sm text-muted-foreground uppercase">{movie.original_language}</p>
                </div>
                {movie.budget > 0 && (
                  <div>
                    <h3 className="font-medium text-sm text-foreground">Budget</h3>
                    <p className="text-sm text-muted-foreground">${movie.budget.toLocaleString()}</p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <h3 className="font-medium text-sm text-foreground">Revenue</h3>
                    <p className="text-sm text-muted-foreground">${movie.revenue.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
