import { Dumbbell, HeartPulse, Music, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";

const programs = [
  {
    icon: Dumbbell,
    name: "Strength",
    body: "Free weights, plate-loaded machines and power racks — a full floor built for real, functional strength, whether you're starting out or chasing a new PR.",
  },
  {
    icon: HeartPulse,
    name: "Cardio",
    body: "Treadmills, bikes and a dedicated conditioning zone to build your engine, burn fat and keep the heart strong.",
  },
  {
    icon: Music,
    name: "Zumba",
    body: "High-energy, Latin-inspired dance fitness. The most fun you'll have doing cardio — led by instructors who keep the room moving.",
  },
  {
    icon: Sparkles,
    name: "Dance",
    body: "Choreographed dance sessions for every level. Learn, sweat and move — from beginner routines to full choreography.",
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
            <BlurFade key={p.name} delay={0.12 + i * 0.1} inView>
              <Card className="group h-full border-border/60 bg-card/50 transition-colors hover:border-border hover:bg-card">
                <CardContent className="flex h-full flex-col gap-5">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-secondary/50 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                    <p.icon className="size-5" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-foreground">
                      {p.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
