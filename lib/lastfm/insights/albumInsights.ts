import type { Track, AlbumInsights } from "@/lib/types/lastfm"

export function calculateAlbumInsights(tracks: Track[]): AlbumInsights | null {
  if (tracks.length === 0) return null

  const tracksWithDuration = tracks.filter((t) => t.duration > 0)

  if (tracksWithDuration.length === 0) {
    return {
      averageDuration: 0,
      longestTrack: tracks[0],
      shortestTrack: tracks[0],
      totalTracks: tracks.length,
      totalDuration: 0,
    }
  }

  const totalDuration = tracksWithDuration.reduce((sum, t) => sum + t.duration, 0)
  const averageDuration = totalDuration / tracksWithDuration.length

  const sortedByDuration = [...tracksWithDuration].sort((a, b) => b.duration - a.duration)

  return {
    averageDuration,
    longestTrack: sortedByDuration[0],
    shortestTrack: sortedByDuration[sortedByDuration.length - 1],
    totalTracks: tracks.length,
    totalDuration,
  }
}
