import { NumberTicker } from "@/components/magicui/number-ticker";
import { BlurFade } from "@/components/magicui/blur-fade";

const stats = [
  { value: 20, suffix: "m", label: "Legible on a signboard" },
  { value: 20, suffix: "px", label: "Legible as an avatar" },
  { value: 2, suffix: "", label: "Colours — no exceptions" },
  { value: 3.6, suffix: "u", decimals: 1, label: "Cap height on the grid" },
];

export function Stats() {
  return (
    <section className="border-b border-border/60 bg-tar-road-elevated/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-5 sm:px-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <BlurFade key={stat.label} delay={0.1 + i * 0.1} inView>
            <div className="flex flex-col gap-2 py-10 md:items-center md:text-center">
              <div className="flex items-baseline gap-1 font-display text-4xl text-foreground sm:text-5xl">
                <NumberTicker
                  value={stat.value}
                  decimalPlaces={stat.decimals ?? 0}
                  className="font-display text-foreground"
                />
                <span className="text-2xl text-muted-foreground sm:text-3xl">
                  {stat.suffix}
                </span>
              </div>
              <p className="max-w-[14ch] text-xs leading-relaxed tracking-label text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
