import { notFound } from "next/navigation"
import { tmdbApi } from "@/lib/tmdb"
import { TVHero } from "@/components/tv-hero"
import { MovieCast } from "@/components/movie-cast"
import { MovieVideos } from "@/components/movie-videos"
import { MovieReviews } from "@/components/movie-reviews"
import { TVSeasons } from "@/components/tv-seasons"
import { Metadata } from "next"
import { extractColorFromUrlServer } from "@/lib/serverColorUtils"

interface TVDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: TVDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const tvId = Number.parseInt(id)

  if (isNaN(tvId)) {
    return {
      title: "TV Series Not Found - Movie Discovery",
      description: "The requested TV series could not be found.",
    }
  }

  try {
    const tvDetails = await tmdbApi.getTVDetails(tvId)
    const year = tvDetails.first_air_date ? new Date(tvDetails.first_air_date).getFullYear() : ""
    const title = `${tvDetails.name} ${year ? `(${year})` : ""} - Movie Discovery`
    const description = tvDetails.overview || `Watch ${tvDetails.name} and discover more TV series.`
    const posterUrl = tvDetails.poster_path ? tmdbApi.getImageUrl(tvDetails.poster_path, "w500") : null
    const backdropUrl = tvDetails.backdrop_path ? tmdbApi.getBackdropUrl(tvDetails.backdrop_path, "w1280") : null

    return {
      title,
      description,
      keywords: [
        tvDetails.name,
        ...tvDetails.genres.map((g) => g.name),
        "tv series",
        "television",
        "show",
        "watch",
        year.toString(),
      ].join(", "),
      openGraph: {
        title,
        description,
        type: "video.tv_show",
        url: `${process.env.BASE_URL}/tv/${tvDetails.id}`,
        images: [
          {
            url: backdropUrl || posterUrl || "/movie-backdrop.png",
            width: 1280,
            height: 720,
            alt: `${tvDetails.name} backdrop`,
          },
          ...(posterUrl
            ? [
              {
                url: posterUrl,
                width: 500,
                height: 750,
                alt: `${tvDetails.name} poster`,
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
        canonical: `${process.env.BASE_URL}/tv/${tvDetails.id}`,
      },
    }
  } catch (error) {
    return {
      title: "TV Series Not Found - Movie Discovery",
      description: "The requested TV series could not be found.",
    }
  }
}

export default async function TVDetailPage({ params }: TVDetailPageProps) {
  const { id } = await params;
  const tvId = Number.parseInt(id)

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

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TVSeries",
      name: tvDetails.name,
      description: tvDetails.overview,
      image: tvDetails.poster_path ? tmdbApi.getImageUrl(tvDetails.poster_path, "w500") : undefined,
      datePublished: tvDetails.first_air_date,
      genre: tvDetails.genres.map((g) => g.name),
      numberOfSeasons: tvDetails.number_of_seasons,
      numberOfEpisodes: tvDetails.number_of_episodes,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: tvDetails.vote_average,
        ratingCount: tvDetails.vote_count,
        bestRating: 10,
        worstRating: 0,
      },
      actor: credits.cast.slice(0, 5).map((actor) => ({
        "@type": "Person",
        name: actor.name,
        url: `${process.env.BASE_URL}/person/${actor.id}`,
      })),
      url: `${process.env.BASE_URL}/tv/${tvDetails.id}`,
    }

    const bgColor = await extractColorFromUrlServer(tvDetails.poster_path ? tmdbApi.getImageUrl(tvDetails.poster_path, "w500") : "/tv-backdrop.png");

    return (
      <div className="min-h-screen" style={{ background: `linear-gradient(to bottom, ${bgColor}, var(--gradient-end))` }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-8">
            <TVHero tvSeries={tvDetails} />
            <TVSeasons tvSeries={tvDetails} />
            <MovieCast cast={credits.cast} />
            <MovieVideos videos={videos.results} />
            <MovieReviews reviews={reviews.results} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching TV series details:", error)
    notFound()
  }
}