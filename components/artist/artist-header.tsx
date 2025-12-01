import type { Artist } from "@/lib/types/lastfm"
import { formatNumber, stripHtmlTags } from "@/lib/utils/formatter"
import { Badge } from "@/components/ui/badge"

interface ArtistHeaderProps {
  artist: Artist
}

export function ArtistHeader({ artist }: ArtistHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <img
        src={artist.image || "/placeholder.svg?height=300&width=300&query=music+artist"}
        alt={artist.name}
        className="w-full md:w-64 h-64 object-cover rounded-lg shadow-lg"
      />

      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{artist.name}</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <div className="text-sm text-muted-foreground">Listeners</div>
            <div className="text-2xl font-bold text-primary">{formatNumber(artist.listeners)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Playcount</div>
            <div className="text-2xl font-bold text-primary">{formatNumber(artist.playcount)}</div>
          </div>
        </div>

        {artist.tags && artist.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {artist.tags.slice(0, 5).map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {artist.bio && (
          <p className="text-muted-foreground leading-relaxed">{stripHtmlTags(artist.bio).slice(0, 300)}...</p>
        )}
      </div>
    </div>
  )
}
