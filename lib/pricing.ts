/**
 * Utility to calculate package prices based on adult, child, and infant counts
 * with per-person unit pricing (multiplication + addition) and fallback to package default price.
 */

export interface PricingConfig {
  adultPrice?: string | number;
  kidPrice?: string | number;
  infantPrice?: string | number;
  couplePrice?: string | number;
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
}

export function extractPriceNumber(priceStr: string | number | null | undefined): number {
  if (priceStr === null || priceStr === undefined) return 0;
  if (typeof priceStr === "number") return isNaN(priceStr) ? 0 : priceStr;
  const match = String(priceStr).replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
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

  // 1. Determine per-adult price
  let unitAdultPrice = 0;
  if (pricingTiers?.adultPrice !== undefined && pricingTiers?.adultPrice !== "" && !isNaN(Number(pricingTiers.adultPrice))) {
    unitAdultPrice = Number(pricingTiers.adultPrice);
  } else if (defaultPackagePrice) {
    unitAdultPrice = extractPriceNumber(defaultPackagePrice);
  } else if (pricingTiers?.adultPrices && Object.keys(pricingTiers.adultPrices).length > 0) {
    // Legacy fallback: if 1 adult is set
    unitAdultPrice = Number(pricingTiers.adultPrices["1"] || 0);
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
  };
}
