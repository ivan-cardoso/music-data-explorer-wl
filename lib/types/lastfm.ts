import { z } from "zod"

// Artist schemas
export const LastfmArtistSchema = z.object({
  name: z.string(),
  playcount: z.string().optional(),
  listeners: z.string().optional(),
  mbid: z.string().optional(),
  url: z.string().optional(),
  streamable: z.string().optional(),
  image: z
    .array(
      z.object({
        "#text": z.string(),
        size: z.string(),
      }),
    )
    .optional(),
})

export const ArtistInfoSchema = LastfmArtistSchema.extend({
  bio: z
    .object({
      links: z
        .object({
          link: z
            .object({
              "#text": z.string(),
              rel: z.string(),
              href: z.string(),
            })
            .optional(),
        })
        .optional(),
      published: z.string().optional(),
      summary: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
  stats: z
    .object({
      listeners: z.string(),
      playcount: z.string(),
    })
    .optional(),
  similar: z
    .object({
      artist: z.array(LastfmArtistSchema).optional(),
    })
    .optional(),
  tags: z
    .object({
      tag: z
        .array(
          z.object({
            name: z.string(),
            url: z.string(),
          }),
        )
        .optional(),
    })
    .optional(),
})

// Track schemas
export const LastfmTrackSchema = z.object({
  name: z.string(),
  duration: z.string().optional(),
  playcount: z.string().optional(),
  listeners: z.string().optional(),
  mbid: z.string().optional(),
  url: z.string().optional(),
  streamable: z
    .object({
      "#text": z.string(),
      fulltrack: z.string(),
    })
    .optional(),
  artist: z
    .union([
      z.string(),
      z.object({
        name: z.string(),
        mbid: z.string().optional(),
        url: z.string().optional(),
      }),
    ])
    .optional(),
  image: z
    .array(
      z.object({
        "#text": z.string(),
        size: z.string(),
      }),
    )
    .optional(),
  "@attr": z
    .object({
      rank: z.string().optional(),
    })
    .optional(),
})

// Album schemas
export const LastfmAlbumSchema = z.object({
  name: z.string(),
  artist: z.union([
    z.string(),
    z.object({
      name: z.string(),
      mbid: z.string().optional(),
      url: z.string().optional(),
    }),
  ]),
  mbid: z.string().optional(),
  url: z.string().optional(),
  image: z
    .array(
      z.object({
        "#text": z.string(),
        size: z.string(),
      }),
    )
    .optional(),
  playcount: z.string().optional(),
  listeners: z.string().optional(),
  "@attr": z
    .object({
      rank: z.string().optional(),
    })
    .optional(),
})

export const AlbumInfoSchema = LastfmAlbumSchema.extend({
  wiki: z
    .object({
      published: z.string().optional(),
      summary: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
  tags: z
    .object({
      tag: z
        .array(
          z.object({
            name: z.string(),
            url: z.string(),
          }),
        )
        .optional(),
    })
    .optional(),
  tracks: z
    .object({
      track: z.array(LastfmTrackSchema),
    })
    .optional(),
})

// Domain types
export interface Artist {
  name: string
  playcount: number
  listeners: number
  mbid?: string
  url?: string
  image?: string
  bio?: string
  tags?: string[]
  similar?: Artist[]
}

export interface Track {
  name: string
  duration: number
  playcount: number
  listeners?: number
  url?: string
  artist?: string
  rank?: number
}

export interface Album {
  name: string
  artist: string
  playcount: number
  listeners?: number
  url?: string
  image?: string
  releaseDate?: string
  wiki?: string
  tags?: string[]
  tracks?: Track[]
}

export interface ArtistInsights {
  averageDuration: number
  longestTrack: Track
  shortestTrack: Track
  totalTracks: number
  mostPopularTrack: Track
  leastPopularTrack: Track
}

export interface AlbumInsights {
  averageDuration: number
  longestTrack: Track
  shortestTrack: Track
  totalTracks: number
  totalDuration: number
}
