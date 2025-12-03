"use client";
import type { Album } from "@/lib/types/lastfm";
import Link from "next/link";
import { formatNumber } from "@/lib/utils/formatter";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface AlbumGridProps {
  albums: Album[];
}

export function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Top Albums</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-6">
        {albums.map((album, index) => (
          <Link
            key={index}
            href={`/album/${encodeURIComponent(
              album.artist
            )}/${encodeURIComponent(album.name)}`}
          >
            <Card className="p-0 group overflow-hidden border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="aspect-square overflow-hidden">
                {album.image ? (
                  <Image
                    width={200}
                    height={200}
                    src={album.image}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-[102%] transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/music-placeholder.webp";
                    }}
                  />
                ) : (
                  <Image
                    width={200}
                    height={200}
                    src={"/music-placeholder.webp"}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-[102%] transition-transform duration-300"
                  />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground truncate">
                  {album.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatNumber(album.playcount)} plays
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
