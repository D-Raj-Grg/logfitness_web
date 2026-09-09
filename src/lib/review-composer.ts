/**
 * The review composer's phrase bank.
 *
 * A member picks a star rating and taps the things they want to mention; this
 * assembles a draft they can copy into Google. Every part is drawn from a pool
 * of variants and the sentences are shuffled, so two members who pick the same
 * chips still get visibly different text — a fixed template posted verbatim by
 * dozens of accounts is exactly what Google's duplicate filter removes.
 *
 * The draft is a starting point, not a script: the composer tells the member to
 * edit it in their own words before posting.
 */

export type Tone = "praise" | "improve";

export type Aspect = {
  id: string;
  /** Chip label when the rating is 4–5 stars. */
  label: string;
  /** Chip label when the rating is 1–3 stars. */
  improveLabel: string;
  praise: string[];
  improve: string[];
};

/** Ratings at or below this switch the composer into "what could be better". */
export const CRITICAL_MAX = 3;

export const aspects: Aspect[] = [
  {
    id: "trainers",
    label: "Trainers & coaching",
    improveLabel: "Coaching",
    praise: [
      "The trainers actually watch your form and correct it instead of just sitting at the desk.",
      "Coaching here is proper — they built me a plan and kept adjusting it as I got stronger.",
      "The trainers know what they're doing and they're patient with beginners.",
    ],
    improve: [
      "The trainers could spend more time on the floor helping people with their form.",
      "I'd like more guidance from the coaching staff, especially for beginners.",
    ],
  },
  {
    id: "equipment",
    label: "Equipment",
    improveLabel: "Equipment",
    praise: [
      "The equipment is well maintained and there's enough of it that you're not queuing for a rack.",
      "Good range of machines and free weights — everything I need for a full session.",
      "Machines and plates are in solid condition, nothing broken or held together with tape.",
    ],
    improve: [
      "Some of the machines could use servicing, and a few more plates would help at peak time.",
      "It gets hard to find a free rack in the evening — more equipment would fix that.",
    ],
  },
  {
    id: "cleanliness",
    label: "Cleanliness",
    improveLabel: "Cleanliness",
    praise: [
      "The place is genuinely clean — floors, mats and changing area all kept properly.",
      "Cleanliness is one of the best things here, it never smells or feels neglected.",
      "They keep the gym spotless, which honestly isn't common around here.",
    ],
    improve: [
      "The changing area could be cleaned more often, especially in the evening.",
      "Cleanliness slips a bit at busy times — more frequent wipe-downs would help.",
    ],
  },
  {
    id: "classes",
    label: "Zumba & dance",
    improveLabel: "Classes",
    praise: [
      "The Zumba and dance classes are a lot of fun — good energy and a proper workout.",
      "I come mainly for the dance classes and the instructor keeps the whole room going.",
      "Zumba sessions are well run and never feel repetitive.",
    ],
    improve: [
      "More class timings would help — the current slots don't suit everyone's schedule.",
      "The dance classes fill up fast; a second batch would be good.",
    ],
  },
  {
    id: "cardio",
    label: "Cardio floor",
    improveLabel: "Cardio floor",
    praise: [
      "Cardio section has everything — treadmills, cycles, and they all actually work.",
      "Good cardio setup, I can get a full session in without waiting for a machine.",
      "The cardio floor is well laid out and never feels cramped.",
    ],
    improve: [
      "A couple more treadmills would help, they're all taken in the morning.",
      "The cardio machines could use better maintenance.",
    ],
  },
  {
    id: "supplements",
    label: "Supplement bar",
    improveLabel: "Supplement bar",
    praise: [
      "Handy that they stock genuine supplements in-house — no guessing whether it's real.",
      "The supplement bar saves a trip; the staff explain what you actually need instead of upselling.",
      "Good to have protein and supplements available right at the gym.",
    ],
    improve: [
      "The supplement bar could stock a wider range of brands.",
      "Would be good to see more options at the supplement counter.",
    ],
  },
  {
    id: "value",
    label: "Value for money",
    improveLabel: "Pricing",
    praise: [
      "For what you get, the membership is very reasonably priced.",
      "Value for money is strong — the facilities are well above what the fee suggests.",
      "The rates are fair, especially on the longer plans.",
    ],
    improve: [
      "The pricing feels a little steep for what's currently on offer.",
      "Some more flexibility in the membership plans would be welcome.",
    ],
  },
  {
    id: "hours",
    label: "Opening hours",
    improveLabel: "Opening hours",
    praise: [
      "Opening early makes a real difference — I can train before work and still make it on time.",
      "The timings work well for me, early morning and late evening are both covered.",
      "Long opening hours mean I can come whenever my day allows.",
    ],
    improve: [
      "Slightly longer hours in the evening would help those of us who finish work late.",
      "The timings are a bit tight — opening earlier or closing later would be better.",
    ],
  },
  {
    id: "atmosphere",
    label: "Atmosphere",
    improveLabel: "Atmosphere",
    praise: [
      "The atmosphere pushes you — serious about training but nobody's judging you.",
      "Good crowd and good music, it's the kind of place that makes you want to show up.",
      "Everyone here is friendly and it's a genuinely motivating environment.",
    ],
    improve: [
      "It gets very crowded at peak hours, which changes the whole atmosphere.",
      "Some gym etiquette reminders would help — weights often aren't racked.",
    ],
  },
  {
    id: "staff",
    label: "Front desk",
    improveLabel: "Front desk",
    praise: [
      "Front desk staff are polite and sort out membership questions without any fuss.",
      "The reception team is helpful and remembers regulars by name.",
      "Signing up was quick and the staff explained every plan clearly.",
    ],
    improve: [
      "Reception can be slow to respond when it's busy.",
      "Clearer information about the membership plans at the desk would help.",
    ],
  },
];

