/**
 * pricing.ts — pure pricing-math helpers for the AI price-comparison site.
 *
 * Everything here is a pure function of its inputs: derived comparison
 * metrics (monthly quota, M-per-currency, cost-per-M) are computed at render
 * time per plan, never precomputed in mock data.
 *
 * No framework / runtime imports — safe to import from table/card components.
 */

export type Currency = 'USD' | 'CNY';
export type Kind = 'official' | 'subscription';

export type QuotaType = 'credits' | 'currency';
export type RateLimitStatus = 'yes' | 'no' | 'unknown';
export type Modality = 'text' | 'image' | 'video';

export interface RateLimit {
  hasLimit: RateLimitStatus;
  rolling5h?: string | null;
  weekly?: string | null;
  monthly?: string | null;
}

export interface Plan {
  id: string;
  name: string;
  baseFee: number;
  currency: Currency;
  feePct?: number;
  quotaType: QuotaType;
  quotaAmount: number;
  quotaCurrency?: Currency;
  rateLimit?: RateLimit;
  poolNote?: string;
}

export type ImageResolution = '1k' | '2k';
export type ImagePricing = Record<ImageResolution, number>;

export interface TextOfficial {
  input: number;
  output: number;
  cacheRead: number | null;
  cacheWrite: number | null;
  currency: Currency;
}

export interface ImageOfficial {
  pricing: ImagePricing;
  currency: Currency;
}

export type OfficialModelPricing = TextOfficial | ImageOfficial;

export function isImageOfficial(official: unknown): official is ImageOfficial {
  return Boolean(official && typeof official === 'object' && 'pricing' in official);
}

export function isTextOfficial(official: unknown): official is TextOfficial {
  return Boolean(
    official &&
      typeof official === 'object' &&
      'input' in official &&
      'output' in official,
  );
}

/** Canonical user-facing note for a plan's rate limit. */
export function formatRateLimitNote(rateLimit?: RateLimit): string | undefined {
  if (!rateLimit) return undefined;
  if (rateLimit.hasLimit === 'yes') {
    const parts: string[] = [];
    if (rateLimit.rolling5h) parts.push(rateLimit.rolling5h);
    if (rateLimit.weekly) parts.push(`周:${rateLimit.weekly}`);
    if (rateLimit.monthly) parts.push(`月:${rateLimit.monthly}`);
    return parts.length > 0 ? parts.join(' · ') : '有限额';
  }
  if (rateLimit.hasLimit === 'no') {
    return '无限制';
  }
  return undefined;
}

/** Token-mix weights (cacheRead + input + output ≈ 1). */
export interface Mix {
  cacheRead: number;
  input: number;
  output: number;
}

/** Raw per-1M-token price, in the price's own currency. null = not offered. */
export interface Price {
  input: number;
  output: number;
  cacheRead: number | null;
  cacheWrite: number | null;
}

export interface Billing {
  baseFee: number;
  feePct?: number;
  currency?: Currency;
}

/** Site-level mock FX rate for USD <-> CNY display conversion. */
export const FX_CNY_PER_USD = 7.0;

export const DEFAULT_MIX: Mix = { cacheRead: 0.9, input: 0.09, output: 0.01 };
export const MIX_90_9_1 = DEFAULT_MIX;
export const MIX_95_4_1: Mix = { cacheRead: 0.95, input: 0.04, output: 0.01 };

/** Round a number to 1 decimal place (half away from zero). */
export function round1(n: number): number {
  return Math.round((n + Number.EPSILON) * 10) / 10;
}

/**
 * Weighted cost per 1M tokens under a given mix.
 *
 * Formula (cache-read heavy by default): 0.9×cacheRead + 0.09×input + 0.01×output.
 * If any mix term with a nonzero weight references a null price, the cost is
 * unknowable → null. cacheWrite is NOT part of weighted cost (it is a
 * once-per-write cost; quota math uses read/input/output).
 */
export function weightedCostPerM(price: Price, mix: Mix): number | null {
  const cacheWeight = mix.cacheRead;
  if (cacheWeight > 0 && price.cacheRead === null) return null;
  if (mix.input > 0 && price.input === null) return null;
  if (mix.output > 0 && price.output === null) return null;

  const cacheRead = cacheWeight > 0 && price.cacheRead !== null ? cacheWeight * price.cacheRead : 0;
  return cacheRead + mix.input * price.input + mix.output * price.output;
}

/**
 * Monthly quota in millions of tokens = credits / weightedPerM.
 * weightedPerM is expressed per-1M-token in the price's currency, so the
 * result is also in that currency's token-M units.
 * null when the weighted cost is unknown; never NaN/Infinity.
 */
export function quotaMillion(credits: number, weightedPerM: number | null): number | null {
  if (weightedPerM === null) return null;
  if (!Number.isFinite(weightedPerM) || weightedPerM <= 0) return null;
  return credits / weightedPerM;
}

