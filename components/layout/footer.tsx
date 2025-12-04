
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-10 px-8 border-t border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60 mt-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-medium text-foreground leading-relaxed">
          <span className="font-semibold">Wollen Labs</span> – Music Data Explorer Challenge<br />
          Crafted by <span className="text-primary font-semibold">Iván Cardoso</span> – 2025
        </p>

        <Link
          href="/about"
          className="text-sm text-primary hover:underline font-medium"
        >
          About this challenge →
        </Link>
      </div>
    </footer>
  );
}
