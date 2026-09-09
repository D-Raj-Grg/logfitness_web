"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, ExternalLink, RefreshCw, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { aspects, composeReview, CRITICAL_MAX } from "@/lib/review-composer";
import { siteConfig, writeReviewHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const ratings = [1, 2, 3, 4, 5];

export function ReviewComposer() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [seed, setSeed] = useState(1);
  /** The member's own edits, which replace the generated text until they change
   *  the rating, the chips or the wording. */
  const [edited, setEdited] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);

  const isCritical = rating > 0 && rating <= CRITICAL_MAX;

  const generated = useMemo(
    () => composeReview(rating, selected, seed),
    [rating, selected, seed]
  );
  const draft = edited ?? generated;

  const wordCount = useMemo(
    () => draft.trim().split(/\s+/).filter(Boolean).length,
    [draft]
  );

  // Grow the box to fit the draft so nothing is hidden behind a scrollbar.
  useLayoutEffect(() => {
    const el = field.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [draft]);

  /** Any change to the inputs re-drafts, discarding a stale hand-edit. */
  function regenerate() {
    setEdited(null);
    setCopied(false);
  }

  function choose(value: number) {
    setRating(value);
    regenerate();
  }

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    regenerate();
  }

  function reroll() {
    setSeed((s) => s + 1);
    regenerate();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard permission denied (or an insecure origin) — select the text
      // so the member can copy it by hand.
      const field = document.getElementById("review-draft");
      if (field instanceof HTMLTextAreaElement) field.select();
    }
  }

  return (
    <div className="space-y-10">
      {/* 01 — rating */}
      <Step index="01" title="How was your experience?">
        <div
          className="flex flex-wrap items-center gap-2"
          onMouseLeave={() => setHovered(0)}
        >
          {ratings.map((value) => {
            const lit = value <= (hovered || rating);
            return (
              <button
                key={value}
                type="button"
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                aria-pressed={rating === value}
                onMouseEnter={() => setHovered(value)}
                onFocus={() => setHovered(value)}
                onBlur={() => setHovered(0)}
                onClick={() => choose(value)}
                className={cn(
                  "flex size-12 items-center justify-center rounded-lg border transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:size-14",
                  lit
                    ? "border-foreground/40 bg-secondary text-foreground"
                    : "border-border/60 bg-card/60 text-muted-foreground hover:border-border"
                )}
              >
                <Star
                  className={cn("size-5 sm:size-6", lit && "fill-current")}
                />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="ml-2 text-xs tracking-label text-muted-foreground">
              {rating} / 5
            </span>
          )}
        </div>
      </Step>

      {/* 02 — aspects */}
      <Step
        index="02"
        title={
          isCritical ? "What could we do better?" : "What stood out for you?"
        }
        muted={!rating}
      >
        {rating === 0 ? (
          <p className="text-sm text-muted-foreground">
            Pick a rating above to start.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {aspects.map((aspect) => {
              const on = selected.includes(aspect.id);
              return (
                <button
                  key={aspect.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(aspect.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    on
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/60 bg-card/60 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  {isCritical ? aspect.improveLabel : aspect.label}
                </button>
              );
            })}
          </div>
        )}
      </Step>

      {/* 03 — draft */}
      <Step index="03" title="Your draft" muted={!rating}>
        {rating === 0 ? (
          <p className="text-sm text-muted-foreground">
            Your review will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-border/60 bg-card/60 p-1">
              <textarea
                id="review-draft"
                ref={field}
                value={draft}
                onChange={(e) => {
                  setEdited(e.target.value);
                  setCopied(false);
                }}
                rows={5}
                aria-label="Your review draft"
                className="w-full resize-none overflow-hidden rounded-lg bg-transparent p-4 text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="Tap a few things above, or just write your own…"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={copy} disabled={!draft.trim()} size="lg">
                {copied ? (
                  <>
                    <Check className="size-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4" /> Copy review
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={reroll}
                disabled={!draft.trim()}
              >
                <RefreshCw className="size-4" /> Try another wording
              </Button>

              <span className="text-xs tracking-label text-muted-foreground">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              This is a starting point — please edit it so it sounds like you.
              Reviews in your own words are more useful to people deciding
              whether to join, and Google is more likely to keep them.
            </p>
          </div>
        )}
      </Step>

      {/* 04 — post */}
      <Step index="04" title="Post it on Google" muted={!rating}>
        <div className="space-y-4">
          <Button
            asChild
            size="lg"
            variant={rating ? "default" : "outline"}
            className="w-full sm:w-auto"
          >
            <a href={writeReviewHref} target="_blank" rel="noopener noreferrer">
              Open Google review <ExternalLink className="size-4" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            Opens in a new tab — paste your review, set the stars, and post.
          </p>

          {isCritical && (
            <div className="rounded-xl border border-border/60 bg-card/60 p-5">
              <p className="text-sm leading-relaxed text-foreground">
                Sorry it wasn&apos;t what you expected. Post the review if you
                want to — honest feedback helps us. If you&apos;d also like us
                to fix it directly, message the gym and we&apos;ll sort it out.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={siteConfig.mobile.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp us
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href={siteConfig.phoneHref}>
                    Call {siteConfig.phoneDisplay}
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Step>
    </div>
  );
}

function Step({
  index,
  title,
  muted,
  children,
}: {
  index: string;
  title: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-4", muted && "opacity-60")}>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-muted-foreground">{index}</span>
        <h2 className="font-display text-xl leading-none text-foreground sm:text-2xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
