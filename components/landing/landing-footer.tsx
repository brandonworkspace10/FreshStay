import { Phone } from "lucide-react";

import { BrandMark } from "@/components/landing/brand-mark";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <BrandMark />
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Professional Airbnb &amp; short-term rental turnover cleaning for
              NYC hosts. Recurring plans so checkout day runs itself.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-foreground">Contact</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="tel:+12125550198"
                    className="inline-flex items-center gap-2 transition-colors hover:text-foreground focus-visible:text-foreground"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    (212) 555-0198
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hosts@freshstay.co"
                    className="transition-colors hover:text-foreground focus-visible:text-foreground"
                  >
                    hosts@freshstay.co
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Hours</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Turnover support: 7am–9pm daily
                <br />
                Office: Mon–Sat, 8am–6pm
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} FreshStay Cleaning Co. All rights
            reserved. Serving NYC short-term rental hosts.
          </p>
        </div>
      </div>
    </footer>
  );
}
