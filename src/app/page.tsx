import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { Programs } from "@/components/sections/programs";
import { Shop } from "@/components/sections/shop";
import { Membership } from "@/components/sections/membership";
import { Pricing } from "@/components/sections/pricing";
import { Reviews } from "@/components/sections/reviews";
import { Contact } from "@/components/sections/contact";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Ticker />
        <Programs />
        <Shop />
        <Membership />
        <Pricing />
        <Reviews />
        <Contact />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
