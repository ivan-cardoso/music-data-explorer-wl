import { Navbar } from "@/components/layout/navbar";
import { SearchBar } from "@/components/search/search-bar";
import { getTopArtists, getTopTracks } from "@/lib/lastfm/endpoints";
import { transformArtist } from "@/lib/lastfm/transformers/artist";
import { transformTrack } from "@/lib/lastfm/transformers/track";
import { TrendingArtistsChart } from "@/components/charts/trending-artists-chart";
import { TrendingTracksChart } from "@/components/charts/trending-tracks-chart";
import TopTracksList from "@/components/album/track-list";

export default async function Home() {
  let topArtists = [];
  let topTracks = [];
  let error = null;

  try {
    const [artistsData, tracksData] = await Promise.all([
      getTopArtists(10),
      getTopTracks(10),
    ]);

    topArtists = artistsData.map(transformArtist);
    topTracks = tracksData.map(transformTrack);
    {tracksData && console.log(tracksData)}
  } catch (err) {
    console.error("Failed to fetch data:", err);
    error = err instanceof Error ? err.message : "Failed to load data";
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center py-12 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent leading-tight text-balance">
            Uncover insights about artists, albums and songs.
          </h1>

          <div className="w-full max-w-2xl mt-8">
            <SearchBar />
          </div>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Error: {error}</p>
            <p className="text-muted-foreground mt-2">
              Please check your Last.fm API configuration
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Trending Artists
              </h2>
              <TrendingArtistsChart artists={topArtists} />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Trending Tracks
              </h2>
              {/* <TrendingTracksChart tracks={topTracks} /> */}
              <section className="w-full grid grid-cols-1 lg:grid-cols-3">
                <div className="col-span-3">
                  <TopTracksList tracks={topTracks} showArtistName />
                </div>
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
