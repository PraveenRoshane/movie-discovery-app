"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("search") || "")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim() && query !== searchParams.get("search")) {
        setIsSearching(true)
        router.push(`/?search=${encodeURIComponent(query.trim())}`)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query, router, searchParams])

  // Reset searching state when search params change
  useEffect(() => {
    setIsSearching(false)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsSearching(true)
      router.push(`/?search=${encodeURIComponent(query.trim())}`)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setIsSearching(false)
    router.push("/")
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
        <Input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-background/50 border-border focus:ring-primary focus:border-primary transition-all duration-300 focus:bg-background"
        />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {isSearching && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
