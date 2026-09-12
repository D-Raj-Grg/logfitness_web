/**
 * Real member reviews pulled from LOG's Google Business Profile.
 *
 * Only ever paste genuine review text here — quotes on this page are
 * attributed to real people, and inventing them would be misrepresenting the
 * gym to prospective members. Leaving the array empty is fine: the Reviews
 * section falls back to a "be the first to review" state.
 *
 * To add one: open the listing → Reviews → copy the text and the reviewer's
 * display name verbatim.
 */

export type Testimonial = {
  /** The review text, exactly as posted. */
  quote: string;
  /** Reviewer's display name as it appears on Google. */
  author: string;
  /** Star rating they left, 1–5. */
  rating: number;
  /** Optional short context, e.g. "Member since 2024". */
  context?: string;
};

export const testimonials: Testimonial[] = [];

/**
 * SAMPLE REVIEWS - NOT REAL PEOPLE.
 *
 * These exist so the reviews marquee can be designed and reviewed before the
 * real ones are collected. The names and words are invented. Do not present
 * them to prospective members as genuine: set SHOW_SAMPLE_REVIEWS to false
 * (or just fill in `testimonials` above, which takes priority) before the
 * site goes live.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    quote:
      "Hetauda ko best gym. Trainer dai haru ekdam helpful chan ani form pani milaidinuhunchha. Six months bhayo, result dekhinchha.",
    author: "Sujan Shrestha",
    rating: 5,
  },
  {
    quote:
      "Zumba class ma ekdam maja aauchha. Instructor didi le pura room nai nachaunu hunchha. Ladies ko lagi safe ra comfortable environment cha.",
    author: "Anisha Tamang",
    rating: 5,
  },
  {
    quote:
      "Equipment sabai naya ra ramro condition ma cha. Peak time ma pani rack khali painchha. Value for money ekdam ramro.",
    author: "Bikash Thapa",
    rating: 5,
  },
  {
    quote:
      "Safa ra sarai ramro gym. Changing room daily clean hunchha, which matters a lot. Staff haru pani polite chan.",
    author: "Prakriti Lamichhane",
    rating: 5,
  },
  {
    quote:
      "Bihana 5 baje khulchha, so office janu bhanda aghi workout sakinchha. Yo nai mero lagi sabai bhanda thulo kura ho.",
    author: "Rojan Gurung",
    rating: 5,
  },
  {
    quote:
      "Dance class ekdam majja. Slot chittai bharinchha though, arko batch thapidiye hunthyo. Baki sabai ramro.",
    author: "Sabina Karki",
    rating: 4,
  },
  {
    quote:
      "Supplement ko lagi ahile Kathmandu dhaunu pardaina. Genuine product painchha reception mai, ani staff le k chahinchha bhanera thik salla dinchan.",
    author: "Nabin Adhikari",
    rating: 5,
  },
  {
    quote:
      "First time gym join gareko, tara kasaile judge gardaina. Trainer haru le beginner lai ramrari sikaunuhunchha. Aayera josh aauchha.",
    author: "Manisha Poudel",
    rating: 5,
  },
  {
    quote:
      "Machines, free weights, cardio, sabai ek thau ma. Annual plan ma char mahina free painchha so ekdam sasto parchha.",
    author: "Sandesh Bhattarai",
    rating: 5,
  },
  {
    quote:
      "Music ramro, crowd ramro, pasina ramrari bagchha. Ahile ta yo mero daily routine nai bhaisakyo.",
    author: "Rita Magar",
    rating: 5,
  },
  {
    quote:
      "Personal training liyeko chu ani plan tyahi anusar banaidinu bhayo. Progress clear cha. Mehnat garne thau ho yo.",
    author: "Aayush Pandey",
    rating: 5,
  },
  {
    quote:
      "Kapur Complex mai cha so location pani convenient. Evening ma classes hunchha, office pachi janna milchha.",
    author: "Sneha Rai",
    rating: 5,
  },
  {
    quote:
      "Overall ramro gym. Bela bela evening ma bhid hunchha, tara equipment ra safai ko lagi chai complaint chaina.",
    author: "Dipesh Chaudhary",
    rating: 4,
  },
  {
    quote:
      "Namaste. LOG join garera dherai khusi chu. Weight loss journey ma trainer didi le dherai support garnu bhayo. Dhanyabad LOG team.",
    author: "Kritika Basnet",
    rating: 5,
  },
];

/**
 * Whether to fall back to the sample reviews above when `testimonials` is
 * empty. Turn this off before launch so the site never shows invented people
 * as real members.
 */
export const SHOW_SAMPLE_REVIEWS = true;

/** The reviews the site actually renders. Real ones always win. */
export const displayedTestimonials: Testimonial[] =
  testimonials.length > 0
    ? testimonials
    : SHOW_SAMPLE_REVIEWS
      ? sampleTestimonials
      : [];

/**
 * Headline numbers from the Google listing. Refresh these when the listing
 * moves — they are shown as reported by Google, not as our own claim, and are
 * deliberately kept out of the JSON-LD (Google ignores self-declared
 * aggregateRating for a business's own page, and it can trigger a penalty).
 */
export const googleRating: {
  score: number;
  count: number;
  checked: string;
} = {
  score: 5.0,
  count: 2,
  /** Last time the two numbers above were checked against the listing. */
  checked: "2026-09",
};
