import { Navbar } from "@/components/layout/navbar";
import { getAlbumInfo } from "@/lib/lastfm/endpoints";
import { transformAlbum } from "@/lib/lastfm/transformers/album";
import {
  calculateAlbumInsights,
  calculateAlbumOutliers,
} from "@/lib/lastfm/insights/albumInsights";
import {
  stripHtmlTags,
  formatNumber,
  formatDuration,
} from "@/lib/utils/formatter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackDurationLineChart } from "@/components/charts/album-duration-chart";
import TopTracksList from "@/components/album/track-list";
import Link from "next/link";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ artist: string; album: string }>;
}) {
  const { artist, album } = await params;

  const artistName = decodeURIComponent(artist);
  const albumName = decodeURIComponent(album);

  const albumData = await getAlbumInfo(artistName, albumName);
  
  const albumFormat = transformAlbum(albumData);
  const insights = albumFormat.tracks
    ? calculateAlbumInsights(albumFormat.tracks)
    : null;

  const albumOutliers = calculateAlbumOutliers(albumData);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={
              albumFormat.image ||
              "/placeholder.svg?height=300&width=300&query=album+cover"
            }
            alt={albumFormat.name}
            className="w-full md:w-64 h-64 object-cover rounded-lg shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
              {albumFormat.name}
            </h1>

            <Link
              href={`/artist/${encodeURIComponent(albumFormat.artist)}`}
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              {albumFormat.artist}
            </Link>

            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <div className="text-sm text-muted-foreground">Listeners</div>
                <div className="text-2xl font-bold text-primary">
                  {formatNumber(albumFormat.listeners || 0)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Playcount</div>
                <div className="text-2xl font-bold text-primary">
                  {formatNumber(albumFormat.playcount)}
                </div>
              </div>
            </div>

            {albumFormat.tags && albumFormat.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {albumFormat.tags.slice(0, 5).map((tag, index) => (
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

        {insights && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Total Tracks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {insights.totalTracks}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Total Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {formatDuration(insights.totalDuration)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Shortest Track
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-foreground truncate">
                  {insights.shortestTrack.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDuration(insights.shortestTrack.duration)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Longest Track</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-foreground truncate">
                  {insights.longestTrack.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDuration(insights.longestTrack.duration)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {insights && albumFormat.tracks && albumFormat.tracks.length > 0 && (
          <>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Tracklist
              </h2>
              <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
                <div className="col-span-3 lg:col-span-2">
                  <TopTracksList
                    tracks={albumFormat.tracks}
                    image={albumFormat.image}
                  />
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

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Track Duration Distribution
              </h2>
              <TrackDurationLineChart tracks={albumFormat.tracks} />
            </div>
          </>
        )}

        {albumOutliers && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {albumOutliers.insights.map((insight, i) => {
                const Icon = albumOutliers.insightsIcons[i] || null;

                return (
                  <Card
                    key={i}
                    className="
              bg-card border-border shadow-sm 
              hover:shadow-lg transition-all 
              duration-300 rounded-xl overflow-hidden
            "
                  >
                    <CardContent className="px-3">
                      <div className="flex items-start gap-4">
                        {Icon && (
                          <div className="text-primary flex-shrink-0 mt-1">
                            <Icon size={26} strokeWidth={2} />
                          </div>
                        )}

                        <p className="text-base leading-snug text-foreground font-medium">
                          
                          {insight}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {albumFormat.wiki && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Album Information
            </h2>
            <Card className="bg-card border-border">
              <CardContent className="py-4">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {stripHtmlTags(albumFormat.wiki)}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
