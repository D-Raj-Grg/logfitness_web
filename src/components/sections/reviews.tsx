import Link from "next/link";
import { Quote, Star } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { googleRating, testimonials } from "@/lib/reviews";
import { readReviewsHref, writeReviewHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Reviews() {
  const hasQuotes = testimonials.length > 0;

  return (
    <section id="reviews" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Member reviews"
          title="What members say"
          description="Rated by the people who actually train here. Read them on Google — or add yours."
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

        {hasQuotes ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <BlurFade key={t.author + i} delay={0.1 + i * 0.05} inView>
                <figure className="flex h-full flex-col justify-between gap-6 rounded-xl border border-border/60 bg-card/60 p-7 transition-colors hover:border-border hover:bg-card">
                  <div className="space-y-4">
                    <Quote className="size-5 text-muted-foreground" />
                    <blockquote className="text-base leading-relaxed text-foreground">
                      {t.quote}
                    </blockquote>
                  </div>
                  <figcaption className="space-y-2 border-t border-border/60 pt-4">
                    <Stars value={t.rating} />
                    <p className="text-sm font-semibold text-foreground">
                      {t.author}
                    </p>
                    {t.context ? (
                      <p className="text-xs tracking-label text-muted-foreground">
                        {t.context}
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              </BlurFade>
            ))}
          </div>
        ) : (
          <BlurFade delay={0.25} inView>
            <div className="mt-5 rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-center">
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
        )}
      </div>
    </section>
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
            "size-3.5",
            i <= value
              ? "fill-current text-foreground"
              : "text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  );
}
