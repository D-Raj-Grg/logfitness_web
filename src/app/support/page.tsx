import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with the LOG Fitness Member app: signing in, forgotten or locked PIN, QR check-in, renewals and account deletion.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <LegalPage
      eyebrow="Members"
      title="Support"
      intro={
        <p>
          Help for the <strong>LOG Fitness Member</strong> app, the
          members&apos; app of Lord of Gyms &amp; Fitness. It shows your
          membership, payments and messages, and lets you check in at the door
          and ask to renew.
        </p>
      }
    >
      <LegalSection title="Signing in">
        <p>
          The front desk gives you your <strong>card number</strong> (or you
          can use your phone number) and a <strong>6-digit PIN</strong>. There
          is no self sign-up and the PIN is not self-service: to get or change
          one, ask the front desk.
        </p>
      </LegalSection>

      <LegalSection title="Common issues">
        <ul>
          <li>
            <strong>Forgot my PIN.</strong> Ask the front desk to reset it.
            They will give you a new one.
          </li>
          <li>
            <strong>PIN locked after too many tries.</strong> Wait 15 minutes
            and try again, or ask the front desk to unlock it.
          </li>
          <li>
            <strong>&quot;Card number or PIN is wrong&quot;.</strong> Check
            the card number on your card and re-enter the 6 digits. If it still
            fails, ask the front desk to check your account.
          </li>
          <li>
            <strong>Check-in QR scan does not work.</strong> The app needs
            camera permission (iPhone Settings, then LOG Fitness Member, then
            Camera), and check-in only works while the gym is open.
          </li>
          <li>
            <strong>Renewing.</strong> Tap <strong>Request renewal</strong> and
            the front desk will call you. Nothing is charged in the app.
          </li>
          <li>
            <strong>Language or theme.</strong> Change them in{" "}
            <strong>Profile</strong>.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="delete" title="Delete your account or data">
        <p>
          Tell the front desk in person, or call us, and ask for your account
          data to be deleted or exported. We reply within 30 days. Some
          payment records may need to be kept for the gym&apos;s financial
          records. Details are in the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Contact the gym">
        <p>
          <strong>Lord of Gyms &amp; Fitness</strong>
          <br />
          <a
            href={siteConfig.address.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.address.line}, {siteConfig.address.region},{" "}
            {siteConfig.address.country}
          </a>
          <br />
          Phone: <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          <br />
          Mobile: <a href={siteConfig.mobile.href}>{siteConfig.mobile.display}</a>{" "}
          (
          <a
            href={siteConfig.mobile.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          )
        </p>
        <p>
          Call us to check opening hours. See also our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
