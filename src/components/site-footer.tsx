import { LogMark } from "@/components/log-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-tar-road">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-4">
            <LogMark className="h-7 w-auto" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Lord of Gyms &amp; Fitness — a premium fitness destination and
              athletic streetwear identity. Kathmandu, Nepal.
            </p>
            <p className="text-xs tracking-label text-muted-foreground/70">
              Train hard. Wear it louder.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Brand"
              links={["Concept", "Identity", "Merch", "Brand Book"]}
            />
            <FooterCol
              title="Experience"
              links={["Facility", "Membership", "Merch Drops", "Franchise"]}
            />
            <FooterCol
              title="Social"
              links={["Instagram", "TikTok", "Facebook", "YouTube"]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Lord of Gyms &amp; Fitness (LOG).
            Confidential brand material.
          </p>
          <p className="tracking-label">Kathmandu · Nepal</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="space-y-3">
      <p className="text-xs tracking-label text-foreground">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <span className="cursor-default text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
