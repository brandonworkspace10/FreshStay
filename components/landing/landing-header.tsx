import Link from "next/link";
import { Phone } from "lucide-react";

import { BrandMark } from "@/components/landing/brand-mark";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link href="/" aria-label="FreshStay BnB home">
          <BrandMark />
        </Link>
        <nav
          className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex"
          aria-label="Main"
        >
          <a
            href="#plans"
            className="transition-colors hover:text-fresh focus-visible:text-fresh"
          >
            Plans
          </a>
          <a
            href="#neighborhoods"
            className="transition-colors hover:text-fresh focus-visible:text-fresh"
          >
            Neighborhoods
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-fresh focus-visible:text-fresh"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="transition-colors hover:text-fresh focus-visible:text-fresh"
          >
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="tel:+12125550198"
            className="hidden items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-fresh focus-visible:text-fresh sm:flex"
            aria-label="Call FreshStay"
          >
            <Phone className="size-4" aria-hidden="true" />
            (212) 555-0198
          </a>
          <Button
            nativeButton={false}
            render={<a href="#signup" />}
            size="sm"
            className="bg-fresh text-fresh-foreground hover:bg-fresh/90 min-h-11 min-w-[7.5rem] cursor-pointer shadow-sm"
          >
            Get my plan
          </Button>
        </div>
      </div>
    </header>
  );
}
