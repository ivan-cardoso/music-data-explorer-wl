import type {  AlbumInsights } from "@/lib/types/lastfm";
import { formatDuration } from "@/lib/utils/formatter";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AlbumInsightsProps {
  insights: AlbumInsights;
}

export function AlbumInsights({ insights }: AlbumInsightsProps) {
  return (
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
          <CardTitle className="text-foreground">Total Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">
            {formatDuration(insights.totalDuration)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Shortest Track</CardTitle>
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
  );
}
