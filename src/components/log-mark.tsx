import { cn } from "@/lib/utils";

/**
 * LOG monogram — drawn as geometry, not typed.
 *
 * Per the brand book:
 *  - The O is built as a weight plate: an even ring with a bored centre.
 *  - A single horizontal channel (the "bar") cuts every letter at the same
 *    height — read one way a stencil break, read another the bar through the plate.
 *  - Every dimension derives from the stem weight so it rebuilds at any scale.
 *
 * viewBox units: stem weight = 28, cap height = 100, plate diameter = 100.
 */
export function LogMark({
  className,
  title = "LOG",
  ...props
}: React.SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 292 100"
      role="img"
      aria-label={title}
      className={cn("text-foreground", className)}
      {...props}
    >
      <defs>
        {/* The bar channel + G's squared top-right terminal are carved via this mask. */}
        <mask id="log-channel">
          <rect x="0" y="0" width="292" height="100" fill="white" />
          {/* horizontal bar channel across all three letters */}
          <rect x="-4" y="44.5" width="300" height="11" fill="black" />
          {/* G — open the top-right into a squared terminal */}
          <rect x="253" y="-6" width="45" height="44" fill="black" />
        </mask>
      </defs>

      <g fill="currentColor" mask="url(#log-channel)">
        {/* L */}
        <path d="M0 0 H28 V72 H62 V100 H0 Z" />

        {/* O — the weight plate (ring with bored centre) */}
        <circle
          cx="127"
          cy="50"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="28"
        />

        {/* G — the plate ring plus a horizontal arm filling the right of the
            counter; the channel splits it and the top-right is squared off. */}
        <circle
          cx="242"
          cy="50"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="28"
        />
        <rect x="229" y="38" width="61" height="25" />
      </g>
    </svg>
  );
}
