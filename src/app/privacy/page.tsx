import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the LOG Fitness Member app and Lord of Gyms Fitness collect, use and protect your membership data, and how to ask us to access or delete it.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE = "2026-11-09";

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={
        <>
          <p>
            This policy covers the <strong>LOG Fitness Member</strong> app for
            members of Lord of Gyms &amp; Fitness. Short version: we only keep
            what is needed to run your membership, and we never sell it.
          </p>
          <p className="mt-3 text-sm">
            Effective {EFFECTIVE} · Last updated {EFFECTIVE}
          </p>
        </>
      }
    >
      <LegalSection title="Who runs the app">
        <p>
          The app is run by <strong>Lord of Gyms &amp; Fitness</strong> (LOG),
          the gym at {siteConfig.address.line}, {siteConfig.address.country}.
          It is a members&apos; tool: it shows you your own membership. Gym
          staff create and manage member accounts at the front desk; you
          cannot sign up on your own.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <ul>
          <li>Your name, phone number, member code and card number.</li>
          <li>Your membership plan, dates and status.</li>
          <li>Your check-ins at the gym: date, time and method.</li>
          <li>
            Invoices and payment history, so you can see what you have paid.
          </li>
          <li>Messages the gym sends you through the app.</li>
          <li>
            A device push token, only if notifications are enabled in a future
            version and you allow them.
          </li>
          <li>
            <strong>Camera:</strong> used only on your phone to scan the QR
            code at the gym door. Camera images are never stored or uploaded.
            The app sends only the text of the scanned code.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use it">
        <ul>
          <li>Show your membership and how many days are left.</li>
          <li>Check you in at the door.</li>
          <li>Let you ask to renew your membership.</li>
          <li>Show your payments and the messages the gym sends you.</li>
        </ul>
        <p>
          There is no advertising in the app. We do not track you across other
          apps or websites, and we do not sell your data or share it for
          marketing.
        </p>
      </LegalSection>

      <LegalSection title="Signing in">
        <p>
          You sign in with your card number (or your phone number) and a
          6-digit PIN that the front desk sets for you. The PIN is stored only
          as a one-way hash, so nobody, including us, can read it back. The
          app does not store your PIN on your phone.
        </p>
      </LegalSection>

      <LegalSection title="Where your data is stored">
        <p>
          Your data is held in a cloud database run by Supabase. Access is
          limited by per-member security rules, so a signed-in member can only
          see their own records. Data is encrypted in transit using TLS.
        </p>
      </LegalSection>

      <LegalSection title="Who can see it">
        <ul>
          <li>You.</li>
          <li>The gym&apos;s staff, to run your membership.</li>
          <li>
            Our hosting and database providers, who process data for us and
            only on our behalf.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep your data while you are a member, and afterwards for as long
          as the gym needs to keep its financial records. You can ask the gym
          to delete your data or give you a copy at any time.
        </p>
      </LegalSection>

      <LegalSection title="Your rights and deleting your account">
        <p>
          You can ask us to show you, correct, export or delete your account
          data. Tell the front desk in person or contact us using the details
          below. We reply within 30 days. See also{" "}
          <Link href="/support#delete">how to request deletion</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          The app is not directed to children under 13. Accounts for minors
          are set up and managed by the gym, with the consent of a parent or
          guardian.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          If we change this policy we will update this page and the
          &quot;last updated&quot; date above.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          <strong>Lord of Gyms &amp; Fitness</strong>
          <br />
          {siteConfig.address.line}, {siteConfig.address.region},{" "}
          {siteConfig.address.country}
          <br />
          Phone: <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          <br />
          Mobile / WhatsApp:{" "}
          <a href={siteConfig.mobile.href}>{siteConfig.mobile.display}</a>
        </p>
        <p>
          Need help using the app? See the{" "}
          <Link href="/support">support page</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
