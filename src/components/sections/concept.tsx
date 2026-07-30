import { CircleDot, Minus, Type } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";

const ideas = [
  {
    icon: Type,
    no: "01",
    title: "A monogram, not a picture",
    body: "Three letters, drawn as geometry rather than typed. It stays legible on a signboard at 20 metres and on a phone avatar at 20 pixels — the two places a gym brand actually lives.",
  },
  {
    icon: CircleDot,
    no: "02",
    title: "The O is a weight plate",
    body: "The centre letter is built as a plate: an even ring with a bored centre. The fitness reference sits inside the letterform instead of being stuck on beside it.",
  },
  {
    icon: Minus,
    no: "03",
    title: "The bar runs through it",
    body: "A single horizontal channel cuts every letter at the same height. Read one way it is a stencil break; read another it is the bar passing through the plate.",
  },
];

export function Concept() {
  return (
    <section id="concept" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="01 — The concept"
          title="Three ideas, one mark"
          description="No clip-art barbells. The equipment is built into the letters, so the mark still works when it is embroidered, engraved, or 12 mm wide."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {ideas.map((idea, i) => (
            <BlurFade key={idea.no} delay={0.15 + i * 0.12} inView>
              <Card className="group h-full border-border/60 bg-card/50 transition-colors hover:border-border hover:bg-card">
                <CardContent className="flex h-full flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground transition-colors group-hover:bg-secondary">
                      <idea.icon className="size-5" />
                    </span>
                    <span className="font-display text-2xl text-muted-foreground/40">
                      {idea.no}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {idea.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {idea.body}
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
