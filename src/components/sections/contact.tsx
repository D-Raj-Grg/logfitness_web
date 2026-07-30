import { MapPin, Phone } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="05 — Find us"
          title="Come train with us"
          description="Walk in, call, or follow the movement. The doors, the phone, and the feed are all open."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {/* Visit */}
          <BlurFade delay={0.15} inView className="lg:col-span-2">
            <a
              href={siteConfig.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-xl border border-border/60 bg-tar-road p-8 transition-colors hover:border-border"
            >
              <DotPattern
                className={cn(
                  "fill-white/[0.05]",
                  "[mask-image:radial-gradient(420px_circle_at_70%_20%,white,transparent)]"
                )}
              />
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground transition-colors group-hover:bg-secondary">
                  <MapPin className="size-5" />
                </span>
                <span className="text-xs tracking-label text-muted-foreground">
                  Visit the gym
                </span>
              </div>
              <div className="relative z-10 space-y-2">
                <p className="font-display text-3xl leading-none text-foreground sm:text-4xl">
                  {siteConfig.address.line}
                </p>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.address.country} · Get directions
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
            </a>
          </BlurFade>

          {/* Call */}
          <BlurFade delay={0.25} inView>
            <a
              href={siteConfig.phoneHref}
              className="group flex h-full min-h-[260px] flex-col justify-between rounded-xl border border-border/60 bg-card/60 p-8 transition-colors hover:border-border hover:bg-card"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground transition-colors group-hover:bg-secondary">
                  <Phone className="size-5" />
                </span>
                <span className="text-xs tracking-label text-muted-foreground">
                  Call / WhatsApp
                </span>
              </div>
              <div className="space-y-2">
                <p className="font-mono text-2xl text-foreground sm:text-3xl">
                  {siteConfig.phoneDisplay}
                </p>
                <p className="text-sm text-muted-foreground">
                  Memberships, merch drops &amp; enquiries
                </p>
              </div>
            </a>
          </BlurFade>
        </div>

        {/* Social row */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <BlurFade delay={0.2} inView>
            <SocialCard
              icon={<InstagramIcon className="size-5" />}
              network="Instagram"
              handle={siteConfig.instagram.handle}
              href={siteConfig.instagram.href}
            />
          </BlurFade>
          <BlurFade delay={0.3} inView>
            <SocialCard
              icon={<TikTokIcon className="size-5" />}
              network="TikTok"
              handle={siteConfig.tiktok.handle}
              href={siteConfig.tiktok.href}
            />
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

function SocialCard({
  icon,
  network,
  handle,
  href,
}: {
  icon: React.ReactNode;
  network: string;
  handle: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-border hover:bg-card"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
          {icon}
        </span>
        <div>
          <p className="text-xs tracking-label text-muted-foreground">
            {network}
          </p>
          <p className="font-semibold text-foreground">{handle}</p>
        </div>
      </div>
      <span className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground">
        →
      </span>
    </a>
  );
}
