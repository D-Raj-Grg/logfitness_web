"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  BalanceApiError,
  fetchBalance,
  formatCardNo,
  formatEndsOn,
  parseCardNo,
  requestRenewal,
  RENEWAL_NOTE_MAX,
  RENEWAL_PHONE_MAX,
  type BalanceOk,
  type BalanceResponse,
  type MembershipStatus,
} from "@/lib/balance";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type LookupState =
  | { kind: "idle" }
  | { kind: "loading"; cardNo: number }
  | { kind: "ok"; cardNo: number; data: BalanceOk }
  | { kind: "card_not_found"; cardNo: number }
  | { kind: "card_unassigned"; cardNo: number }
  | { kind: "error"; cardNo: number; message: string; retry: boolean };

type RenewalState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "too_soon" }
  | { kind: "error"; message: string };

const GENERIC_ERROR =
  "Something went wrong on our side. Try again in a moment, or ask at the front desk.";
const OFFLINE_ERROR =
  "Couldn't reach the server. Check your connection and try again.";
const RATE_LIMIT_ERROR = "Too many attempts — wait a minute and try again.";
/** Misconfigured env or unknown org — nothing the member can do about it. */
const NOT_SET_UP_ERROR =
  "This page isn't set up yet — please ask the front desk.";
const INPUT_HINT = "Enter the number printed on your card, e.g. 0004.";

/** Maps a thrown error to copy + whether a "try again" makes sense. */
function describeError(err: unknown): { message: string; retry: boolean } {
  if (err instanceof BalanceApiError) {
    if (err.status === 429) return { message: RATE_LIMIT_ERROR, retry: false };
    if (err.status === null) return { message: OFFLINE_ERROR, retry: true };
    return { message: GENERIC_ERROR, retry: true };
  }
  // A plain Error here is the "env not configured" throw from the client.
  return { message: NOT_SET_UP_ERROR, retry: false };
}

export function BalanceLookup({ initialCardNo }: { initialCardNo?: string }) {
  // `initialCardNo` is whatever came in on ?card_no= — possibly not a valid
  // number. Prefill the digits either way so the member sees what was read.
  const initialNo = initialCardNo ? parseCardNo(initialCardNo) : null;
  const [text, setText] = useState(() =>
    initialNo !== null
      ? formatCardNo(initialNo)
      : (initialCardNo ?? "").replace(/\D/g, "")
  );
  // Arriving from the QR (?card_no=…) starts in `loading`, so the first paint
  // already shows the skeleton and the mount effect only has to fetch.
  const [state, setState] = useState<LookupState>(() =>
    initialNo === null ? { kind: "idle" } : { kind: "loading", cardNo: initialNo }
  );
  const [inputError, setInputError] = useState<string | null>(() =>
    initialCardNo && initialNo === null ? INPUT_HINT : null
  );
  // Guards against a slow earlier lookup overwriting a newer one.
  const requestId = useRef(0);

  function lookup(cardNo: number) {
    setInputError(null);
    setState({ kind: "loading", cardNo });
    void run(cardNo, ++requestId.current);
  }

  async function run(cardNo: number, id: number) {
    let response: BalanceResponse;
    try {
      response = await fetchBalance(cardNo);
    } catch (err) {
      if (id !== requestId.current) return;
      setState({ kind: "error", cardNo, ...describeError(err) });
      return;
    }
    if (id !== requestId.current) return;

    switch (response.result) {
      case "ok":
        setState({ kind: "ok", cardNo, data: response });
        break;
      case "card_not_found":
        setState({ kind: "card_not_found", cardNo });
        break;
      case "card_unassigned":
        setState({ kind: "card_unassigned", cardNo });
        break;
      case "org_not_found":
        setState({
          kind: "error",
          cardNo,
          message: NOT_SET_UP_ERROR,
          retry: false,
        });
        break;
      default:
        // An unknown result must never leave the skeleton spinning.
        setState({
          kind: "error",
          cardNo,
          message: GENERIC_ERROR,
          retry: true,
        });
    }
  }

  // Scanning the QR lands here with ?card_no=… — look it up straight away.
  const autoLooked = useRef(false);
  useEffect(() => {
    if (autoLooked.current || initialNo === null) return;
    autoLooked.current = true;
    void run(initialNo, ++requestId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once, on mount
  }, []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const n = parseCardNo(text);
    if (n === null) {
      setInputError(INPUT_HINT);
      return;
    }
    setText(formatCardNo(n));
    lookup(n);
  }

  const busy = state.kind === "loading";

  return (
    <div className="space-y-10">
      {/* 01. Card number */}
      <Step index="01" title="Your card number">
        <form onSubmit={submit} className="space-y-3" noValidate>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="card-no">
              Card number
            </label>
            <div className="flex flex-1 items-center rounded-xl border border-border/60 bg-card/60 px-4 focus-within:border-foreground/40">
              <span className="font-mono text-xs tracking-label text-muted-foreground">
                No.
              </span>
              <input
                id="card-no"
                name="card_no"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                pattern="[0-9]*"
                maxLength={6}
                value={text}
                onChange={(e) => {
                  setText(e.target.value.replace(/\D/g, ""));
                  setInputError(null);
                }}
                placeholder="0004"
                aria-invalid={inputError ? true : undefined}
                aria-describedby={inputError ? "card-no-error" : undefined}
                className="h-12 w-full bg-transparent px-3 font-mono text-lg text-foreground outline-none placeholder:text-muted-foreground/60"
              />
            </div>
            <Button type="submit" size="lg" disabled={busy}>
              {busy ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />{" "}
                  Checking
                </>
              ) : (
                <>
                  <Search className="size-4" aria-hidden="true" /> Check
                  balance
                </>
              )}
            </Button>
          </div>
          {inputError ? (
            <p
              id="card-no-error"
              role="alert"
              className="text-sm text-foreground"
            >
              {inputError}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              It&apos;s the four-digit number printed under the QR on your
              card. Leading zeros don&apos;t matter.
            </p>
          )}
        </form>
      </Step>

      {/* 02. Balance */}
      <Step index="02" title="Your balance" muted={state.kind === "idle"}>
        {/* The live region is this persistent wrapper, so the result that
            replaces the skeleton is announced. */}
        <div aria-live="polite">
          <Result state={state} onRetry={lookup} />
        </div>
      </Step>

      {/* 03. Renewal */}
      {state.kind === "ok" && (
        <Step index="03" title="Renew">
          <Renewal key={state.cardNo} cardNo={state.cardNo} data={state.data} />
        </Step>
      )}
    </div>
  );
}

