
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Album Not Found</h1>
          <p className="text-muted-foreground">
            The artist you're looking for doesn’t exist.
          </p>
        </div>
      </main>
    </div>
  );
}
