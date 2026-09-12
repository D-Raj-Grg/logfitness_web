import Link from "next/link";
import { Quote, Star } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import {
  displayedTestimonials,
  googleRating,
  type Testimonial,
} from "@/lib/reviews";
import { readReviewsHref, writeReviewHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Reviews() {
  const quotes = displayedTestimonials;
  // Two rows running opposite ways read as a wall of reviews rather than a
  // single ticker. Below that count a static grid looks less thin.
  const marquee = quotes.length >= 6;
  const half = Math.ceil(quotes.length / 2);

  return (
    <section id="reviews" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8">
        <SectionHeading
          eyebrow="Member reviews"
          title="What members say"
          description="Rated by the people who actually train here. Read them on Google, or add yours."
        />

        {/* Rating summary */}
        <BlurFade delay={0.15} inView>
          <div className="mt-14 flex flex-col gap-6 rounded-xl border border-border/60 bg-card/60 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <p className="font-display text-5xl leading-none text-foreground">
                {googleRating.score.toFixed(1)}
              </p>
              <div className="space-y-1.5">
                <Stars value={Math.round(googleRating.score)} />
                <p className="text-xs tracking-label text-muted-foreground">
                  {googleRating.count}{" "}
                  {googleRating.count === 1 ? "review" : "reviews"} on Google
                </p>
                <a
                  href={readReviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Read them on Google →
                </a>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href="/review">Leave a review →</Link>
            </Button>
          </div>
        </BlurFade>
      </div>

      {quotes.length === 0 ? (
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-5 sm:px-8">
          <BlurFade delay={0.25} inView>
            <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-center">
              <p className="font-display text-2xl leading-tight text-foreground">
                Trained with us?
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Your review is the fastest way for someone in Hetauda to find a
                gym they can trust. It takes about a minute.
              </p>
              <div className="mt-6 flex justify-center">
                <Button asChild variant="outline">
                  <a
                    href={writeReviewHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go straight to Google
                  </a>
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      ) : marquee ? (
        <BlurFade delay={0.2} inView>
          {/* Full-bleed: the rows should run off both edges of the viewport. */}
          <div className="relative mt-14 pb-24">
            <Marquee pauseOnHover className="[--duration:70s] [--gap:1.25rem]">
              {quotes.slice(0, half).map((t) => (
                <ReviewCard key={t.author} testimonial={t} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="mt-5 [--duration:80s] [--gap:1.25rem]"
            >
              {quotes.slice(half).map((t) => (
                <ReviewCard key={t.author} testimonial={t} />
              ))}
            </Marquee>
            {/* Fade the rows into the page edges instead of cutting them off. */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />
          </div>
        </BlurFade>
      ) : (
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-5 sm:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((t, i) => (
              <BlurFade key={t.author} delay={0.1 + i * 0.05} inView>
                <ReviewCard testimonial={t} className="h-full w-full" />
              </BlurFade>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ReviewCard({
  testimonial: t,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex w-[19rem] shrink-0 flex-col justify-between gap-5 rounded-xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-border hover:bg-card sm:w-[22rem]",
        className
      )}
    >
      <div className="space-y-3">
        <Quote className="size-4 text-muted-foreground" />
        <blockquote className="text-sm leading-relaxed text-foreground">
          {t.quote}
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3 border-t border-border/60 pt-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/50 font-mono text-sm text-foreground">
          {t.author.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {t.author}
          </p>
          <Stars value={t.rating} />
        </div>
      </figcaption>
    </figure>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "size-3",
            i <= value
              ? "fill-current text-foreground"
              : "text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  );
}