/** Monthly bill = baseFee × (1 + feePct%), converted to `currency`. */
export function actualMonthly(billing: Billing, currency: Currency): number {
  const amount = billing.baseFee * (1 + (billing.feePct ?? 0) / 100);
  const from = billing.currency ?? 'USD';
  if (from === currency) return amount;
  return toDisplayCurrency(amount, from, currency);
}

/** Monthly bill for a specific plan converted to display currency. */
export function planActualMonthly(plan: Plan, displayCurrency: Currency): number {
  const amount = plan.baseFee * (1 + (plan.feePct ?? 0) / 100);
  return toDisplayCurrency(amount, plan.currency, displayCurrency);
}

/**
 * Monthly quota in millions of tokens under a specific plan.
 * priceCurrency is the currency in which weightedCostPerM is denominated (default USD).
 */
export function planQuotaMillion(
  plan: Plan,
  weightedCostPerM: number | null,
  priceCurrency?: Currency,
): number | null {
  if (weightedCostPerM === null || !Number.isFinite(weightedCostPerM) || weightedCostPerM <= 0) return null;
  if (plan.quotaType === 'credits') {
    return plan.quotaAmount / weightedCostPerM;
  }
  const quotaCur = plan.quotaCurrency ?? plan.currency;
  const targetPriceCur = priceCurrency ?? quotaCur;
  const quotaInPriceCur = toDisplayCurrency(plan.quotaAmount, quotaCur, targetPriceCur);
  return quotaInPriceCur / weightedCostPerM;
}

/** "How many M tokens per currency unit" — higher is better. 1 decimal. */
export function mPerCurrency(quotaM: number | null, actualMonthlyUsd: number): number | null {
  if (quotaM === null) return null;
  if (!Number.isFinite(actualMonthlyUsd) || actualMonthlyUsd <= 0) return null;
  return round1(quotaM / actualMonthlyUsd);
}

/** "How much currency per M token" — lower is better. 1 decimal. Inverse of mPerCurrency. */
export function currencyPerM(actualMonthly: number, quotaM: number | null): number | null {
  if (quotaM === null) return null;
  if (!Number.isFinite(quotaM) || quotaM <= 0) return null;
  return round1(actualMonthly / quotaM);
}

/** FX display conversion. from==to → identity. */
export function toDisplayCurrency(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount;
  if (from === 'USD' && to === 'CNY') return amount * FX_CNY_PER_USD;
  return amount / FX_CNY_PER_USD;
}

/** "$12.3" / "¥57.6" (default 1 decimal, symbol prefix, no space). null → "—". */
export function fmtMoney(n: number | null, currency: Currency, opts?: { decimals?: number }): string {
  if (n === null) return '—';
  const decimals = opts?.decimals ?? 1;
  const fixed = n.toFixed(decimals);
  const symbol = currency === 'USD' ? '$' : '¥';
  return `${symbol}${fixed}`;
}

/** Millions, 1 decimal, thousands separators. null → "—". */
export function fmtM(n: number | null): string {
  if (n === null) return '—';
  const rounded = round1(n);
  return rounded.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export interface ValueMetrics {
  quotaM: number | null;
  actualMonthly: number;
  mPerCur: number | null;
  curPerM: number | null;
}

/**
 * Convenience bundle used by table/card components: given a price, a mix,
 * credits and a billing plan, return quota M + monthly bill + M-per-currency +
 * currency-per-M, all null-safe, in the requested display currency.
 */
export function valueMetrics(
  price: Price,
  mix: Mix,
  credits: number,
  billing: Billing,
  displayCurrency: Currency,
): ValueMetrics {
  const quotaM = quotaMillion(credits, weightedCostPerM(price, mix));
  const actualMonthlyUsd = actualMonthly(billing, displayCurrency);
  return {
    quotaM,
    actualMonthly: actualMonthlyUsd,
    mPerCur: mPerCurrency(quotaM, actualMonthlyUsd),
    curPerM: currencyPerM(actualMonthlyUsd, quotaM),
  };
}

/**
 * Convenience bundle for a specific plan.
 */
export function planValueMetrics(
  price: Price,
  mix: Mix,
  plan: Plan,
  displayCurrency: Currency,
  priceCurrency: Currency = 'USD',
): ValueMetrics {
  const weighted = weightedCostPerM(price, mix);
  const quotaM = planQuotaMillion(plan, weighted, priceCurrency);
  const actualMonthlyCur = planActualMonthly(plan, displayCurrency);
  return {
    quotaM,
    actualMonthly: actualMonthlyCur,
    mPerCur: mPerCurrency(quotaM, actualMonthlyCur),
    curPerM: currencyPerM(actualMonthlyCur, quotaM),
  };
}
