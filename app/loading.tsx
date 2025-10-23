import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main>
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden" aria-hidden="true">
        {/* Background Image Placeholder */}
        <Skeleton className="absolute inset-0 h-full w-full" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Content Placeholder */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-4">
              <Skeleton className="h-10 w-3/4" /> {/* Title */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-16" /> {/* Year */}
                <Skeleton className="h-6 w-20" /> {/* Rating */}
              </div>
              <Skeleton className="h-6 w-full" /> {/* Overview line 1 */}
              <Skeleton className="h-6 w-11/12" /> {/* Overview line 2 */}
              <Skeleton className="h-6 w-10/12" /> {/* Overview line 3 */}

              <div className="flex gap-4 pt-4">
                <Skeleton className="h-12 w-40" /> {/* Watch Trailer Button */}
                <Skeleton className="h-12 w-40" /> {/* More Info Button */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10 space-y-12">
        {Array.from({ length: 5 }).map((_, index) => (
          <section key={index} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-8 w-48" /> {/* Placeholder for title */}
              <Skeleton className="h-10 w-24" /> {/* Placeholder for "View All" button */}
            </div>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-none w-[160px] sm:w-[180px] md:w-[200px]"
                  >
                    <Skeleton className="h-[280px] w-full rounded-md" /> {/* Placeholder for MovieCard */}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

      </div>
    </main>
  );
}