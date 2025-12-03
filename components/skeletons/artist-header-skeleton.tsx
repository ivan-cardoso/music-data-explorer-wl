export default function ArtistHeaderSkeleton() {
  return (
    <div className="animate-pulse flex items-center gap-6">
      <div className="w-40 h-40 bg-muted rounded-lg" />
      <div className="flex-1 space-y-4">
        <div className="h-8 w-64 bg-muted rounded" />
        <div className="h-4 w-40 bg-muted rounded" />
      </div>
    </div>
  );
}
