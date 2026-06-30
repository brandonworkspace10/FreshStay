import type { Metadata } from "next";
import { Check } from "lucide-react";

import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LeadPopup } from "@/components/landing/lead-popup";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { SignupSection } from "@/components/landing/signup-section";
import { PriceCalculator } from "@/components/pricing/price-calculator";
import {
  ADDONS,
  BEDROOM_TIERS,
  FREQUENCIES,
  INCLUDED,
  SERVICES,
} from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

const title =
  "Airbnb Cleaning Prices NYC — Transparent Turnover Pricing & Calculator";
const description =
  "Transparent 2026 pricing for Airbnb turnover cleaning in NYC. Per-stay, weekly & bi-weekly plans from $149, deep cleans, move in/out, add-ons, and an instant price calculator. Fresh linens, restocking & photo proof included.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/pricing`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

const money = (n: number) => `$${Math.round(n)}`;

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Airbnb Turnover Cleaning — NYC Pricing",
        serviceType: "Short-term rental cleaning",
        url: `${siteConfig.url}/pricing`,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${siteConfig.url}/#business`,
          name: siteConfig.name,
        },
        areaServed: { "@type": "City", name: "New York City" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Airbnb Turnover Cleaning",
          itemListElement: BEDROOM_TIERS.map((t) => ({
            "@type": "Offer",
            name: `${t.label} Airbnb turnover clean`,
            priceCurrency: "USD",
            price: String(t.base),
          })),
        },
      },
    ],
  };

  return (
    <>
      <LandingHeader />
      <main className="pb-20 md:pb-0">
        {/* Hero */}
        <section className="bg-gradient-to-b from-fresh-light/40 to-background">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="mb-4 inline-flex rounded-full bg-fresh-light px-3 py-1 text-xs font-semibold tracking-wide text-fresh uppercase">
              Transparent NYC pricing
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.08] text-foreground text-balance sm:text-5xl">
              Premium Airbnb turnover cleaning, priced up front
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              No hourly surprises, no per-visit guessing. Every FreshStay clean
              includes fresh linens, restocking checks, and photo proof — the
              things that protect your reviews and your Superhost status.
            </p>
          </div>
        </section>

        {/* Price table */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Turnover, deep clean &amp; move in/out
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Base prices for a 1-bathroom unit. Add ${20} per extra bathroom.
            Recurring plans save up to {Math.round(FREQUENCIES.weekly.off * 100)}
            %.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border text-sm text-muted-foreground">
                  <th className="py-3 pr-4 font-semibold">Property size</th>
                  <th className="px-4 py-3 font-semibold">
                    {SERVICES.turnover.label}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {SERVICES.deep.label}
                  </th>
                  <th className="px-4 py-3 font-semibold">{SERVICES.move.label}</th>
                </tr>
              </thead>
              <tbody>
                {BEDROOM_TIERS.map((t) => (
                  <tr
                    key={t.key}
                    className="border-b border-border/60 text-sm"
                  >
                    <td className="py-3 pr-4 font-medium text-foreground">
                      {t.label}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {money(t.base)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {money(t.base * SERVICES.deep.mult)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {money(t.base * SERVICES.move.mult)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Recurring discount: bi-weekly −
            {Math.round(FREQUENCIES["bi-weekly"].off * 100)}%, weekly −
            {Math.round(FREQUENCIES.weekly.off * 100)}% per clean. Same-day +$59
            · weekend +$25 · holiday +$45.
          </p>
        </section>

        {/* Calculator */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Instant price calculator
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Build your turnover and see the price update live. It&apos;s an
              estimate — we confirm the exact quote once we review your listing.
            </p>
            <div className="mt-8">
              <PriceCalculator />
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Add-on services
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Turn FreshStay into a full operations partner. Add only what your
            listing needs.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ADDONS.map((a) => (
              <div
                key={a.key}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3"
              >
                <span className="text-sm text-foreground">{a.label}</span>
                <span className="shrink-0 text-sm font-semibold text-fresh">
                  +${a.price}
                  {a.perBed ? "/bed" : ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-fresh/30 bg-fresh-light/40 p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-foreground">
              Included in every clean — at no extra cost
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground"
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
        </section>

        <SignupSection />
      </main>

      <LandingFooter />
      <MobileCtaBar />
      <LeadPopup />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
