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
import { formatNumber, formatDuration } from "@/lib/utils/formatter";
import { ArtistHeader } from "@/components/artist/artist-header";
import { TrackDurationChart } from "@/components/charts/track-duration-chart";
import { TrackPopularityChart } from "@/components/charts/track-popularity-chart";
import { AlbumGrid } from "@/components/artist/album-grid";
import { SimilarArtists } from "@/components/artist/similar-artists";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ArtistPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;
  // const name = name

  // try {


    const [artistData, topTracksData, topAlbumsData, similarData] =
      await Promise.all([
        getArtistInfo(name),
        getArtistTopTracks(name, 10),
        getArtistTopAlbums(name, 8),
        getSimilarArtists(name, 6),
      ]);
    // const artistData = await getArtistInfo(name);
    const artist = transformArtist(artistData);
    
    
    // const topTracksData = await getArtistTopTracks(name, 10);
    const topTracks = topTracksData.map(transformTrack);
    const insights = calculateArtistInsights(topTracks);

    // const topAlbumsData = await getArtistTopAlbums(name, 8);
    const topAlbums = topAlbumsData.map(transformAlbum);
    
    // const similarData = await getSimilarArtists(name, 6);
    const similarArtists = similarData.map(transformArtist);


    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        {/* {console.log("1- ARTIST PAGE RENDERING WITH ARTIST:", artistData)}
        {console.log("2- TOP TRACKS DATA:", topTracksData)}
        {console.log("3- TOP TRACK DATA FORMATED:", topTracks)} */}
        <main className="container mx-auto px-4 py-8">
          <ArtistHeader artist={artist} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Total Tracks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {insights?.totalTracks || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Avg Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {insights
                    ? formatDuration(Math.round(insights.averageDuration))
                    : "N/A"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Most Popular</CardTitle>
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

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Top Albums
            </h2>
            <AlbumGrid albums={topAlbums} />
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Similar Artists
            </h2>
            <SimilarArtists artists={similarArtists} />
          </div>
        </main>
      </div>
    );
  /* } catch (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-destructive mb-4">
              Artist Not Found
            </h1>
            <p className="text-muted-foreground">
              Could not find information for "{name}"
            </p>
          </div>
        </main>
      </div>
    );
  } */
}
