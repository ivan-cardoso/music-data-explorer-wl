"use client"

import { useState, useCallback, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { debounce } from "@/lib/utils/debounce"
import Link from "next/link"

interface Artist {
  name: string
  listeners: string
  image?: Array<{ "#text": string; size: string }>
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const searchArtists = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.artists || [])
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const debouncedSearch = useCallback(debounce(searchArtists, 300), [searchArtists])

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  const getImage = (images?: Array<{ "#text": string; size: string }>) => {
    if (!images || images.length === 0) return "/diverse-artists-studio.png"
    const smallImage = images.find((img) => img.size === "small")
    return smallImage?.["#text"] || images[0]?.["#text"]
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="h-14 pl-12 text-base bg-card border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute top-full mt-2 w-full rounded-lg border border-border bg-card shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">Searching...</div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {suggestions.map((artist, index) => (
                <Link
                  key={index}
                  href={`/artist/${encodeURIComponent(artist.name)}`}
                  className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={getImage(artist.image) || "/placeholder.svg"}
                    alt={artist.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                  <div>
                    <div className="font-medium text-foreground">{artist.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {Number.parseInt(artist.listeners).toLocaleString()} listeners
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
