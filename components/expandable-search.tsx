"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2, Film, Tv, User } from "lucide-react"
import { tmdbApi, Movie, TVSeries, Person, MediaItem } from "@/lib/tmdb"

interface SearchSuggestion {
    id: number
    title: string
    subtitle: string
    image: string | null
    type: "movie" | "tv" | "person"
    href: string
}

export function ExpandableSearch() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState<string>(searchParams?.get("search") ?? "")
    const [isExpanded, setIsExpanded] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (searchParams?.get("search")) {
            setIsExpanded(true)
        }
    }, [searchParams])

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isExpanded])

    useEffect(() => {
        const fetchSuggestions = async (searchQuery: string) => {
            if (!searchQuery.trim() || searchQuery.length < 2) {
                setSuggestions([])
                setShowSuggestions(false)
                return
            }

            setIsLoadingSuggestions(true)
            try {
                const results = await tmdbApi.searchMulti(searchQuery, 1)

                function isMovie(item: MediaItem & { media_type: string }): item is Movie & { media_type: "movie" } {
                    return item.media_type === "movie"
                }

                function isTVSeries(item: MediaItem & { media_type: string }): item is TVSeries & { media_type: "tv" } {
                    return item.media_type === "tv"
                }

                function isPerson(item: MediaItem & { media_type: string }): item is Person & { media_type: "person" } {
                    return item.media_type === "person"
                }

                const formattedSuggestions: SearchSuggestion[] = results.results.slice(0, 8).map((item) => {
                    if (isMovie(item)) {
                        return {
                            id: item.id,
                            title: item.title ?? "",
                            subtitle: item.release_date ? new Date(item.release_date).getFullYear().toString() : "Movie",
                            image: item.poster_path,
                            type: "movie" as const,
                            href: `/movies/${item.id}`,
                        }
                    } else if (isTVSeries(item)) {
                        return {
                            id: item.id,
                            title: item.name ?? "",
                            subtitle: item.first_air_date ? new Date(item.first_air_date).getFullYear().toString() : "TV Series",
                            image: item.poster_path,
                            type: "tv" as const,
                            href: `/tv/${item.id}`,
                        }
                    } else if (isPerson(item)) {
                        return {
                            id: item.id,
                            title: item.name ?? "",
                            subtitle: item.known_for_department || "Person",
                            image: item.profile_path,
                            type: "person" as const,
                            href: `/person/${item.id}`,
                        }
                    }

                    // fallback to satisfy TS (should never happen)
                    return {
                        id: item.id,
                        title: "Unknown",
                        subtitle: "Unknown",
                        image: null,
                        type: "movie" as const,
                        href: "/",
                    }
                })

                setSuggestions(formattedSuggestions)
                setShowSuggestions(true)
            } catch (error) {
                console.error("Error fetching suggestions:", error)
                setSuggestions([])
            } finally {
                setIsLoadingSuggestions(false)
            }
        }

        const timeoutId = setTimeout(() => {
            fetchSuggestions(query)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query])

    useEffect(() => {
        setIsSearching(false)
    }, [searchParams])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
                if (!query.trim()) {
                    setIsExpanded(false)
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [query])

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setShowSuggestions(false)
                if (!query.trim()) {
                    setIsExpanded(false)
                }
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [query])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            setIsSearching(true)
            setShowSuggestions(false)
            router.push(`/?search=${encodeURIComponent(query.trim())}`)
        }
    }

    const clearSearch = () => {
        setQuery("")
        setIsSearching(false)
        setSuggestions([])
        setShowSuggestions(false)
        setIsExpanded(false)
        router.push("/")
    }

    const handleSuggestionClick = () => {
        setQuery("")
        setShowSuggestions(false)
    }

    const getTypeIcon = (type: "movie" | "tv" | "person") => {
        switch (type) {
            case "movie":
                return <Film className="h-4 w-4" />
            case "tv":
                return <Tv className="h-4 w-4" />
            case "person":
                return <User className="h-4 w-4" />
        }
    }

    return (
        <div ref={searchRef} className="relative">
            <div className="w-80 max-w-[90vw]">
                <form onSubmit={handleSearch} className="relative">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/70 h-4 w-4 transition-colors group-focus-within:text-primary z-30" />
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Search movies, TV shows, people..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                            className="px-10 py-7 bg-gradient-to-b from-background/80 to-background/40 border-none backdrop-blur-lg shadow-lg rounded-2xl"
                        />
                        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                            {(isSearching || isLoadingSuggestions) && (
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            )}
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={query ? clearSearch : () => setIsExpanded(false)}
                                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                aria-label="Clear search"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </form>

                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-auto max-h-96 overflow-y-auto">
                        {suggestions.map((suggestion) => (
                            <Link
                                key={`${suggestion.type}-${suggestion.id}`}
                                href={suggestion.href}
                                onClick={handleSuggestionClick}
                                className="flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                                <div className="relative w-12 h-16 flex-shrink-0 bg-muted rounded overflow-hidden">
                                    {suggestion.image ? (
                                        <Image
                                            src={suggestion.type === "person" ? tmdbApi.getProfileUrl(suggestion.image, "w185") : tmdbApi.getImageUrl(suggestion.image, "w200")}
                                            alt={suggestion.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            {getTypeIcon(suggestion.type)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-foreground truncate">
                                        {suggestion.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        {getTypeIcon(suggestion.type)}
                                        <span>{suggestion.subtitle}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}