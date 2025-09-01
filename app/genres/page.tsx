import Link from "next/link"
import { Film, Tv, Tag } from "lucide-react"
import { tmdbApi } from "@/lib/tmdb"
import { Card, CardContent } from "@/components/ui/card"

export default async function GenresPage() {
  try {
    const [movieGenres, tvGenres] = await Promise.all([tmdbApi.getMovieGenres(), tmdbApi.getTVGenres()])

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse by Genre</h1>
          <p className="text-muted-foreground">Discover movies and TV shows by your favorite genres</p>
        </div>

        <div className="space-y-12">
          {/* Movie Genres */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Film className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Movie Genres</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movieGenres.genres.map((genre, index) => (
                <Link key={genre.id} href={`/genres/movies/${genre.id}?name=${encodeURIComponent(genre.name)}`}>
                  <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div
                        className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Tag className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {genre.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* TV Genres */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Tv className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">TV Series Genres</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {tvGenres.genres.map((genre, index) => (
                <Link key={genre.id} href={`/genres/tv/${genre.id}?name=${encodeURIComponent(genre.name)}`}>
                  <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div
                        className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Tag className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {genre.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error fetching genres:", error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load genres. Please check your TMDB API key and try again.</p>
        </div>
      </div>
    )
  }
}
