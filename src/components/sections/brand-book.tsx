import { Download, ExternalLink, FileText } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const docs = [
  {
    title: "Logo & Identity Presentation",
    meta: "19 pages · The mark, the rules, the merchandise",
    href: "/brand/LOG-Logo-Identity-Presentation.pdf",
    tag: "Identity",
  },
  {
    title: "Investment Pitch Deck & Brand Book",
    meta: "Brand identity · visual language · growth pillars",
    href: "/brand/LOG-Fitness-Pitch-Deck.pdf",
    tag: "Pitch",
  },
];

export function BrandBook() {
  return (
    <section id="brand-book" className="border-b border-border/60 bg-tar-road-elevated/30">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="04 — Handover"
          title="The brand book"
          description="A logo is what you show. An identity is what survives ten suppliers, three cities and five years. Read the full documents below."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Document list */}
          <div className="space-y-5">
            {docs.map((doc, i) => (
              <BlurFade key={doc.href} delay={0.15 + i * 0.12} inView>
                <div className="flex flex-col gap-5 rounded-xl border border-border/60 bg-card/60 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground">
                      <FileText className="size-5" />
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {doc.title}
                        </h3>
                        <Badge variant="secondary" className="tracking-label">
                          {doc.tag}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{doc.meta}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={doc.href} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4" />
                        View
                      </a>
                    </Button>
                    <Button asChild size="sm">
                      <a href={doc.href} download>
                        <Download className="size-4" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              </BlurFade>
            ))}

            <BlurFade delay={0.4} inView>
              <p className="px-1 text-xs leading-relaxed text-muted-foreground/70">
                Give suppliers the master files and these rules. If a proof comes
                back looking wrong — a gradient, a metallic, a redrawn mark —
                reject it. Two colours, no exceptions.
              </p>
            </BlurFade>
          </div>

          {/* Inline preview */}
          <BlurFade delay={0.25} inView>
            <div className="overflow-hidden rounded-xl border border-border/60 bg-tar-road">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="ml-2 text-xs tracking-label text-muted-foreground">
                  Identity Presentation · Preview
                </span>
              </div>
              <object
                data="/brand/LOG-Logo-Identity-Presentation.pdf#view=FitH&toolbar=0"
                type="application/pdf"
                className="h-[440px] w-full"
                aria-label="LOG Logo & Identity Presentation preview"
              >
                <div className="flex h-[440px] flex-col items-center justify-center gap-4 p-8 text-center">
                  <FileText className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Your browser can&apos;t display the PDF inline.
                  </p>
                  <Button asChild size="sm">
                    <a
                      href="/brand/LOG-Logo-Identity-Presentation.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open the presentation
                    </a>
                  </Button>
                </div>
              </object>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
