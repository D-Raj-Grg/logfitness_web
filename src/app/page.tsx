import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Concept } from "@/components/sections/concept";
import { Identity } from "@/components/sections/identity";
import { Merch } from "@/components/sections/merch";
import { BrandBook } from "@/components/sections/brand-book";
import { Contact } from "@/components/sections/contact";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Concept />
        <Identity />
        <Merch />
        <BrandBook />
        <CTA />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
