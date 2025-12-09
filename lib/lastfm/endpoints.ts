import { lastfmFetch } from "./client";
import {
  LastfmArtistSchema,
  ArtistInfoSchema,
  LastfmTrackSchema,
  LastfmAlbumSchema,
} from "@/lib/types/lastfm";
import { z } from "zod";

// Chart endpoints
export async function getTopArtists(limit = 10) {
  const data = await lastfmFetch<any>({
    method: "chart.gettopartists",
    limit,
  });

  const artists = data.artists?.artist || [];
  return z.array(LastfmArtistSchema).parse(artists);
}

export async function getTopTracks(limit = 10) {
  const data = await lastfmFetch<any>({
    method: "chart.gettoptracks",
    limit,
  });

  const tracks = data.tracks?.track || [];
  return z.array(LastfmTrackSchema).parse(tracks);
}

export async function searchArtists(artist: string, limit = 10) {
  const data = await lastfmFetch<any>({
    method: "artist.search",
    artist,
    limit,
  });

  const artists = data.results?.artistmatches?.artist || [];
  const parsed = z.array(LastfmArtistSchema).parse(artists);
  const unique = [];
  const seen = new Set<string>();

  for (const artist of parsed) {
    const key = artist.mbid?.trim() || artist.name.trim().toLowerCase();

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(artist);
    }
  }
  return unique;
}

export async function getArtistInfo(artist: string) {
  const data = await lastfmFetch<any>({
    method: "artist.getinfo",
    artist,
  });

  return ArtistInfoSchema.parse(data.artist);
}

export async function getArtistTopTracks(artist: string, limit = 10) {
  const data = await lastfmFetch<any>({
    method: "artist.gettoptracks",
    artist,
    limit,
  });

  const tracks = data.toptracks?.track || [];
  return tracks;
}

export async function getArtistTopAlbums(artist: string, limit = 10) {
  const data = await lastfmFetch<any>({
    method: "artist.gettopalbums",
    artist,
    limit,
  });

  const albums = data.topalbums?.album || [];
  return albums;
}

export async function getSimilarArtists(artist: string, limit = 6) {
  const data = await lastfmFetch<any>({
    method: "artist.getsimilar",
    artist,
    limit,
  });

  const artists = data.similarartists?.artist || [];
  return artists;
}

// Album endpoints
export async function searchAlbums(album: string, limit = 10) {
  const data = await lastfmFetch<any>({
    method: "album.search",
    album,
    limit,
  });

  const albums = data.results?.albummatches?.album || [];
  return z.array(LastfmAlbumSchema).parse(albums);
}

export async function getAlbumInfo(artist: string, album: string) {
  const data = await lastfmFetch<any>({
    method: "album.getinfo",
    artist,
    album,
  });

  console.log("Album data received:", data.album?.name);
  return data.album;
}


// Track endpoints
export async function getTrackInfo(artist: string, track: string) {
  const data = await lastfmFetch<any>({
    method: "track.getinfo",
    artist,
    track,
  });

  return data.track;
}

export async function getTopTracksGlobal() {
  const data = await lastfmFetch<any>({
    method: "chart.gettoptracks",
    limit: "50",
  });

  return data.tracks.track;
}

export async function getTopTracksByCountry(country: string) {
  const data = await lastfmFetch<any>({
    method: "geo.gettoptracks",
    country,
    limit: "50",
  });

  return data.tracks.track;
}