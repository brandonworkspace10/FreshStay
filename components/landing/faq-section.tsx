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
      "For a standard 1-bedroom turnover, per-stay cleaning is $179. Bi-weekly plans run about $159 per clean and weekly plans about $145—because your crew is scheduled in advance, not booked last-minute. Studios start at $149, 2-bedrooms from $229, 3-bedrooms from $289. Use the calculator on our pricing page for an instant estimate.",
  },
  {
    question: "Can you handle same-day turnover?",
    answer:
      "Yes. Most of our host accounts are built around checkout-to-check-in windows—often 11am out, 3pm in. Same-day slots are prioritized for hosts on recurring plans. Tell us your checkout and check-in times when you sign up and we'll confirm availability for your address.",
  },
  {
    question: "How long does an Airbnb turnover cleaning take?",
    answer:
      "A standard studio to 2-bedroom turnover takes about 1.5–3 hours depending on size and condition. We schedule inside your checkout-to-check-in window so the unit is guest-ready before the next arrival.",
  },
  {
    question: "Do you bring your own cleaning supplies?",
    answer:
      "Yes. Our crews arrive fully equipped with professional, eco-friendly cleaning products and equipment. We also restock guest consumables—coffee, paper towels, soap, and toiletries—on request.",
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
    question: "Do you send photos after each clean?",
    answer:
      "Yes. Every turnover ends with before-and-after photos sent straight to you, plus a same-day report of any damage, low supplies, or items guests left behind. You get proof your place is guest-ready without driving over to check it yourself.",
  },
  {
    question: "Is FreshStay good value for premium NYC Airbnb cleaning?",
    answer:
      "Premium NYC turnover services often run $250–$450 per visit. FreshStay recurring plans start at $145–$179 per clean—full premium turnovers with fresh linens, restocking, and photo proof—at a fair, predictable price because your crew is scheduled in advance around your booking calendar.",
  },
  {
    question: "Do you restock supplies and provide fresh linens?",
    answer:
      "Yes. Every turnover includes hotel-style fresh linens and topped-up essentials—coffee, paper towels, soap, and toiletries. We track your amenity inventory each visit and flag anything running low so guests never arrive to an empty shelf.",
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
