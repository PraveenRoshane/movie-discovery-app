import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {/* Hero skeleton */}
          <div className="bg-card rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-64 aspect-[2/3] bg-muted animate-pulse rounded-lg" />
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>

          <LoadingSpinner />
        </div>
      </div>
    </div>
  )
}
