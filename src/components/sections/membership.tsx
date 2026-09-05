import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { PlateBadge } from "@/components/illustrations";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const perks = [
  "Gym Only or Gym + Cardio — pick your floor",
  "Group classes — Zumba & dance included",
  "Member pricing on protein & supplements",
  "Guidance from trainers on the floor",
  "Daily, monthly, 6-month & annual plans",
  "No registration fee on 3-month plans and up",
];

export function Membership() {
  return (
    <section id="membership" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Membership"
              title="Pick a plan, own the floor"
              description="Two simple tiers, no hidden extras. Start with a day pass or a month, and the longer you commit the less you pay — the annual plan comes with four months free. Walk in for a tour or call to get started today."
            />

            <ul className="mt-10 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {perks.map((perk, i) => (
                <BlurFade key={perk} delay={0.1 + i * 0.06} inView>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                      <Check className="size-3" />
                    </span>
                    {perk}
                  </li>
                </BlurFade>
              ))}
            </ul>

            <BlurFade delay={0.3} inView>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link href="#pricing">
                  <ShimmerButton className="tracking-label text-xs font-medium">
                    See the rate card
                    <ArrowRight className="ml-2 size-4" />
                  </ShimmerButton>
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2 text-sm tracking-label text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-4" />
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Visual panel — the engraved member plate */}
          <BlurFade delay={0.2} inView>
            <div className="relative flex aspect-square flex-col overflow-hidden rounded-2xl border border-border/60 bg-tar-road p-8 sm:p-10">
              <DotPattern
                className={cn(
                  "fill-white/[0.06]",
                  "[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]"
                )}
              />
              <div className="relative z-10 flex flex-1 items-center justify-center">
                <PlateBadge className="w-full max-w-[420px] drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:rotate-[4deg]" />
              </div>
              <p className="relative z-10 pt-6 text-center text-xs tracking-label text-white/40">
                Every plate in the house carries the mark
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
