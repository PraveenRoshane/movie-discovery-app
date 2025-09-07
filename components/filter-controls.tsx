"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, Calendar, Star, Globe, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterControlsProps {
  type: "movie" | "tv"
}

export function FilterControls({ type }: FilterControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const currentYear = searchParams?.get("year")
  const currentRating = searchParams?.get("rating")
  const currentLanguage = searchParams?.get("language")
  const currentSortBy = searchParams?.get("sortBy")

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams?.toString() || "")
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.delete("year")
    params.delete("rating")
    params.delete("language")
    params.delete("sortBy")
    router.push(`/?${params.toString()}`)
  }

  const currentRatingValue = currentRating ? Number.parseFloat(currentRating) : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        {(currentYear || currentRating || currentLanguage || currentSortBy) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Year Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Year</label>
                </div>
                <Select value={currentYear || "any"} onValueChange={(value) => updateFilter("year", value || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any year</SelectItem>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Min Rating: {currentRatingValue}</label>
                </div>
                <Slider
                  value={[currentRatingValue]}
                  onValueChange={([value]) => updateFilter("rating", value > 0 ? value.toString() : null)}
                  max={10}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Language Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Language</label>
                </div>
                <Select
                  value={currentLanguage || "any"}
                  onValueChange={(value) => updateFilter("language", value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any language</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                    <SelectItem value="ko">Korean</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Sort By</label>
                </div>
                <Select
                  value={currentSortBy || "popularity.desc"}
                  onValueChange={(value) => updateFilter("sortBy", value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Popularity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity.desc">Popularity (High to Low)</SelectItem>
                    <SelectItem value="popularity.asc">Popularity (Low to High)</SelectItem>
                    <SelectItem value="release_date.desc">
                      {type === "movie" ? "Release Date (Newest)" : "Air Date (Newest)"}
                    </SelectItem>
                    <SelectItem value="release_date.asc">
                      {type === "movie" ? "Release Date (Oldest)" : "Air Date (Oldest)"}
                    </SelectItem>
                    <SelectItem value="vote_average.desc">Rating (High to Low)</SelectItem>
                    <SelectItem value="vote_average.asc">Rating (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
