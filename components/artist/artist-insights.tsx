import type { Artist, ArtistInsights } from "@/lib/types/lastfm";
import { formatNumber, stripHtmlTags } from "@/lib/utils/formatter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ArtistInsightsProps {
  insights?: ArtistInsights;
}

export function ArtistInsights({ insights }: ArtistInsightsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Most Popular Song</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold text-foreground truncate">
            {insights?.mostPopularTrack.name || "N/A"}
          </div>
          <div className="text-sm text-muted-foreground">
            {insights ? formatNumber(insights.mostPopularTrack.playcount) : ""}{" "}
            plays
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
