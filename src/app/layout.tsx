import type { Metadata } from "next";
import { Noto_Serif, Corinthia } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/* Reference pairing (happyjetsetter.com): Noto Serif carries every heading,
   Corinthia supplies the handwritten flourishes; body copy rides the system
   sans stack (set in globals.css — no webfont needed). */
const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const corinthia = Corinthia({
  variable: "--font-corinthia",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${notoSerif.variable} ${corinthia.variable} antialiased`}
    >
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
