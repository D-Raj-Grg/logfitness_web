/**
 * LOG's official rate card — the single source of truth for every price shown
 * on the site (and in the JSON-LD offer catalog). All amounts are in Nepali
 * rupees (NPR). Update here when the front-desk rate card changes.
 */

export const currency = {
  code: "NPR",
  symbol: "Rs",
} as const;

export type Plan = {
  /** Length of the plan, e.g. "3 Months". */
  term: string;
  /** Total paid up front (after any discount). */
  total: number;
  /** Undiscounted price (the month-to-month rate × months), shown struck through. */
  original?: number;
  /** Approximate effective monthly rate for multi-month plans. */
  perMonth?: number;
  /** Saving vs. paying month-to-month, e.g. "20% off". */
  save?: string;
  /** Extra line under the saving, e.g. "Best for beginners". */
  note?: string;
  /** Highlight as the best-value plan. */
  best?: boolean;
};

export type MembershipTier = {
  id: string;
  name: string;
  summary: string;
  /** Walk-in day rate — omit when the rate card doesn't list one. */
  dailyPass?: number;
  plans: Plan[];
};

export const membershipTiers: MembershipTier[] = [
  {
    id: "gym",
    name: "Gym",
    summary: "Build. Strength. Confidence. Full access to the strength floor.",
    plans: [
      { term: "1 Month", total: 2200 },
      {
        term: "3 Months",
        total: 5808,
        original: 6600,
        perMonth: 1936,
        save: "12% off",
      },
      {
        term: "6 Months",
        total: 10560,
        original: 13200,
        perMonth: 1760,
        save: "20% off",
      },
      {
        term: "12 Months",
        total: 18480,
        original: 26400,
        perMonth: 1540,
        save: "30% off",
      },
    ],
  },
  {
    id: "gym-cardio",
    name: "Gym + Cardio",
    summary:
      "Build muscle. Burn calories. Stay fit. The strength floor plus the cardio zone.",
    plans: [
      { term: "1 Month", total: 3000 },
      {
        term: "3 Months",
        total: 7650,
        original: 9000,
        perMonth: 2550,
        save: "15% off",
      },
      {
        term: "6 Months",
        total: 14400,
        original: 18000,
        perMonth: 2400,
        save: "20% off",
      },
      {
        term: "12 Months",
        total: 25200,
        original: 36000,
        perMonth: 2100,
        save: "30% off",
        best: true,
      },
    ],
  },
];

export type Fee = {
  label: string;
  amount: string;
  note: string;
};

export const fees: Fee[] = [
  {
    label: "Admission fee",
    amount: "Rs 500",
    note: "One-time, when you join",
  },
  {
    label: "Card fee",
    amount: "Rs 200",
    note: "Your member card",
  },
];

export type TrainingPackage = {
  id: string;
  name: string;
  summary: string;
  focus: string[];
  plans: Plan[];
};

export const trainingPackages: TrainingPackage[] = [
  {
    id: "dedicated",
    name: "Dedicated Fitness Trainer",
    summary: "One-on-one coaching to train with intent — every session planned.",
    focus: ["Form guidance", "Sport prep", "Structured workout plans"],
    plans: [
      { term: "1 Month", total: 5000 },
      { term: "3 Months", total: 13000, perMonth: 4330, save: "Save ~15%" },
      { term: "6 Months", total: 22000, perMonth: 3660, save: "Save ~27%" },
      { term: "12 Months", total: 35000, perMonth: 2900, save: "Save ~42%" },
    ],
  },
  {
    id: "elite",
    name: "Elite Master Trainer",
    summary: "Advanced programming and nutrition for a full transformation.",
    focus: [
      "Hypertrophy",
      "Biomechanics",
      "Posture correction",
      "Custom prep",
      "Advanced nutrition coaching",
    ],
    plans: [
      { term: "1 Month", total: 8000 },
      { term: "3 Months", total: 20000, perMonth: 6660, save: "Save ~17%" },
      { term: "6 Months", total: 35000, perMonth: 5830, save: "Save ~27%" },
      { term: "12 Months", total: 50000, perMonth: 4160, save: "Save ~38%" },
    ],
  },
];

/** Every personal-training package sits on top of an active gym membership. */
export const trainingRequiresMembership =
  "All personal-training packages require an active base gym membership.";

/** "Rs 5,400" */
export function formatPrice(amount: number) {
  return `${currency.symbol} ${amount.toLocaleString("en-US")}`;
}
