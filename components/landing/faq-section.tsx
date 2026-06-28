import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much does Airbnb cleaning cost in NYC?",
    answer:
      "For a standard 1-bedroom turnover, per-stay cleaning starts at $129. Bi-weekly plans run about $99 per clean and weekly plans about $89—because your crew is scheduled in advance, not booked last-minute. Studios start at $99; larger units are quoted based on bedroom count. You'll get an exact price when you submit your unit details.",
  },
  {
    question: "Can you handle same-day turnover?",
    answer:
      "Yes. Most of our host accounts are built around checkout-to-check-in windows—often 11am out, 3pm in. Same-day slots are prioritized for hosts on recurring plans. Tell us your checkout and check-in times when you sign up and we'll confirm availability for your address.",
  },
  {
    question: "Do you serve my neighborhood?",
    answer:
      "We cover Manhattan, Brooklyn, Queens, the Bronx, and Staten Island—with the fastest response in Manhattan, Brooklyn, and Queens. If you're in a specific block or building with access quirks, text us your address before signing up and we'll confirm coverage.",
  },
  {
    question: "What if my cleaner doesn't show up?",
    answer:
      "That's exactly what recurring plans solve. You're not relying on one person's calendar—you have a scheduled crew and backup coverage. If there's ever a delay, our host support line reroutes a team and keeps you updated before your guest arrives.",
  },
  {
    question: "Are your cleaners insured and background-checked?",
    answer:
      "Every FreshStay crew member is background-checked and trained on short-term rental turnover standards. All jobs carry $2M liability insurance. You're not handing your keys to an unvetted marketplace stranger.",
  },
  {
    question: "Can I pause or change my plan?",
    answer:
      "Yes. Skip a week when you're blocked off, switch from bi-weekly to per-stay, or add units as you grow. No long-term contracts—plans are month-to-month because your booking calendar changes.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Questions hosts ask before they sign up
        </h2>
        <p className="mt-4 text-muted-foreground">
          The same ones you&apos;re probably thinking right now.
        </p>
      </div>
      <Accordion className="mt-10" defaultValue={["faq-0"]}>
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-base font-medium text-foreground hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
