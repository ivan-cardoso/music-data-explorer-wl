import { Track } from "@/lib/types/lastfm";

interface AlbumTrackListProps {
  tracks: Track[];
}

export default function TopTracksList({ tracks }: AlbumTrackListProps) {
  const maxPlaycount = Math.max(...tracks.map((a) => a.listeners));
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-3">
      <ul className="w-full flex flex-col divide-y divide-muted/40 col-span-3">
        {tracks.map((track: Track) => {
          const percentage = (track.listeners / maxPlaycount) * 100;

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
                  {track.rank}
                </span>
                <span className="text-foreground font-medium truncate">
                  {track.name}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <div className="relative mt-1 h-8 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary/70 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                  <span className="absolute inset-y-0 left-0 text-sm font-medium text-white whitespace-nowrap pl-4 py-1.5">
                    {track.listeners.toLocaleString()} Listeners
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
