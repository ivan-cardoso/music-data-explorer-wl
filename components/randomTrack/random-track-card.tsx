"use client";

import { useEffect, useState, useTransition } from "react";
import { getRandomPopularTrack } from "@/actions/get-random-track";
import RandomTrackSkeleton from "@/components/skeletons/random-track-skeleton";
import { formatNumber } from "@/lib/utils/formatter";
import Link from "next/link";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import Image from "next/image";

export default function RandomTrackCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomPopularTrack();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <RandomTrackSkeleton />;

  if (!data) return null;

  const { track, album } = data;

  const img =
    album?.image?.[4]?.["#text"] ||
    album?.image?.[3]?.["#text"] ||
    album?.image?.[2]?.["#text"] ||
    "/music-placeholder.webp";

  const refresh = () => {
    startTransition(async () => {
      const updated = await getRandomPopularTrack();
      setData(updated);
    });
  };

  return (
    <section className="mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col space-y-6 lg:justify-center lg:h-full lg:items-center lg:text-center ">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Popular Track Discovery
          </h2>

          <p className="text-muted-foreground max-w-md">
            Explore trending and popular tracks from global charts. Click
            refresh to discover a new surprise every time.
          </p>

          <Button
            onClick={refresh}
            disabled={isPending}
            variant="secondary"
            className="flex items-center gap-2 w-fit "
          >
            <RefreshCw
              className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`}
            />
            {isPending ? "Refreshing..." : "Discover New Track"}
          </Button>
        </div>

        <div
          className={`
            rounded-2xl bg-card border border-border shadow-xl 
            p-10 relative overflow-hidden
          `}
        >
          <div className="w-full flex h-full items-center justify-center">
            <div className="w-64 aspect-square rounded-full border-2 border-accent/80 overflow-hidden mb-6 bg-muted">
              <Image
                height={200}
                width={200}
                src={img}
                alt={track.name}
                className="w-64 h-64 object-cover"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2 text-foreground leading-tight">
            {track.name}
          </h3>

          <div className="sm:flex justify-between gap-x-1 py-1.5 items-center w-full border-t-2 border-muted-foreground/50">
            <div className="flex gap-x-1 items-center">
              <Link
                href={`/artist/${track.artist.name}`}
                className="text-sm text-foreground/80 hover:text-primary transition ease-in-out duration-150"
              >
                {track.artist.name}
              </Link>
              {album?.name && (
                <Link
                  href={`/album/${track.artist.name}/${album.name}`}
                  className="text-sm text-foreground/80 hover:text-primary transition ease-in-out duration-150"
                >
                  - {album.name}
                </Link>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Listeners:{" "}
              <span className="text-foreground font-medium">
                {formatNumber(track.listeners)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
