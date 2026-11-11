"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

/**
 * Vercel Analytics without the card token. The QR on a member's card opens
 * `/balance?c=0004_k3x9q2mf`; that `c` value is the key to the card's balance
 * page, so it must not end up in an analytics dashboard. Every event for
 * /balance is reported with the `c` parameter removed. (`beforeSend` is a
 * function, so this has to be a client component rather than a prop passed
 * from the server layout.)
 */
function stripCardToken(event: BeforeSendEvent): BeforeSendEvent | null {
  try {
    const url = new URL(event.url);
    if (url.pathname.replace(/\/+$/, "") === "/balance" && url.searchParams.has("c")) {
      url.searchParams.delete("c");
      return { ...event, url: url.toString() };
    }
  } catch {
    // An unparseable URL carries no query we could strip; send it as is.
  }
  return event;
}

export function SiteAnalytics() {
  return <Analytics beforeSend={stripCardToken} />;
}
