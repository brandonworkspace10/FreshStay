"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const planOptions = [
  { value: "bi-weekly", label: "Bi-weekly (most popular)" },
  { value: "weekly", label: "Weekly" },
  { value: "per-stay", label: "Per stay" },
];

export function SignupSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1200);
  }

  return (
    <section
      id="signup"
      className="border-t border-border/60 bg-gradient-to-br from-fresh-light/60 via-background to-fresh-light/30 py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get on a plan before your next checkout
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Tell us about your unit and we&apos;ll confirm pricing, coverage,
            and same-day availability—usually within one business hour.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-fresh" aria-hidden="true" />
              No long-term contract
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-fresh" aria-hidden="true" />
              Month-to-month, pause anytime
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-fresh" aria-hidden="true" />
              First turnover scheduled within 48 hours
            </li>
          </ul>
        </div>

        {status === "success" ? (
          <div className="surface-card p-8" role="status">
            <h3 className="font-display text-2xl font-bold">
              You&apos;re on the list
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We&apos;ll text you within one business hour with your quote and
              first available turnover slot. Check your phone—we usually reach
              out faster than that.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="surface-card p-6 sm:p-8"
            aria-label="Sign up for a cleaning plan"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Alex Chen"
                  className="min-h-11 text-base bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(212) 555-0100"
                  className="min-h-11 text-base bg-background"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Listing address</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  autoComplete="street-address"
                  placeholder="123 Bedford Ave, Brooklyn"
                  className="min-h-11 text-base bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min={0}
                  max={10}
                  required
                  placeholder="1"
                  className="min-h-11 text-base bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Plan preference</Label>
                <select
                  id="plan"
                  name="plan"
                  required
                  className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-background px-2.5 text-base shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] outline-none"
                  defaultValue="bi-weekly"
                >
                  {planOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 min-h-12 w-full cursor-pointer bg-fresh text-base font-semibold text-fresh-foreground hover:bg-fresh/90 shadow-sm"
            >
              {status === "loading" ? (
                <>
                  <Loader2
                    className="size-4 motion-safe:animate-spin"
                    aria-hidden="true"
                  />
                  Sending…
                </>
              ) : (
                <>
                  Get my cleaning plan
                  <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              By submitting, you agree to receive texts about your quote. No
              spam, no sharing your info.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
