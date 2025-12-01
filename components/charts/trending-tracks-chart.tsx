import type { Track } from "@/lib/types/lastfm"
import { formatNumber } from "@/lib/utils/formatter"

interface TrendingTracksChartProps {
  tracks: Track[]
}

export function TrendingTracksChart({ tracks }: TrendingTracksChartProps) {
  if (tracks.length === 0) {
    return <div className="text-muted-foreground">No data available</div>
  }

  const maxPlaycount = Math.max(...tracks.map((t) => t.playcount))

  return (
    <div className="space-y-4">
      {tracks.map((track, index) => {
        const percentage = (track.playcount / maxPlaycount) * 100

        return (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground font-medium">{track.name}</span>
              <span className="text-sm text-muted-foreground">{formatNumber(track.playcount)}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 group-hover:brightness-110"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
