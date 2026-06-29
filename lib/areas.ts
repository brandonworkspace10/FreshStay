export type Area = {
  slug: string;
  name: string;
  region: "New York" | "New Jersey";
  regionAbbr: "NY" | "NJ";
  kind: "borough" | "city";
  tier: "fast" | "coverage";
  neighborhoods: string[];
  blurb: string;
};

export const AREAS: Area[] = [
  {
    slug: "manhattan",
    name: "Manhattan",
    region: "New York",
    regionAbbr: "NY",
    kind: "borough",
    tier: "fast",
    neighborhoods: [
      "Midtown",
      "Upper East Side",
      "Upper West Side",
      "Chelsea",
      "SoHo",
      "Financial District",
      "Harlem",
    ],
    blurb:
      "From doorman high-rises in Midtown to walk-ups in the Village, Manhattan turnovers move fast. Our crews are based in the borough, so checkout-to-check-in windows are never a problem.",
  },
  {
    slug: "brooklyn",
    name: "Brooklyn",
    region: "New York",
    regionAbbr: "NY",
    kind: "borough",
    tier: "fast",
    neighborhoods: [
      "Williamsburg",
      "Greenpoint",
      "Bushwick",
      "Bed-Stuy",
      "Park Slope",
      "DUMBO",
      "Crown Heights",
    ],
    blurb:
      "Brooklyn brownstones, lofts, and walk-ups each have their quirks. We know the buildings, the stairs, and the parking — and we clean to short-term-rental standards every visit.",
  },
  {
    slug: "queens",
    name: "Queens",
    region: "New York",
    regionAbbr: "NY",
    kind: "borough",
    tier: "fast",
    neighborhoods: [
      "Astoria",
      "Long Island City",
      "Jackson Heights",
      "Flushing",
      "Forest Hills",
      "Ridgewood",
    ],
    blurb:
      "With LaGuardia and JFK on the doorstep, Queens listings see constant back-to-back stays. Same-day turnovers keep your calendar full across Astoria, LIC, and beyond.",
  },
  {
    slug: "the-bronx",
    name: "The Bronx",
    region: "New York",
    regionAbbr: "NY",
    kind: "borough",
    tier: "coverage",
    neighborhoods: ["South Bronx", "Mott Haven", "Riverdale", "Fordham"],
    blurb:
      "Bronx hosts get the same insured, background-checked crews and restocking standard as the rest of the city — booked on a recurring plan so turnover day runs itself.",
  },
  {
    slug: "staten-island",
    name: "Staten Island",
    region: "New York",
    regionAbbr: "NY",
    kind: "borough",
    tier: "coverage",
    neighborhoods: ["St. George", "Stapleton", "Tompkinsville"],
    blurb:
      "Staten Island turnovers are covered with same-day availability for hosts on a plan — full cleans, fresh linens, and restocked essentials between every guest.",
  },
  {
    slug: "jersey-city",
    name: "Jersey City",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: [
      "Downtown",
      "Journal Square",
      "The Heights",
      "Newport",
      "Grove Street",
    ],
    blurb:
      "Right across the Hudson and a quick PATH ride from Manhattan, Jersey City is one of the busiest short-term-rental markets in the metro. We turn over Downtown high-rises and Heights walk-ups alike.",
  },
  {
    slug: "hoboken",
    name: "Hoboken",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: ["Washington Street", "The Waterfront", "Uptown"],
    blurb:
      "The mile-square city packs a lot of stays into a small footprint. Our crews handle Hoboken's brownstones and waterfront condos with quick, reliable same-day turnovers.",
  },
  {
    slug: "union-city",
    name: "Union City",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: ["Central Union City", "Summit Avenue", "Bergenline"],
    blurb:
      "Union City hosts get fast, insured turnover cleaning minutes from the Lincoln Tunnel — ideal for guests using it as an affordable base near Manhattan.",
  },
  {
    slug: "west-new-york",
    name: "West New York",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: ["The Waterfront", "Bergenline Avenue"],
    blurb:
      "With skyline-view rentals along the Hudson waterfront, West New York listings demand a spotless reset every stay. We deliver it on a recurring schedule.",
  },
  {
    slug: "edgewater",
    name: "Edgewater",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: ["Edgewater Harbor", "City Place"],
    blurb:
      "Edgewater's riverfront apartments and townhomes get full turnover cleaning with fresh linens and restocked essentials, booked weekly, bi-weekly, or per stay.",
  },
  {
    slug: "fort-lee",
    name: "Fort Lee",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: ["Hudson Lights", "The Modern", "Main Street"],
    blurb:
      "At the foot of the George Washington Bridge, Fort Lee is a convenient first-stop for NYC-bound guests. We keep its high-rise rentals guest-ready between bookings.",
  },
  {
    slug: "cliffside-park",
    name: "Cliffside Park",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: ["Palisade Avenue", "Anderson Avenue"],
    blurb:
      "Cliffside Park hosts get the same insured, background-checked turnover crews as our waterfront neighbors — reliable, same-day-capable cleaning on a plan.",
  },
  {
    slug: "guttenberg",
    name: "Guttenberg",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: ["Galaxy Towers", "Bergenline"],
    blurb:
      "One of the most densely-packed towns in the country, Guttenberg's compact rentals turn over quickly. We make sure each one is spotless before the next guest arrives.",
  },
  {
    slug: "bayonne",
    name: "Bayonne",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: ["Bergen Point", "Uptown Bayonne", "Constable Hook"],
    blurb:
      "Across the bay from Staten Island and Brooklyn, Bayonne is a growing short-term-rental spot. Our crews handle full turnovers with restocking on a recurring schedule.",
  },
  {
    slug: "secaucus",
    name: "Secaucus",
    region: "New Jersey",
    regionAbbr: "NJ",
    kind: "city",
    tier: "coverage",
    neighborhoods: ["Harmon Cove", "Meadowlands"],
    blurb:
      "A popular base for Meadowlands and NYC visitors, Secaucus rentals stay busy year-round. We keep them turnover-ready with insured, background-checked crews.",
  },
];

export const AREA_SLUGS = AREAS.map((a) => a.slug);

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
