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

  // Contact
  phone: "9825254929",
  phoneE164: "+9779825254929",
  phoneHref: "tel:+9779825254929",
  phoneDisplay: "+977 98252 54929",

  address: {
    line: "Kapur Complex, Hetauda",
    city: "Hetauda",
    country: "Nepal",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Kapur+Complex+Hetauda+Nepal",
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
