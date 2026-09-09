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
