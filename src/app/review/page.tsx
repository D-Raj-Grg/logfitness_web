import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { ReviewComposer } from "@/components/review-composer";
import { LogMark } from "@/components/log-mark";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { googleRating } from "@/lib/reviews";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Leave a review",
  description:
    "Trained at LOG? Leave us a Google review. Pick your rating, tap what stood out, and post it in under a minute.",
  alternates: { canonical: "/review" },
  // The short URL behind the front-desk QR code. It is for members who already
  // train here, not a page that should compete in search.
  robots: { index: false, follow: true },
};

export default function ReviewPage() {
  return (
    <>
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" aria-label="LOG home">
            <LogMark className="h-6 w-auto" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs tracking-label text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to site
          </Link>
        </div>
      </header>

      <main id="main" className="flex-1">
        <section className="relative overflow-hidden border-b border-border/60 bg-tar-road">
          <DotPattern
            className={cn(
              "fill-white/[0.05]",
              "[mask-image:radial-gradient(500px_circle_at_50%_0%,white,transparent)]"
            )}
          />
          <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
            <span className="text-xs tracking-label text-muted-foreground">
              Members
            </span>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
              Leave us a review
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              A minute of your time helps someone else in Hetauda find a gym
              they can trust. Pick your rating, tap what stood out, and
              we&apos;ll start you off. Then put it in your own words.
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="size-4 fill-current text-foreground" />
              <span className="font-mono text-foreground">
                {googleRating.score.toFixed(1)}
              </span>
              on Google · {googleRating.count}{" "}
              {googleRating.count === 1 ? "review" : "reviews"}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <ReviewComposer />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
