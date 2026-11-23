/**
 * Utility to calculate package prices based on adult, child, and infant counts
 * with per-person unit pricing (multiplication + addition) and fallback to package default price.
 */

export const GROUP_TIERS = [
  { min: 1, max: 1, key: "1", label: "1 Person" },
  { min: 2, max: 2, key: "2", label: "2 Persons" },
  { min: 3, max: 3, key: "3", label: "3 Persons" },
  { min: 4, max: 5, key: "4-5", label: "4 - 5 Persons" },
  { min: 6, max: 8, key: "6-8", label: "6 - 8 Persons" },
  { min: 9, max: 15, key: "9-15", label: "9 - 15 Persons" },
  { min: 16, max: 30, key: "16-30", label: "16 - 30 Persons" },
  { min: 31, max: 45, key: "31-45", label: "31 - 45 Persons" },
] as const;

export type GroupTierKey = typeof GROUP_TIERS[number]["key"];

export interface PricingConfig {
  adultPrice?: string | number;
  kidPrice?: string | number;
  infantPrice?: string | number;
  couplePrice?: string | number;
  oldPrice?: string;
  adultTiers?: Record<string, string | number>;
  // Legacy tiered support (backwards compatible)
  adultPrices?: Record<string, string | number>;
  kidPrices?: Record<string, string | number>;
  infantPrices?: Record<string, string | number>;
}

export interface CalculatedPricing {
  unitAdultPrice: number;
  unitKidPrice: number;
  unitInfantPrice: number;
  adultTotal: number;
  kidTotal: number;
  infantTotal: number;
  grandTotal: number;
  hasPricing: boolean;
  activeTierKey?: string;
  activeTierLabel?: string;
}

export function extractPriceNumber(priceStr: string | number | null | undefined): number {
  if (priceStr === null || priceStr === undefined) return 0;
  if (typeof priceStr === "number") return isNaN(priceStr) ? 0 : priceStr;
  const match = String(priceStr).replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

export function getStartingTierPrice(pricingTiers: PricingConfig | null | undefined): number {
  if (!pricingTiers) return 0;
  if (pricingTiers.adultTiers) {
    const keys: string[] = ["1", "2", "3", "4-5", "6-8", "9-15", "16-30", "31-45"];
    // Prefer 1 person rate, or the first configured tier
    for (const k of keys) {
      const val = pricingTiers.adultTiers[k];
      if (val !== undefined && val !== "" && !isNaN(Number(val)) && Number(val) > 0) {
        return Number(val);
      }
    }
  }
  if (pricingTiers.adultPrice && !isNaN(Number(pricingTiers.adultPrice))) {
    return Number(pricingTiers.adultPrice);
  }
  return 0;
}

export function calculatePackagePrice(
  pricingTiers: PricingConfig | null | undefined,
  adultCount: number,
  childCount: number = 0,
  infantCount: number = 0,
  defaultPackagePrice?: string | number | null
): CalculatedPricing {
  const defaultResult: CalculatedPricing = {
    unitAdultPrice: 0,
    unitKidPrice: 0,
    unitInfantPrice: 0,
    adultTotal: 0,
    kidTotal: 0,
    infantTotal: 0,
    grandTotal: 0,
    hasPricing: false,
  };

  const safeAdults = Math.max(0, adultCount || 0);
  const safeKids = Math.max(0, childCount || 0);
  const safeInfants = Math.max(0, infantCount || 0);

  // 1. Determine per-adult price based on tiered ranges (if defined)
  let unitAdultPrice = 0;
  let activeTierKey: string | undefined = undefined;
  let activeTierLabel: string | undefined = undefined;

  const adultTiers = pricingTiers?.adultTiers;
  const hasTierData = adultTiers && Object.values(adultTiers).some(v => v !== undefined && v !== "" && !isNaN(Number(v)) && Number(v) > 0);

  if (hasTierData && adultTiers) {
    const matched = GROUP_TIERS.find((t) => safeAdults >= t.min && safeAdults <= t.max);
    if (matched && adultTiers[matched.key] !== undefined && adultTiers[matched.key] !== "" && !isNaN(Number(adultTiers[matched.key]))) {
      unitAdultPrice = Number(adultTiers[matched.key]);
      activeTierKey = matched.key;
      activeTierLabel = matched.label;
    } else if (safeAdults > 45) {
      const lastTier = GROUP_TIERS[GROUP_TIERS.length - 1];
      if (adultTiers[lastTier.key] !== undefined && adultTiers[lastTier.key] !== "" && !isNaN(Number(adultTiers[lastTier.key]))) {
        unitAdultPrice = Number(adultTiers[lastTier.key]);
        activeTierKey = lastTier.key;
        activeTierLabel = `${lastTier.label} (45+ rate)`;
      }
    } else if (safeAdults > 0) {
      // If exact tier wasn't filled, find the closest configured tier
      for (const t of GROUP_TIERS) {
        if (adultTiers[t.key] !== undefined && adultTiers[t.key] !== "" && !isNaN(Number(adultTiers[t.key]))) {
          unitAdultPrice = Number(adultTiers[t.key]);
          activeTierKey = t.key;
          activeTierLabel = t.label;
          break;
        }
      }
    }
  }

  // Fallback to flat adultPrice if no tiered rate matched
  if (unitAdultPrice === 0) {
    if (pricingTiers?.adultPrice !== undefined && pricingTiers?.adultPrice !== "" && !isNaN(Number(pricingTiers.adultPrice))) {
      unitAdultPrice = Number(pricingTiers.adultPrice);
    } else if (defaultPackagePrice) {
      unitAdultPrice = extractPriceNumber(defaultPackagePrice);
    } else if (pricingTiers?.adultPrices && Object.keys(pricingTiers.adultPrices).length > 0) {
      unitAdultPrice = Number(pricingTiers.adultPrices["1"] || 0);
    }
  }

  // 2. Determine per-child price (Age 3-12)
  let unitKidPrice = 0;
  if (pricingTiers?.kidPrice !== undefined && pricingTiers?.kidPrice !== "" && !isNaN(Number(pricingTiers.kidPrice))) {
    unitKidPrice = Number(pricingTiers.kidPrice);
  } else if (pricingTiers?.kidPrices && Object.keys(pricingTiers.kidPrices).length > 0) {
    unitKidPrice = Number(pricingTiers.kidPrices["1"] || 0);
  }

  // 3. Determine per-infant price (Age 0-2)
  let unitInfantPrice = 0;
  if (pricingTiers?.infantPrice !== undefined && pricingTiers?.infantPrice !== "" && !isNaN(Number(pricingTiers.infantPrice))) {
    unitInfantPrice = Number(pricingTiers.infantPrice);
  } else if (pricingTiers?.infantPrices && Object.keys(pricingTiers.infantPrices).length > 0) {
    unitInfantPrice = Number(pricingTiers.infantPrices["1"] || 0);
  }

  // 4. Calculate totals
  const adultTotal = safeAdults * unitAdultPrice;
  const kidTotal = safeKids * unitKidPrice;
  const infantTotal = safeInfants * unitInfantPrice;
  const grandTotal = adultTotal + kidTotal + infantTotal;

  return {
    unitAdultPrice,
    unitKidPrice,
    unitInfantPrice,
    adultTotal,
    kidTotal,
    infantTotal,
    grandTotal,
    hasPricing: unitAdultPrice > 0 && safeAdults > 0,
    activeTierKey,
    activeTierLabel,
  };
}
