"use client";

import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ADDONS,
  BEDROOM_TIERS,
  estimate,
  type Frequency,
  FREQUENCIES,
  INCLUDED,
  SERVICES,
  type ServiceType,
} from "@/lib/pricing";

function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex size-9 items-center justify-center rounded-md border border-border text-foreground hover:border-fresh disabled:opacity-40"
        disabled={value <= min}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="w-8 text-center font-semibold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex size-9 items-center justify-center rounded-md border border-border text-foreground hover:border-fresh disabled:opacity-40"
        disabled={value >= max}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

const pill = (active: boolean) =>
  `rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
    active
      ? "border-fresh bg-fresh text-fresh-foreground"
      : "border-border bg-background text-foreground hover:border-fresh"
  }`;

export function PriceCalculator() {
  const [service, setService] = useState<ServiceType>("turnover");
  const [bedroom, setBedroom] = useState("1");
  const [bathrooms, setBathrooms] = useState(1);
  const [frequency, setFrequency] = useState<Frequency>("bi-weekly");
  const [addons, setAddons] = useState<string[]>(["laundry", "restock"]);
  const [sameDay, setSameDay] = useState(false);
  const [weekend, setWeekend] = useState(false);
  const [holiday, setHoliday] = useState(false);
  const [walkupFlights, setWalkupFlights] = useState(0);

  const price = useMemo(
    () =>
      estimate({
        bedroom,
        bathrooms,
        service,
        frequency,
        addons,
        sameDay,
        weekend,
        holiday,
        walkupFlights,
      }),
    [
      bedroom,
      bathrooms,
      service,
      frequency,
      addons,
      sameDay,
      weekend,
      holiday,
      walkupFlights,
    ]
  );

  const toggleAddon = (key: string) =>
    setAddons((cur) =>
      cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]
    );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Controls */}
      <div className="surface-card space-y-6 p-6 sm:p-8">
        <div>
          <p className="text-sm font-semibold text-foreground">Service</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(SERVICES) as ServiceType[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(s)}
                className={pill(service === s)}
              >
                {SERVICES[s].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Bedrooms</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {BEDROOM_TIERS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setBedroom(t.key)}
                className={pill(bedroom === t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">Bathrooms</p>
          <Stepper
            value={bathrooms}
            min={1}
            max={6}
            onChange={setBathrooms}
            label="bathrooms"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Frequency</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(FREQUENCIES) as Frequency[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                className={pill(frequency === f)}
              >
                {FREQUENCIES[f].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Add-ons</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {ADDONS.map((a) => {
              const on = addons.includes(a.key);
              return (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => toggleAddon(a.key)}
                  className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                    on
                      ? "border-fresh bg-fresh-light/60"
                      : "border-border bg-background hover:border-fresh"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex size-4 items-center justify-center rounded border ${
                        on
                          ? "border-fresh bg-fresh text-fresh-foreground"
                          : "border-border"
                      }`}
                    >
                      {on ? (
                        <Check className="size-3" aria-hidden="true" />
                      ) : null}
                    </span>
                    {a.label}
                  </span>
                  <span className="shrink-0 font-medium text-muted-foreground">
                    +${a.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Timing & access</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSameDay((v) => !v)}
              className={pill(sameDay)}
            >
              Same-day +$59
            </button>
            <button
              type="button"
              onClick={() => setWeekend((v) => !v)}
              className={pill(weekend)}
            >
              Weekend +$25
            </button>
            <button
              type="button"
              onClick={() => setHoliday((v) => !v)}
              className={pill(holiday)}
            >
              Holiday +$45
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Walk-up flights of stairs
            </p>
            <Stepper
              value={walkupFlights}
              min={0}
              max={8}
              onChange={setWalkupFlights}
              label="walk-up flights"
            />
          </div>
        </div>
      </div>

      {/* Estimate */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="surface-card p-6 sm:p-8">
          <p className="text-sm font-medium text-muted-foreground">
            Estimated price
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-5xl font-bold tracking-tight text-foreground tabular-nums">
              ${price}
            </span>
            <span className="text-sm text-muted-foreground">/ clean</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {SERVICES[service].label} · {FREQUENCIES[frequency].label}. Final
            quote confirmed after we review your listing.
          </p>

          <a
            href="#signup"
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-fresh font-semibold text-fresh-foreground shadow-sm hover:bg-fresh/90"
          >
            Lock in this quote
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>

          <div className="mt-6 border-t border-border/60 pt-5">
            <p className="text-xs font-semibold tracking-wide text-foreground uppercase">
              Always included — free
            </p>
            <ul className="mt-3 space-y-2">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <Check
                    className="mt-0.5 size-3.5 shrink-0 text-fresh"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
