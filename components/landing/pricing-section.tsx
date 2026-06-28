import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "per-stay",
    name: "Per stay",
    price: "$129",
    unit: "per turnover",
    description: "Best when your calendar is unpredictable.",
    features: [
      "Full turnover checklist",
      "Linens & staging reset",
      "Photo report after each clean",
      "Book 24 hours ahead",
    ],
    recommended: false,
  },
  {
    id: "bi-weekly",
    name: "Bi-weekly",
    price: "$99",
    unit: "per clean",
    description: "Most popular for steady-booking listings.",
    features: [
      "Everything in Per stay",
      "Locked-in crew who knows your unit",
      "Priority same-day slots",
      "Skip or pause anytime",
    ],
    recommended: true,
  },
  {
    id: "weekly",
    name: "Weekly",
    price: "$89",
    unit: "per clean",
    description: "For high-occupancy units and multi-property hosts.",
    features: [
      "Everything in Bi-weekly",
      "Dedicated account manager",
      "First pick on holiday turnovers",
      "Multi-unit discounts available",
    ],
    recommended: false,
  },
];

export function PricingSection() {
  return (
    <section
      id="plans"
      className="border-y border-border/60 bg-muted/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Recurring plans, not one-off quotes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Prices shown for a standard 1-bedroom. You pick the rhythm—we show
            up on schedule. No surprise fees when checkout is at 11 and
            check-in is at 3.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-6 transition-shadow ${
                plan.recommended
                  ? "border-fresh/40 bg-card shadow-md ring-2 ring-fresh/20"
                  : "surface-card"
              }`}
            >
              {plan.recommended && (
                <Badge
                  className="absolute -top-3 left-6 bg-fresh text-fresh-foreground"
                >
                  Most hosts choose this
                </Badge>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.unit}
                </span>
              </div>
              {plan.id === "bi-weekly" && (
                <p className="mt-1 text-xs text-muted-foreground">
                  About $3.30/day—less than a missed booking costs.
                </p>
              )}
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-fresh"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                nativeButton={false}
                render={<a href="#signup" />}
                className={`mt-8 min-h-11 w-full cursor-pointer ${
                  plan.recommended
                    ? "bg-fresh text-fresh-foreground hover:bg-fresh/90 shadow-sm"
                    : ""
                }`}
                variant={plan.recommended ? "default" : "outline"}
              >
                Choose {plan.name.toLowerCase()}
              </Button>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          2-bedroom from $149 · 3-bedroom from $179 · Studios from $99.{" "}
          <a
            href="#signup"
            className="font-medium text-fresh underline-offset-4 hover:underline focus-visible:underline"
          >
            Get an exact quote for your unit
          </a>
        </p>
      </div>
    </section>
  );
}
