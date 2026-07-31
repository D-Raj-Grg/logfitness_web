import { Marquee } from "@/components/magicui/marquee";
import { PlateGlyph } from "@/components/illustrations";

const words = ["Strength", "Cardio", "Zumba", "Dance", "Supplements"];

export function Ticker() {
  return (
    <section className="overflow-hidden border-b border-border/60 bg-tar-road-elevated/40 py-5">
      {/* The scrolling copy repeats — read once for screen readers, hide the loop. */}
      <p className="sr-only">{words.join(", ")} — all under one roof at LOG.</p>
      <div aria-hidden="true">
        <Marquee className="p-0 [--duration:26s] [--gap:2.5rem]">
          {words.map((word) => (
            <div key={word} className="flex items-center gap-10">
              <span className="font-display text-4xl text-foreground sm:text-5xl">
                {word}
              </span>
              <PlateGlyph className="size-5 text-elegant-grey/70" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
