import { Suspense } from "react"
import { notFound } from "next/navigation"
import { tmdbApi } from "@/lib/tmdb"
import { MovieHero } from "@/components/movie-hero"
import { MovieCast } from "@/components/movie-cast"
import { MovieVideos } from "@/components/movie-videos"
import { MovieReviews } from "@/components/movie-reviews"
import { LoadingSpinner } from "@/components/loading-spinner"

interface MoviePageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params;
  try {
    const movie = await tmdbApi.getMovieDetails(Number.parseInt(id))
    return {
      title: `${movie.title} (${new Date(movie.release_date).getFullYear()}) - Movie Discovery`,
      description: movie.overview || `Watch ${movie.title} and discover more movies like it.`,
    }
  } catch {
    return {
      title: "Movie Not Found - Movie Discovery",
      description: "The requested movie could not be found.",
    }
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = Number.parseInt(id)

  if (Number.isNaN(movieId)) {
    notFound()
  }

  try {
    const [movie, credits, videos, reviews] = await Promise.all([
      tmdbApi.getMovieDetails(movieId),
      tmdbApi.getMovieCredits(movieId),
      tmdbApi.getMovieVideos(movieId),
      tmdbApi.getMovieReviews(movieId),
    ])

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-8">
            <MovieHero movie={movie} />

            <div className="grid gap-8">
              <Suspense fallback={<LoadingSpinner />}>
                <MovieCast cast={credits.cast.slice(0, 12)} />
              </Suspense>

              <Suspense fallback={<LoadingSpinner />}>
                <MovieVideos
                  videos={videos.results.filter((v) => v.type === "Trailer" && v.site === "YouTube").slice(0, 3)}
                />
              </Suspense>

              <Suspense fallback={<LoadingSpinner />}>
                <MovieReviews reviews={reviews.results.slice(0, 5)} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching movie details:", error)
    notFound()
  }
}
