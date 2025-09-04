import Image from "next/image"
import type { Cast } from "@/lib/tmdb"
import { tmdbApi } from "@/lib/tmdb"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface MovieCastProps {
  cast: Cast[]
}

export function MovieCast({ cast }: MovieCastProps) {
  if (cast.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cast.map((actor) => (
          <Link href={`/person/${actor.id}`} key={actor.id} className="h-full block p-0 m-0">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0 -mt-6 -mb-2">
                <div className="aspect-[2/3] relative">
                  <Image
                    src={tmdbApi.getImageUrl(actor.profile_path, "w300") || "/placeholder.svg"}
                    alt={actor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  />
                </div>
                <div className="pt-3 px-3">
                  <h3 className="font-semibold text-sm line-clamp-1">{actor.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{actor.character}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section >
  )
}
