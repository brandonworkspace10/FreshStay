import { Check } from "lucide-react";

export function TurnoverTimeline({ className }: { className?: string }) {
  return (
    <div
      className={`surface-card p-5 ${className ?? ""}`}
      aria-label="Turnover timeline: guest checkout, cleaning, ready for next guest"
    >
      <div className="mb-4 flex items-center justify-between text-xs font-medium tracking-wide text-muted-foreground uppercase">
        <span>11:00 checkout</span>
        <span className="rounded-full bg-fresh-light px-2 py-0.5 text-fresh normal-case">
          Same-day ready
        </span>
        <span>3:00 check-in</span>
      </div>
      <div className="relative flex items-center gap-0">
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <span className="text-xs font-semibold">OUT</span>
          </div>
          <span className="text-center text-xs text-muted-foreground">
            Guests leave
          </span>
        </div>
        <div className="relative flex flex-1 flex-col items-center">
          <div className="absolute top-5 h-0.5 w-full -translate-y-1/2 overflow-hidden rounded-full bg-border">
            <div
              className="h-full w-[75%] rounded-full bg-fresh motion-safe:animate-[timeline-fill_2s_ease-out_forwards] motion-reduce:w-[75%]"
            />
          </div>
          <div className="relative z-10 flex size-10 items-center justify-center rounded-full bg-fresh text-fresh-foreground shadow-sm">
            <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span className="mt-2 text-center text-xs font-medium text-foreground">
            FreshStay cleans
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-dark text-white">
            <span className="text-xs font-semibold">IN</span>
          </div>
          <span className="text-center text-xs text-muted-foreground">
            Next guest arrives
          </span>
        </div>
      </div>
    </div>
  );
}
