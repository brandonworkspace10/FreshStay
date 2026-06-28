import { siteConfig } from "@/lib/site";

const faqItems = [
  {
    question: "How much does Airbnb cleaning cost in NYC?",
    answer:
      "For a standard 1-bedroom turnover, per-stay cleaning starts at $129. Bi-weekly plans run about $99 per clean and weekly plans about $89. Studios start at $99; larger units are quoted based on bedroom count.",
  },
  {
    question: "Can you handle same-day turnover?",
    answer:
      "Yes. Most host accounts are built around checkout-to-check-in windows. Same-day slots are prioritized for hosts on recurring plans.",
  },
  {
    question: "Do you serve my neighborhood?",
    answer:
      "We cover Manhattan, Brooklyn, Queens, the Bronx, and Staten Island, with the fastest response in Manhattan, Brooklyn, and Queens.",
  },
  {
    question: "Are your cleaners insured and background-checked?",
    answer:
      "Every FreshStay crew member is background-checked and trained on short-term rental turnover standards. All jobs carry $2M liability insurance.",
  },
];

export function JsonLd() {
  const graph = [
    {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: {
        "@type": "City",
        name: "New York City",
        containedInPlace: { "@type": "State", name: "New York" },
      },
      priceRange: "$89–$179",
      image: `${siteConfig.url}/opengraph-image`,
    },
    {
      "@type": "Service",
      "@id": `${siteConfig.url}/#service`,
      name: "Airbnb Turnover Cleaning",
      provider: { "@id": `${siteConfig.url}/#business` },
      areaServed: "New York City",
      serviceType: "Short-term rental cleaning",
      description:
        "Recurring turnover cleaning for NYC Airbnb hosts — weekly, bi-weekly, or per-stay plans with same-day availability.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "89",
        highPrice: "179",
        offerCount: "3",
        offers: [
          {
            "@type": "Offer",
            name: "Per-stay turnover",
            price: "129",
            priceCurrency: "USD",
            description: "One-time turnover clean for a standard 1-bedroom.",
          },
          {
            "@type": "Offer",
            name: "Bi-weekly plan",
            price: "99",
            priceCurrency: "USD",
            description: "Recurring bi-weekly turnover clean, per visit.",
          },
          {
            "@type": "Offer",
            name: "Weekly plan",
            price: "89",
            priceCurrency: "USD",
            description: "Recurring weekly turnover clean, per visit.",
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
