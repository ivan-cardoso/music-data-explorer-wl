import type { Album, AlbumInsights } from "@/lib/types/lastfm";
import {
  formatDuration,
} from "@/lib/utils/formatter";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TopTracksList from "./track-list";

interface AlbumTrackListSectionProps {
  album: Album;
  insights: AlbumInsights;
}

export function AlbumTrackListSection({
  album,
  insights,
}: AlbumTrackListSectionProps) {
  return (
    <>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Tracklist</h2>
        <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          <div className="col-span-3 lg:col-span-2">
            <TopTracksList tracks={album.tracks ?? []} image={album.image} />
          </div>
          <Card className="bg-card border-border col-span-3 lg:col-span-1 lg:h-fit lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="text-foreground">
                Average Track Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {formatDuration(insights.averageDuration)}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
