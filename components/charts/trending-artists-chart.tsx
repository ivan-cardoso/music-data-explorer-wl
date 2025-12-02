import Link from "next/link";
import type { Artist } from "@/lib/types/lastfm";
import { formatNumber } from "@/lib/utils/formatter";

interface TrendingArtistsChartProps {
  artists: Artist[];
}

export function TrendingArtistsChart({ artists }: TrendingArtistsChartProps) {
  if (artists.length === 0) {
    return <div className="text-muted-foreground">No data available</div>;
  }

  const maxPlaycount = Math.max(...artists.map((a) => a.playcount));

  return (
    <ul className="w-full flex flex-col divide-y divide-muted/40">
      {artists.map((artist, i) => {
        const percentage = (artist.playcount / maxPlaycount) * 100;

        return (
          <li
            key={i}
            className="
                        grid 
                        sm:grid-cols-2 
                        items-center 
                        gap-4 
                        py-3 
                        hover:bg-muted/20 
                        transition-colors 
                        rounded-lg
                        px-2
                        min-h-20
                      "
          >
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-foreground text-center">
                  {i + 1}
                </span>
              </div>
              <Link
                href={`/artist/${encodeURIComponent(artist.name)}`}
                className="text-foreground font-medium hover:text-primary transition-colors"
              >
                {artist.name}
              </Link>
            </div>

            <div className="flex flex-col w-full">
              <div className="relative mt-1 h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary/70 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
                <span className="absolute inset-y-0 left-0 text-sm font-medium text-white whitespace-nowrap pl-4 py-1.5">
                  {formatNumber(artist.playcount)} Plays
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
