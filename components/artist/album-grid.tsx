import type { Album } from "@/lib/types/lastfm"
import Link from "next/link"
import { formatNumber } from "@/lib/utils/formatter"
import { Card, CardContent } from "@/components/ui/card"

interface AlbumGridProps {
  albums: Album[]
}

export function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {albums.map((album, index) => (
        <Link key={index} href={`/album/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.name)}`}>
          <Card className="p-0 group overflow-hidden border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="aspect-square overflow-hidden">
              <img
                src={album.image || "/placeholder.svg?height=300&width=300&query=album+cover"}
                alt={album.name}
                className="w-full h-full object-cover group-hover:scale-[102%] transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground truncate">{album.name}</h3>
              <p className="text-sm text-muted-foreground">{formatNumber(album.playcount)} plays</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
