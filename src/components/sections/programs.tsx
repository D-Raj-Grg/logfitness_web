import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ProgramEmblem, type EmblemKind } from "@/components/illustrations";
import { cn } from "@/lib/utils";

const programs: {
  kind: EmblemKind;
  no: string;
  name: string;
  body: string;
}[] = [
  {
    kind: "strength",
    no: "01",
    name: "Strength",
    body: "Free weights, plate-loaded machines and power racks — a full floor built for real, functional strength, from first session to new PR.",
  },
  {
    kind: "cardio",
    no: "02",
    name: "Cardio",
    body: "Treadmills, bikes and a dedicated conditioning zone to build your engine, burn fat and keep the heart strong.",
  },
  {
    kind: "zumba",
    no: "03",
    name: "Zumba",
    body: "High-energy, Latin-inspired dance fitness. The most fun you'll have doing cardio — led by instructors who keep the room moving.",
  },
  {
    kind: "dance",
    no: "04",
    name: "Dance",
    body: "Choreographed sessions for every level. Learn, sweat and move — from beginner routines to full choreography.",
  },
];

export function Programs() {
  return (
    <section id="programs" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="What we offer"
          title="Everything under one roof"
          description="One membership, every way to train. Lift heavy on the weight floor, build your engine in the cardio zone, or move in our group classes."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p, i) => (
            <BlurFade key={p.kind} delay={0.12 + i * 0.1} inView>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card/50 transition-colors hover:border-border hover:bg-card">
                {/* Emblem window */}
                <div className="relative flex items-center justify-center overflow-hidden border-b border-border/60 bg-tar-road py-10">
                  <DotPattern
                    width={14}
                    height={14}
                    className={cn(
                      "fill-white/[0.05]",
                      "[mask-image:radial-gradient(140px_circle_at_center,white,transparent)]"
                    )}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-3 font-display text-3xl text-white/10"
                  >
                    {p.no}
                  </span>
                  <ProgramEmblem
                    kind={p.kind}
                    className="relative z-10 size-36 text-white/90 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <h3 className="font-display text-2xl text-foreground">
                    {p.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
