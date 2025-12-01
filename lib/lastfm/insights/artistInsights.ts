import type { Track, ArtistInsights } from "@/lib/types/lastfm"

export function calculateArtistInsights(tracks: Track[]): ArtistInsights | null {
  if (tracks.length === 0) return null

  const tracksWithDuration = tracks.filter((t) => t.duration > 0)

  if (tracksWithDuration.length === 0) {
    // If no duration data, use playcount only
    const sorted = [...tracks].sort((a, b) => b.playcount - a.playcount)
    return {
      averageDuration: 0,
      longestTrack: sorted[0],
      shortestTrack: sorted[sorted.length - 1],
      totalTracks: tracks.length,
      mostPopularTrack: sorted[0],
      leastPopularTrack: sorted[sorted.length - 1],
    }
  }

  const totalDuration = tracksWithDuration.reduce((sum, t) => sum + t.duration, 0)
  const averageDuration = totalDuration / tracksWithDuration.length

  const sortedByDuration = [...tracksWithDuration].sort((a, b) => b.duration - a.duration)
  const sortedByPopularity = [...tracks].sort((a, b) => b.playcount - a.playcount)

  return {
    averageDuration,
    longestTrack: sortedByDuration[0],
    shortestTrack: sortedByDuration[sortedByDuration.length - 1],
    totalTracks: tracks.length,
    mostPopularTrack: sortedByPopularity[0],
    leastPopularTrack: sortedByPopularity[sortedByPopularity.length - 1],
  }
}
