import { type NextRequest, NextResponse } from "next/server";
import { searchArtists, searchAlbums } from "@/lib/lastfm/endpoints";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") ?? "";
  const type = (searchParams.get("type") ?? "artist").toLowerCase();

  if (!q.trim()) {
    return NextResponse.json({ results: [] });
  }

  try {
    if (type === "album") {
      const albums = await searchAlbums(q, 12);
      return NextResponse.json({ results: albums, type: "album" });
    } else {
      const artists = await searchArtists(q, 12);
      return NextResponse.json({ results: artists, type: "artist" });
    }
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search", details: String(error) },
      { status: 500 }
    );
  }
}
