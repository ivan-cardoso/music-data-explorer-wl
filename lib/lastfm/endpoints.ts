import { lastfmFetch } from "./client";
import {
  LastfmArtistSchema,
  ArtistInfoSchema,
  LastfmTrackSchema,
  AlbumInfoSchema,
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

// Artist endpoints
export async function searchArtists(artist: string, limit = 10) {
  const data = await lastfmFetch<any>({
    method: "artist.search",
    artist,
    limit,
  });

  const artists = data.results?.artistmatches?.artist || [];
  return z.array(LastfmArtistSchema).parse(artists);
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
export async function getAlbumInfo(artist: string, album: string) {
  console.log("Fetching album info for:", { artist, album });

  const data = await lastfmFetch<any>({
    method: "album.getinfo",
    artist,
    album,
  });

  console.log("Album data received:", data.album?.name);
  return AlbumInfoSchema.parse(data.album);
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
