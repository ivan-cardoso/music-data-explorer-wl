import { Track } from "@/lib/types/lastfm";
import { formatDuration } from "@/lib/utils/formatter";
import Image from "next/image";


export default function TopTracksList({
  tracks,
  image,
}: {
  tracks: Track[];
  image?: string;
}) {

  const maxPlaycount =
    tracks[0].listeners && Math.max(...tracks.map((a) => a.listeners!));
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-3">
      <ul className="w-full flex flex-col divide-y divide-muted/40 col-span-2">
        {tracks.map((track: Track, i: number) => {
          const percentage = (track.listeners! / maxPlaycount!) * 100;
          return (
            <li
              key={track.name}
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
                      "
            >
              <div className="flex gap-3 items-center">
                <span className="text-lg font-medium text-foreground/70 w-10 text-center">
                  {i + 1}
                </span>
                {image && (
                  <Image
                    height={100}
                    width={100}
                    src={image}
                    alt={`${track.name} - image`}
                    className="w-12 h-12"
                  />
                )}
                <span className="text-foreground font-medium truncate">
                  {track.name}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <div className="relative mt-1 h-8 bg-muted rounded-full overflow-hidden">
                  {track.listeners && (
                    <>
                      <div
                        className="absolute inset-y-0 left-0 bg-primary/70 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                      <span className="absolute inset-y-0 left-0 text-sm font-medium text-white whitespace-nowrap pl-4 py-1.5">
                        {track.listeners.toLocaleString()} Listeners
                      </span>
                    </>
                  )}
                  {track.duration > 0 && (
                    <>
                      <div
                        className="absolute inset-y-0 left-0 bg-primary/70 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                      <span className="absolute inset-y-0 left-0 text-sm font-medium text-white whitespace-nowrap pl-4 py-1.5">
                        {formatDuration(track.duration)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
