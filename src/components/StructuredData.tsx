import { REVIEWS } from "@/lib/content";
import {
  INSTAGRAM_URL,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

/* JSON-LD structured data — lets Google show rich results (business info,
   star rating) for the site. Rendered server-side into the document. */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: `${SITE_URL}/img/logo.jpg`,
    founder: { "@type": "Person", name: "Dean Satterfield" },
    areaServed: "Worldwide",
    sameAs: [INSTAGRAM_URL],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      reviewCount: REVIEWS.length,
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: r.who },
      reviewBody: r.q,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
