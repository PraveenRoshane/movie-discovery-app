import Image from "next/image"
import { Star, Calendar, Tv, Tag, Users } from "lucide-react"
import type { TVSeriesDetails } from "@/lib/tmdb"
import { tmdbApi } from "@/lib/tmdb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MovieActions } from "@/components/movie-actions"

interface TVHeroProps {
  tvSeries: TVSeriesDetails
}

export function TVHero({ tvSeries }: TVHeroProps) {
  const posterUrl = tmdbApi.getImageUrl(tvSeries.poster_path, "w500")
  const backdropUrl = tmdbApi.getBackdropUrl(tvSeries.backdrop_path, "w1280")
  const firstAirYear = tvSeries.first_air_date ? new Date(tvSeries.first_air_date).getFullYear() : "N/A"
  const runtime = tvSeries.episode_run_time.length > 0 ? `${tvSeries.episode_run_time[0]}min episodes` : "N/A"

  // Convert TV series to movie format for actions
  const favoriteItem = {
    id: tvSeries.id,
    title: tvSeries.name,
    poster_path: tvSeries.poster_path,
    release_date: tvSeries.first_air_date,
    vote_average: tvSeries.vote_average,
    overview: tvSeries.overview,
    genre_ids: tvSeries.genre_ids,
    adult: tvSeries.adult,
    original_language: tvSeries.original_language,
    original_title: tvSeries.original_name,
    popularity: tvSeries.popularity,
    video: false,
    backdrop_path: tvSeries.backdrop_path,
    vote_count: tvSeries.vote_count,
  }

  return (
    <div className="relative">
      {/* Backdrop */}
      {tvSeries.backdrop_path && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backdropUrl || "/placeholder.svg"}
            alt={tvSeries.name}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
      )}

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="w-64 mx-auto md:mx-0">
                <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                  <Image
                    src={posterUrl || "/placeholder.svg"}
                    alt={tvSeries.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* TV Series Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{tvSeries.name}</h1>
                    {tvSeries.tagline && <p className="text-lg text-muted-foreground italic">"{tvSeries.tagline}"</p>}
                  </div>
                  <MovieActions movie={favoriteItem} size="default" variant="outline" />
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{firstAirYear}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tv className="h-4 w-4" />
                  <span>
                    {tvSeries.number_of_seasons} Season{tvSeries.number_of_seasons !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{tvSeries.number_of_episodes} Episodes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{tvSeries.vote_average.toFixed(1)}/10</span>
                  <span className="text-xs">({tvSeries.vote_count.toLocaleString()} votes)</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {tvSeries.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-muted-foreground leading-relaxed">{tvSeries.overview || "No overview available."}</p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h4 className="font-medium text-sm text-foreground">Status</h4>
                  <p className="text-sm text-muted-foreground">{tvSeries.status}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-foreground">Original Language</h4>
                  <p className="text-sm text-muted-foreground uppercase">{tvSeries.original_language}</p>
                </div>
                {tvSeries.networks.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-foreground">Networks</h4>
                    <p className="text-sm text-muted-foreground">{tvSeries.networks.map((n) => n.name).join(", ")}</p>
                  </div>
                )}
                {tvSeries.created_by.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-foreground">Created By</h4>
                    <p className="text-sm text-muted-foreground">{tvSeries.created_by.map((c) => c.name).join(", ")}</p>
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
