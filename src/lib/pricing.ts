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
  /** Total paid up front. */
  total: number;
  /** Approximate effective monthly rate for multi-month plans. */
  perMonth?: number;
  /** Saving vs. paying month-to-month, e.g. "Save 20%". */
  save?: string;
  /** Extra line under the saving, e.g. "4 months free". */
  note?: string;
  /** Highlight as the best-value plan. */
  best?: boolean;
};

export type MembershipTier = {
  id: string;
  name: string;
  summary: string;
  dailyPass: number;
  plans: Plan[];
};

export const membershipTiers: MembershipTier[] = [
  {
    id: "gym",
    name: "Gym Only",
    summary: "Full access to the strength floor — free weights, racks and machines.",
    dailyPass: 200,
    plans: [
      { term: "1 Month", total: 2000 },
      { term: "3 Months", total: 5400, perMonth: 1800, save: "Save 10%" },
      { term: "6 Months", total: 9600, perMonth: 1600, save: "Save 20%" },
      {
        term: "12 Months",
        total: 16000,
        perMonth: 1333,
        save: "Save 33%",
        note: "4 months free",
      },
    ],
  },
  {
    id: "gym-cardio",
    name: "Gym + Cardio",
    summary: "Everything in Gym Only, plus the cardio and conditioning zone.",
    dailyPass: 250,
    plans: [
      { term: "1 Month", total: 2500 },
      { term: "3 Months", total: 6600, perMonth: 2200, save: "Save 12%" },
      { term: "6 Months", total: 12000, perMonth: 2000, save: "Save 20%" },
      {
        term: "12 Months",
        total: 20000,
        perMonth: 1667,
        save: "Save 33%",
        note: "4 months free",
        best: true,
      },
    ],
  },
];

export type Fee = {
  label: string;
  amount: string;
  note: string;
  waived?: boolean;
};

export const fees: Fee[] = [
  {
    label: "Registration & card fee",
    amount: "Rs 500",
    note: "Paid on day one with a 1-month plan",
  },
  {
    label: "3, 6 & 12-month plans",
    amount: "Free",
    note: "Registration and card fee waived",
    waived: true,
  },
  {
    label: "Lost card replacement",
    amount: "Rs 300 – 500",
    note: "Standard fee",
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
