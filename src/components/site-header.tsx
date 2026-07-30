import Link from "next/link";

import { LogMark } from "@/components/log-mark";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Concept", href: "#concept" },
  { label: "Identity", href: "#identity" },
  { label: "Merch", href: "#merch" },
  { label: "Brand Book", href: "#brand-book" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="#top" className="flex items-center gap-3" aria-label="LOG — home">
          <LogMark className="h-5 w-auto" />
          <span className="hidden text-sm tracking-label text-muted-foreground sm:inline">
            Lord of Gyms
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm" className="tracking-label text-xs">
          <Link href="#brand-book">View the deck</Link>
        </Button>
      </div>
    </header>
  );
}
