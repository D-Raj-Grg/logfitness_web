import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Programs } from "@/components/sections/programs";
import { Shop } from "@/components/sections/shop";
import { Membership } from "@/components/sections/membership";
import { Contact } from "@/components/sections/contact";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Highlights />
        <Programs />
        <Shop />
        <Membership />
        <Contact />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
