import type { Track } from "@/lib/types/lastfm"
import type { z } from "zod"
import type { LastfmTrackSchema } from "@/lib/types/lastfm"

export function transformTrack(data: z.infer<typeof LastfmTrackSchema>): Track {
  return {
    name: data.name,
    duration: Number.parseInt(data.duration || "0"),
    playcount: Number.parseInt(data.playcount || "0"),
    listeners: data.listeners ? Number.parseInt(data.listeners) : undefined,
    url: data.url,
    rank: data["@attr"]?.rank ? Number.parseInt(data["@attr"].rank) : undefined,
  }
}
