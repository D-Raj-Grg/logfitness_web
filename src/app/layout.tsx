import type { Metadata, Viewport } from "next";
import { Inter, Anton, JetBrains_Mono } from "next/font/google";

import { Grain } from "@/components/textures";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#17181D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "LOG — Lord of Gyms & Fitness | Premium Gym in Hetauda, Nepal",
    template: "%s · LOG Fitness Hetauda",
  },
  description: siteConfig.description,
  keywords: [
    "gym in Hetauda",
    "gym Hetauda Nepal",
    "fitness center Hetauda",
    "Zumba classes Hetauda",
    "dance classes Hetauda",
    "strength training Hetauda",
    "cardio gym Nepal",
    "protein supplements Hetauda",
    "whey protein Nepal",
    "LOG Fitness",
    "Lord of Gyms",
    "Kapur Complex",
  ],
  applicationName: "LOG Fitness",
  category: "fitness",
  authors: [{ name: "Lord of Gyms & Fitness" }],
  creator: "Lord of Gyms & Fitness",
  alternates: {
    canonical: "/",
  },
  icons: {
    // Declared explicitly — setting `icons` at all replaces the file-convention
    // tags, so every variant must be listed here.
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "LOG — Lord of Gyms & Fitness | Premium Gym in Hetauda",
    description:
      "Strength, cardio, Zumba, dance & genuine supplements — Hetauda's premium gym at Kapur Complex. Train hard. Wear it louder.",
    url: "/",
    siteName: "LOG — Lord of Gyms & Fitness",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOG — Lord of Gyms & Fitness | Premium Gym in Hetauda",
    description:
      "Strength, cardio, Zumba, dance & genuine supplements — Hetauda's premium gym at Kapur Complex. Train hard. Wear it louder.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${anton.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        {children}
        <Grain />
      </body>
    </html>
  );
}
