import type { Artist } from "@/lib/types/lastfm"
import type { z } from "zod"
import type { ArtistInfoSchema, LastfmArtistSchema } from "@/lib/types/lastfm"

export function transformArtist(data: z.infer<typeof LastfmArtistSchema | typeof ArtistInfoSchema>): Artist {
  const getImage = (images?: Array<{ "#text": string; size: string }>) => {
    if (!images || images.length === 0) return undefined
    const largeImage = images.find((img) => img.size === "extralarge" || img.size === "large")
    return largeImage?.["#text"] || images[images.length - 1]?.["#text"]
  }

  const artist: Artist = {
    name: data.name,
    playcount: Number.parseInt(data.playcount || "0"),
    listeners: Number.parseInt(data.listeners || "0"),
    mbid: data.mbid,
    url: data.url,
    image: getImage(data.image),
  }

  // Add additional fields if available
  if ("bio" in data && data.bio) {
    artist.bio = data.bio.summary
  }

  if ("tags" in data && data.tags?.tag) {
    artist.tags = data.tags.tag.map((t) => t.name)
  }

  if ("similar" in data && data.similar?.artist) {
    artist.similar = data.similar.artist.map(transformArtist)
  }

  if ("stats" in data && data.stats) {
    artist.playcount = Number.parseInt(data.stats.playcount)
    artist.listeners = Number.parseInt(data.stats.listeners)
  }

  return artist
}
