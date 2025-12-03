import type { Album } from "@/lib/types/lastfm";
import { formatNumber } from "@/lib/utils/formatter";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface AlbumHeaderProps {
  album: Album;
}

export function AlbumHeader({ album }: AlbumHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <img
        src={
          album.image ||
          "/music-placeholder.webp?height=300&width=300&query=album+cover"
        }
        alt={album.name}
        className="w-full md:w-64 h-64 object-cover rounded-lg shadow-lg"
      />

      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
          {album.name}
        </h1>

        <Link
          href={`/artist/${encodeURIComponent(album.artist)}`}
          className="text-foreground font-medium hover:text-primary transition-colors"
        >
          {album.artist}
        </Link>

        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <div className="text-sm text-muted-foreground">Listeners</div>
            <div className="text-2xl font-bold text-primary">
              {formatNumber(album.listeners || 0)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Playcount</div>
            <div className="text-2xl font-bold text-primary">
              {formatNumber(album.playcount)}
            </div>
          </div>
        </div>

        {album.tags && album.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {album.tags.slice(0, 5).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-secondary text-secondary-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
