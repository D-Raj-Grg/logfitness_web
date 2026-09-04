import Link from "next/link";
import { MapPin, Phone, Smartphone } from "lucide-react";

import { LogMark } from "@/components/log-mark";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const exploreLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Supplements", href: "#shop" },
  { label: "Membership", href: "#membership" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const brandKit = [
  { label: "Brand book (PDF)", href: "/brand/LOG-Logo-Identity-Presentation.pdf" },
  { label: "Pitch deck (PDF)", href: "/brand/LOG-Fitness-Pitch-Deck.pdf" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-tar-road">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-5">
            <LogMark className="h-7 w-auto" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Lord of Gyms &amp; Fitness — a premium fitness destination and
              athletic streetwear identity from {siteConfig.address.city},
              Nepal.
            </p>
            <p className="text-xs tracking-label text-muted-foreground/70">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-2 pt-1">
              <SocialButton
                href={siteConfig.instagram.href}
                label="Instagram"
              >
                <InstagramIcon className="size-4" />
              </SocialButton>
              <SocialButton href={siteConfig.tiktok.href} label="TikTok">
                <TikTokIcon className="size-4" />
              </SocialButton>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
              {brandKit.map((doc) => (
                <a
                  key={doc.href}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {doc.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs tracking-label text-foreground">Explore</p>
              <ul className="space-y-2">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs tracking-label text-foreground">Follow</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={siteConfig.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.tiktok.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
            </div>

            <address className="space-y-3 not-italic">
              <p className="text-xs tracking-label text-foreground">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={siteConfig.phoneHref}
                    className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Phone className="mt-0.5 size-4 shrink-0" />
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.mobile.href}
                    className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Smartphone className="mt-0.5 size-4 shrink-0" />
                    {siteConfig.mobile.display}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.address.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    {siteConfig.address.line}
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}
            {" "}Lord of Gyms &amp; Fitness (LOG). All rights reserved.
          </p>
          <p className="tracking-label">
            {siteConfig.address.city} · {siteConfig.address.country}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary/40 text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
    >
      {children}
    </a>
  );
}
