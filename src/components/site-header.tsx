"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { LogMark } from "@/components/log-mark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Concept", href: "#concept" },
  { label: "Identity", href: "#identity" },
  { label: "Merch", href: "#merch" },
  { label: "Brand Book", href: "#brand-book" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="#top"
          className="flex items-center gap-3"
          aria-label="LOG — home"
          onClick={() => setOpen(false)}
        >
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

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="tracking-label text-xs"
          >
            <Link href="#contact" onClick={() => setOpen(false)}>
              Join LOG
            </Link>
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-md border border-border bg-secondary/40 text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
          "transition-[max-height] duration-300 ease-in-out"
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm tracking-label text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
