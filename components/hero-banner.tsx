import Link from "next/link"
import { Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { tmdbApi, type Movie } from "@/lib/tmdb"

interface HeroBannerProps {
  movie: Movie
}

export function HeroBanner({ movie }: HeroBannerProps) {
  const backdropUrl = tmdbApi.getBackdropUrl(movie.backdrop_path, "original")
  const year = new Date(movie.release_date).getFullYear()

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">{movie.title}</h1>

            <div className="flex items-center gap-4 mb-6 text-white/90">
              <span className="text-lg font-medium">{year}</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-lg text-white/90 mb-8 leading-relaxed text-pretty">{movie.overview}</p>

            <div className="flex gap-4">
              <Button size="lg" asChild className="bg-white text-black hover:bg-white/90">
                <Link href={`/movie/${movie.id}`}>
                  <Play className="h-5 w-5 mr-2" />
                  Watch Trailer
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Link href={`/movie/${movie.id}`}>
                  <Info className="h-5 w-5 mr-2" />
                  More Info
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
