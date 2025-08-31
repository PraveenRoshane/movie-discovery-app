import { Star, User } from "lucide-react"
import type { Review } from "@/lib/tmdb"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface MovieReviewsProps {
  reviews: Review[]
}

export function MovieReviews({ reviews }: MovieReviewsProps) {
  if (reviews.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <p className="text-muted-foreground">No reviews available for this movie.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{review.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {review.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{review.rating}/10</span>
                    </div>
                  )}
                  <span>{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="line-clamp-6 leading-relaxed">
                  {review.content.length > 500 ? `${review.content.substring(0, 500)}...` : review.content}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
