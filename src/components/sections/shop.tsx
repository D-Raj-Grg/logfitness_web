import { GlassWater, ShieldCheck, Tag } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

type Product = {
  name: string;
  detail: string;
  tone: "dark" | "grey";
};

const products: Product[] = [
  { name: "Whey Protein", detail: "Lean muscle · recovery", tone: "dark" },
  { name: "Mass Gainer", detail: "Clean bulking calories", tone: "grey" },
  { name: "Creatine", detail: "Strength · power output", tone: "dark" },
  { name: "Pre-Workout", detail: "Energy · focus · pump", tone: "grey" },
  { name: "BCAA / EAA", detail: "Recovery · endurance", tone: "dark" },
  { name: "Shakers & Bottles", detail: "Carry the mark", tone: "grey" },
  { name: "LOG Apparel", detail: "Wear it louder", tone: "dark" },
];

const perks = [
  { icon: ShieldCheck, label: "100% genuine, sealed products" },
  { icon: Tag, label: "Member pricing on every tub" },
  { icon: GlassWater, label: "Advice from people who train" },
];

function ProductCard({ item }: { item: Product }) {
  const dark = item.tone === "dark";
  return (
    <div
      className={cn(
        "relative flex h-40 w-60 shrink-0 flex-col justify-between overflow-hidden rounded-xl border p-5",
        dark
          ? "border-white/10 bg-tar-road text-white"
          : "border-black/10 bg-elegant-grey text-tar-road"
      )}
    >
      <GlassWater
        className={cn("size-5", dark ? "text-white/80" : "text-tar-road/80")}
      />
      <div className="space-y-1">
        <p className="font-display text-xl leading-none">{item.name}</p>
        <p className={cn("text-xs", dark ? "text-white/50" : "text-tar-road/60")}>
          {item.detail}
        </p>
      </div>
    </div>
  );
}

export function Shop() {
  return (
    <section id="shop" className="border-b border-border/60 bg-tar-road-elevated/30">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8">
        <SectionHeading
          eyebrow="The supplement bar"
          title="Fuel it at the gym"
          description="Skip the guesswork and the fakes. Pick up genuine protein, gainers, creatine and pre-workout right at reception — plus LOG shakers and apparel."
        />

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {perks.map((perk) => (
            <BlurFade key={perk.label} inView>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <perk.icon className="size-4 text-foreground" />
                {perk.label}
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      <div className="relative mt-12 pb-24">
        <Marquee pauseOnHover className="[--duration:34s] [--gap:1.25rem]">
          {products.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-tar-road-elevated/30 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-tar-road-elevated/30 to-transparent sm:w-40" />
      </div>
    </section>
  );
}
