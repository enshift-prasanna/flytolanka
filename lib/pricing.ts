/**
 * Utility to calculate package prices based on adult, child, and infant counts
 * and configurable pricing tiers.
 */

export interface PricingTiers {
  adultPrices?: Record<string, string | number>;
  kidPrices?: Record<string, string | number>;
  infantPrices?: Record<string, string | number>;
}

export interface CalculatedPricing {
  adultTotal: number;
  kidTotal: number;
  infantTotal: number;
  grandTotal: number;
  hasPricing: boolean;
}

export function calculatePackagePrice(
  pricingTiers: PricingTiers | null | undefined,
  adultCount: number,
  childCount: number = 0,
  infantCount: number = 0
): CalculatedPricing {
  const defaultResult: CalculatedPricing = {
    adultTotal: 0,
    kidTotal: 0,
    infantTotal: 0,
    grandTotal: 0,
    hasPricing: false,
  };

  if (!pricingTiers) return defaultResult;

  const adultPrices = pricingTiers.adultPrices || {};
  const kidPrices = pricingTiers.kidPrices || {};
  const infantPrices = pricingTiers.infantPrices || {};

  const getTierPrice = (prices: Record<string, any>, count: number): number => {
    if (count <= 0) return 0;

    // Exact count match
    const key = count.toString();
    if (prices[key] !== undefined && prices[key] !== "" && !isNaN(Number(prices[key]))) {
      return Number(prices[key]);
    }

    // Extrapolate if count is larger than highest configured tier
    const sortedKeys = Object.keys(prices)
      .map(Number)
      .filter((n) => !isNaN(n) && n > 0 && prices[n.toString()] !== "")
      .sort((a, b) => b - a);

    if (sortedKeys.length > 0) {
      const maxKey = sortedKeys[0];
      const maxPrice = Number(prices[maxKey.toString()]);
      if (maxKey > 0 && maxPrice > 0) {
        // Per-person rate based on max tier
        const perPersonRate = maxPrice / maxKey;
        return Math.round(perPersonRate * count);
      }
    }

    return 0;
  };

  const adultTotal = getTierPrice(adultPrices, adultCount);
  const kidTotal = getTierPrice(kidPrices, childCount);
  const infantTotal = getTierPrice(infantPrices, infantCount);
  const grandTotal = adultTotal + kidTotal + infantTotal;

  const hasConfiguredAdults = Object.keys(adultPrices).some((k) => adultPrices[k] !== "");

  return {
    adultTotal,
    kidTotal,
    infantTotal,
    grandTotal,
    hasPricing: hasConfiguredAdults && adultCount > 0,
  };
}