function Result({
  state,
  onRetry,
}: {
  state: LookupState;
  onRetry: (cardNo: number) => void;
}) {
  switch (state.kind) {
    case "idle":
      return (
        <p className="text-sm text-muted-foreground">
          Your days left will appear here.
        </p>
      );
    case "loading":
      return (
        <Panel cardNo={state.cardNo}>
          <div className="mt-4 space-y-3" aria-busy="true">
            <div className="h-7 w-48 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-32 animate-pulse rounded bg-secondary" />
            <div className="h-10 w-40 animate-pulse rounded bg-secondary" />
          </div>
        </Panel>
      );
    case "ok":
      return <BalanceCard cardNo={state.cardNo} data={state.data} />;
    case "card_not_found":
      return (
        <Panel cardNo={state.cardNo}>
          <p className="mt-4 text-base leading-relaxed text-foreground">
            We don&apos;t recognise this card number.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Check the number printed under the QR and try again. If it still
            doesn&apos;t work, show your card at the front desk and we&apos;ll
            sort it out.
          </p>
          <FrontDeskLinks />
        </Panel>
      );
    case "card_unassigned":
      return (
        <Panel cardNo={state.cardNo}>
          <p className="mt-4 text-base leading-relaxed text-foreground">
            This card isn&apos;t assigned to a member yet — ask at the front
            desk.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Once it&apos;s linked to your membership, this page will show your
            balance.
          </p>
          <FrontDeskLinks />
        </Panel>
      );
    case "error":
      return (
        <Panel cardNo={state.cardNo}>
          <p className="mt-4 text-base leading-relaxed text-foreground">
            {state.message}
          </p>
          {state.retry ? (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRetry(state.cardNo)}
              >
                Try again
              </Button>
            </div>
          ) : (
            <FrontDeskLinks />
          )}
        </Panel>
      );
  }
}

function BalanceCard({ cardNo, data }: { cardNo: number; data: BalanceOk }) {
  const headline = describeDays(data);
  return (
    <Panel cardNo={cardNo}>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-lg text-foreground">{data.name_masked}</p>
          {data.plan_name && (
            <p className="mt-1 text-sm text-muted-foreground">
              {data.plan_name}
            </p>
          )}
        </div>
        <StatusChip status={data.status} />
      </div>

      <div className="mt-6 border-t border-border/60 pt-6">
        <p
          className={cn(
            "font-display leading-none text-foreground",
            headline.big ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
          )}
        >
          {headline.text}
        </p>
        {data.ends_on && (
          <p className="mt-3 text-sm text-muted-foreground">
            {data.days_left !== null && data.days_left < 0 ? "Ended" : "Ends"}{" "}
            <span className="font-mono text-foreground">
              {formatEndsOn(data.ends_on)}
            </span>
          </p>
        )}
      </div>
    </Panel>
  );
}

/**
 * Headline copy for the balance card — one line, no third colour.
 *
 * Branches on `status` first. `days_left` is always end date − today (never
 * days until a start), so only active/expiring memberships show the count.
 */
