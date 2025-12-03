export default function LoadingArtistPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-64 bg-muted rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="h-32 bg-muted rounded" />
          </div>
          <div className="h-64 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
