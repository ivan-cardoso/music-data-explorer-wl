import SearchBar from "@/components/search/search-bar";
export default function NotFound() {
  return (
    <>
      <main className="min-h-lvh flex justify-center px-4 py-20">
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Ups!
          </h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn’t exist. Try it again. 
          </p>
        </div>
      </main>
    </>
  );
}
