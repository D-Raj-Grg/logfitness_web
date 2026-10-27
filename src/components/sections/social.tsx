import Image from "next/image";
import Script from "next/script";
import { ArrowUpRight, Play } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { socialPosts } from "@/lib/social-posts";

/**
 * Instagram + TikTok, two ways:
 *  - Curated tiles (src/lib/social-posts.ts): static 9:16 thumbnails that link
 *    to the post. Fast, can't be rate-limited, no third-party scripts.
 *  - Live profile embeds (the default until tiles are added): each platform's
 *    own public embed — no API key or login — but they can show "Too many
 *    requests", so the "Open on …" link stays as the way out.
 */
function Feed({
  icon,
  network,
  handle,
  href,
  frameClassName,
  children,
}: {
  icon: React.ReactNode;
  network: string;
  handle: string;
  href: string;
  /** Height of the embed frame — sized to what each platform renders. */
  frameClassName: string;
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

      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div
          className={cn(
            "w-full max-w-sm overflow-y-auto overflow-x-hidden rounded-lg bg-white",
            frameClassName
          )}
        >
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

function Tiles() {
  return (
    <ul className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
      {socialPosts.map((post, i) => {
        const network = post.platform === "instagram" ? "Instagram" : "TikTok";
        return (
          <li key={post.href}>
            <BlurFade delay={0.08 + (i % 6) * 0.06} inView>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${post.alt} — open on ${network}`}
                className="group relative block aspect-[9/16] overflow-hidden rounded-xl border border-border/60 bg-tar-road transition-colors hover:border-border"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-tar-road/80 text-white backdrop-blur-sm">
                  {post.platform === "instagram" ? (
                    <InstagramIcon className="size-4" />
                  ) : (
                    <TikTokIcon className="size-4" />
                  )}
                </span>
                {post.video ? (
                  <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-white text-tar-road transition-transform group-hover:scale-110">
                    <Play className="size-4 fill-current" />
                  </span>
                ) : null}
              </a>
            </BlurFade>
          </li>
        );
      })}
    </ul>
  );
}

function FollowLinks() {
  const { instagram, tiktok } = siteConfig;
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
      {[
        { icon: <InstagramIcon className="size-4" />, handle: instagram.handle, href: instagram.href, network: "Instagram" },
        { icon: <TikTokIcon className="size-4" />, handle: tiktok.handle, href: tiktok.href, network: "TikTok" },
      ].map((l) => (
        <a
          key={l.network}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm tracking-label text-muted-foreground transition-colors hover:text-foreground"
        >
          {l.icon}
          {l.network} {l.handle}
          <ArrowUpRight className="size-3.5" />
        </a>
      ))}
    </div>
  );
}

export function Social() {
  const { instagram, tiktok } = siteConfig;
  const curated = socialPosts.length > 0;

  return (
    <section id="social" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="On the feed"
          title="See the floor in motion"
          description="Real sessions, real members — straight from our Instagram and TikTok. Follow along and tag us when you train."
        />

        {curated ? (
          <>
            <Tiles />
            <FollowLinks />
          </>
        ) : (
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <BlurFade delay={0.12} inView>
            <Feed
              icon={<InstagramIcon className="size-5" />}
              network="Instagram"
              handle={instagram.handle}
              href={instagram.href}
              frameClassName="h-[400px]"
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
              frameClassName="h-[430px]"
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
        )}
      </div>
    </section>
  );
}
