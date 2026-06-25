import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dean on Deck — Virgin Voyages First Mate | Adults-Only Luxury Cruises",
  description: SITE_DESCRIPTION,
  keywords: [
    "Virgin Voyages",
    "adults-only cruises",
    "First Mate travel agent",
    "luxury cruise booking",
    "RockStar suites",
    "Dean on Deck",
    "no booking fees cruise",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/img/mark.svg" },
  openGraph: {
    title: "Dean on Deck — Sail like a grown-up",
    description:
      "Adults-only Virgin Voyages cruises, planned end to end by a Gold-Certified First Mate. No kids. No stress. Just you.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Dean on Deck — Virgin Voyages at sea" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dean on Deck — Sail like a grown-up",
    description:
      "Adults-only Virgin Voyages cruises, planned end to end by a Gold-Certified First Mate.",
    images: [OG_IMAGE],
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
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
