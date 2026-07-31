import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { LogMark } from "@/components/log-mark";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";

const disciplines = ["Strength", "Cardio", "Zumba", "Dance", "Supplements"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-border/60"
    >
      <AnimatedGridPattern
        numSquares={36}
        maxOpacity={0.08}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 -top-1/4 h-[140%] skew-y-6"
        )}
      />

      {/* Spotlight glow — a monochrome ground light, not a brand colour */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-[120px]"
      />

      {/* Giant plates racked at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-56 top-1/2 size-[480px] -translate-y-1/2 rounded-full border-[46px] border-white/[0.04] sm:-left-44 sm:size-[560px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-64 -right-48 size-[520px] rounded-full border-[46px] border-white/[0.04] sm:-right-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_55%,var(--tar-road)_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <BlurFade delay={0.1} inView>
            <div className="group mb-8 flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5">
              <MapPin className="size-3.5 text-muted-foreground" />
              <AnimatedShinyText className="text-xs tracking-label">
                Kapur Complex, Hetauda — Nepal
              </AnimatedShinyText>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <LogMark className="mx-auto mb-8 h-20 w-auto sm:h-28 md:h-32" />
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <h1 className="font-display text-4xl leading-[0.95] text-foreground sm:text-6xl md:text-7xl">
              The gym that
              <br />
              trains it all
            </h1>
          </BlurFade>

          <BlurFade delay={0.45} inView>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Strength, cardio, Zumba and dance under one roof — plus a full
              retail bar of genuine protein and supplements. Lord of Gyms &amp;
              Fitness is Hetauda&apos;s premium fitness destination.
            </p>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link href="#membership">
                <ShimmerButton className="tracking-label text-xs font-medium">
                  Join the gym
                  <ArrowRight className="ml-2 size-4" />
                </ShimmerButton>
              </Link>
              <Link
                href="#programs"
                className="text-sm tracking-label text-muted-foreground transition-colors hover:text-foreground"
              >
                See what we offer →
              </Link>
            </div>
          </BlurFade>

          <BlurFade delay={0.75} inView>
            <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {disciplines.map((d) => (
                <li
                  key={d}
                  className="text-xs tracking-label text-muted-foreground/60"
                >
                  {d}
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
