const boroughs = [
  {
    name: "Manhattan",
    neighborhoods: [
      "Midtown",
      "Upper East Side",
      "Upper West Side",
      "Chelsea",
      "SoHo",
      "Financial District",
      "Harlem",
    ],
  },
  {
    name: "Brooklyn",
    neighborhoods: [
      "Williamsburg",
      "Bushwick",
      "Park Slope",
      "Bed-Stuy",
      "DUMBO",
      "Greenpoint",
      "Crown Heights",
    ],
  },
  {
    name: "Queens",
    neighborhoods: [
      "Long Island City",
      "Astoria",
      "Flushing",
      "Jackson Heights",
      "Forest Hills",
      "Ridgewood",
    ],
  },
];

export function NeighborhoodsSection() {
  return (
    <section
      id="neighborhoods"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            We serve your neighborhood
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            FreshStay crews are based across the city—not a suburban company
            that &ldquo;sometimes comes to Brooklyn.&rdquo; Same-day turnover
            coverage in all five boroughs, with the fastest response in
            Manhattan, Brooklyn, and Queens.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Not sure if we cover your block? Text us your address before you
            sign up—we&apos;ll confirm in minutes.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {boroughs.map((borough) => (
            <div key={borough.name} className="surface-card p-5">
              <h3 className="font-display text-lg font-bold text-foreground">
                {borough.name}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {borough.neighborhoods.map((hood) => (
                  <li
                    key={hood}
                    className="rounded-full bg-fresh-light px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {hood}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
