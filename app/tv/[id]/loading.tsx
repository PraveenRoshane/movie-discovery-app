import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {/* Hero Skeleton */}
          <div className="relative">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Poster Skeleton */}
                  <div className="flex-shrink-0">
                    <div className="w-64 mx-auto md:mx-0">
                      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                        <Skeleton className="h-full w-full" />
                      </div>
                    </div>
                  </div>

                  {/* Movie Info Skeleton */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Skeleton className="h-9 w-3/4 mb-2 block" /> {/* Title */}
                          <Skeleton className="h-5 w-1/2 block" /> {/* Tagline */}
                        </div>
                        <div className="flex-shrink-0">
                          <Skeleton className="h-10 w-20" /> {/* Actions */}
                        </div>
                      </div>
                    </div>

                    {/* Meta Info Skeleton */}
                    <div className="flex flex-wrap items-center gap-4">
                      <Skeleton className="h-4 w-20" /> {/* Release Year */}
                      <Skeleton className="h-4 w-24" /> {/* Runtime */}
                      <Skeleton className="h-4 w-32" /> {/* Rating */}
                    </div>

                    {/* Genres Skeleton */}
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-16 rounded-md" />
                      <Skeleton className="h-6 w-20 rounded-md" />
                      <Skeleton className="h-6 w-16 rounded-md" />
                    </div>

                    {/* Overview Skeleton */}
                    <div>
                      <Skeleton className="h-6 w-20 mb-2" /> {/* Overview header */}
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6" />
                      {/* <Skeleton className="h-4 w-3/4" /> */}
                    </div>

                    {/* Additional Info Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" /> {/* Status label */}
                        <Skeleton className="h-4 w-12" /> {/* Status value */}
                      </div>
                      <div>
                        <Skeleton className="h-4 w-32 mb-1" /> {/* Original Language label */}
                        <Skeleton className="h-4 w-8" /> {/* Language value */}
                      </div>
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" /> {/* Budget label */}
                        <Skeleton className="h-4 w-20" /> {/* Budget value */}
                      </div>
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" /> {/* Revenue label */}
                        <Skeleton className="h-4 w-24" /> {/* Revenue value */}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TV Seasons Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold mb-4">Seasons</h2>
              <Skeleton className="h-8 w-12" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="relative w-20 h-28 flex-shrink-0">
                        <Skeleton className="w-full h-full rounded" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tv Cast Skeleton */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-full block p-0 m-0">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 -mt-6 -mb-2">
                      <div className="aspect-[2/3] relative">
                        <Skeleton className="h-full w-full" />
                      </div>
                      <div className="pt-3 px-3">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* Tv Trailers Skeleton */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Trailers & Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton key={i} className="aspect-[16/9] w-full rounded-lg" />
              ))}
            </div>
          </section>

          {/* TV Reviews Skeleton */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <div className="space-y-4">
              {Array.from({ length: 3 }, (_, i) => (
                <Card key={i} className="border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-30" />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Skeleton className="h-4 w-10 flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </Skeleton>
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <Skeleton className="h-20 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}