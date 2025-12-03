import Link from "next/link"
import { Search, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <div className="flex gap-0.5">
              <div className="h-4 w-1 rounded-full bg-primary-foreground" />
              <div className="h-5 w-1 rounded-full bg-primary-foreground" />
              <div className="h-6 w-1 rounded-full bg-primary-foreground" />
            </div>
          </div>
          <span className="text-xl font-semibold text-foreground">Music Data Explorer</span>
        </Link>

        {/* <div className="hidden flex-1 max-w-md mx-8 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search" className="w-full pl-10 bg-input border-border" />
          </div>
        </div> */}

        {/* <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <User className="h-5 w-5" />
          </button>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/diverse-user-avatars.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div> */}
      </div>
    </nav>
  )
}
