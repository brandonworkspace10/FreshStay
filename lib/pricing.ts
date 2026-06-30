// Canonical FreshStay pricing model (premium NYC Airbnb turnover positioning).
// Benchmarked 2026 against Maid Sailors, Maid Marines, Fress, Cleany, eMaids.

export type ServiceType = "turnover" | "deep" | "move";
export type Frequency = "one-time" | "bi-weekly" | "weekly";

export type BedroomTier = { key: string; label: string; base: number };

export const BEDROOM_TIERS: BedroomTier[] = [
  { key: "studio", label: "Studio", base: 149 },
  { key: "1", label: "1 Bedroom", base: 179 },
  { key: "2", label: "2 Bedroom", base: 229 },
  { key: "3", label: "3 Bedroom", base: 289 },
  { key: "4", label: "4 Bedroom", base: 359 },
  { key: "5", label: "5+ Bedroom", base: 429 },
];

export const SERVICES: Record<
  ServiceType,
  { label: string; mult: number; note: string }
> = {
  turnover: {
    label: "Airbnb Turnover",
    mult: 1,
    note: "Guest-ready reset between stays",
  },
  deep: { label: "Deep Clean", mult: 1.6, note: "Top-to-bottom seasonal reset" },
  move: {
    label: "Move In / Move Out",
    mult: 1.7,
    note: "Empty-unit deep clean",
  },
};

export const FREQUENCIES: Record<
  Frequency,
  { label: string; off: number; note: string }
> = {
  "one-time": { label: "One-time / per stay", off: 0, note: "Book as needed" },
  "bi-weekly": { label: "Bi-weekly", off: 0.12, note: "Save 12% per clean" },
  weekly: { label: "Weekly", off: 0.2, note: "Save 20% per clean" },
};

export const EXTRA_BATHROOM = 20;

export type AddOn = {
  key: string;
  label: string;
  price: number;
  perBed?: boolean;
};

export const ADDONS: AddOn[] = [
  { key: "laundry", label: "On-site laundry (linens & towels)", price: 29 },
  { key: "linen", label: "Fresh linen rental (per bed)", price: 22, perBed: true },
  { key: "restock", label: "Restock toiletries & coffee", price: 19 },
  { key: "fridge_restock", label: "Refrigerator restocking", price: 24 },
  { key: "staging", label: "Welcome basket & staging", price: 39 },
  { key: "pet", label: "Pet hair removal", price: 30 },
  { key: "balcony", label: "Balcony / patio cleaning", price: 25 },
  { key: "windows", label: "Interior window cleaning", price: 39 },
  { key: "oven", label: "Inside oven cleaning", price: 35 },
  { key: "fridge", label: "Inside refrigerator cleaning", price: 30 },
  { key: "cabinets", label: "Inside cabinets", price: 30 },
];

export const SURCHARGES = {
  sameDay: 59,
  weekend: 25,
  holiday: 45,
  walkupPerFlight: 10, // charged above 2 flights
};

// Always included at no extra cost — the premium differentiators.
export const INCLUDED = [
  "Full turnover checklist — kitchen, baths, bedrooms & living",
  "Fresh linens swapped and beds hotel-styled",
  "Before & after photos sent after every clean",
  "Damage & maintenance issues reported same day",
  "Smart-lock, Wi-Fi, thermostat & smoke-detector check",
  "Trash-out and supply-level check",
];

export type EstimateInput = {
  bedroom: string;
  bathrooms: number;
  service: ServiceType;
  frequency: Frequency;
  addons: string[];
  sameDay: boolean;
  weekend: boolean;
  holiday: boolean;
  walkupFlights: number;
};

export function estimate(i: EstimateInput): number {
  const tier =
    BEDROOM_TIERS.find((t) => t.key === i.bedroom) ?? BEDROOM_TIERS[1];
  const beds = tier.key === "studio" ? 1 : Number.parseInt(tier.key, 10) || 1;

  let price = tier.base * SERVICES[i.service].mult;
  price += Math.max(0, i.bathrooms - 1) * EXTRA_BATHROOM;
  price *= 1 - FREQUENCIES[i.frequency].off;

  for (const a of ADDONS) {
    if (i.addons.includes(a.key)) {
      price += a.perBed ? a.price * beds : a.price;
    }
  }
  if (i.sameDay) price += SURCHARGES.sameDay;
  if (i.weekend) price += SURCHARGES.weekend;
  if (i.holiday) price += SURCHARGES.holiday;
  if (i.walkupFlights > 2) {
    price += (i.walkupFlights - 2) * SURCHARGES.walkupPerFlight;
  }

  return Math.round(price);
}
