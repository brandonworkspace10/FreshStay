const stats = [
  { value: "4 hr", label: "Average turnover window" },
  { value: "98%", label: "On-time arrival rate" },
  { value: "2,400+", label: "Turnovers completed monthly" },
  { value: "$2M", label: "Liability insurance coverage" },
];

export function SocialProofBar() {
  return (
    <section
      className="border-y border-border/60 bg-slate-dark text-white"
      aria-label="FreshStay statistics"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 md:gap-8 md:py-10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="font-display text-3xl font-bold tracking-tight text-fresh sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-white/65">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
