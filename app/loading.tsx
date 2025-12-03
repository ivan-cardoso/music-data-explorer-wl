export default function Loading() {
  return (
    <div className="h-screen bg-background">
      <div className="animate-pulse flex items-center justify-center gap-6 h-3/4 w-full">
        <div className="flex-1 space-y-4 w-full">
          <div className="h-24 w-64 bg-muted rounded" />
          <div className="h-8 w-40 bg-muted rounded" />
          <div className="h-8 w-40 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
