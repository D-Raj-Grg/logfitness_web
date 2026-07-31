import { GlassWater, ShieldCheck, Tag } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { SupplementTub } from "@/components/illustrations";

type Product = {
  name: string;
  detail: string;
};

const products: Product[] = [
  { name: "Whey Protein", detail: "Lean muscle · recovery" },
  { name: "Mass Gainer", detail: "Clean bulking calories" },
  { name: "Creatine", detail: "Strength · power output" },
  { name: "Pre-Workout", detail: "Energy · focus · pump" },
  { name: "BCAA / EAA", detail: "Recovery · endurance" },
  { name: "Shakers & Bottles", detail: "Carry the mark" },
  { name: "LOG Apparel", detail: "Wear it louder" },
];

const perks = [
  { icon: ShieldCheck, label: "100% genuine, sealed products" },
  { icon: Tag, label: "Member pricing on every tub" },
  { icon: GlassWater, label: "Advice from people who train" },
];

function ProductCard({ item, accent }: { item: Product; accent: boolean }) {
  return (
    <div className="group flex h-72 w-56 shrink-0 flex-col items-center justify-between rounded-xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-border hover:bg-card">
      <SupplementTub
        accent={accent}
        className="h-40 w-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-2"
      />
      <div className="text-center">
        <p className="font-display text-xl leading-tight text-foreground">
          {item.name}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
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
        <Marquee pauseOnHover className="[--duration:36s] [--gap:1.25rem]">
          {products.map((item, i) => (
            <ProductCard key={item.name} item={item} accent={i % 2 === 1} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-tar-road-elevated/30 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-tar-road-elevated/30 to-transparent sm:w-40" />
      </div>
    </section>
  );
}
