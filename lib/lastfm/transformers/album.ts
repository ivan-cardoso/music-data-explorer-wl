import type { Album } from "@/lib/types/lastfm"
import type { z } from "zod"
import type { AlbumInfoSchema } from "@/lib/types/lastfm"
import { transformTrack } from "./track"

export function transformAlbum(data: z.infer<typeof AlbumInfoSchema>): Album {
  const getImage = (images?: Array<{ "#text": string; size: string }>) => {
    if (!images || images.length === 0) return undefined
    const largeImage = images.find((img) => img.size === "extralarge")
    return largeImage?.["#text"] || images[images.length - 1]?.["#text"]
  }

  const artistName = typeof data.artist === "string" ? data.artist : data.artist.name

  const album: Album = {
    name: data.name,
    artist: artistName,
    playcount: Number.parseInt(data.playcount || "0"),
    listeners: Number.parseInt(data.listeners || "0"),
    url: data.url,
    image: getImage(data.image),
  }

  if (data.wiki) {
    album.wiki = data.wiki.summary
    album.releaseDate = data.wiki.published
  }

  if (data.tags?.tag) {
    album.tags = data.tags.tag.map((t) => t.name)
  }

  if (data.tracks?.track) {
    if (Array.isArray(data.tracks.track)) {
      album.tracks = data.tracks.track.map(transformTrack)
    } else {
      album.tracks = [transformTrack(data.tracks.track)]
    }
  } else {
    album.tracks = []
  }
  return album
}
