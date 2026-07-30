import Link from "next/link";
import { ArrowRight, Dumbbell } from "lucide-react";

import { LogMark } from "@/components/log-mark";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";

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

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <BlurFade delay={0.1} inView>
            <div className="group mb-8 flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5">
              <Dumbbell className="size-3.5 text-muted-foreground" />
              <AnimatedShinyText className="text-xs tracking-label">
                Nepal&apos;s premier athletic lifestyle brand
              </AnimatedShinyText>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <LogMark className="mx-auto mb-8 h-24 w-auto sm:h-32 md:h-40" />
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <h1 className="font-display text-4xl leading-[0.95] text-foreground sm:text-6xl md:text-7xl">
              Lord of Gyms
              <br />
              &amp; Fitness
            </h1>
          </BlurFade>

          <BlurFade delay={0.45} inView>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              More than a training facility — an athletic streetwear identity and
              a premium fitness destination. Powerful, modern, sleek, and premium
              yet accessible.
            </p>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link href="#brand-book">
                <ShimmerButton className="tracking-label text-xs font-medium">
                  Explore the identity
                  <ArrowRight className="ml-2 size-4" />
                </ShimmerButton>
              </Link>
              <Link
                href="#concept"
                className="text-sm tracking-label text-muted-foreground transition-colors hover:text-foreground"
              >
                Why &ldquo;LOG&rdquo; →
              </Link>
            </div>
          </BlurFade>

          <BlurFade delay={0.75} inView>
            <p className="mt-14 text-xs tracking-label text-muted-foreground/60">
              Train hard. Wear it louder.
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