function describeDays(data: BalanceOk): { text: string; big: boolean } {
  const d = data.days_left;
  const days = (n: number) => `${n} ${n === 1 ? "day" : "days"}`;

  switch (data.status) {
    case "active":
    case "expiring":
      if (d === null) return { text: "No end date", big: false };
      if (d < 0) return { text: `Expired ${days(-d)} ago`, big: false };
      if (d === 0) return { text: "Last day today", big: true };
      return { text: `${days(d)} left`, big: true };
    case "expired":
      // Negative days → ran out of time; otherwise the sessions were used up.
      if (d !== null && d < 0) {
        return { text: `Expired ${days(-d)} ago`, big: false };
      }
      return { text: "Membership expired", big: false };
    case "upcoming":
      return { text: "Membership starts soon", big: false };
    case "frozen":
      return { text: "Membership frozen", big: false };
    case "left":
      return { text: "Membership closed", big: false };
    case "none":
    default:
      return { text: "No membership on this card", big: false };
  }
}

const statusLabel: Record<MembershipStatus, string> = {
  active: "Active",
  expiring: "Expiring soon",
  expired: "Expired",
  frozen: "Frozen",
  upcoming: "Upcoming",
  none: "No membership",
  left: "Left",
};

/**
 * Two-colour brand: status is told by weight and outline, never by a third
 * colour. Active is solid; "pay attention" states get a strong outline; the
 * rest are quiet outlines.
 */
function StatusChip({ status }: { status: MembershipStatus }) {
  const tone =
    status === "active"
      ? "border-foreground bg-foreground text-background"
      : status === "expiring" || status === "expired"
        ? "border-foreground/70 text-foreground"
        : "border-border text-muted-foreground";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs tracking-label",
        tone
      )}
    >
      {statusLabel[status]}
    </span>
  );
}

function Renewal({ cardNo, data }: { cardNo: number; data: BalanceOk }) {
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<RenewalState>({ kind: "idle" });

  if (data.renewal_pending || state.kind === "sent") {
    return (
      <div className="rounded-xl border border-border/60 bg-card/60 p-5">
        <p className="flex items-center gap-2 text-base text-foreground">
          <Check className="size-4" aria-hidden="true" />
          {state.kind === "sent"
            ? "Thanks — the front desk will call you."
            : "Renewal already requested"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {state.kind === "sent"
            ? "We've let the front desk know. Nothing is charged until you confirm with them."
            : "We've already got your request and will be in touch. If it's urgent, call us."}
        </p>
        <FrontDeskLinks />
      </div>
    );
  }

  const sending = state.kind === "sending";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setState({ kind: "sending" });
    try {
      const res = await requestRenewal(cardNo, { phone, note });
      switch (res.result) {
        case "ok":
          setState({ kind: "sent" });
          break;
        case "too_soon":
          setState({ kind: "too_soon" });
          break;
        case "card_not_found":
        case "card_unassigned":
          setState({
            kind: "error",
            message:
              "This card isn't linked to a member any more — ask at the front desk.",
          });
          break;
        case "org_not_found":
          setState({ kind: "error", message: NOT_SET_UP_ERROR });
          break;
        default:
          // Unknown result: surface an error so the button is usable again.
          setState({ kind: "error", message: GENERIC_ERROR });
      }
    } catch (err) {
      setState({ kind: "error", message: describeError(err).message });
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Want to keep training? Leave a number and the front desk will call you
        to arrange it. This is a request, not a payment.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone (optional)" htmlFor="renew-phone">
          <input
            id="renew-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={RENEWAL_PHONE_MAX}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98XXXXXXXX"
            disabled={sending}
            className="h-12 w-full rounded-xl border border-border/60 bg-card/60 px-4 text-base text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-foreground/40 disabled:opacity-60"
          />
        </Field>
        <Field
          label="Note (optional)"
          htmlFor="renew-note"
          hint={`${note.length}/${RENEWAL_NOTE_MAX}`}
        >
          <input
            id="renew-note"
            type="text"
            maxLength={RENEWAL_NOTE_MAX}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. switch me to 3 months"
            disabled={sending}
            className="h-12 w-full rounded-xl border border-border/60 bg-card/60 px-4 text-base text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-foreground/40 disabled:opacity-60"
          />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />{" "}
              Sending
            </>
          ) : (
            "Request renewal"
          )}
        </Button>
        {state.kind === "too_soon" && (
          <p className="text-sm text-foreground" role="status">
            You already asked a few minutes ago.
          </p>
        )}
        {state.kind === "error" && (
          <p className="text-sm text-foreground" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={htmlFor}
          className="text-xs tracking-label text-muted-foreground"
        >
          {label}
        </label>
        {hint && (
          <span className="font-mono text-[11px] text-muted-foreground/70">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Panel({
  cardNo,
  children,
}: {
  cardNo: number;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-5 sm:p-6">
      <p className="font-mono text-xs tracking-label text-muted-foreground">
        No. {formatCardNo(cardNo)}
      </p>
      {children}
    </div>
  );
}

function FrontDeskLinks() {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <Button asChild variant="outline" size="sm">
        <a href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</a>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <a
          href={siteConfig.mobile.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp us
        </a>
      </Button>
    </div>
  );
}

function Step({
  index,
  title,
  muted,
  children,
}: {
  index: string;
  title: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-4", muted && "opacity-60")}>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-muted-foreground">{index}</span>
        <h2 className="font-display text-xl leading-none text-foreground sm:text-2xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
