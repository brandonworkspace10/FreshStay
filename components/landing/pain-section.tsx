import { Clock, MessageSquareOff, UserX } from "lucide-react";

const pains = [
  {
    icon: UserX,
    title: "The cleaner who ghosts on turnover day",
    description:
      "A guest checks out at 11. Your backup is booked. You spend the morning texting three people who don't reply.",
  },
  {
    icon: Clock,
    title: "Same-day pressure with no buffer",
    description:
      "NYC turnovers aren't flexible. If cleaning starts late, the next guest walks into a unit that still smells like last week's stay.",
  },
  {
    icon: MessageSquareOff,
    title: "One-off bookings, every single time",
    description:
      "Finding someone new for each stay means re-explaining your lockbox, linens, and checklist—while your calendar fills up.",
  },
];

export function PainSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You searched &ldquo;airbnb cleaning NYC&rdquo; because turnover day is
          stressful
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Most hosts don&apos;t need a one-time deep clean. They need someone
          reliable locked into their calendar—so checkout morning isn&apos;t a
          crisis.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pains.map((pain) => (
          <article key={pain.title} className="surface-card p-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-fresh-light">
              <pain.icon
                className="size-5 text-fresh"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {pain.title}
            </h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {pain.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
