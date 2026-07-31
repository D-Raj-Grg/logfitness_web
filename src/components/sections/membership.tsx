import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const perks = [
  "Full access to the strength & cardio floors",
  "Group classes — Zumba & dance included",
  "Member pricing on protein & supplements",
  "Guidance from trainers on the floor",
  "Flexible plans for students & professionals",
  "Clean, modern space built for training",
];

export function Membership() {
  return (
    <section id="membership" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Membership"
              title="One membership, everything"
              description="No add-ons, no upsells to train. Every LOG membership opens the whole floor and every class. Walk in for a tour or call to get started today."
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
                <Link href="#contact">
                  <ShimmerButton className="tracking-label text-xs font-medium">
                    Get started
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

          {/* Visual panel */}
          <BlurFade delay={0.2} inView>
            <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-tar-road p-8 sm:p-10">
              <DotPattern
                className={cn(
                  "fill-white/[0.06]",
                  "[mask-image:radial-gradient(420px_circle_at_60%_30%,white,transparent)]"
                )}
              />
              <div className="relative z-10">
                <p className="text-xs tracking-label text-white/50">
                  Lord of Gyms &amp; Fitness
                </p>
              </div>
              <div className="relative z-10 space-y-4">
                <p className="font-display text-4xl leading-[0.95] text-white sm:text-5xl">
                  Train hard.
                  <br />
                  Wear it louder.
                </p>
                <p className="max-w-xs text-sm leading-relaxed text-white/60">
                  Join the movement building Hetauda&apos;s strongest fitness
                  community — on the floor and in the feed.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
