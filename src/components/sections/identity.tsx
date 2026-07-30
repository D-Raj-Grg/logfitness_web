import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { LogMark } from "@/components/log-mark";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

const swatches = [
  {
    name: "Tar Road",
    code: "8245 · Matt finish",
    role: "Primary base / foundation",
    hex: "#17181D",
    className: "bg-tar-road",
    text: "text-white",
    border: "border-white/10",
  },
  {
    name: "Elegant Grey",
    code: "8232 · Smooth finish",
    role: "Industrial / modern accent",
    hex: "#8B9096",
    className: "bg-elegant-grey",
    text: "text-tar-road",
    border: "border-black/10",
  },
  {
    name: "White",
    code: "Ground / reverse only",
    role: "Never a third brand colour",
    hex: "#FFFFFF",
    className: "bg-white",
    text: "text-tar-road",
    border: "border-black/10",
  },
];

const proportions = [
  ["Stem weight", "1 unit"],
  ["Cap height", "3.6 units"],
  ["Plate diameter", "3.6 units"],
  ["Bar channel", "0.38 units"],
  ["Letter spacing", "0.5–0.6 units"],
];

export function Identity() {
  return (
    <section id="identity" className="border-b border-border/60 bg-tar-road-elevated/30">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="02 — Colour & construction"
          title="Drawn on a grid, not by eye"
          description="Two colours, no exceptions. Every dimension is a multiple of the stem weight, so the mark can be rebuilt at any scale without drifting."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-5">
          {/* Master lockup */}
          <BlurFade delay={0.15} inView className="lg:col-span-3">
            <div className="relative flex h-full min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-tar-road p-10">
              <DotPattern
                className={cn(
                  "fill-white/[0.06]",
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                )}
              />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <LogMark className="h-24 w-auto text-white sm:h-28" />
                <p className="text-[10px] tracking-label text-white/50">
                  Master lockup · white on Tar Road
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Proportions */}
          <BlurFade delay={0.25} inView className="lg:col-span-2">
            <div className="flex h-full flex-col justify-center gap-1 rounded-xl border border-border/60 bg-card/50 p-8">
              <p className="mb-4 text-xs tracking-label text-muted-foreground">
                Proportions
              </p>
              <dl className="divide-y divide-border/60">
                {proportions.map(([term, value]) => (
                  <div
                    key={term}
                    className="flex items-center justify-between py-3"
                  >
                    <dt className="text-sm text-muted-foreground">{term}</dt>
                    <dd className="font-mono text-sm text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </BlurFade>
        </div>

        {/* Swatches */}
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {swatches.map((swatch, i) => (
            <BlurFade key={swatch.name} delay={0.2 + i * 0.1} inView>
              <div
                className={cn(
                  "flex aspect-[4/3] flex-col justify-between rounded-xl border p-6",
                  swatch.className,
                  swatch.text,
                  swatch.border
                )}
              >
                <span className="text-xs tracking-label opacity-70">
                  {swatch.hex}
                </span>
                <div className="space-y-1">
                  <p className="font-display text-xl">{swatch.name}</p>
                  <p className="text-xs opacity-70">{swatch.code}</p>
                  <p className="text-xs opacity-70">{swatch.role}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Typography specimen */}
        <BlurFade delay={0.2} inView>
          <div className="mt-5 grid gap-6 rounded-xl border border-border/60 bg-card/50 p-8 md:grid-cols-2 md:p-10">
            <div className="space-y-4">
              <p className="text-xs tracking-label text-muted-foreground">
                Display · heavy geometric sans, caps only
              </p>
              <p className="font-display text-5xl text-foreground sm:text-6xl">
                Train hard.
                <br />
                Wear it louder.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <p className="text-xs tracking-label text-muted-foreground">
                Body · clean humanist sans
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Headlines set in caps, heavy weight, tracked out 6–10%. Body copy
                in sentence case with generous line height. Labels and tags in
                small caps, tracked out 15% — used on equipment and signage.
                Never a script, an outline, a drop shadow, or a second display
                face.
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
