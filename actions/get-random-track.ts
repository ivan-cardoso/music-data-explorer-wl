"use server";

import {
  getTopTracksByCountry,
  getTopTracksGlobal,
  getTrackInfo,
  getAlbumInfo,
} from "@/lib/lastfm/endpoints";
import { randomItem } from "@/lib/utils/random";

export async function getRandomPopularTrack() {
  const [arg, uk, global] = await Promise.all([
    getTopTracksByCountry("Argentina"),
    getTopTracksByCountry("Spain"),
    getTopTracksGlobal(),
  ]);

  const combined = [...arg, ...uk, ...global].filter(
    (t) => Number(t.listeners) > 1500 && t.artist?.name && t.name
  );

  if (combined.length === 0) return null;

  const randomTrack = randomItem(combined);

  const info = await getTrackInfo(randomTrack.artist.name, randomTrack.name);

  const albumTitle = info.album?.title;
  const albumInfo = albumTitle
    ? await getAlbumInfo(randomTrack.artist.name, albumTitle)
    : null;

  return {
    track: info,
    album: albumInfo,
  };
}
