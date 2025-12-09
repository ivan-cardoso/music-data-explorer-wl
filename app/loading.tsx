import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col items-center text-center py-12 mb-12">
          <Skeleton className="h-10 w-[320px] md:h-16 md:w-[520px] rounded-lg bg-white/20" />
          <div className="w-full max-w-2xl mt-8">
            <Skeleton className="h-14 w-full rounded-xl bg-white/20" />
          </div>
        </div>

        {/* Section Title */}
        <section className="mt-32">
          <div className="text-center">
            <Skeleton className="h-10 w-64 mx-auto rounded-lg bg-white/20" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {/* Trending */}
            <div>
              <Skeleton className="h-8 w-48 mb-6 rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-48 w-full rounded-xl" />
              </div>
            </div>

            <div>
              <Skeleton className="h-8 w-48 mb-6 rounded-lg" />
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
