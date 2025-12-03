import { Navbar } from "@/components/layout/navbar";
import {
  getArtistInfo,
  getArtistTopTracks,
  getArtistTopAlbums,
  getSimilarArtists,
} from "@/lib/lastfm/endpoints";
import { transformArtist } from "@/lib/lastfm/transformers/artist";
import { transformTrack } from "@/lib/lastfm/transformers/track";
import { transformAlbum } from "@/lib/lastfm/transformers/album";
import { calculateArtistInsights } from "@/lib/lastfm/insights/artistInsights";
import {
  formatNumber,
  formatDuration,
  stripHtmlTags,
} from "@/lib/utils/formatter";
import { ArtistHeader } from "@/components/artist/artist-header";
import { TrackDurationChart } from "@/components/charts/track-duration-chart";
import { TrackPopularityChart } from "@/components/charts/track-popularity-chart";
import { AlbumGrid } from "@/components/artist/album-grid";
import { SimilarArtists } from "@/components/artist/similar-artists";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Track } from "@/lib/types/lastfm";
import TopTracksList from "@/components/album/track-list";
import { AlbumTrackList } from "@/components/album/album-track-list";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const artistName = decodeURIComponent(name);

  try {
    const [artistData, topTracksData, topAlbumsData, similarData] =
      await Promise.all([
        getArtistInfo(artistName),
        getArtistTopTracks(artistName, 10),
        getArtistTopAlbums(artistName, 12),
        getSimilarArtists(artistName, 6),
      ]);

    const artist = transformArtist(artistData);
    const topTracks = topTracksData.map(transformTrack);
    const topAlbums = topAlbumsData.map(transformAlbum);
    const similarArtists = similarData.map(transformArtist);

    const insights = calculateArtistInsights(topTracksData);

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        {/* {console.log("SIMILAR ARTISTS DATA:", similarData)} */}
        <main className="container mx-auto px-4 py-8">
          <ArtistHeader artist={artist} image={topAlbums[0].image} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Most Popular Song
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-foreground truncate">
                  {insights?.mostPopularTrack.name || "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {insights
                    ? formatNumber(insights.mostPopularTrack.playcount)
                    : ""}{" "}
                  plays
                </div>
              </CardContent>
              
            </Card>
          </div>

          {insights && insights.averageDuration > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Track Durations
                </h2>
                <TrackDurationChart tracks={topTracks} />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Track Popularity
                </h2>
                <TrackPopularityChart tracks={topTracks} />
              </div>
            </div>
          )}

          {topTracks && (
            <div className="w-full space-y-2 mt-12 ">
              <h2 className="text-2xl font-bold mb-6 text-foreground col-span-3">
                Popular Tracks This Week
              </h2>
              <section className="w-full grid grid-cols-1 lg:grid-cols-3">
                <div className="col-span-3 lg:col-span-2">
                  <TopTracksList tracks={topTracks} />
                </div>
              </section>
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Top Albums
            </h2>
            <AlbumGrid albums={topAlbums} />
          </div>

          {artist.bio && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Biography
              </h2>
              <Card className="bg-card border-border">
                <CardContent className="py-4">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {stripHtmlTags(artist.bio)}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Similar Artists
            </h2>
            <SimilarArtists artists={similarArtists} />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Artist page error:", error);
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-destructive mb-4">
              Artist Not Found
            </h1>
            <p className="text-muted-foreground">
              Could not find information for "{artistName}"
            </p>
          </div>
        </main>
      </div>
    );
  }
}
