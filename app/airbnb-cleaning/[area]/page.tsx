import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Phone, ShieldCheck, Star } from "lucide-react";

import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LeadPopup } from "@/components/landing/lead-popup";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { PricingSection } from "@/components/landing/pricing-section";
import { SignupSection } from "@/components/landing/signup-section";
import { TrustSection } from "@/components/landing/trust-section";
import { Button } from "@/components/ui/button";
import { AREAS, AREA_SLUGS, getArea, type Area } from "@/lib/areas";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return AREA_SLUGS.map((area) => ({ area }));
}

const pageTitle = (a: Area) =>
  `Airbnb Cleaning in ${a.name}, ${a.regionAbbr} — Same-Day Turnovers | ${siteConfig.name}`;
const pageDescription = (a: Area) =>
  `Professional Airbnb & short-term rental turnover cleaning in ${a.name}, ${a.region}. Insured, background-checked crews, same-day availability, and recurring weekly, bi-weekly, or per-stay plans for hosts.`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const a = getArea(area);
  if (!a) return {};
  const path = `/airbnb-cleaning/${a.slug}`;
  return {
    title: { absolute: pageTitle(a) },
    description: pageDescription(a),
    alternates: { canonical: path },
    openGraph: {
      title: pageTitle(a),
      description: pageDescription(a),
      url: `${siteConfig.url}${path}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle(a),
      description: pageDescription(a),
    },
  };
}

const faqsFor = (a: Area) => {
  const fast = a.tier === "fast";
  const hoods =
    a.neighborhoods.length > 0
      ? `, including ${a.neighborhoods.slice(0, 4).join(", ")} and nearby areas`
      : "";
  return [
    {
      q: `Do you clean Airbnbs in ${a.name}?`,
      a: `Yes — FreshStay covers ${a.name}${hoods}. We handle full short-term-rental turnovers ${
        fast
          ? "with same-day checkout-to-check-in service prioritized for hosts on a recurring plan."
          : "with same-day availability for hosts on a recurring plan."
      }`,
    },
    {
      q: `How much does Airbnb cleaning cost in ${a.name}?`,
      a: "For a standard 1-bedroom, per-stay turnovers start at $129, bi-weekly plans run about $99 per clean, and weekly plans about $89. Studios start at $99; larger units are quoted by bedroom count.",
    },
    {
      q: `Can you do same-day turnovers in ${a.name}?`,
      a: fast
        ? `Yes — ${a.name} is one of our fastest-response areas, so same-day turnovers are prioritized for hosts on recurring plans.`
        : `Yes — we offer same-day turnover availability in ${a.name} for hosts on a recurring plan, so your place is guest-ready between bookings.`,
    },
    {
      q: `Are your ${a.name} cleaners insured and background-checked?`,
      a: "Every FreshStay crew member is background-checked and trained on short-term-rental turnover standards, and all jobs carry $2M liability insurance.",
    },
  ];
};

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const a = getArea(area);
  if (!a) notFound();

  const path = `/airbnb-cleaning/${a.slug}`;
  const url = `${siteConfig.url}${path}`;
  const faqs = faqsFor(a);
  const otherAreas = AREAS.filter((x) => x.slug !== a.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Airbnb Turnover Cleaning in ${a.name}`,
        serviceType: "Short-term rental cleaning",
        url,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${siteConfig.url}/#business`,
          name: siteConfig.name,
        },
        areaServed: {
          "@type": "City",
          name: a.name,
          containedInPlace: { "@type": "State", name: a.region },
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "89",
          highPrice: "179",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: `Airbnb Cleaning in ${a.name}`,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <LandingHeader />
      <main className="pb-20 md:pb-0">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-fresh-light/40 to-background">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            {/* Breadcrumb */}
            <nav
              className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-fresh">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-foreground">
                Airbnb Cleaning in {a.name}
              </span>
            </nav>

            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-fresh-light px-3 py-1 text-xs font-semibold tracking-wide text-fresh uppercase">
                <MapPin className="size-3.5" aria-hidden="true" />
                {a.name}, {a.regionAbbr}
              </p>
              <h1 className="font-display text-4xl font-bold leading-[1.08] text-foreground text-balance sm:text-5xl">
                Airbnb Turnover Cleaning in {a.name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {a.blurb}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  nativeButton={false}
                  render={<a href="#signup" />}
                  size="lg"
                  className="min-h-12 cursor-pointer bg-fresh text-base font-semibold text-fresh-foreground shadow-sm hover:bg-fresh/90"
                >
                  Get a {a.name} quote
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 px-4 text-base font-medium text-foreground transition-colors hover:text-fresh"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call us
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Star className="size-4 fill-fresh text-fresh" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-foreground">4.9</strong>{" "}
                    from 180+ hosts
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-fresh" aria-hidden="true" />
                  <span>Insured &amp; background-checked</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Neighborhoods covered */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Neighborhoods we cover in {a.name}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            FreshStay crews turn over short-term rentals across {a.name}. Not
            sure if we reach your block? Text us the address and we&apos;ll
            confirm in minutes.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {a.neighborhoods.map((hood) => (
              <li
                key={hood}
                className="rounded-full bg-fresh-light px-3.5 py-1.5 text-sm font-medium text-foreground"
              >
                {hood}
              </li>
            ))}
          </ul>
        </section>

        <PricingSection />
        <TrustSection />

        {/* Local FAQ */}
        <section
          id="faq"
          className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20"
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Airbnb cleaning in {a.name} — FAQ
          </h2>
          <dl className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="border-b border-border/60 pb-6 last:border-0"
              >
                <dt className="font-display text-lg font-semibold text-foreground">
                  {f.q}
                </dt>
                <dd className="mt-2 text-muted-foreground leading-relaxed">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <SignupSection />

        {/* Other areas — internal links */}
        <section className="border-t border-border/60 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Other areas we serve
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {otherAreas.map((x) => (
                <li key={x.slug}>
                  <Link
                    href={`/airbnb-cleaning/${x.slug}`}
                    className="text-muted-foreground transition-colors hover:text-fresh"
                  >
                    Airbnb cleaning in {x.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
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
