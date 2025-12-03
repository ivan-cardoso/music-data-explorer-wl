import type { Album } from "@/lib/types/lastfm";
import { stripHtmlTags } from "@/lib/utils/formatter";
import { Card, CardContent } from "../ui/card";

interface AlbumWikiProps {
  album: Album;
}

export function AlbumWiki({ album }: AlbumWikiProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Album Information
      </h2>
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {stripHtmlTags(album?.wiki ?? "")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
