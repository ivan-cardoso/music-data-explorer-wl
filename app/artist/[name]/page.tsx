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
        getArtistTopAlbums(artistName, 8),
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
        {/* {console.log("TOP TRACKS DATA:", topTracksData)} */}
        <main className="container mx-auto px-4 py-8">
          <ArtistHeader artist={artist} />

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
              <TopTracksList tracks={topTracks} />
            </div>
          )}

          {/* {topTracks && (
            <section className="mt-12 w-full">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Popular Tracks
              </h2>

              <ul className="w-full flex flex-col divide-y divide-muted/40">
                {topTracks.map((track: Track) => {
                  const percentage = (track.listeners / maxPlaycount) * 100;

                  return (
                    <li
                      key={track.name}
                      className="
                        grid 
                        grid-cols-[32px_48px_1fr_auto] 
                        sm:grid-cols-[40px_56px_1fr_auto] 
                        items-center 
                        gap-4 
                        py-3 
                        hover:bg-muted/20 
                        transition-colors 
                        rounded-lg
                        px-2
                      "
                    >
                      
                      <span className="text-sm font-medium text-foreground/70 w-6 text-center">
                        {track.rank}
                      </span>

                      
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-muted shrink-0">
                        {track.image?.[1]?.["#text"] ? (
                          <img
                            src={track.image[1]["#text"]}
                            alt={track.name}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>

                     
                      <div className="flex flex-col w-full">
                        <span className="text-foreground font-medium truncate">
                          {track.name}
                        </span>

                        <div className="relative mt-1 h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                     
                      <span className="text-sm font-medium text-foreground/80 whitespace-nowrap pl-2">
                        {track.listeners.toLocaleString()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )} */}

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
                <CardContent className="pt-6">
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
