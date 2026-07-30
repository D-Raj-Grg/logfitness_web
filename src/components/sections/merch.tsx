import { SectionHeading } from "@/components/section-heading";
import { Marquee } from "@/components/magicui/marquee";
import { LogMark } from "@/components/log-mark";
import { cn } from "@/lib/utils";

type Item = {
  name: string;
  detail: string;
  tone: "dark" | "grey";
};

const merch: Item[] = [
  { name: "Tar Road Tee", detail: "Chest print · heavy cotton", tone: "dark" },
  { name: "Oversized Hoodie", detail: "Matte finish · drop shoulder", tone: "dark" },
  { name: "Elegant Grey Tee", detail: "Small-mark · quiet option", tone: "grey" },
  { name: "Structured Cap", detail: "Front-panel embroidery", tone: "dark" },
  { name: "Leather Lifting Belt", detail: "Blind emboss · no ink", tone: "grey" },
  { name: "Training Duffel", detail: "Side-panel mark", tone: "dark" },
  { name: "Shaker Bottle", detail: "Desk-all-day visibility", tone: "grey" },
  { name: "Engraved Plates", detail: "Precision monogram · 40 mm", tone: "dark" },
];

function MerchCard({ item }: { item: Item }) {
  const dark = item.tone === "dark";
  return (
    <div
      className={cn(
        "relative flex h-44 w-64 shrink-0 flex-col justify-between overflow-hidden rounded-xl border p-5",
        dark
          ? "border-white/10 bg-tar-road text-white"
          : "border-black/10 bg-elegant-grey text-tar-road"
      )}
    >
      <LogMark
        className={cn(
          "h-5 w-auto",
          dark ? "text-white/90" : "text-tar-road"
        )}
      />
      <div className="space-y-1">
        <p className="font-display text-lg leading-none">{item.name}</p>
        <p
          className={cn(
            "text-xs",
            dark ? "text-white/50" : "text-tar-road/60"
          )}
        >
          {item.detail}
        </p>
      </div>
    </div>
  );
}

export function Merch() {
  const firstRow = merch.slice(0, 4);
  const secondRow = merch.slice(4);

  return (
    <section id="merch" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8">
        <SectionHeading
          eyebrow="03 — Merchandise as a growth pillar"
          title="Apparel that leaves the gym"
          description="Because the mark is built with a streetwear aesthetic, merchandise transcends traditional gym promo gear — a secondary revenue stream and a decentralised marketing tool worn across the city twice a day."
        />
      </div>

      <div className="relative mt-14 flex flex-col gap-5 pb-24">
        <Marquee pauseOnHover className="[--duration:32s] [--gap:1.25rem]">
          {firstRow.map((item) => (
            <MerchCard key={item.name} item={item} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:32s] [--gap:1.25rem]">
          {secondRow.map((item) => (
            <MerchCard key={item.name} item={item} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent sm:w-40" />
      </div>
    </section>
  );
}
