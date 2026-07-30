import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { LogMark } from "@/components/log-mark";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export function CTA() {
  return (
    <section className="relative overflow-hidden">
      <DotPattern
        className={cn(
          "fill-white/[0.05]",
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-5 py-28 text-center sm:px-8">
        <BlurFade inView>
          <LogMark className="mx-auto mb-10 h-16 w-auto sm:h-20" />
        </BlurFade>
        <BlurFade delay={0.15} inView>
          <h2 className="font-display text-4xl leading-[0.95] text-foreground sm:text-6xl">
            Establish immediate
            <br />
            market authority
          </h2>
        </BlurFade>
        <BlurFade delay={0.3} inView>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            A world-class training facility paired with a distinct, marketable
            identity — a moat against local competitors and a scalable model
            across Nepal and beyond.
          </p>
        </BlurFade>
        <BlurFade delay={0.45} inView>
          <div className="mt-10 flex justify-center">
            <Link href="#brand-book">
              <ShimmerButton className="tracking-label text-xs font-medium">
                Review the pitch deck
                <ArrowUpRight className="ml-2 size-4" />
              </ShimmerButton>
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
