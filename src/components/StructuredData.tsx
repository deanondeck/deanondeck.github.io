import { loadPage, loadSite } from "@/lib/cms/loader";

/* JSON-LD structured data — lets Google show rich results (business info,
   star rating) for the site. Rendered server-side into the document.

   Reviews are pulled from the home page's `reviews` section so there is a
   single source of truth (edit them in the CMS and the rich snippet follows). */

type ReviewItem = { q: string; who: string; when?: string };

export default function StructuredData() {
  const site = loadSite();
  const ogImageUrl = `${site.seo.url}${site.seo.ogImage}`;

  const home = loadPage("index");
  const reviewsSection = home.sections.find((s) => s.type === "reviews");
  const reviews = ((reviewsSection?.content.items as ReviewItem[]) ?? []).filter(
    Boolean,
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.seo.siteName,
    description: site.seo.description,
    url: site.seo.url,
    image: ogImageUrl,
    logo: `${site.seo.url}/img/${site.brand.logo}.jpg`,
    founder: { "@type": "Person", name: "Dean Satterfield" },
    areaServed: "Worldwide",
    sameAs: [site.social.instagram],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
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
