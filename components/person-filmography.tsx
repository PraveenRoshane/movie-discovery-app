"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Star, Film, Tv, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { tmdbApi, type PersonCredits, type PersonTVCredits } from "@/lib/tmdb"

interface PersonFilmographyProps {
    movieCredits: PersonCredits
    tvCredits: PersonTVCredits
}

export function PersonFilmography({ movieCredits, tvCredits }: PersonFilmographyProps) {
    const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies")

    const sortedMovies = [...movieCredits.cast, ...movieCredits.crew]
        .filter((item) => item.poster_path) // Only show items with posters
        .sort((a, b) => {
            // Sort by popularity first, then by date
            const popularityDiff = (b.popularity || 0) - (a.popularity || 0)
            if (popularityDiff !== 0) return popularityDiff
            return new Date(b.release_date || "").getTime() - new Date(a.release_date || "").getTime()
        })
        .slice(0, 20)

    const sortedTV = [...tvCredits.cast, ...tvCredits.crew]
        .filter((item) => item.poster_path) // Only show items with posters
        .sort((a, b) => {
            const popularityDiff = (b.popularity || 0) - (a.popularity || 0)
            if (popularityDiff !== 0) return popularityDiff
            return new Date(b.first_air_date || "").getTime() - new Date(a.first_air_date || "").getTime()
        })
        .slice(0, 20)

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <Award className="h-7 w-7 text-primary" />
                    <h2 className="text-3xl font-bold text-foreground">Filmography</h2>
                </div>

                <div className="flex gap-2 p-1 bg-muted/50 rounded-xl border border-border/50">
                    <Button
                        variant={activeTab === "movies" ? "default" : "ghost"}
                        onClick={() => setActiveTab("movies")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${activeTab === "movies" ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted/70"
                            }`}
                    >
                        <Film className="h-4 w-4" />
                        Movies ({movieCredits.cast.length + movieCredits.crew.length})
                    </Button>
                    <Button
                        variant={activeTab === "tv" ? "default" : "ghost"}
                        onClick={() => setActiveTab("tv")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${activeTab === "tv" ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted/70"
                            }`}
                    >
                        <Tv className="h-4 w-4" />
                        TV Shows ({tvCredits.cast.length + tvCredits.crew.length})
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {activeTab === "movies" &&
                    sortedMovies.map((item, index) => (
                        <Link
                            key={`${item.id}-${index}`}
                            href={`/movies/${item.id}`}
                            className="group flex gap-6 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <Image
                                    src={tmdbApi.getImageUrl(item.poster_path, "w200") || "/placeholder.svg"}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="flex-1 min-w-0 space-y-3">
                                <div>
                                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground font-medium">
                                        {"character" in item ? (
                                            <span>as {item.character}</span>
                                        ) : (
                                            <span>
                                                {item.job} • {item.department}
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 text-sm">
                                    {item.release_date && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span className="font-medium">{new Date(item.release_date).getFullYear()}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                                        <span className="font-medium">{item.vote_average.toFixed(1)}</span>
                                    </div>
                                    {item.popularity && (
                                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                                            Popular
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}

                {activeTab === "tv" &&
                    sortedTV.map((item, index) => (
                        <Link
                            key={`${item.id}-${index}`}
                            href={`/tv/${item.id}`}
                            className="group flex gap-6 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                <Image
                                    src={tmdbApi.getImageUrl(item.poster_path, "w200") || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                    {item.vote_average.toFixed(1)}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0 space-y-3">
                                <div>
                                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                                        {item.name}
                                    </h3>
                                    <p className="text-muted-foreground font-medium">
                                        {"character" in item ? (
                                            <span>as {item.character}</span>
                                        ) : (
                                            <span>
                                                {item.job} • {item.department}
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 text-sm">
                                    {item.first_air_date && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span className="font-medium">{new Date(item.first_air_date).getFullYear()}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                                        <span className="font-medium">{item.vote_average.toFixed(1)}</span>
                                    </div>
                                    {item.popularity && (
                                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                                            Popular
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    )
}