import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Film-grain overlay — SVG fractal noise, resolution independent.
 * Gives every surface the matte, screen-printed texture from the brand book
 * without introducing a third colour.
 */
export function Grain({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[70] h-full w-full opacity-[0.05] mix-blend-overlay",
        className
      )}
    >
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
