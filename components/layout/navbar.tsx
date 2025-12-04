"use client";
import Link from "next/link";
import SearchClient from "../search/search-bar-client";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 flex items-center justify-between  px-4">
      <div className="flex h-16 items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <div className="flex gap-0.5">
              <div className="h-4 w-1 rounded-full bg-primary-foreground" />
              <div className="h-5 w-1 rounded-full bg-primary-foreground" />
              <div className="h-6 w-1 rounded-full bg-primary-foreground" />
            </div>
          </div>
          <p className="text-lg md:text-xl font-semibold text-foreground">
            Musify
          </p>
        </Link>

        <div className="hidden flex-1 max-w-lg mx-8 md:block md:ml-10">
          <div className="relative">{pathname !== "/" && <SearchClient />}</div>
        </div>
      </div>

      <Link
        href="/about"
        className="text-primary text-sm md:text-base text-right hover:underline font-medium w-fit"
      >
        About this challenge →
      </Link>
    </nav>
  );
}
