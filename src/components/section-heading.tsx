import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <BlurFade inView>
        <span className="text-xs tracking-label text-muted-foreground">
          {eyebrow}
        </span>
      </BlurFade>
      <BlurFade delay={0.1} inView>
        <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </BlurFade>
      {description ? (
        <BlurFade delay={0.2} inView>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </BlurFade>
      ) : null}
    </div>
  );
}
