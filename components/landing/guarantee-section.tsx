import { ArrowRight, BadgeCheck, CalendarX, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

const points = [
  {
    icon: RefreshCw,
    title: "24-hour fix guarantee",
    description:
      "Spot anything off in the photo report? Flag it and we re-clean within 24 hours — at no charge.",
  },
  {
    icon: BadgeCheck,
    title: "Same crew, same standard",
    description:
      "A consistent, photo-verified turnover every visit — not a different stranger each time.",
  },
  {
    icon: CalendarX,
    title: "No long-term contract",
    description:
      "Month-to-month plans. Pause when you're blocked off, cancel anytime. Zero risk to try us.",
  },
];

export function GuaranteeSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="overflow-hidden rounded-3xl border border-fresh/30 bg-fresh-light/40">
        <div className="px-6 py-12 text-center sm:px-12 sm:py-14">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-fresh text-fresh-foreground shadow-md shadow-fresh/30">
            <BadgeCheck className="size-7" aria-hidden="true" />
          </span>
          <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-fresh uppercase">
            The FreshStay guarantee
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            If we miss something, we make it right — free.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Your reviews are on the line every turnover. We stand behind every
            clean so booking FreshStay is the safe choice, not a gamble.
          </p>

          <div className="mx-auto mt-10 grid max-w-4xl gap-5 text-left sm:grid-cols-3">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border/60 bg-card p-5"
                >
                  <Icon className="size-5 text-fresh" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-bold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>

          <Button
            nativeButton={false}
            render={<a href="#signup" />}
            size="lg"
            className="mt-10 min-h-12 cursor-pointer bg-fresh text-base font-semibold text-fresh-foreground shadow-sm hover:bg-fresh/90"
          >
            Get a free quote
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