const openers: Record<Tone, string[]> = {
  praise: [
    "Been training at LOG for a while now and it's easily the best gym in Hetauda.",
    "Joined LOG a few months back and I'm really glad I did.",
    "LOG has become my regular gym and I'd recommend it to anyone in Hetauda.",
    "Really happy with LOG Fitness.",
    "Great experience at LOG so far.",
  ],
  improve: [
    "I've been training at LOG and there's a lot to like, but a few things could be better.",
    "Decent gym overall, though there's room for improvement.",
    "Mixed experience at LOG.",
    "LOG has potential but a few things need attention.",
  ],
};

const closers: Record<Tone, string[]> = {
  praise: [
    "Highly recommended if you're looking for a serious gym in Hetauda.",
    "Worth every rupee — would definitely recommend.",
    "If you're thinking about joining, go for it.",
    "Happy to be a member here.",
    "Five stars from me.",
  ],
  improve: [
    "Hoping these get sorted, because the basics are already there.",
    "Would happily raise this if things improve.",
    "Still worth a look, but there's work to do.",
    "Sharing this as honest feedback rather than a complaint.",
  ],
};

/** Small deterministic PRNG so a re-roll produces a different, repeatable draft. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(items: readonly T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)];
}

function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function toneFor(rating: number): Tone {
  return rating > CRITICAL_MAX ? "praise" : "improve";
}

/**
 * Assemble a draft review from the chosen rating and aspects.
 *
 * `seed` changes the wording without changing the selection — that is what the
 * "try another wording" button passes.
 */
export function composeReview(
  rating: number,
  selected: string[],
  seed: number
): string {
  if (!rating) return "";

  const rng = mulberry32(seed + rating * 7919);
  const tone = toneFor(rating);

  const chosen = aspects.filter((a) => selected.includes(a.id));
  const lines = shuffle(chosen, rng).map((a) => pick(a[tone], rng));

  return [pick(openers[tone], rng), ...lines, pick(closers[tone], rng)]
    .join(" ")
    .trim();
}
