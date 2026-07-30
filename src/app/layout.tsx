import type { Metadata } from "next";
import { Inter, Anton, JetBrains_Mono } from "next/font/google";
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

const siteUrl = "https://logfitness.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LOG — Lord of Gyms & Fitness",
    template: "%s · LOG Fitness",
  },
  description:
    "Lord of Gyms & Fitness (LOG) — Nepal's premier athletic lifestyle brand. A premium fitness destination and athletic streetwear identity at Kapur Complex, Hetauda. Train hard. Wear it louder.",
  keywords: [
    "LOG",
    "Lord of Gyms",
    "gym Nepal",
    "fitness Kathmandu",
    "athletic streetwear",
    "premium gym",
  ],
  authors: [{ name: "Lord of Gyms & Fitness" }],
  openGraph: {
    title: "LOG — Lord of Gyms & Fitness",
    description:
      "Nepal's premier athletic lifestyle brand. Train hard. Wear it louder.",
    url: siteUrl,
    siteName: "LOG Fitness",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOG — Lord of Gyms & Fitness",
    description:
      "Nepal's premier athletic lifestyle brand. Train hard. Wear it louder.",
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
        {children}
      </body>
    </html>
  );
}
