import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TurnoverTimeline } from "@/components/landing/turnover-timeline";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-fresh-light/40 to-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.58 0.14 175 / 0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-fresh-light px-3 py-1 text-xs font-semibold tracking-wide text-fresh uppercase">
              Airbnb cleaning · NYC
            </p>
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.25rem]">
              NYC Airbnb cleaning that shows up between every guest
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              FreshStay keeps your short-term rental spotless on a recurring
              plan—weekly, bi-weekly, or after every stay. Same-day turnovers
              across Manhattan, Brooklyn, and Queens.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                nativeButton={false}
                render={<a href="#signup" />}
                size="lg"
                className="bg-fresh text-fresh-foreground hover:bg-fresh/90 min-h-12 cursor-pointer text-base font-semibold shadow-sm"
              >
                Start my recurring plan
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <a
                href="#plans"
                className="inline-flex min-h-12 items-center justify-center px-4 text-base font-medium text-foreground underline-offset-4 transition-colors hover:text-fresh focus-visible:text-fresh"
              >
                See plan pricing
              </a>
            </div>
            <ul
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
              aria-label="Trust indicators"
            >
              <li className="flex items-center gap-2">
                <Star
                  className="size-4 fill-fresh text-fresh"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-foreground">4.9</strong>{" "}
                  from 180+ hosts
                </span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-fresh" aria-hidden="true" />
                <span>Insured & background-checked</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="size-4 text-fresh" aria-hidden="true" />
                <span>320+ active host accounts</span>
              </li>
            </ul>
          </div>
          <div className="lg:pl-4">
            <TurnoverTimeline />
            <p className="mt-4 text-center text-sm text-muted-foreground lg:text-left">
              Most hosts book us on a plan so turnover day is never a scramble.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
