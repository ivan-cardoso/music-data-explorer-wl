import type { AlbumInfo } from "@/lib/types/lastfm";
import { Card, CardContent} from "../ui/card";

interface AlbumOutliersProps {
  outliers: AlbumInfo & {
    insights: string[];
    insightsIcons: (React.ComponentType<{ size?: number; strokeWidth?: number }> | null)[];
  };
}

export function AlbumOutliers({
  outliers,
}: AlbumOutliersProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {outliers.insights.map((insight, i) => {
          const Icon = outliers.insightsIcons[i] || null;

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
  );
}
