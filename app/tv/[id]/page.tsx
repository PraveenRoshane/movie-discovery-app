import { Suspense } from "react"
import { notFound } from "next/navigation"
import { tmdbApi } from "@/lib/tmdb"
import { TVHero } from "@/components/tv-hero"
import { MovieCast } from "@/components/movie-cast"
import { MovieVideos } from "@/components/movie-videos"
import { MovieReviews } from "@/components/movie-reviews"
import { LoadingSpinner } from "@/components/loading-spinner"
import { TVSeasons } from "@/components/tv-seasons"

interface TVDetailPageProps {
  params: { id: string }
}

export default async function TVDetailPage({ params }: TVDetailPageProps) {
  const tvId = Number.parseInt(params.id)

  if (isNaN(tvId)) {
    notFound()
  }

  try {
    const [tvDetails, credits, videos, reviews] = await Promise.all([
      tmdbApi.getTVDetails(tvId),
      tmdbApi.getTVCredits(tvId),
      tmdbApi.getTVVideos(tvId),
      tmdbApi.getTVReviews(tvId),
    ])
    
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-8">
            <TVHero tvSeries={tvDetails} />

            <Suspense fallback={<LoadingSpinner />}>
              <TVSeasons tvSeries={tvDetails} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <MovieCast cast={credits.cast} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <MovieVideos videos={videos.results} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <MovieReviews reviews={reviews.results} />
            </Suspense>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching TV series details:", error)
    notFound()
  }
}

export async function generateMetadata({ params }: TVDetailPageProps) {
  const tvId = Number.parseInt(params.id)

  if (isNaN(tvId)) {
    return {
      title: "TV Series Not Found",
    }
  }

  try {
    const tvDetails = await tmdbApi.getTVDetails(tvId)
    const year = tvDetails.first_air_date ? new Date(tvDetails.first_air_date).getFullYear() : ""

    return {
      title: `${tvDetails.name} ${year ? `(${year})` : ""} - Movie Discovery`,
      description: tvDetails.overview || `Watch ${tvDetails.name} and discover more TV series.`,
    }
  } catch (error) {
    return {
      title: "TV Series Not Found",
    }
  }
}
