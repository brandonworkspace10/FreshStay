import {
  BedDouble,
  Camera,
  Check,
  CookingPot,
  PackageOpen,
  ShowerHead,
  Sofa,
} from "lucide-react";

const groups = [
  {
    icon: CookingPot,
    title: "Kitchen",
    items: [
      "Counters, sink & appliances wiped down",
      "Dishes washed, put away, trash removed",
      "Fridge cleared of guest leftovers",
    ],
  },
  {
    icon: ShowerHead,
    title: "Bathrooms",
    items: [
      "Sanitized toilet, shower, sink & mirrors",
      "Fresh towels hung, hotel-folded",
      "Toiletries & paper restocked",
    ],
  },
  {
    icon: BedDouble,
    title: "Bedrooms",
    items: [
      "Hotel-style fresh linens on every bed",
      "Beds made, surfaces dusted",
      "Used linens laundered or swapped",
    ],
  },
  {
    icon: Sofa,
    title: "Living areas",
    items: [
      "Floors vacuumed & mopped",
      "Surfaces dusted, clutter reset",
      "Staged back to your listing photos",
    ],
  },
  {
    icon: PackageOpen,
    title: "Restock & supplies",
    items: [
      "Coffee, paper towels, soap & essentials topped up",
      "Amenity inventory tracked per visit",
      "Low-stock items flagged to you",
    ],
  },
  {
    icon: Camera,
    title: "Photo-verified proof",
    items: [
      "Before & after photos sent after every clean",
      "Damage or missing items reported same day",
      "Receipts you can forward to guests or Airbnb",
    ],
    highlight: true,
  },
];

export function IncludedSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What&apos;s included in every turnover
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One flat price per clean — no surprise add-ons. Every FreshStay
            turnover resets your NYC Airbnb to 5-star, guest-ready condition and
            ends with <strong className="font-semibold text-foreground">photo
            proof</strong> sent straight to you.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className={`surface-card p-6 ${
                  g.highlight ? "ring-2 ring-fresh/40" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-fresh-light text-fresh">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {g.title}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-fresh"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
