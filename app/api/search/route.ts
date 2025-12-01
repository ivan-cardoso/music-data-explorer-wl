import { type NextRequest, NextResponse } from "next/server"
import { searchArtists } from "@/lib/lastfm/endpoints"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ artists: [] })
  }

  try {
    const artists = await searchArtists(query, 8)
    return NextResponse.json({ artists })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: "Failed to search artists" }, { status: 500 })
  }
}
