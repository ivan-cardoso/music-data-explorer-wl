export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Artist Not Found
          </h1>
          <p className="text-muted-foreground">
            We're sorry, but we couldn't find the artist you're looking for.
          </p>
        </div>
      </main>
    </div>
  );
}
