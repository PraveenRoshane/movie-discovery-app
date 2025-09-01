import { Suspense } from "react";
import { tmdbApi } from "@/lib/tmdb";
import { HeroBanner } from "@/components/hero-banner";
import { LoadingGrid } from "@/components/loading-grid";
import { MovieSection } from "@/components/movie-section";
import { InfiniteMovieGrid } from "@/components/infinite-movie-grid";

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string; search?: string; page?: string }> }) {
  const params = await searchParams;
  const category = params.category || "trending"
  const searchQuery = params.search

  if (!searchQuery) {
    return <HomepageWithSections />
  }

  return <SearchResultsPage searchQuery={searchQuery} category={category} />
}

async function HomepageWithSections() {
  try {
    const [trendingData, nowPlayingData, popularData, topRatedData, upcomingData] = await Promise.all([
      tmdbApi.getTrending(),
      tmdbApi.getNowPlaying(),
      tmdbApi.getPopular(),
      tmdbApi.getTopRated(),
      tmdbApi.getUpcoming(),
    ])

    const heroMovie = trendingData.results[0]

    return (
      <main>
        <HeroBanner movie={heroMovie} />
        <div className="container mx-auto px-4 py-6 space-y-12">
          <MovieSection title="Now Playing" movies={nowPlayingData.results} viewAllHref="/movies?category=now-playing" />
          <MovieSection title="Trending" movies={trendingData.results} viewAllHref="/movies?category=trending" />
          <MovieSection title="Popular" movies={popularData.results} viewAllHref="/movies?category=popular" />
          <MovieSection title="Top Rated" movies={topRatedData.results} viewAllHref="/movies?category=top-rated" />
          <MovieSection title="Upcoming" movies={upcomingData.results} viewAllHref="/movies?category=upcoming" />
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error fetching homepage data:", error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            Failed to load homepage. Please check your TMDB API key and try again.
          </p>
        </div>
      </div>
    )
  }
}

async function SearchResultsPage({ searchQuery, category }: { searchQuery: string; category: string }) {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Search Results for "{searchQuery}"</h2>
      </div>

      <Suspense fallback={<LoadingGrid />}>
        <MovieGridWrapper searchQuery={searchQuery} category={category} />
      </Suspense>
    </main>
  )
}

async function MovieGridWrapper({ searchQuery, category }: { searchQuery: string; category: string }) {
  try {
    const moviesData = await tmdbApi.searchMovies(searchQuery, 1)
    return <InfiniteMovieGrid initialData={moviesData} searchQuery={searchQuery} category={category} />
  } catch (error) {
    console.error("Error fetching movies:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load movies. Please check your TMDB API key and try again.</p>
      </div>
    )
  }
}
