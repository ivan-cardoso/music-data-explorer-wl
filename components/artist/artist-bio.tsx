import type { Artist } from "@/lib/types/lastfm";
import { formatNumber, stripHtmlTags } from "@/lib/utils/formatter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "../ui/card";

interface ArtistBioProps {
  artist?: Artist;
}

export function ArtistBio({ artist }: ArtistBioProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Biography</h2>
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {stripHtmlTags(artist?.bio ?? "")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
