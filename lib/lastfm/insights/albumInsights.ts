import type { Track, AlbumInsights, AlbumInfo } from "@/lib/types/lastfm";
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
  if (!tracks[0]) return null;
  if (tracks.length === 0) return null;

  const tracksWithDuration = tracks.filter((t) => t.duration > 0);

  if (tracksWithDuration.length === 0) {
    return {
      averageDuration: 0,
      longestTrack: tracks[0],
      shortestTrack: tracks[0],
      totalTracks: tracks.length,
      totalDuration: 0,
    };
  }

  const totalDuration = tracksWithDuration.reduce(
    (sum, t) => sum + t.duration,
    0
  );
  const averageDuration = Math.floor(totalDuration / tracksWithDuration.length);

  const sortedByDuration = [...tracksWithDuration].sort(
    (a, b) => b.duration - a.duration
  );

  return {
    averageDuration,
    longestTrack: sortedByDuration[0],
    shortestTrack: sortedByDuration[sortedByDuration.length - 1],
    totalTracks: tracks.length,
    totalDuration,
  };
}

export function calculateAlbumOutliers(album: AlbumInfo) {
  if (!album?.tracks?.track?.length) {
    return { insights: [], stats: null };
  }

  // Filter safe tracks
  const tracks = album.tracks.track.filter(
    (t) => typeof t.duration === "number" && t.duration > 0
  );

  if (tracks.length === 0) {
    return { insights: [], stats: null };
  }

  // PRE-COMPUTED durations
  const durations = tracks.map((t) => t.duration as number);

  const totalDuration = durations.reduce((a, b) => a + b, 0);
  const avgDuration = totalDuration / durations.length;

  /** Read duration */
  const getDuration = (t: { duration: number | null }) => t.duration ?? 0;

  // LONGEST / SHORTEST
  const longest = tracks.reduce((a, b) =>
    getDuration(a) > getDuration(b) ? a : b
  );
  const shortest = tracks.reduce((a, b) =>
    getDuration(a) < getDuration(b) ? a : b
  );

  // STD DEV
  const stdDev =
    Math.sqrt(
      durations.reduce((acc, d) => acc + Math.pow(d - avgDuration, 2), 0) /
        durations.length
    ) || 0;

  // OUTLIERS
  const outliers = tracks.filter(
    (t) => Math.abs(getDuration(t) - avgDuration) > stdDev * 2
  );

  const insights: string[] = [];

  const insightsIcons = [
    Gauge,
    Clock,
    Tag,
    BarChart3,
    Music,
    Trophy,
    Shuffle,
    Sparkles,
    ScanSearch,
    Info,
    Hourglass,
    ListMusic,
  ];

  // RULE 1 - LONGEST VS SHORTEST RATIO
  const ratio =
    shortest.duration && shortest.duration > 0
      ? (getDuration(longest) / getDuration(shortest)).toFixed(1)
      : "N/A";

  insights.push(
    `The longest track (“${longest.name}”) is ${ratio}× longer than the shortest track (“${shortest.name}”).`
  );

  // RULE 2 - SAFE %
  const pct = ((getDuration(longest) / totalDuration) * 100).toFixed(1);
  insights.push(`“${longest.name}” represents ${pct}% of the album runtime.`);

  // RULE 3 - ALBUM LENGTH
  if (totalDuration > 7200)
    insights.push("This is an unusually long album (over 2 hours).");
  else if (totalDuration > 3600)
    insights.push("This is a very long album (over 1 hour).");
  else if (totalDuration < 1800)
    insights.push("This album is relatively short (under 30 minutes).");

  // RULE 4 - OUTLIERS
  if (outliers.length > 0) {
    insights.push(
      `This album has unusual track durations, including the outlier: ${outliers[0].name}.`
    );
  }

  // RULE 5 - POPULARITY DENSITY
  const popDensity = tracks.map((t) => ({
    name: t.name,
    density: (t.listeners ?? 0) / getDuration(t),
  }));
  const mostDense = popDensity.sort((a, b) => b.density - a.density)[0];
  insights.push(
    `“${mostDense.name}” has the highest popularity per second of audio.`
  );

  // RULE 6 - LONGEST IS FIRST TRACK
  if ((longest as any)["@attr"]?.rank === 1) {
    insights.push(
      "This album opens with its longest track - unusual for most albums."
    );
  }

  // RULE 7 - FIRST HALF VS SECOND HALF
  const half = Math.floor(durations.length / 2);
  const firstHalf = durations.slice(0, half).reduce((a, b) => a + b, 0);
  const secondHalf = durations.slice(half).reduce((a, b) => a + b, 0);

  if (secondHalf > firstHalf * 1.3) {
    insights.push(
      "The second half of the album is significantly longer than the first."
    );
  }

  // RULE 8 - RARE TAGS
  const tags = album.tags?.tag ?? [];
  const trackRareTags = tags.filter((t) => rareTags.includes(t.name));

  if (trackRareTags.length > 0) {
    insights.push(
      `This album features unusual genres like ${trackRareTags
        .map((t) => t.name)
        .join(", ")}.`
    );
  }

  return {
    insights,
    insightsIcons,
  };
}
