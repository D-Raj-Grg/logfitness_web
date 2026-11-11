"use client";

import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

/** localStorage key; the inline script in layout.tsx reads the same one before first paint. */
const STORAGE_KEY = "theme";

/**
 * Light / dark switch. The site is dark by default; a visitor who picks light
 * is remembered in this browser. The icons are chosen by CSS from the `dark`
 * class on <html> (sun shows in dark mode, moon in light), so there is nothing
 * to hydrate and no flash. Do not place it inside a brand panel: those carry
 * their own `dark` class and would show the wrong icon.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#17181D" : "#FFFFFF");
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Light / dark mode"
      className={cn(
        "flex size-9 items-center justify-center rounded-md border border-border bg-secondary/40 text-foreground transition-colors hover:bg-secondary",
        className
      )}
    >
      <Sun className="hidden size-4 dark:block" aria-hidden />
      <Moon className="size-4 dark:hidden" aria-hidden />
    </button>
  );
}
