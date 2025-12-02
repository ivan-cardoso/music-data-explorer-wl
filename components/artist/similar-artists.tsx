import type { Artist } from "@/lib/types/lastfm"
import Link from "next/link"
import { formatNumber } from "@/lib/utils/formatter"

interface SimilarArtistsProps {
  artists: Artist[]
}

export function SimilarArtists({ artists }: SimilarArtistsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {artists.map((artist, index) => (
        <Link
          key={index}
          href={`/artist/${encodeURIComponent(artist.name)}`}
          className="group flex flex-col items-center text-center"
        >
          <div className="w-full aspect-square rounded-full overflow-hidden mb-3 ring-2 ring-border group-hover:ring-primary transition-all">
            <img
              src={artist.image || "/placeholder.svg?height=200&width=200&query=artist"}
              alt={artist.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{artist.name}</h3>
          {/* <p className="text-xs text-muted-foreground">{formatNumber(artist.listeners)} listeners</p> */}
        </Link>
      ))}
    </div>
  )
}
