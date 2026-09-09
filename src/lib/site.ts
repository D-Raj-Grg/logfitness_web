/**
 * Single source of truth for LOG's real-world contact details.
 * Update here and every section / footer / metadata reference follows.
 */

/**
 * Canonical site URL — used for metadata, sitemap, robots and JSON-LD.
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL (set this once a custom domain exists)
 *  2. The Vercel production domain (available at build time on Vercel)
 *  3. A local fallback
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  name: "LOG — Lord of Gyms & Fitness",
  tagline: "Train hard. Wear it louder.",
  url: siteUrl,
  description:
    "Lord of Gyms & Fitness (LOG) — the premium gym at Kapur Complex, Hetauda, Nepal. Strength training, cardio, Zumba and dance classes under one roof, plus a retail bar of genuine protein and supplements.",

  // Contact — the gym landline is the default number everywhere on the site.
  // Hetauda's STD code is 057, so the local form is 057-591985.
  phone: "057591985",
  phoneE164: "+97757591985",
  phoneHref: "tel:+97757591985",
  phoneDisplay: "057-591985",

  // Mobile — secondary line, also on WhatsApp.
  mobile: {
    number: "9825254929",
    e164: "+9779825254929",
    href: "tel:+9779825254929",
    display: "+977 98252 54929",
    whatsappHref: "https://wa.me/9779825254929",
  },

  address: {
    line: "Kapur Complex, Hetauda",
    city: "Hetauda",
    country: "Nepal",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Kapur+Complex+Hetauda+Nepal",
  },

  // Google Business Profile — powers the "leave a review" flow.
  //
  // placeId: get it from https://developers.google.com/maps/documentation/places/web-service/place-id
  // (search "Lord of Gyms & Fitness Hetauda", copy the ChIJ… string). Once it
  // is filled in, `writeReviewHref` below opens Google's write-a-review box
  // directly instead of just the listing.
  google: {
    placeId: "",
    /** Short share link to the listing — the fallback until placeId is set. */
    listingHref: "https://share.google/nLUzzPjw5Pvg4buCA",
  },

  // Social
  instagram: {
    handle: "@logfitnesshtd",
    href: "https://instagram.com/logfitnesshtd",
  },
  tiktok: {
    handle: "@logfitnesshtd",
    href: "https://www.tiktok.com/@logfitnesshtd",
  },
} as const;

/**
 * Deep link that opens Google's "write a review" dialog for LOG.
 *
 * With a Place ID this lands the member straight on the star picker; without
 * one it falls back to the listing, where they still reach reviews in a tap.
 */
export const writeReviewHref = siteConfig.google.placeId
  ? `https://search.google.com/local/writereview?placeid=${siteConfig.google.placeId}`
  : siteConfig.google.listingHref;
