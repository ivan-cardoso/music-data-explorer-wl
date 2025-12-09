import { Skeleton } from "@/components/ui/skeleton";

export default function RandomTrackSkeleton() {
  return (
    <Skeleton className="bg-card border-border">
      <Skeleton className="w-full h-64 bg-muted rounded-xl mb-4" />
      <Skeleton className="h-6 bg-muted rounded w-1/2 mb-2" />
      <Skeleton className="h-4 bg-muted rounded w-1/4 mb-4" />
      <Skeleton className="h-4 bg-muted rounded w-1/3 mb-2" />
    </Skeleton>
  );
}
