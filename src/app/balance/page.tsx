import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { BalanceLookup } from "@/components/balance-lookup";
import { LogMark } from "@/components/log-mark";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership balance",
  description:
    "Scan the QR on your LOG card to see how many days are left on your membership and ask the front desk to renew it.",
  alternates: { canonical: "/balance" },
  // The URL behind the QR printed on members' cards. It is for people who
  // already train here, not a page that should compete in search.
  robots: { index: false, follow: true },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BalancePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const raw = (await searchParams).card_no;
  const text = Array.isArray(raw) ? raw[0] : raw;
  // Pass the raw value through (trimmed, capped) rather than dropping it when
  // it doesn't parse — the component prefills the digits and shows the hint.
  const initialCardNo = text?.trim().slice(0, 32) || undefined;

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
              Membership balance
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              See how many days are left on your membership and, when
              it&apos;s time, ask the front desk to renew it. Nothing is paid
              here — we just give you a call.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <BalanceLookup
            key={initialCardNo ?? "manual"}
            initialCardNo={initialCardNo}
          />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
