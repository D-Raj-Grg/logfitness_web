import { Dumbbell, HeartPulse, Music, Sparkles, GlassWater } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";

const items = [
  { icon: Dumbbell, label: "Strength" },
  { icon: HeartPulse, label: "Cardio" },
  { icon: Music, label: "Zumba" },
  { icon: Sparkles, label: "Dance" },
  { icon: GlassWater, label: "Supplements" },
];

export function Highlights() {
  return (
    <section className="border-b border-border/60 bg-tar-road-elevated/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 sm:px-8 md:grid-cols-5">
        {items.map((item, i) => (
          <BlurFade key={item.label} delay={0.1 + i * 0.08} inView>
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-secondary/40 text-foreground">
                <item.icon className="size-5" />
              </span>
              <p className="text-xs tracking-label text-muted-foreground">
                {item.label}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
