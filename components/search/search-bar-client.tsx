"use client";

import SearchBar from "./search-bar";
import { useRouter } from "next/navigation";

export default function SearchClient() {
  const router = useRouter();

  return (
    <SearchBar
      onSelect={({ type, item }) => {
        if (type === "artist") {
          router.push(
            `/artist/${encodeURIComponent(item.name)}`
          );
        } else {
          router.push(
            `/album/${encodeURIComponent(item.artist)}/${encodeURIComponent(item.name)}`
          );
        }
      }}
    />
  );
}
