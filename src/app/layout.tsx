import type { Metadata } from "next";
import { Noto_Serif, Corinthia } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import { loadSite } from "@/lib/cms/loader";
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

/* Site-wide metadata defaults. Per-page overrides (title, description,
   canonical, OG) come from each page's `meta` block via generateMetadata in
   the catch-all route. */
export function generateMetadata(): Metadata {
  const site = loadSite();
  const ogImageUrl = `${site.seo.url}${site.seo.ogImage}`;
  return {
    metadataBase: new URL(site.seo.url),
    title: site.seo.title,
    description: site.seo.description,
    keywords: site.seo.keywords,
    alternates: { canonical: "/" },
    openGraph: {
      title: site.seo.ogTitle,
      description: site.seo.ogDescription,
      url: site.seo.url,
      siteName: site.seo.siteName,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Dean on Deck — Virgin Voyages at sea",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.ogTitle,
      description: site.seo.ogDescription,
      images: [ogImageUrl],
    },
  };
}

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
