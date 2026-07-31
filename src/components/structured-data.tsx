import { siteConfig } from "@/lib/site";

/**
 * JSON-LD structured data (schema.org).
 *
 * ExerciseGym is a LocalBusiness subtype — it powers the Google local pack
 * and knowledge panel for searches like "gym in Hetauda". Keep the details
 * in sync with src/lib/site.ts.
 */
export function StructuredData() {
  const gym = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${siteConfig.url}/#gym`,
    name: "Lord of Gyms & Fitness",
    alternateName: "LOG Fitness",
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    image: `${siteConfig.url}/opengraph-image`,
    logo: `${siteConfig.url}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kapur Complex",
      addressLocality: siteConfig.address.city,
      addressCountry: "NP",
    },
    sameAs: [siteConfig.instagram.href, siteConfig.tiktok.href],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Programs & retail",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strength training" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cardio training" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zumba classes" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dance classes" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Protein & supplement retail" } },
      ],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#gym` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gym) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
