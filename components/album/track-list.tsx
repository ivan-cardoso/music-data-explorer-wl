import { Track } from "@/lib/types/lastfm";
import { formatDuration } from "@/lib/utils/formatter";
import Image from "next/image";
import Link from "next/link";

export default function TopTracksList({
  tracks,
  image,
  showArtistName,
  variant = "primary",
}: {
  tracks: Track[];
  image?: string;
  showArtistName?: boolean;
  variant?: "primary" | "secondary";
}) {
  const maxPlaycount =
    tracks[0].listeners && Math.max(...tracks.map((a) => a.listeners!));
  return (
    <ul className="w-full flex flex-col divide-y divide-muted/40">
      {tracks.map((track: Track, i: number) => {
        const percentage = (track.listeners! / maxPlaycount!) * 100;
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
              min-h-16
              lg:min-h-20
            "
          >
            <div className="flex gap-3 items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${variant === 'secondary' ? 'bg-ring' : 'bg-primary'}`}>
                <span className="text-lg font-bold text-foreground text-center">
                  {i + 1}
                </span>
              </div>
              {image && (
                <Image
                  height={100}
                  width={100}
                  src={image}
                  alt={`${track.name} - image`}
                  className="w-12 h-12"
                />
              )}
              <div className="flex flex-col max-w-48 lg:max-w-64">
                <p className="text-foreground font-medium truncate underline">
                  {track.name}
                </p>
                {showArtistName && (
                  <Link
                    href={`/artist/${encodeURIComponent(track.artist!)}`}
                    className={`text-sm font-medium text-muted-foreground  transition-colors ${variant === 'secondary' ? 'hover:text-ring' : 'hover:text-primary'}`}
                  >
                    {track.artist}
                  </Link>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="relative mt-1 h-8 bg-muted rounded-full overflow-hidden">
                {track.listeners ? (
                  <>
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${variant === 'secondary' ? 'bg-ring/70' : 'bg-primary/70'}`}
                      style={{ width: `${percentage}%` }}
                    />
                    <span className="absolute inset-y-0 left-0 text-sm font-medium text-white whitespace-nowrap pl-4 py-1.5">
                      {track.listeners.toLocaleString()} Listeners
                    </span>
                  </>
                ) : (
                  track.duration > 0 && (
                    <>
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${variant === 'secondary' ? 'bg-ring/70' : 'bg-primary/70'}`}
                        style={{ width: `${percentage}%` }}
                      />
                      <span className="absolute inset-y-0 left-0 text-sm font-medium text-white whitespace-nowrap pl-4 py-1.5">
                        {formatDuration(track.duration)}
                      </span>
                    </>
                  )
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
