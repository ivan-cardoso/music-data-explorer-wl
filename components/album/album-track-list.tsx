import type { Track } from "@/lib/types/lastfm"
import { formatDuration } from "@/lib/utils/formatter"
import { Music } from "lucide-react"

interface AlbumTrackListProps {
  tracks: Track[]
}

export function AlbumTrackList({ tracks }: AlbumTrackListProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {tracks.map((track, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded bg-muted text-muted-foreground font-medium">
            {index + 1}
          </div>

          <Music className="h-5 w-5 text-muted-foreground" />

          <div className="flex-1">
            <div className="font-medium text-foreground">{track.name}</div>
          </div>

          <div className="text-muted-foreground">{track.duration > 0 ? formatDuration(track.duration) : "-"}</div>
        </div>
      ))}
    </div>
  )
}
