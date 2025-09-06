import { Suspense } from "react"
import { tmdbApi } from "@/lib/tmdb"
import { LoadingGrid } from "@/components/loading-grid"
import { InfiniteTVGrid } from "@/components/infinite-tv-grid"
import { TVCategoryTabs } from "@/components/tv-category-tabs"

export default async function TVPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>
}) {
  const { category, search } = await searchParams;

  return (
    <main className="container mx-auto px-4 py-6">
      {!search && (
        <div className="mb-6">
          <TVCategoryTabs currentCategory={category || "trending"} />
        </div>
      )}

      <Suspense fallback={<LoadingGrid />}>
        <TVGridWrapper category={category || "trending"} searchQuery={search} />
      </Suspense>
    </main>
  )
}

async function TVGridWrapper({
  category,
  searchQuery,
}: {
  category: string
  searchQuery?: string
}) {
  try {
    let tvData

    if (searchQuery) {
      tvData = await tmdbApi.searchTV(searchQuery, 1)
    } else {
      switch (category) {
        case "popular":
          tvData = await tmdbApi.getTVPopular(1)
          break
        case "top-rated":
          tvData = await tmdbApi.getTVTopRated(1)
          break
        case "on-the-air":
          tvData = await tmdbApi.getTVOnTheAir(1)
          break
        case "airing-today":
          tvData = await tmdbApi.getTVAiringToday(1)
          break
        case "trending":
        default:
          tvData = await tmdbApi.getTVTrending()
          break
      }
    }

    return <InfiniteTVGrid initialData={tvData} category={category} searchQuery={searchQuery} />
  } catch (error) {
    console.error("Error fetching TV series:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load TV series. Please check your TMDB API key and try again.</p>
      </div>
    )
  }
}
