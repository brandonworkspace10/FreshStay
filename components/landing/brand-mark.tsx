import { House } from "lucide-react";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  /** Hide the "FreshStay BnB" wordmark and show only the house badge. */
  iconOnly?: boolean;
};

/**
 * FreshStay BnB logo: a teal house badge next to the wordmark.
 * The house mark signals short-term-rental cleaning without using any
 * third-party (e.g. Airbnb) trademark.
 */
export function BrandMark({ className, iconOnly = false }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-fresh text-fresh-foreground shadow-sm">
        <House className="size-[18px]" strokeWidth={2.25} aria-hidden="true" />
      </span>
      {iconOnly ? null : (
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          Fresh<span className="text-fresh">Stay</span>{" "}
          <span className="font-semibold text-muted-foreground">BnB</span>
        </span>
      )}
    </span>
  );
}
