import { Clock, KeyRound, LogOut, Sparkles } from "lucide-react";

export function TurnoverTimeline({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/40 bg-white/60 p-5 shadow-lg backdrop-blur-md sm:p-6 ${className ?? ""}`}
      aria-label="Turnover timeline: 11am guest checkout, same-day FreshStay cleaning, 3pm next guest check-in"
    >
      {/* Times + same-day badge */}
      <div className="grid grid-cols-3 items-center text-center">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          11:00 AM
        </span>
        <span className="justify-self-center rounded-full bg-fresh-light px-2.5 py-1 text-xs font-semibold text-fresh">
          Same-day ready
        </span>
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          3:00 PM
        </span>
      </div>

      {/* Rail with connector + nodes */}
      <div className="relative my-3 grid grid-cols-3 place-items-center">
        {/* Continuous connector that draws left to right */}
        <div className="absolute inset-x-[16.667%] top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-fresh motion-safe:w-0 motion-safe:animate-[timeline-fill_1.8s_ease-out_0.2s_forwards] motion-reduce:w-full" />
        </div>

        {/* 1 — Checkout (past) */}
        <div className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-card text-muted-foreground">
          <LogOut className="size-5" aria-hidden="true" />
        </div>

        {/* 2 — FreshStay cleans (now / the value) */}
        <div className="relative z-10 flex items-center justify-center">
          <span className="absolute inline-flex size-14 rounded-full bg-fresh/40 motion-safe:animate-ping" />
          <span className="relative flex size-14 items-center justify-center rounded-full bg-fresh text-fresh-foreground shadow-md shadow-fresh/30">
            <Sparkles className="size-6" strokeWidth={2.25} aria-hidden="true" />
          </span>
        </div>

        {/* 3 — Check-in (next) */}
        <div className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-fresh bg-background text-fresh">
          <KeyRound className="size-5" aria-hidden="true" />
        </div>
      </div>

      {/* Step labels */}
      <div className="grid grid-cols-3 items-start gap-1 text-center">
        <span className="text-xs text-muted-foreground">Guests check out</span>
        <span className="text-xs font-semibold text-foreground">
          FreshStay cleans &amp; resets
        </span>
        <span className="text-xs text-muted-foreground">Next guest checks in</span>
      </div>

      {/* The window we own */}
      <div className="mt-4 flex items-center justify-center gap-1.5 border-t border-border/60 pt-3 text-center text-xs text-muted-foreground">
        <Clock className="size-3.5 shrink-0 text-fresh" aria-hidden="true" />
        <span>
          Cleaned, restocked &amp; guest-ready inside the{" "}
          <span className="font-semibold text-foreground">~4-hour</span>{" "}
          checkout-to-check-in window.
        </span>
      </div>
    </div>
  );
}
