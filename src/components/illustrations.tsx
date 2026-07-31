import { cn } from "@/lib/utils";
import { LogMark } from "@/components/log-mark";

/*
  Illustration set for the LOG site.

  Everything here follows the brand-book rule that got the logo right:
  equipment is drawn as geometry, not clip-art. Each program gets a
  "plate emblem" — the weight-plate ring with a geometric motif bored
  into the centre — so the family reads as engraved hardware.
*/

const TICKS = Array.from({ length: 12 }, (_, i) => (i * Math.PI) / 6);

function EmblemRing({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* plate ring */}
      <circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        opacity="0.9"
      />
      {/* engraved tick marks */}
      {TICKS.map((a, i) => (
        <line
          key={i}
          x1={100 + Math.cos(a) * 60}
          y1={100 + Math.sin(a) * 60}
          x2={100 + Math.cos(a) * 66}
          y2={100 + Math.sin(a) * 66}
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.28"
        />
      ))}
      {children}
    </>
  );
}

export type EmblemKind = "strength" | "cardio" | "zumba" | "dance";

export function ProgramEmblem({
  kind,
  className,
}: {
  kind: EmblemKind;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={cn("text-foreground", className)}>
      <EmblemRing>
        {kind === "strength" && (
          <g fill="currentColor">
            {/* barbell, side on: bar + two plate pairs */}
            <rect x="48" y="96" width="104" height="8" rx="4" />
            <rect x="62" y="72" width="11" height="56" rx="4" />
            <rect x="78" y="80" width="9" height="40" rx="4" />
            <rect x="127" y="72" width="11" height="56" rx="4" />
            <rect x="113" y="80" width="9" height="40" rx="4" />
          </g>
        )}
        {kind === "cardio" && (
          <polyline
            points="52,100 76,100 88,72 102,128 114,86 124,100 148,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {kind === "zumba" && (
          <g fill="currentColor">
            {/* rhythm bars */}
            <rect x="59" y="86" width="10" height="28" rx="5" />
            <rect x="77" y="74" width="10" height="52" rx="5" />
            <rect x="95" y="62" width="10" height="76" rx="5" />
            <rect x="113" y="78" width="10" height="44" rx="5" />
            <rect x="131" y="88" width="10" height="24" rx="5" />
          </g>
        )}
        {kind === "dance" && (
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          >
            {/* movement: a point and its trailing arcs */}
            <circle cx="84" cy="104" r="9" fill="currentColor" stroke="none" />
            <path d="M 96 76 A 34 34 0 0 1 118 104" />
            <path d="M 104 62 A 50 50 0 0 1 134 104" opacity="0.6" />
            <path d="M 112 48 A 66 66 0 0 1 150 104" opacity="0.3" />
          </g>
        )}
      </EmblemRing>
    </svg>
  );
}

/** A LOG-branded supplement tub, drawn flat. */
export function SupplementTub({
  className,
  accent = false,
}: {
  className?: string;
  accent?: boolean;
}) {
  return (
    <svg viewBox="0 0 140 168" aria-hidden className={className}>
      {/* lid */}
      <rect
        x="28"
        y="4"
        width="84"
        height="22"
        rx="6"
        className={accent ? "fill-elegant-grey" : "fill-white"}
      />
      <rect x="36" y="9" width="68" height="3" rx="1.5" className="fill-tar-road/30" />
      {/* body */}
      <rect
        x="20"
        y="26"
        width="100"
        height="138"
        rx="12"
        className="fill-tar-road-elevated stroke-white/15"
        strokeWidth="2"
      />
      {/* label band */}
      <rect
        x="20"
        y="58"
        width="100"
        height="66"
        className={accent ? "fill-elegant-grey" : "fill-white"}
      />
      {/* label: the mark + weight line */}
      <svg x="35" y="74" width="70" height="24" viewBox="0 0 292 100">
        <LogMark className="text-tar-road" title="" />
      </svg>
      <rect x="48" y="106" width="44" height="4" rx="2" className="fill-tar-road/40" />
    </svg>
  );
}

const BADGE_TICKS = Array.from({ length: 24 }, (_, i) => (i * Math.PI) / 12);

/**
 * The engraved plate — a full weight plate with the monogram bored into
 * the centre and the wordline running around the ring.
 */
export function PlateBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={cn("text-white", className)}>
      <defs>
        {/* full circle; the text is sized to leave a small clean gap at the seam */}
        <path
          id="plate-text-path"
          d="M 200 48 A 152 152 0 1 1 199.9 48"
          fill="none"
        />
      </defs>

      {/* plate face */}
      <circle cx="200" cy="200" r="190" className="fill-tar-road-elevated" />
      <circle
        cx="200"
        cy="200"
        r="190"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="2"
      />
      <circle
        cx="200"
        cy="200"
        r="126"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="2"
      />

      {/* engraved ring text */}
      <text
        className="font-mono"
        fontSize="13"
        letterSpacing="6.8"
        fill="currentColor"
        fillOpacity="0.5"
      >
        <textPath href="#plate-text-path" startOffset="0">
          LORD OF GYMS &amp; FITNESS · KAPUR COMPLEX · HETAUDA · TRAIN HARD ·
        </textPath>
      </text>

      {/* tick marks */}
      {BADGE_TICKS.map((a, i) => (
        <line
          key={i}
          x1={200 + Math.cos(a) * 132}
          y1={200 + Math.sin(a) * 132}
          x2={200 + Math.cos(a) * 144}
          y2={200 + Math.sin(a) * 144}
          stroke="currentColor"
          strokeOpacity={i % 2 === 0 ? 0.4 : 0.15}
          strokeWidth="3"
        />
      ))}

      {/* bore */}
      <circle cx="200" cy="200" r="96" className="fill-tar-road" />
      <circle
        cx="200"
        cy="200"
        r="96"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="2"
      />

      {/* monogram, engraved in the bore */}
      <svg x="136" y="178" width="128" height="44" viewBox="0 0 292 100">
        <LogMark className="text-white" title="" />
      </svg>
    </svg>
  );
}

/** Tiny plate glyph — used as a separator in tickers. */
export function PlateGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
    </svg>
  );
}
