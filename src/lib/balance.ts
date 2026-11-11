/**
 * Client for the public membership-balance API (a Supabase edge function).
 *
 * This is the only network call on the marketing site. It is a plain `fetch`
 * on purpose — the site has no Supabase dependency and should stay that way.
 *
 * Members reach the page by scanning the QR printed on their gym card
 * (`/balance?c=0004_k3x9q2mf`). The `c` value is a random per-card token, not
 * the printed number: the number is easy to guess, so on its own it opens
 * nothing and nobody can walk through other members' cards. What it returns is
 * what whoever holds the card may see: first name (the rest as xxxx), the first
 * five digits of the mobile number (the rest as x), the plan, days left and the
 * last payment.
 *
 * Env (both public, inlined at build time):
 *   NEXT_PUBLIC_BALANCE_API — base URL of the edge function,
 *                             e.g. https://<ref>.supabase.co/functions/v1/public-balance
 *   NEXT_PUBLIC_ORG_SLUG    — which gym the card belongs to
 */

// Read at module level so a missing var shows up in every environment. The
// throw happens on first use (not at import) so a page that merely imports
// this module — e.g. during a build without env — still compiles.
const API_URL = process.env.NEXT_PUBLIC_BALANCE_API;
const ORG_SLUG = process.env.NEXT_PUBLIC_ORG_SLUG;

const ENV_ERROR =
  "Balance API is not configured: set NEXT_PUBLIC_BALANCE_API and NEXT_PUBLIC_ORG_SLUG (see .env.example).";

function requireEnv(): { api: string; org: string } {
  if (!API_URL || !ORG_SLUG) {
    console.error(ENV_ERROR);
    throw new Error(ENV_ERROR);
  }
  return { api: API_URL.replace(/\/+$/, ""), org: ORG_SLUG };
}

/** An unknown org slug is a deployment mistake, not a member mistake — log it. */
function logIfOrgNotFound(body: { result: string }, org: string) {
  if (body.result === "org_not_found") {
    console.error(
      `Balance API: org "${org}" not found — check NEXT_PUBLIC_ORG_SLUG.`
    );
  }
}

/**
 * A card's link token: 4-digit card number, "_", 8 random characters
 * ("0004_k3x9q2mf"). Same shape the API and the database enforce.
 */
const CARD_TOKEN_RE = /^[0-9]{4}_[a-z2-9]{8}$/;

/** The token from the link, or null when it cannot be one (missing, mangled, an old `?card_no=` link). */
export function parseCardToken(text: string | null | undefined): string | null {
  const token = (text ?? "").trim();
  return CARD_TOKEN_RE.test(token) ? token : null;
}

export type MembershipStatus =
  | "active"
  | "expiring"
  | "expired"
  | "frozen"
  | "upcoming"
  | "none"
  | "left";

export interface BalanceOk {
  result: "ok";
  card_no: string;
  /** Initials with dots ("R•••• T••••"); kept by the API, the page shows `first_name`. */
  name_masked: string;
  /** The member's first name; null only for an empty name. */
  first_name: string | null;
  /** First name with the rest hidden: "Subhadra xxxx" ("Sita" stays "Sita"). */
  name_display: string | null;
  /** First five digits of the mobile number, then x's ("98252xxxxx"); null when too short to show. */
  phone_hint: string | null;
  plan_name: string | null;
  status: MembershipStatus;
  /** Days until the membership ends; negative once it has expired. */
  days_left: number | null;
  /** ISO date (YYYY-MM-DD), the membership's last day. */
  ends_on: string | null;
  /** True when the member already asked for a renewal that is still open. */
  renewal_pending: boolean;
  /** ISO date (YYYY-MM-DD) of the last payment not taken back; null when there is none. */
  last_payment_on: string | null;
  /** That payment in paisa (integer); null when there is none. */
  last_payment_paisa: number | null;
  /** The gym's currency code, e.g. "NPR". */
  currency: string | null;
}

export interface CardNotFound {
  result: "card_not_found";
}

export interface CardUnassigned {
  result: "card_unassigned";
  card_no: string;
}

export interface OrgNotFound {
  result: "org_not_found";
}

export type BalanceResponse =
  | BalanceOk
  | CardNotFound
  | CardUnassigned
  | OrgNotFound;

export type RenewalResponse =
  | { result: "ok" }
  | { result: "too_soon" }
  | CardNotFound
  | CardUnassigned
  | OrgNotFound;

/** Thrown for transport failures and unexpected (4xx/5xx) replies. */
export class BalanceApiError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null = null) {
    super(message);
    this.name = "BalanceApiError";
    this.status = status;
  }
}

async function readJson(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function isResult(value: unknown): value is { result: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { result?: unknown }).result === "string"
  );
}

/** GET {API}?org={slug}&c=0004_k3x9q2mf */
export async function fetchBalance(token: string): Promise<BalanceResponse> {
  const { api, org } = requireEnv();
  const url = new URL(api);
  url.searchParams.set("org", org);
  url.searchParams.set("c", token);

  let res: Response;
  try {
    res = await fetch(url, { method: "GET", cache: "no-store" });
  } catch {
    throw new BalanceApiError("Could not reach the server.");
  }

  const body = await readJson(res);
  if (res.ok && isResult(body)) {
    logIfOrgNotFound(body, org);
    return body as BalanceResponse;
  }
  throw new BalanceApiError(
    `Balance lookup failed (${res.status}).`,
    res.status
  );
}

export interface RenewalRequestInput {
  /** Up to 20 characters. */
  phone?: string;
  /** Up to 500 characters. */
  note?: string;
}

export const RENEWAL_PHONE_MAX = 20;
export const RENEWAL_NOTE_MAX = 500;

/** POST {API}/renew-request */
export async function requestRenewal(
  token: string,
  input: RenewalRequestInput = {}
): Promise<RenewalResponse> {
  const { api, org } = requireEnv();

  const phone = input.phone?.trim().slice(0, RENEWAL_PHONE_MAX);
  const note = input.note?.trim().slice(0, RENEWAL_NOTE_MAX);

  let res: Response;
  try {
    res = await fetch(`${api}/renew-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        org,
        c: token,
        ...(phone ? { phone } : {}),
        ...(note ? { note } : {}),
      }),
    });
  } catch {
    throw new BalanceApiError("Could not reach the server.");
  }

  const body = await readJson(res);
  // 429 carries a proper result body ("too_soon"); treat it like a 200.
  if ((res.ok || res.status === 429) && isResult(body)) {
    logIfOrgNotFound(body, org);
    return body as RenewalResponse;
  }
  throw new BalanceApiError(
    `Renewal request failed (${res.status}).`,
    res.status
  );
}

/**
 * Paisa → "Rs 2,500" (or "Rs 2,499.50"). Grouped the South Asian way, and NPR
 * is written "Rs" as on the rate card; any other currency shows its code.
 */
export function formatMoney(paisa: number, currency: string | null): string {
  const units = paisa / 100;
  const amount = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: Number.isInteger(units) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(units);
  const symbol = !currency || currency === "NPR" ? "Rs" : currency;
  return `${symbol} ${amount}`;
}

/** "2026-11-20" → "20 Nov 2026". Parsed as a plain date, so no timezone drift. */
export function formatEndsOn(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
