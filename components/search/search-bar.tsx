"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { debounce } from "@/lib/utils/debounce";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { formatNumber } from "@/lib/utils/formatter";

type SearchType = "artist" | "album";

type ArtistResult = {
  name: string;
  mbid?: string;
  url?: string;
  listeners?: number;
  image?: { "#text": string }[];
};

type AlbumResult = {
  name: string;
  artist: string;
  mbid?: string;
  url?: string;
  image?: { "#text": string }[];
};

interface SearchBarProps {
  placeholder?: string;
  onSelect?: (payload: {
    type: SearchType;
    item: ArtistResult | AlbumResult;
  }) => void;
}

export default function SearchBar({
  placeholder = "Search artists or albums...",
  onSelect,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<SearchType>("album");
  const [results, setResults] = useState<(ArtistResult | AlbumResult)[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const doSearch = useCallback(
    debounce(async (q: string, currentType: SearchType) => {
      if (!q || q.trim().length === 0) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&type=${currentType}`
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Search failed");

        setResults(json.results || []);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350),
    []
  );

  useEffect(() => {
    setActiveIndex(-1);
    if (!query) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setOpen(true);
    doSearch(query, type);
  }, [query, type, doSearch]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < results.length) {
        handleSelect(results[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function handleSelect(item: ArtistResult | AlbumResult) {
    setOpen(false);
    setQuery("");
    setResults([]);

    if (onSelect) {
      onSelect({ type, item });
    } else {
      if (type === "artist") {
        router.push(
          `/artist/${encodeURIComponent((item as ArtistResult).name)}`
        );
      } else {
        const album = item as AlbumResult;
        router.push(
          `/album/${encodeURIComponent(album.artist)}/${encodeURIComponent(
            album.name
          )}`
        );
      }
    }
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center rounded-md bg-card">
        <div className="flex gap-2 items-center  border-r border-border pl-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <select
            aria-label="Search type"
            value={type}
            onChange={(e) => setType(e.target.value as SearchType)}
            className=" text-foreground px-3 py-2 bg-card"
          >
            <option value="album">Album</option>
            <option value="artist">Artist</option>
          </select>
        </div>

        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-autocomplete="list"
            aria-expanded={open}
            className="w-full text-foreground px-4 py-2"
          />

          {open && (results.length > 0 || loading) && (
            <ul
              role="listbox"
              aria-label="Search suggestions"
              className="absolute z-50 mt-2 w-full bg-popover border border-border rounded-md shadow-lg overflow-y-auto max-h-72 scrollbar-thin"
            >
              {loading && (
                <li className="px-4 py-3 text-muted-foreground">
                  Searching...
                </li>
              )}

              {!loading && results.length === 0 && (
                <li className="px-4 py-3 text-muted-foreground">No results</li>
              )}

              {!loading &&
                results.map((r, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li
                      key={`${(r as any).name}-${i}`}
                      role="option"
                      aria-selected={isActive}
                      className={clsx(
                        "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30",
                        isActive && "bg-muted/40"
                      )}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelect(r as any);
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <div className="w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                        {r.image && (r as any).image[0]?.["#text"] ? (
                          <img
                            width={25}
                            height={25}
                            src={(r as any).image[0]["#text"]}
                            alt={(r as any).name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"; // fallback
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                            No
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="text-foreground truncate text-start">
                            {type === "album" ? (
                              <>
                                <div className="font-medium truncate">
                                  {(r as AlbumResult).name}
                                </div>
                                <div className="text-sm text-muted-foreground truncate">
                                  {(r as AlbumResult).artist}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="font-medium truncate text-start">
                                  {(r as ArtistResult).name}
                                </div>

                                {(r as ArtistResult).listeners && (
                                  <div className="text-sm text-muted-foreground truncate text-start">
                                    {formatNumber(
                                      (r as ArtistResult).listeners!
                                    )}{" "}
                                    listeners
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
