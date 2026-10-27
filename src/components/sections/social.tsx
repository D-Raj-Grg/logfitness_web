import Script from "next/script";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

/**
 * Live Instagram + TikTok profile feeds, using each platform's own public
 * profile embed — no API key, login or token. Both load in the visitor's
 * browser, so the section keeps working as new posts go up. Each frame is a
 * tall 9:16-ish panel that scrolls inside itself; the "Open on …" link is the
 * fallback if a platform's embed is blocked (ad-blockers, privacy modes).
 */
function Feed({
  icon,
  network,
  handle,
  href,
  children,
}: {
  icon: React.ReactNode;
  network: string;
  handle: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card/50">
      <div className="flex items-center justify-between gap-4 border-b border-border/60 bg-tar-road px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground">
            {icon}
          </span>
          <div>
            <h3 className="font-display text-xl text-white">{network}</h3>
            <p className="text-xs tracking-label text-white/50">{handle}</p>
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs tracking-label text-white/70 transition-colors hover:text-white"
        >
          Follow
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      {/* 9:16 frame — scrolls inside itself so the page stays short. */}
      <div className="mx-auto w-full max-w-md flex-1 p-4 sm:p-6">
        <div className="aspect-[9/16] w-full overflow-y-auto overflow-x-hidden rounded-lg bg-white">
          {children}
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="border-t border-border/60 px-6 py-4 text-center text-xs tracking-label text-muted-foreground transition-colors hover:text-foreground"
      >
        Open on {network}
      </a>
    </article>
  );
}

export function Social() {
  const { instagram, tiktok } = siteConfig;

  return (
    <section id="social" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="On the feed"
          title="See the floor in motion"
          description="Real sessions, real members — straight from our Instagram and TikTok. Follow along and tag us when you train."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <BlurFade delay={0.12} inView>
            <Feed
              icon={<InstagramIcon className="size-5" />}
              network="Instagram"
              handle={instagram.handle}
              href={instagram.href}
            >
              <iframe
                src={`https://www.instagram.com/${instagram.username}/embed/`}
                title={`${instagram.handle} on Instagram`}
                loading="lazy"
                className="block size-full border-0"
                allowFullScreen
              />
            </Feed>
          </BlurFade>

          <BlurFade delay={0.22} inView>
            <Feed
              icon={<TikTokIcon className="size-5" />}
              network="TikTok"
              handle={tiktok.handle}
              href={tiktok.href}
            >
              {/* TikTok's creator embed: embed.js swaps this blockquote for an iframe. */}
              <blockquote
                className="tiktok-embed"
                cite={tiktok.href}
                data-unique-id={tiktok.username}
                data-embed-type="creator"
                style={{ maxWidth: "780px", minWidth: "288px", margin: 0 }}
              >
                <section>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${tiktok.href}?refer=creator_embed`}
                  >
                    {tiktok.handle}
                  </a>
                </section>
              </blockquote>
              <Script
                src="https://www.tiktok.com/embed.js"
                strategy="lazyOnload"
              />
            </Feed>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
