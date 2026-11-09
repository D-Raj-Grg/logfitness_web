/**
 * Client for the public membership-balance API (a Supabase edge function).
 *
 * This is the only network call on the marketing site. It is a plain `fetch`
 * on purpose — the site has no Supabase dependency and should stay that way.
 *
 * Members reach the page by scanning the QR printed on their gym card
 * (`/balance?card_no=0004`). Anyone can look a card up; the API only ever
 * returns a masked name, so there is nothing sensitive to protect here.
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

/** Numbers printed on cards run 0001–9999. */
export const CARD_NO_MAX = 9999;

/**
 * Accepts whatever the member typed ("4", "04", "0004", "No. 0004") and
 * returns the card number, or null when it is not a valid card number.
 */
export function parseCardNo(text: string): number | null {
  const digits = text.replace(/\D/g, "");
  if (!digits) return null;
  const n = Number.parseInt(digits, 10);
  if (!Number.isFinite(n) || n < 1 || n > CARD_NO_MAX) return null;
  return n;
}

/** 4 → "0004" — the form printed on the card and expected by the API. */
export function formatCardNo(n: number): string {
  return String(n).padStart(4, "0");
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
  name_masked: string;
  plan_name: string | null;
  status: MembershipStatus;
  /** Days until the membership ends; negative once it has expired. */
  days_left: number | null;
  /** ISO date (YYYY-MM-DD), the membership's last day. */
  ends_on: string | null;
  /** True when the member already asked for a renewal that is still open. */
  renewal_pending: boolean;
}

export interface CardNotFound {
  result: "card_not_found";
  card_no: string;
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

/** GET {API}?org={slug}&card_no=0004 */
export async function fetchBalance(cardNo: number): Promise<BalanceResponse> {
  const { api, org } = requireEnv();
  const url = new URL(api);
  url.searchParams.set("org", org);
  url.searchParams.set("card_no", formatCardNo(cardNo));

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
  cardNo: number,
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
        card_no: formatCardNo(cardNo),
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
