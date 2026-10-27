import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

/**
 * Profile screenshots that link out to the real accounts.
 *
 * Deliberately not live embeds: Instagram and TikTok rate-limit their embeds
 * ("Too many requests"), render with large blank areas, and load third-party
 * scripts. A screenshot is instant and always looks right. To refresh one, save
 * a new screenshot over the file in `public/images/social/` (light-mode
 * Instagram, ~800px wide, with personal UI like follower names and the
 * Following/Message buttons cropped out) — the follower counts in the picture
 * go stale, so re-shoot it every few months.
 */
const profiles = [
  {
    network: "Instagram",
    icon: <InstagramIcon className="size-5" />,
    handle: siteConfig.instagram.handle,
    href: siteConfig.instagram.href,
    image: "/images/social/instagram-profile.jpg",
    alt: "The LOG Instagram profile: gym floor reels and posts",
  },
  {
    network: "TikTok",
    icon: <TikTokIcon className="size-5" />,
    handle: siteConfig.tiktok.handle,
    href: siteConfig.tiktok.href,
    image: "/images/social/tiktok-profile.jpg",
    alt: "The LOG TikTok profile: gym floor videos",
  },
] as const;

export function Social() {
  return (
    <section id="social" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="On the feed"
          title="See the floor in motion"
          description="Real sessions, real members — straight from our Instagram and TikTok. Follow along and tag us when you train."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {profiles.map((p, i) => (
            <BlurFade key={p.network} delay={0.12 + i * 0.1} inView>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card/50">
                <div className="flex items-center justify-between gap-4 border-b border-border/60 bg-tar-road px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground">
                      {p.icon}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-white">
                        {p.network}
                      </h3>
                      <p className="text-xs tracking-label text-white/50">
                        {p.handle}
                      </p>
                    </div>
                  </div>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs tracking-label text-white/70 transition-colors hover:text-white"
                  >
                    Follow
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>

                <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.handle} on ${p.network}`}
                    className="group relative block aspect-[800/1316] w-full max-w-sm overflow-hidden rounded-lg border border-border/60"
                  >
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 90vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="absolute inset-x-0 bottom-4 flex justify-center">
                      <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium tracking-label text-tar-road shadow-lg transition-transform group-hover:scale-105">
                        View on {p.network}
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </span>
                  </a>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
