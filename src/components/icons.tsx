import type { SVGProps } from "react";

/** Instagram glyph — lucide removed brand icons, so we draw it. */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/** TikTok glyph — lucide has no TikTok icon, so we draw it. */
export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.9a2.44 2.44 0 0 1-2.44 2.36 2.44 2.44 0 1 1 .7-4.78v-3.28a5.7 5.7 0 0 0-.7-.04A5.66 5.66 0 1 0 15.56 15.7V9.4a7.5 7.5 0 0 0 4.44 1.44V7.6a4.3 4.3 0 0 1-3.4-1.78z" />
    </svg>
  );
}
