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
export const FX_CNY_PER_USD = 7.2;

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
  // Groups the integer part only; `(?!\d)` stops the decimal tail from
  // participating in digit-run matching (e.g. 15136.5 -> "15,136.5").
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
