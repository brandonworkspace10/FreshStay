const steps = [
  {
    step: "1",
    title: "Tell us about your unit",
    description:
      "Share your address, bedroom count, and how often guests book. Takes two minutes on your phone.",
  },
  {
    step: "2",
    title: "Pick your cleaning rhythm",
    description:
      "Weekly, bi-weekly, or after every stay. We assign a crew that learns your lockbox, linens, and checklist.",
  },
  {
    step: "3",
    title: "We handle every turnover",
    description:
      "Checkout morning, we're there. Linens swapped, surfaces sanitized, photos sent—ready before the next guest.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border/60 bg-slate-dark py-16 text-white sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Our Airbnb turnover process, from checkout to check-in
          </h2>
          <p className="mt-4 text-lg text-white/65">
            No app to learn. No chasing invoices. You get a recurring plan and a
            crew that already knows your place.
          </p>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <li key={item.step} className="relative">
              <span
                className="font-display text-5xl font-bold text-fresh/50"
                aria-hidden="true"
              >
                {item.step}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-white/65 leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
