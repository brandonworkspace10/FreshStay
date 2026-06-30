import { Camera, Clock, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";

const stats = [
  { icon: Sparkles, value: "2,400+", label: "Turnovers completed / month" },
  { icon: Clock, value: "98%", label: "On-time arrival rate" },
  { icon: Star, value: "4.9★", label: "Average host rating" },
  { icon: Zap, value: "Same-day", label: "Emergency cleanings available" },
  { icon: Camera, value: "100%", label: "Photo-verified turnovers" },
  { icon: ShieldCheck, value: "$2M", label: "Fully insured · bonded crews" },
];

export function SocialProofBar() {
  return (
    <section
      className="border-y border-border/60 bg-slate-dark text-white"
      aria-label="FreshStay trust metrics"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-fresh uppercase">
          Trusted by NYC Airbnb hosts
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10 sm:p-5"
              >
                <Icon className="size-5 text-fresh" aria-hidden="true" />
                <p className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
