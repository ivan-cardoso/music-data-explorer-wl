const LASTFM_API_BASE = process.env.LASTFM_API_BASE || "https://ws.audioscrobbler.com/2.0"
const LASTFM_API_KEY = process.env.LASTFM_API_KEY

export class LastfmError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message)
    this.name = "LastfmError"
  }
}

interface LastfmParams {
  method: string
  [key: string]: string | number
}

export async function lastfmFetch<T>(params: LastfmParams): Promise<T> {
  if (!LASTFM_API_KEY) {
    throw new LastfmError("LASTFM_API_KEY is not configured")
  }

  const url = new URL(LASTFM_API_BASE)
  url.searchParams.append("api_key", LASTFM_API_KEY)
  url.searchParams.append("format", "json")

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new LastfmError(`Last.fm API request failed: ${response.statusText}`, response.status)
    }

    const data = await response.json()

    if (data.error) {
      throw new LastfmError(data.message || "Unknown Last.fm API error")
    }

    return data
  } catch (error) {
    if (error instanceof LastfmError) {
      throw error
    }
    throw new LastfmError(error instanceof Error ? error.message : "Failed to fetch from Last.fm")
  }
}
