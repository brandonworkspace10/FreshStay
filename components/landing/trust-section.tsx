import {
  BadgeCheck,
  Camera,
  FileCheck,
  Shield,
  UserCheck,
} from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "$2M liability insurance",
    description:
      "Every job is covered. If something goes wrong, you're not chasing a solo cleaner for damages.",
  },
  {
    icon: UserCheck,
    title: "Background-checked crews",
    description:
      "Cleaners are vetted, trained on STR turnover standards, and assigned—not random gig workers.",
  },
  {
    icon: Camera,
    title: "Photo report every clean",
    description:
      "See your unit before the next guest arrives. No guessing if the bed was actually made.",
  },
  {
    icon: FileCheck,
    title: "Consistent turnover checklist",
    description:
      "Same standards every time: bathrooms, kitchen, linens, staging, supplies restocked.",
  },
  {
    icon: BadgeCheck,
    title: "Dedicated host support",
    description:
      "Text a real person when checkout time changes. We re-route crews—not an auto-reply bot.",
  },
];

export function TrustSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Built for hosts who can&apos;t afford a no-show
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          You&apos;re not hiring a stranger from a marketplace. You&apos;re
          putting your listing on a system designed for NYC turnover pressure.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trustItems.map((item) => (
          <article key={item.title} className="surface-card p-5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-fresh-light">
              <item.icon
                className="size-5 text-fresh"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-3 font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
