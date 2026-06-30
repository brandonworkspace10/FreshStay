import { siteConfig } from "@/lib/site";

const faqItems = [
  {
    question: "How much does Airbnb cleaning cost in NYC?",
    answer:
      "For a standard 1-bedroom turnover, per-stay cleaning is $179, bi-weekly plans about $159 per clean, and weekly plans about $145. Studios start at $149, 2-bedrooms from $229, 3-bedrooms from $289. Every clean includes fresh linens, restocking checks, and photo proof.",
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
  {
    question: "Do you send photos after each Airbnb clean?",
    answer:
      "Yes. Every turnover ends with before-and-after photos sent to you, plus a same-day report of any damage, low supplies, or items guests left behind — so you have proof the unit is guest-ready.",
  },
  {
    question: "Is FreshStay good value for premium Airbnb cleaning in NYC?",
    answer:
      "Premium NYC Airbnb turnover services often run $250–$450 per visit. FreshStay recurring plans start at $145–$179 per clean — full premium turnovers with fresh linens, restocking, and photo proof — at a fair, predictable price because your crew is scheduled in advance.",
  },
  {
    question: "Do you restock supplies and provide fresh linens?",
    answer:
      "Yes. Every turnover includes hotel-style fresh linens and topped-up essentials such as coffee, paper towels, soap, and toiletries, with amenity inventory tracked each visit.",
  },
];

export function JsonLd() {
  const graph = [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      image: `${siteConfig.url}/opengraph-image`,
      logo: `${siteConfig.url}/icon-512.png`,
      priceRange: "$145–$429",
      currenciesAccepted: "USD",
      paymentAccepted: "Credit Card, Debit Card, ACH",
      slogan: "Same-day Airbnb turnover cleaning for NYC hosts.",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: siteConfig.hours.opens,
        closes: siteConfig.hours.closes,
      },
      areaServed: [
        {
          "@type": "City",
          name: "New York City",
          containedInPlace: { "@type": "State", name: "New York" },
        },
        {
          "@type": "City",
          name: "Jersey City",
          containedInPlace: { "@type": "State", name: "New Jersey" },
        },
        {
          "@type": "City",
          name: "Hoboken",
          containedInPlace: { "@type": "State", name: "New Jersey" },
        },
        {
          "@type": "AdministrativeArea",
          name: "Hudson County, New Jersey",
        },
      ],
      knowsAbout: [
        "Airbnb turnover cleaning",
        "Short-term rental cleaning",
        "Vacation rental cleaning",
        "Restocking and linen service for hosts",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: siteConfig.rating.value,
        reviewCount: siteConfig.rating.count,
        bestRating: "5",
      },
      ...(siteConfig.socials.length > 0
        ? { sameAs: siteConfig.socials }
        : {}),
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
        lowPrice: "145",
        highPrice: "429",
        offerCount: "3",
        offers: [
          {
            "@type": "Offer",
            name: "Per-stay turnover",
            price: "179",
            priceCurrency: "USD",
            description: "One-time turnover clean for a standard 1-bedroom.",
          },
          {
            "@type": "Offer",
            name: "Bi-weekly plan",
            price: "159",
            priceCurrency: "USD",
            description: "Recurring bi-weekly turnover clean, per visit.",
          },
          {
            "@type": "Offer",
            name: "Weekly plan",
            price: "145",
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
