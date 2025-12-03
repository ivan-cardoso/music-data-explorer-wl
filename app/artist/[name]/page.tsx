import {
  getArtistInfo,
  getArtistTopTracks,
  getArtistTopAlbums,
  getSimilarArtists,
} from "@/lib/lastfm/endpoints";

import { transformArtist } from "@/lib/lastfm/transformers/artist";
import { transformTrack } from "@/lib/lastfm/transformers/track";
import { transformAlbum } from "@/lib/lastfm/transformers/album";
import { calculateArtistInsights } from "@/lib/lastfm/insights/artistInsights";

import { ArtistHeader } from "@/components/artist/artist-header";
import { AlbumGrid } from "@/components/artist/album-grid";
import { SimilarArtists } from "@/components/artist/similar-artists";
import TopTracksList from "@/components/album/track-list";
import { ArtistBio } from "@/components/artist/artist-bio";
import { ArtistInsights } from "@/components/artist/artist-insights";

import NotFound from "./not-found";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const artistName = decodeURIComponent(name);

  try {
    const [artistData, topTracksData, topAlbumsData, similarData] =
      await Promise.all([
        getArtistInfo(artistName),
        getArtistTopTracks(artistName, 10),
        getArtistTopAlbums(artistName, 12),
        getSimilarArtists(artistName, 6),
      ]);

    const artist = transformArtist(artistData);
    const topTracks = topTracksData.map(transformTrack);
    const topAlbums = topAlbumsData.map(transformAlbum);
    const similarArtists = similarData.map(transformArtist);

    const insights = calculateArtistInsights(topTracksData);

    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <ArtistHeader artist={artist} image={topAlbums[0].image} />

          {insights && <ArtistInsights insights={insights} />}

          {topTracks && (
            <div className="w-full space-y-2 mt-12 ">
              <h2 className="text-2xl font-bold mb-6 text-foreground col-span-3">
                Popular Tracks This Week
              </h2>
              <section className="w-full grid grid-cols-1 lg:grid-cols-3">
                <div className="col-span-3 lg:col-span-2">
                  <TopTracksList tracks={topTracks} />
                </div>
              </section>
            </div>
          )}

          {topAlbums && <AlbumGrid albums={topAlbums} />}

          {artist.bio && <ArtistBio artist={artist} />}

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Similar Artists
            </h2>
            <SimilarArtists artists={similarArtists} />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    return NotFound();
  }
}
