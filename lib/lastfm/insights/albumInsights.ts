import type { Track, AlbumInsights, AlbumInfo } from "@/lib/types/lastfm"
import { rareTags } from "@/lib/utils";
import {
  Gauge,
  Hourglass,
  Tag,
  BarChart3,
  Music,
  Clock,
  ListMusic,
  ScanSearch,
  Trophy,
  Shuffle,
  Info,
  Sparkles,
} from "lucide-react";

export function calculateAlbumInsights(tracks: Track[]): AlbumInsights | null {
  if (!tracks[0]) return null 
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
  const averageDuration = Math.floor(totalDuration / tracksWithDuration.length)

  const sortedByDuration = [...tracksWithDuration].sort((a, b) => b.duration - a.duration)

  return {
    averageDuration,
    longestTrack: sortedByDuration[0],
    shortestTrack: sortedByDuration[sortedByDuration.length - 1],
    totalTracks: tracks.length,
    totalDuration,
  }
}


export function calculateAlbumOutliers(album: AlbumInfo) {
  if (!album.tracks.track[0]) return null 
  const tracks = album.tracks.track.filter(t => t.duration > 0);

  if (tracks.length === 0) {
    return { insights: [], stats: null };
  }

  const durations = tracks.map(t => t.duration);
  const totalDuration = durations.reduce((a, b) => a + b, 0);
  const avgDuration = totalDuration / durations.length;

  const longest = tracks.reduce((a, b) => (a.duration > b.duration ? a : b));
  const shortest = tracks.reduce((a, b) => (a.duration < b.duration ? a : b));

  const stdDev = Math.sqrt(
    durations.reduce((acc, d) => acc + Math.pow(d - avgDuration, 2), 0) / durations.length
  );

  const outliers = tracks.filter(t => Math.abs(t.duration - avgDuration) > stdDev * 2);

  const insights: string[] = [];

  const insightsIcons = [Gauge, Clock, Tag, BarChart3, Music, Trophy, Shuffle, Sparkles, ScanSearch, Info, Hourglass, ListMusic];
  

  // RULE 1
  insights.push(
    `The longest track (“${longest.name}”) is ${(longest.duration / shortest.duration).toFixed(
      1
    )}× longer than the shortest track (“${shortest.name}”).`
  );

  // RULE 2
  insights.push(
    `“${longest.name}” represents ${((longest.duration / totalDuration) * 100).toFixed(
      1
    )}% of the album runtime.`
  );

  // RULE 3
  if (totalDuration > 3600) insights.push("This is an unusually long album (over 1 hour).");
  else if (totalDuration < 1800) insights.push("This album is relatively short (under 30 minutes).");

  // RULE 4 (outliers)
  if (outliers.length > 0) {
    insights.push(`This album has unusual track durations, including the outlier: ${outliers[0].name}.`);
  }

  // RULE 5 (popularity density)
  const popDensity = tracks.map(t => ({
    name: t.name,
    density: (t.listeners ?? 0) / (t.duration || 1),
  }));
  const mostDense = popDensity.sort((a, b) => b.density - a.density)[0];
  insights.push(`“${mostDense.name}” has the highest popularity per second of audio.`);

  // RULE 6 (ordering)
  if (longest["@attr"]?.rank === 1) {
    insights.push("This album opens with its longest track — unusual for most albums.");
  }

  // RULE 7: half duration comparison
  const half = Math.floor(tracks.length / 2);
  const firstHalf = durations.slice(0, half).reduce((a, b) => a + b, 0);
  const secondHalf = durations.slice(half).reduce((a, b) => a + b, 0);

  if (secondHalf > firstHalf * 1.3) {
    insights.push("The second half of the album is significantly longer than the first.");
  }

  // RULE 8: tag rarity
  const tags = album.tags?.tag || [];
  const trackRareTags = tags.filter(t => rareTags.includes(t.name));
  if (trackRareTags.length > 0) {
    insights.push(`This album features unusual genres like ${trackRareTags.map(t => t.name).join(", ")}.`);
  }

  return {
    insights,
    insightsIcons
  };
}
