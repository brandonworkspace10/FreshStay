import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/landing/hero-video";
import { TurnoverTimeline } from "@/components/landing/turnover-timeline";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-fresh-light/40 to-background lg:bg-none">
      {/* Desktop only: full-bleed cinematic video background */}
      <div className="absolute inset-0 hidden lg:block">
        <HeroVideo fill />
        <div aria-hidden="true" className="absolute inset-0 bg-[#0a3b38]/30" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#062826]/70 via-[#0a3b38]/20 to-transparent"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-28">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-fresh-light px-3 py-1 text-xs font-semibold tracking-wide text-fresh uppercase lg:bg-white/10 lg:text-white lg:ring-1 lg:ring-white/25 lg:backdrop-blur-sm">
              Airbnb cleaning · NYC
            </p>
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.25rem] lg:text-white lg:drop-shadow-sm">
              NYC Airbnb cleaning that shows up between every guest
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-white/85">
              FreshStay keeps your short-term rental 5-star ready on a recurring
              plan—same-day turnovers with fresh linens, restocked essentials,
              and photo proof after every clean. Serving Airbnb hosts in
              Manhattan, Brooklyn &amp; Queens.
            </p>

            {/* Phones: contained, native-aspect video (sharp, not zoomed) */}
            <div className="mt-6 lg:hidden">
              <HeroVideo />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                nativeButton={false}
                render={<a href="#signup" />}
                size="lg"
                className="bg-fresh text-fresh-foreground hover:bg-fresh/90 min-h-12 cursor-pointer text-base font-semibold shadow-sm lg:shadow-lg lg:shadow-black/20"
              >
                Start my recurring plan
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <a
                href="/pricing"
                className="inline-flex min-h-12 items-center justify-center px-4 text-base font-medium text-foreground underline-offset-4 transition-colors hover:text-fresh focus-visible:text-fresh lg:text-white lg:hover:text-fresh-light"
              >
                See plan pricing
              </a>
            </div>
            <ul
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground lg:text-white/85"
              aria-label="Trust indicators"
            >
              <li className="flex items-center gap-2">
                <Star
                  className="size-4 fill-fresh text-fresh lg:fill-fresh-light lg:text-fresh-light"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-foreground lg:text-white">
                    4.9
                  </strong>{" "}
                  from 180+ hosts
                </span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck
                  className="size-4 text-fresh lg:text-fresh-light"
                  aria-hidden="true"
                />
                <span>Insured &amp; background-checked</span>
              </li>
              <li className="flex items-center gap-2">
                <Users
                  className="size-4 text-fresh lg:text-fresh-light"
                  aria-hidden="true"
                />
                <span>320+ active host accounts</span>
              </li>
            </ul>
          </div>

          <div className="lg:pl-4">
            <TurnoverTimeline />
            <p className="mt-4 text-center text-sm text-muted-foreground lg:text-left lg:text-white/75">
              Most hosts book us on a plan so turnover day is never a scramble.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
