"use client";
import Link from "next/link";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchClient from "../search/search-bar-client";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <div className="flex gap-0.5">
              <div className="h-4 w-1 rounded-full bg-primary-foreground" />
              <div className="h-5 w-1 rounded-full bg-primary-foreground" />
              <div className="h-6 w-1 rounded-full bg-primary-foreground" />
            </div>
          </div>
          <span className="text-xl font-semibold text-foreground">
            Music Data Explorer
          </span>
        </Link>

        <div className="hidden flex-1 max-w-lg mx-8 md:block md:ml-10">
          <div className="relative">{pathname !== "/" && <SearchClient />}</div>
        </div>
      </div>
    </nav>
  );
}
