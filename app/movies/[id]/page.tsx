import { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { tmdbApi } from "@/lib/tmdb"
import { MovieHero } from "@/components/movie-hero"
import { MovieCast } from "@/components/movie-cast"
import { MovieVideos } from "@/components/movie-videos"
import { MovieReviews } from "@/components/movie-reviews"
import { LoadingSpinner } from "@/components/loading-spinner"

interface MoviePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await tmdbApi.getMovieDetails(Number.parseInt(id))
    const releaseYear = new Date(movie.release_date).getFullYear()
    const title = `${movie.title} (${releaseYear}) - Movie Discovery`
    const description = movie.overview || `Watch ${movie.title} and discover more movies like it.`
    const posterUrl = movie.poster_path ? tmdbApi.getImageUrl(movie.poster_path, "w500") : null
    const backdropUrl = movie.backdrop_path ? tmdbApi.getBackdropUrl(movie.backdrop_path, "w1280") : null

    return {
      title,
      description,
      keywords: [
        movie.title,
        ...movie.genres.map((g) => g.name),
        "movie",
        "film",
        "cinema",
        "watch",
        releaseYear.toString(),
      ].join(", "),
      openGraph: {
        title,
        description,
        type: "video.movie",
        url: `${process.env.BASE_URL}/movie/${movie.id}`,
        images: [
          {
            url: backdropUrl || posterUrl || "/movie-backdrop.png",
            width: 1280,
            height: 720,
            alt: `${movie.title} backdrop`,
          },
          ...(posterUrl
            ? [
              {
                url: posterUrl,
                width: 500,
                height: 750,
                alt: `${movie.title} poster`,
              },
            ]
            : []),
        ],
        siteName: "Movie Discovery",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [backdropUrl || posterUrl || "/movie-backdrop.png"],
      },
      alternates: {
        canonical: `${process.env.BASE_URL}/movie/${movie.id}`,
      },
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

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Movie",
      name: movie.title,
      description: movie.overview,
      image: movie.poster_path ? tmdbApi.getImageUrl(movie.poster_path, "w500") : undefined,
      datePublished: movie.release_date,
      genre: movie.genres.map((g) => g.name),
      duration: movie.runtime ? `PT${movie.runtime}M` : undefined,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: movie.vote_average,
        ratingCount: movie.vote_count,
        bestRating: 10,
        worstRating: 0,
      },
      actor: credits.cast.slice(0, 5).map((actor) => ({
        "@type": "Person",
        name: actor.name,
        url: `${process.env.BASE_URL}/person/${actor.id}`,
      })),
      url: `${process.env.BASE_URL}/movie/${movie.id}`,
    }

    return (
      <div className="min-h-screen bg-background">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-8">
            <MovieHero movie={movie} />

            <div className="grid gap-8">
              <Suspense fallback={<LoadingSpinner />}>
                <MovieCast cast={credits.cast.slice(0, 12)} />
              </Suspense>

              <Suspense fallback={<LoadingSpinner />}>
                <MovieVideos videos={videos.results.filter((v) => v.type === "Trailer" && v.site === "YouTube").slice(0, 3)} />
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
