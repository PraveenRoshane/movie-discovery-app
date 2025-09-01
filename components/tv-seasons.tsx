"use client"

import { useState } from "react"
import Image from "next/image"
import { tmdbApi, type TVSeriesDetails, type SeasonDetails } from "@/lib/tmdb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Star } from "lucide-react"

interface TVSeasonsProps {
    tvSeries: TVSeriesDetails
}

export function TVSeasons({ tvSeries }: TVSeasonsProps) {
    const [selectedSeason, setSelectedSeason] = useState<SeasonDetails | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSeasonClick = async (seasonNumber: number) => {
        if (selectedSeason?.season_number === seasonNumber) {
            setSelectedSeason(null)
            return
        }

        setLoading(true)
        try {
            const seasonDetails = await tmdbApi.getSeasonDetails(tvSeries.id, seasonNumber)
            setSelectedSeason(seasonDetails)
        } catch (error) {
            console.error("Error fetching season details:", error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return "TBA"
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const formatRuntime = (runtime: number | null) => {
        if (!runtime) return "Unknown"
        const hours = Math.floor(runtime / 60)
        const minutes = runtime % 60
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Seasons ({tvSeries.number_of_seasons})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tvSeries.seasons
                    .filter((season) => season.season_number >= 0)
                    .map((season) => (
                        <Card
                            key={season.id}
                            className={`cursor-pointer transition-all hover:shadow-lg ${selectedSeason?.season_number === season.season_number ? "ring-2 ring-primary" : ""}`}
                            onClick={() => handleSeasonClick(season.season_number)}
                        >
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <div className="relative w-20 h-28 flex-shrink-0">
                                        <Image
                                            src={tmdbApi.getImageUrl(season.poster_path, "w200") || "/placeholder.svg"}
                                            alt={season.name}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-lg line-clamp-2">{season.name}</CardTitle>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="secondary">{season.episode_count} episodes</Badge>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(season.air_date)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            {season.overview && (
                                <CardContent className="pt-0">
                                    <CardDescription className="line-clamp-3">{season.overview}</CardDescription>
                                </CardContent>
                            )}
                        </Card>
                    ))}
            </div>

            {/* Episodes Section */}
            {selectedSeason && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{selectedSeason.name} Episodes</h3>
                        <Button variant="outline" size="sm" onClick={() => setSelectedSeason(null)}>
                            Close
                        </Button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {selectedSeason.episodes.map((episode) => (
                                <Card key={episode.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 py-0">
                                        <div className="flex gap-4">
                                            <div className="relative w-28 h-20 flex-shrink-0">
                                                <Image
                                                    src={tmdbApi.getImageUrl(episode.still_path, "w300") || "/placeholder.svg"}
                                                    alt={episode.name}
                                                    fill
                                                    className="object-cover rounded"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h4 className="font-medium line-clamp-1">
                                                            {episode.episode_number}. {episode.name}
                                                        </h4>
                                                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {formatDate(episode.air_date)}
                                                            </div>
                                                            {episode.runtime && (
                                                                <div className="flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {formatRuntime(episode.runtime)}
                                                                </div>
                                                            )}
                                                            {episode.vote_average > 0 && (
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                                    {episode.vote_average.toFixed(1)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {episode.overview && (
                                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{episode.overview}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
