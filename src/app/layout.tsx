import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
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
  title: "Dean on Deck — Virgin Voyages First Mate | Adults-Only Luxury Cruises",
  description:
    "I'm Dean, your Gold-Certified Virgin Voyages First Mate. Adults-only sailings, Michelin-inspired dining, RockStar perks, and zero booking fees. No kids. No stress. Just you.",
  icons: { icon: "/img/logo.jpg" },
  openGraph: {
    title: "Dean on Deck — Sail like a grown-up",
    description:
      "Adults-only Virgin Voyages cruises, planned end to end by a Gold-Certified First Mate. No kids. No stress. Just you.",
    type: "website",
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
      <body>{children}</body>
    </html>
  );
}
