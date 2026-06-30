import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "I used to spend every checkout morning texting cleaners. On a bi-weekly plan, my Williamsburg one-bedroom just gets done. Same crew, same checklist, no drama.",
    name: "Sarah M.",
    detail: "Williamsburg · 1-bedroom · Bi-weekly plan",
    rating: 5,
  },
  {
    quote:
      "Same-day turnover is the whole game in Midtown. FreshStay has hit my 3pm deadline fourteen times this quarter. The photo reports save me from driving in to check.",
    name: "James T.",
    detail: "Midtown · Studio · Per-stay plan",
    rating: 5,
  },
  {
    quote:
      "I run three units in LIC and Bed-Stuy. Weekly plan across all of them, one invoice, one account manager. That's worth more than saving $20 on a random cleaner.",
    name: "Priya K.",
    detail: "Queens & Brooklyn · 3 units · Weekly plan",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          What NYC Airbnb hosts say about FreshStay
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="surface-card flex flex-col p-6">
              <div
                className="flex gap-0.5"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-fresh text-fresh"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-foreground leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-border/60 pt-4">
                <cite className="not-italic font-semibold text-foreground">
                  {item.name}
                </cite>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
