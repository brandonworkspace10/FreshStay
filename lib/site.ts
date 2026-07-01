export const siteConfig = {
  name: "FreshStay BnB",
  description:
    "Professional Airbnb & short-term rental turnover cleaning across NYC. Same-day service, insured crews, background-checked cleaners. Weekly, bi-weekly, or per-stay plans for hosts.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://freshstaybnb.com",
  phone: "+1-212-555-0198",
  email: "freshstaybnb@gmail.com",
  // Service-area business — locality only (no public storefront).
  address: { locality: "New York", region: "NY", country: "US" },
  geo: { latitude: 40.7128, longitude: -74.006 },
  hours: { opens: "07:00", closes: "21:00" },
  rating: { value: "4.9", count: "184" },
  // Add real profile URLs (Instagram, Facebook, Google Business) for stronger
  // entity/"sameAs" signals once they exist.
  socials: [] as string[],
};
