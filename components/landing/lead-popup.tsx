"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  Loader2,
  MessageSquareText,
  Phone,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site";

const STORAGE_KEY = "freshstay_lead_v1";

type Step = { id: string; question: string; options: string[] };

const steps: Step[] = [
  {
    id: "area",
    question: "Where's your rental?",
    options: [
      "Manhattan",
      "Brooklyn",
      "Queens",
      "The Bronx",
      "Staten Island",
      "New Jersey",
      "Somewhere else",
    ],
  },
  {
    id: "size",
    question: "How big is the place?",
    options: ["Studio", "1 bedroom", "2 bedrooms", "3 bedrooms", "4+ bedrooms"],
  },
  {
    id: "frequency",
    question: "How often do you need turnovers?",
    options: ["Every stay", "Weekly", "Bi-weekly", "A few times a week"],
  },
  {
    id: "listings",
    question: "How many listings do you manage?",
    options: ["Just 1", "2–3", "4–9", "10+"],
  },
  {
    id: "timing",
    question: "When do you want to start?",
    options: ["ASAP (next 48h)", "This week", "This month", "Just exploring"],
  },
];

const telHref = `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`;

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const openedRef = useRef(false);

  // Auto-open once after a delay or on scroll depth (unless already completed).
  // On phones we skip auto-open entirely so it doesn't cover the small screen —
  // the floating launcher stays, so users can still tap it when they want.
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      setHidden(true);
      return;
    }
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;
    const openOnce = () => {
      if (!openedRef.current) {
        openedRef.current = true;
        setOpen(true);
      }
    };
    const timer = window.setTimeout(openOnce, 12000);
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.3) openOnce();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isContact = step === steps.length;
  const current = steps[step];
  const progress = Math.round((step / (steps.length + 1)) * 100);

  function pick(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
    setStep((s) => s + 1);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const contact = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
    };
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ source: "survey-popup", answers, contact }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("success");
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      setStatus("error");
    }
  }

  if (hidden) return null;

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open ? (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="fixed right-4 bottom-24 z-[60] flex items-center gap-2 rounded-full bg-fresh px-4 py-3 font-semibold text-fresh-foreground shadow-lg shadow-fresh/30 hover:bg-fresh/90 sm:right-6 sm:bottom-6"
            aria-label="Open quick quote survey"
          >
            <MessageSquareText className="size-5" aria-hidden="true" />
            <span className="text-sm">Get a quick quote</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* Survey panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            role="dialog"
            aria-modal="false"
            aria-label="Quick quote survey"
            className="fixed inset-x-0 bottom-0 z-[60] mx-auto w-full max-w-md rounded-t-2xl border border-border bg-card shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-border/60 px-5 pt-4 pb-3">
              <div>
                <p className="font-display text-base font-bold text-foreground">
                  {status === "success"
                    ? "You're all set 🎉"
                    : "Get a quick quote"}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {status === "success"
                    ? "We'll be in touch shortly."
                    : "5 quick taps — we'll text or call you right back."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-1 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Close survey"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {/* Progress */}
            {status === "idle" || status === "loading" || status === "error" ? (
              <div className="h-1 w-full bg-muted">
                <motion.div
                  className="h-full bg-fresh"
                  animate={{ width: `${isContact ? 90 : progress}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                />
              </div>
            ) : null}

            {/* Body */}
            <div className="px-5 py-5">
              {status === "success" ? (
                <div className="py-2 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-fresh-light">
                    <Check className="size-6 text-fresh" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm text-foreground leading-relaxed">
                    Thanks! We'll reach out within{" "}
                    <span className="font-semibold">one business hour</span> with
                    your quote and first available turnover slot.
                  </p>
                  <a
                    href={telHref}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-fresh hover:underline"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    Or call us now
                  </a>
                </div>
              ) : isContact ? (
                <form onSubmit={submit} className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    Last step — where should we reach you?
                  </p>
                  <div className="space-y-1.5">
                    <Label htmlFor="lead-name">Name</Label>
                    <Input
                      id="lead-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Alex Chen"
                      className="min-h-11 bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lead-phone">Phone</Label>
                    <Input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="(212) 555-0100"
                      className="min-h-11 bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lead-email">
                      Email{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="lead-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="alex@email.com"
                      className="min-h-11 bg-background"
                    />
                  </div>

                  {status === "error" ? (
                    <p className="text-xs text-destructive">
                      Couldn't send just now.{" "}
                      <a href={telHref} className="font-semibold underline">
                        Tap to call us
                      </a>{" "}
                      or try again.
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-fresh font-semibold text-fresh-foreground shadow-sm hover:bg-fresh/90 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2
                          className="size-4 motion-safe:animate-spin"
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      "Get my callback"
                    )}
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground">
                    By submitting you agree to receive texts about your quote. No
                    spam.
                  </p>
                </form>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {current.question}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {current.options.map((opt) => {
                        const selected = answers[current.id] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => pick(current.id, opt)}
                            className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                              selected
                                ? "border-fresh bg-fresh text-fresh-foreground"
                                : "border-border bg-background text-foreground hover:border-fresh hover:text-fresh"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer / back */}
            {step > 0 && status !== "success" ? (
              <div className="flex items-center justify-between border-t border-border/60 px-5 py-2.5">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                  Back
                </button>
                <span className="text-[11px] text-muted-foreground">
                  Step {Math.min(step + 1, steps.length + 1)} of{" "}
                  {steps.length + 1}
                </span>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
