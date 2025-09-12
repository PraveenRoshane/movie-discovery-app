import Image from "next/image"
import { Star, Calendar } from "lucide-react"
import { type Movie, tmdbApi } from "@/lib/tmdb"
import { Card, CardContent } from "@/components/ui/card"
import { MovieActions } from "./movie-actions"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = tmdbApi.getImageUrl(movie.poster_path, "w300")
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"

  const favoriteMovie = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  }

  return (
    <Card className="group overflow-hidden transition-all duration-500 h-full py-0 gap-0 shadow-none border-none">
      <CardContent className="p-0">
        <div className="aspect-[2/3.2] relative overflow-hidden">
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-1">
              <MovieActions movie={favoriteMovie} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
            <h1 className="font-semibold text-sm line-clamp-2 mb-2 text-balance">{movie.title}</h1>
            <div className="flex items-center justify-between text-xs opacity-90">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{releaseYear}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
