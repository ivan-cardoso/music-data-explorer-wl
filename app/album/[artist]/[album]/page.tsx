import { getAlbumInfo } from "@/lib/lastfm/endpoints";
import { transformAlbum } from "@/lib/lastfm/transformers/album";

import {
  calculateAlbumInsights,
  calculateAlbumOutliers,
} from "@/lib/lastfm/insights/albumInsights";

import { TrackDurationLineChart } from "@/components/charts/album-duration-chart";
import { AlbumHeader } from "@/components/album/album-header";
import { AlbumInsights } from "@/components/album/album-insights";
import { AlbumTrackListSection } from "@/components/album/album-tracklist-section";
import { AlbumOutliers } from "@/components/album/album-outliers";
import { AlbumWiki } from "@/components/album/album-wiki";

import { Card, CardContent } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

import NotFound from "./not-found";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ artist: string; album: string }>;
}) {
  const { artist, album } = await params;

  const artistName = decodeURIComponent(artist);
  const albumName = decodeURIComponent(album);
  try {
    const albumData = await getAlbumInfo(artistName, albumName);
    const albumFormatted = transformAlbum(albumData);

    const insights = albumFormatted.tracks
      ? calculateAlbumInsights(albumFormatted.tracks)
      : null;

    const albumOutliers =
      albumFormatted?.tracks && albumFormatted.tracks[0]
        ? calculateAlbumOutliers(albumData)
        : null;

    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <AlbumHeader album={albumFormatted} />

          {insights && <AlbumInsights insights={insights} />}

          {insights &&
            albumFormatted.tracks &&
            albumFormatted.tracks.length > 0 && (
              <>
                <AlbumTrackListSection
                  album={albumFormatted}
                  insights={insights}
                />

                <TrackDurationLineChart tracks={albumFormatted.tracks} />
              </>
            )}

          {albumOutliers && albumOutliers.insights.length ? (
            <>
              <AlbumOutliers outliers={albumOutliers as any} />
            </>
          ) : (
            <div>
              <div className="mt-12">
                <Card className="bg-card border-border lg:h-fit w-fit ">
                  <CardContent className="py-w-fit flex gap-3 items-center">
                    <InfoIcon className="w-7 h-7" />
                    <p className="text-lg font-medium text-foreground">
                      The content of this album does not provide sufficient data
                      to generate insights.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {albumFormatted.wiki && <AlbumWiki album={albumFormatted} />}
        </main>
      </div>
    );
  } catch (error) {
    return NotFound();
  }
}
