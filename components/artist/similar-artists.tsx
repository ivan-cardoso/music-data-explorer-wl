import type { Artist } from "@/lib/types/lastfm";
import Link from "next/link";
import { formatNumber } from "@/lib/utils/formatter";
import Image from "next/image";

interface SimilarArtistsProps {
  artists: Artist[];
}

export function SimilarArtists({ artists }: SimilarArtistsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {artists.map((artist, index) => (
        <Link
          key={index}
          href={`/artist/${encodeURIComponent(artist.name)}`}
          className="group flex flex-col items-center text-center"
        >
          <div className="w-full relative aspect-square rounded-full overflow-hidden mb-3 ring-4 ring-border group-hover:ring-primary transition-all">
            <Image
              height={200}
              width={200}
              src={`/backgrounds/${index}.png?height=200&width=200&query=artist'`}
              alt={artist.name}
              className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 opacity-50"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-primary/40 flex items-center justify-center">
              <h3 className="font-medium text-foreground max-w-[80%]  md:text-xl transition-colors">
                {artist.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
