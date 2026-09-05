import Link from "next/link";
import { ArrowRight, BadgeCheck, Phone, Ticket } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";
import {
  fees,
  formatPrice,
  membershipTiers,
  trainingPackages,
  trainingRequiresMembership,
  type Plan,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * A plan table: one row per term — term · total (+ effective monthly) · saving.
 * Rendered as a real <table> so the rate card reads correctly to screen readers.
 */
function PlanTable({ caption, plans }: { caption: string; plans: Plan[] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="text-left text-[11px] tracking-label text-muted-foreground">
          <th scope="col" className="px-4 py-3 font-normal sm:px-6">
            Term
          </th>
          <th scope="col" className="px-4 py-3 font-normal sm:px-6">
            Total
          </th>
          <th scope="col" className="px-4 py-3 text-right font-normal sm:px-6">
            Effective
          </th>
        </tr>
      </thead>
      <tbody>
        {plans.map((plan) => (
          <tr
            key={plan.term}
            className={cn(
              "border-t border-border/60",
              plan.best && "bg-foreground text-background"
            )}
          >
            <th
              scope="row"
              className={cn(
                "px-4 py-4 text-left font-medium sm:px-6",
                plan.best ? "text-background" : "text-foreground"
              )}
            >
              {plan.term}
              {plan.best ? (
                <span className="mt-1 block text-[10px] tracking-label opacity-70">
                  Best value
                </span>
              ) : null}
            </th>
            <td className="px-4 py-4 align-top sm:px-6">
              <span className="whitespace-nowrap font-mono text-sm sm:text-base">{formatPrice(plan.total)}</span>
              {plan.perMonth ? (
                <span
                  className={cn(
                    "mt-0.5 block whitespace-nowrap text-xs",
                    plan.best ? "text-background/70" : "text-muted-foreground"
                  )}
                >
                  ~{formatPrice(plan.perMonth)}/mo
                </span>
              ) : null}
            </td>
            <td className="px-4 py-4 text-right align-top sm:px-6">
              {plan.save ? (
                <>
                  <Badge
                    variant="outline"
                    className={cn(
                      "tracking-label text-[10px]",
                      plan.best
                        ? "border-background/40 text-background"
                        : "border-border text-foreground"
                    )}
                  >
                    {plan.save}
                  </Badge>
                  {plan.note ? (
                    <span
                      className={cn(
                        "mt-1.5 block text-xs",
                        plan.best ? "text-background/70" : "text-muted-foreground"
                      )}
                    >
                      {plan.note}
                    </span>
                  ) : null}
                </>
              ) : (
                <span
                  className={cn(
                    "font-mono text-xs",
                    plan.best ? "text-background/70" : "text-muted-foreground"
                  )}
                >
                  {formatPrice(plan.total)}/mo
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function RateCard({
  no,
  name,
  summary,
  children,
  className,
}: {
  no: string;
  name: string;
  summary: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card/50",
        className
      )}
    >
      <div className="relative overflow-hidden border-b border-border/60 bg-tar-road px-6 py-6">
        <DotPattern
          width={14}
          height={14}
          className={cn(
            "fill-white/[0.05]",
            "[mask-image:radial-gradient(220px_circle_at_80%_50%,white,transparent)]"
          )}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-5 top-3 font-display text-3xl text-white/10"
        >
          {no}
        </span>
        <h3 className="relative z-10 font-display text-2xl text-white sm:text-3xl">
          {name}
        </h3>
        <p className="relative z-10 mt-2 max-w-sm text-sm text-white/60">
          {summary}
        </p>
      </div>
      {children}
    </article>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Official rate card"
          title="Straight prices, no surprises"
          description="Pay by the day, the month or the year. Longer plans cost less per month, skip the registration fee and add free months — the annual plan gives you four."
        />

        {/* Membership tiers */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {membershipTiers.map((tier, i) => (
            <BlurFade key={tier.id} delay={0.12 + i * 0.1} inView>
              <RateCard no={`0${i + 1}`} name={tier.name} summary={tier.summary}>
                <div className="flex items-center justify-between gap-4 border-b border-border/60 px-6 py-4">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Ticket className="size-4 text-foreground" />
                    Daily pass
                  </span>
                  <span className="font-mono text-base text-foreground">
                    {formatPrice(tier.dailyPass)}
                  </span>
                </div>
                <PlanTable caption={`${tier.name} membership plans`} plans={tier.plans} />
              </RateCard>
            </BlurFade>
          ))}
        </div>

        {/* Registration & fees */}
        <BlurFade delay={0.2} inView>
          <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-3">
            {fees.map((fee) => (
              <div key={fee.label} className="flex flex-col gap-2 bg-card/60 p-6">
                <p className="text-xs tracking-label text-muted-foreground">
                  {fee.label}
                </p>
                <p
                  className={cn(
                    "font-mono text-2xl text-foreground",
                    fee.waived && "flex items-center gap-2"
                  )}
                >
                  {fee.waived ? <BadgeCheck className="size-5" /> : null}
                  {fee.amount}
                </p>
                <p className="text-sm text-muted-foreground">{fee.note}</p>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* Personal training */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Personal training"
            title="Elevate your performance"
            description={`Train one-on-one with a coach who builds the plan around you. ${trainingRequiresMembership}`}
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {trainingPackages.map((pkg, i) => (
              <BlurFade key={pkg.id} delay={0.12 + i * 0.1} inView>
                <RateCard
                  no={`0${i + 1}`}
                  name={pkg.name}
                  summary={pkg.summary}
                >
                  <div className="flex flex-wrap gap-2 border-b border-border/60 px-6 py-4">
                    {pkg.focus.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="tracking-label text-[10px] font-normal"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <PlanTable caption={`${pkg.name} packages`} plans={pkg.plans} />
                </RateCard>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Footnote + CTA */}
        <BlurFade delay={0.25} inView>
          <div className="mt-12 flex flex-col gap-6 rounded-xl border border-border/60 bg-tar-road p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-display text-2xl text-white">
                Join today. The journey starts now.
              </p>
              <p className="text-sm text-white/60">
                All prices in Nepali rupees (NPR). Card fee included in every
                3, 6 and 12-month plan.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 text-sm tracking-label text-white/70 transition-colors hover:text-white"
              >
                <Phone className="size-4" />
                {siteConfig.phoneDisplay}
              </a>
              <Link href="#contact">
                <ShimmerButton className="tracking-label text-xs font-medium">
                  Get started
                  <ArrowRight className="ml-2 size-4" />
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
