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
      "The trainers actually watch your form and correct you instead of sitting at the desk.",
      "They made me a proper plan and kept changing it as I got stronger.",
      "Trainers know their stuff and they're patient if you're new to this.",
    ],
    improve: [
      "The trainers could spend more time on the floor helping people with form.",
      "Would like a bit more guidance from the coaches, especially for beginners.",
    ],
  },
  {
    id: "equipment",
    label: "Equipment",
    improveLabel: "Equipment",
    praise: [
      "Equipment is well looked after and there's enough of it that you're not waiting for a rack.",
      "Good range of machines and free weights. Everything I need for a full session.",
      "Machines and plates are all in good condition. Nothing broken or taped up.",
    ],
    improve: [
      "Some machines need servicing and a few more plates would help at peak time.",
      "Hard to get a free rack in the evening. More equipment would sort that out.",
    ],
  },
  {
    id: "cleanliness",
    label: "Cleanliness",
    improveLabel: "Cleanliness",
    praise: [
      "The place is properly clean. Floors, mats, changing room, all of it.",
      "Cleanliness is one of the best things here. It never smells.",
      "They keep it spotless, which honestly isn't that common around here.",
    ],
    improve: [
      "Changing area needs cleaning more often, especially in the evening.",
      "Cleanliness slips a bit when it gets busy. More frequent wipe downs would help.",
    ],
  },
  {
    id: "classes",
    label: "Zumba & dance",
    improveLabel: "Classes",
    praise: [
      "Zumba and dance classes are good fun and a proper workout.",
      "I mostly come for the dance classes. The instructor keeps the whole room going.",
      "Zumba sessions are well run and they never get boring.",
    ],
    improve: [
      "More class timings would help. The slots right now don't suit everyone.",
      "Dance classes fill up fast. A second batch would be good.",
    ],
  },
  {
    id: "cardio",
    label: "Cardio floor",
    improveLabel: "Cardio floor",
    praise: [
      "Cardio section has everything. Treadmills, cycles, and they all work.",
      "Good cardio setup. I can finish a session without waiting for a machine.",
      "The cardio floor is well laid out and never feels packed.",
    ],
    improve: [
      "A couple more treadmills would help. They're all taken in the morning.",
      "The cardio machines could be maintained a bit better.",
    ],
  },
  {
    id: "supplements",
    label: "Supplement bar",
    improveLabel: "Supplement bar",
    praise: [
      "Handy that they keep real supplements in the gym. No worrying about whether it's fake.",
      "The supplement bar saves a trip and the staff tell you what you actually need instead of pushing stuff on you.",
      "Good to have protein and supplements right there at the gym.",
    ],
    improve: [
      "The supplement bar could stock a few more brands.",
      "Would be good to see more options at the supplement counter.",
    ],
  },
  {
    id: "value",
    label: "Value for money",
    improveLabel: "Pricing",
    praise: [
      "For what you get, the fee is very reasonable.",
      "Good value. The place is better than the price suggests.",
      "Rates are fair, especially if you take one of the longer plans.",
    ],
    improve: [
      "Pricing feels a bit steep for what's on offer right now.",
      "Some more flexibility in the membership plans would be welcome.",
    ],
  },
  {
    id: "hours",
    label: "Opening hours",
    improveLabel: "Opening hours",
    praise: [
      "Opening early makes a big difference. I train before work and still get in on time.",
      "Timings suit me well. Early morning and late evening are both covered.",
      "Long opening hours mean I can come whenever I get the time.",
    ],
    improve: [
      "Slightly longer evening hours would help those of us who finish work late.",
      "Timings are a bit tight. Opening earlier or closing later would be better.",
    ],
  },
  {
    id: "atmosphere",
    label: "Atmosphere",
    improveLabel: "Atmosphere",
    praise: [
      "The atmosphere pushes you. People are serious about training but nobody judges you.",
      "Good crowd and good music. It's the kind of place that makes you want to show up.",
      "Everyone here is friendly and it's a motivating place to train.",
    ],
    improve: [
      "Gets very crowded at peak hours and that changes the whole feel of the place.",
      "People often don't rack their weights. A few reminders would help.",
    ],
  },
  {
    id: "staff",
    label: "Front desk",
    improveLabel: "Front desk",
    praise: [
      "Front desk staff are polite and sort out membership questions without any fuss.",
      "The reception team is helpful and they remember the regulars.",
      "Signing up was quick and they explained every plan clearly.",
    ],
    improve: [
      "Reception can be slow to respond when it's busy.",
      "Clearer information about the membership plans at the desk would help.",
    ],
  },
];

const openers: Record<Tone, string[]> = {
  praise: [
    "I've been training at LOG for a few months now and it's the best gym I've been to in Hetauda.",
    "Joined LOG a few months back and I'm really glad I did.",
    "LOG is my regular gym now and I'd tell anyone in Hetauda to check it out.",
    "Really happy with this place.",
    "Good experience at LOG so far.",
  ],
  improve: [
    "I've been training at LOG for a bit. A lot of it is good but a few things need work.",
    "Decent gym overall, but there's room to improve.",
    "Mixed feelings about this one.",
    "LOG has potential but a few things need sorting out.",
  ],
};

const closers: Record<Tone, string[]> = {
  praise: [
    "Would recommend it if you're after a serious gym in Hetauda.",
    "Worth the money. Would recommend.",
    "If you're thinking about joining, just go.",
    "Happy to be a member here.",
    "Five stars from me.",
  ],
  improve: [
    "Hoping these get sorted, because the basics are already there.",
    "Would happily raise my rating if things improve.",
    "Still worth a look, but there's work to do.",
    "Sharing this as honest feedback, not a complaint.",
  ],
};

/** Small deterministic PRNG so a re-roll produces a different, repeatable draft. */
function mulberry32(seed: number) {
  // Scramble first: raw nearby seeds otherwise produce correlated first draws,
  // which would make a re-roll look like the same review again.
  let a = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b) >>> 0;
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
