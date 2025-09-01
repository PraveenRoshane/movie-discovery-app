import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import type { Movie } from "@/lib/tmdb"

interface MovieSectionProps {
  title: string
  movies: Movie[]
  viewAllHref?: string
}

export function MovieSection({ title, movies, viewAllHref }: MovieSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {viewAllHref && (
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link href={viewAllHref}>
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        )}
      </div>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory outline-none">
          {movies.slice(0, 20).map((movie, index) => (
            <div
              key={movie.id}
              className="flex-none w-[160px] sm:w-[180px] md:w-[200px] animate-in fade-in slide-in-from-left-4 snap-start"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link href={`/movie/${movie.id}`} className="h-full block p-0 m-0">
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  )
}