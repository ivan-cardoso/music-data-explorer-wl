import Link from "next/link"
import type { Artist } from "@/lib/types/lastfm"
import { formatNumber } from "@/lib/utils/formatter"

interface TrendingArtistsChartProps {
  artists: Artist[]
}

export function TrendingArtistsChart({ artists }: TrendingArtistsChartProps) {
  if (artists.length === 0) {
    return <div className="text-muted-foreground">No data available</div>
  }

  const maxPlaycount = Math.max(...artists.map((a) => a.playcount))

  return (
    <div className="space-y-4">
      {artists.map((artist, index) => {
        const percentage = (artist.playcount / maxPlaycount) * 100

        return (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <Link
                href={`/artist/${encodeURIComponent(artist.name)}`}
                className="text-foreground font-medium hover:text-primary transition-colors"
              >
                {artist.name}
              </Link>
              <span className="text-sm text-muted-foreground">{formatNumber(artist.playcount)}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 group-hover:brightness-110"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
