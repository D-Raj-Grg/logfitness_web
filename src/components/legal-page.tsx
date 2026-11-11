import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { LogMark } from "@/components/log-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

/**
 * Shell for plain-text pages (privacy policy, support): the same slim header,
 * hero and footer as /balance, with a readable single column. Server-rendered,
 * no client JS.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" aria-label="LOG home">
            <LogMark className="h-6 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="flex items-center gap-2 text-xs tracking-label text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <section className="relative overflow-hidden border-b border-border/60 dark bg-tar-road">
          <DotPattern
            className={cn(
              "fill-white/[0.05]",
              "[mask-image:radial-gradient(500px_circle_at_50%_0%,white,transparent)]"
            )}
          />
          <div className="relative z-10 mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <span className="text-xs tracking-label text-muted-foreground">
              {eyebrow}
            </span>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {intro ? (
              <div className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
                {intro}
              </div>
            ) : null}
          </div>
        </section>

        <div className="mx-auto max-w-3xl space-y-10 px-5 py-12 sm:px-8 sm:py-16">
          {children}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-6 space-y-3 text-base leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
    >
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
