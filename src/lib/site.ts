/**
 * Single source of truth for LOG's real-world contact details.
 * Update here and every section / footer / metadata reference follows.
 */
export const siteConfig = {
  name: "LOG — Lord of Gyms & Fitness",
  tagline: "Train hard. Wear it louder.",

  // Contact
  phone: "9825254929",
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
    handle: "@logfitnesshtf",
    href: "https://instagram.com/logfitnesshtf",
  },
  tiktok: {
    handle: "@logfitnesshtf",
    href: "https://www.tiktok.com/@logfitnesshtf",
  },
} as const;
