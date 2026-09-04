/**
 * data.ts — data-assembly helpers for the AI price-comparison site.
 *
 * Pages (/, /providers, /providers/[id], /models, /models/[id]) import these
 * functions to (a) read the `providers` / `models` collections once and
 * (b) compute the derived comparison metrics they all render. All collection
 * reads and metric assembly live here so the pages stay consistent.
 *
 * Design rules:
 * - Every row-level metric comes from pricing.ts (no duplicated math). The
 *   provider schema has no pricing-`Billing` object, so rows are first
 *   normalized into a pricing `Billing` when the provider bills a pool, then
 *   handed to pricing fns.
 * - quota M / monthly bill are computed against the provider's OWN currency
 *   (`valueMetrics` with the provider currency); only the monthly bill is then
 *   re-expressed in the caller's `displayCurrency`, and the per-token ratios
 *   derive from that bill. Token prices and token counts are currency-free.
 * - Ranking (channels, leaderboard) sorts on RAW (unrounded) ratios so ties
 *   behave predictably; 1-decimal rounding is a display concern only.
 */

import { getCollection } from 'astro:content';

import {
  toDisplayCurrency,
  valueMetrics,
  type Billing,
  type Currency,
  type Kind,
  type Mix,
  type Price,
} from './pricing';

/** One display row of a provider's model (provider detail page / cards). */
export interface ProviderModelRow {
  modelId: string;
  modelName: string;
  /** Provider's own price per 1M tokens, in the provider's currency. */
  price: Price;
  /** Official ¥ CNY price block from the models collection, if any. */
  officialPrice: Price | null;
  /** Monthly credits / pool face value, when the provider bills a pool. */
  credits: number | null;
  /** Published (90/9/1) monthly quota in M tokens, when the provider states it. */
  quota90: number | null;
  /** Published (95/4/1) monthly quota in M tokens, when the provider states it. */
  quota95: number | null;
}

/** A provider with its joined model rows — one element per providers entry. */
export interface ProviderWithModels {
  id: string;
  name: string;
  /** Provider human name in Chinese, when available (official providers). */
  nameZh?: string;
  kind: Kind;
  /** Provider's own listing currency (native prices / billing are in it). */
  currency: 'USD' | 'CNY';
  description?: string;
  /** Billing plan as authored; null → official pay-as-you-go (按量). */
  billing: {
    baseFee: number;
    feePct?: number;
    currency?: 'USD' | 'CNY';
    poolNote?: string;
  } | null;
  modelRows: ProviderModelRow[];
}

/** Derived value metrics for one (provider modelRow, mix) in display currency. */
export interface RowMetrics {
  /** Monthly quota in M tokens (currency-free). null when pay-as-you-go / unknowable. */
  quotaM: number | null;
  /** Effective monthly bill in `displayCurrency` (baseFee × (1 + feePct)). null when pay-as-you-go. */
  monthlyFee: number | null;
  /** M tokens per display-currency unit — higher is better. RAW (unrounded). */
  mPerCur: number | null;
  /** Display-currency cost per M token — lower is better. RAW (unrounded). */
  curPerM: number | null;
}

/** A single model's channels across every provider carrying it. */
export interface ModelChannel {
  providerId: string;
  providerName: string;
  kind: Kind;
  /** Effective monthly bill in display currency. null = pay-as-you-go. */
  monthlyFee: number | null;
  /** Monthly quota in M tokens. null when not computable. */
  quotaM: number | null;
  /** M tokens per display-currency unit (raw, unrounded). */
  mPerCur: number | null;
  /** Display-currency cost per M token (raw, unrounded). */
  curPerM: number | null;
}

/** One (provider, model) combo on the global value leaderboard. */
export interface LeaderboardEntry {
  modelId: string;
  modelName: string;
  providerId: string;
  providerName: string;
  providerKind: Kind;
  /** Raw cost per M token in display currency. null for non-pool combos. */
  curPerM: number | null;
  /** Raw M tokens per display-currency unit. null for non-pool combos. */
  mPerCur: number | null;
  /** 1-based rank by raw curPerM ascending. Non-pool combos are excluded from the ranking. */
  rank: number;
}

/** Official ¥ CNY price block from the models collection, reshaped to a `Price`. */
function officialToPrice(official: {
  input: number;
  output: number;
  cacheRead: number | null;
  cacheWrite: number | null;
}): Price {
  return {
    input: official.input,
    output: official.output,
    cacheRead: official.cacheRead,
    cacheWrite: official.cacheWrite,
  };
}

/**
 * Normalize a provider's authored plan into the pricing `Billing` used for
 * quota / monthly math. A provider with no billing block, or one whose
 * baseFee is 0, is pay-as-you-go (按量): pool metrics are null.
 */
function toBilling(billing: ProviderWithModels['billing']): Billing | null {
  if (!billing || billing.baseFee === 0) return null;
  return {
    baseFee: billing.baseFee,
    ...(billing.feePct !== undefined ? { feePct: billing.feePct } : {}),
    ...(billing.currency !== undefined ? { currency: billing.currency } : {}),
  };
}

/**
 * Derived value metrics for ONE (provider modelRow, mix) pair.
 *
 * Metrics are computed against the provider's own currency (see module header)
 * and the monthly bill is converted to `displayCurrency`. Ratios are returned
 * RAW (unrounded) so callers can rank on exact values.
 *
 * - subscription with a real monthly fee + credits (>0): quotaM from
 *   credits / weighted cost; monthlyFee from baseFee×(1+feePct).
 * - official (billing null or baseFee 0, credits null): quotaM null and
 *   monthlyFee null — 按量 (pay-as-you-go).
 * - credits present but ≤0, or weighted cost unknowable (null price under a
 *   nonzero mix weight): quota not computable → all pool metrics null.
 */
export function computeRowMetrics(
  price: Price,
  credits: number | null,
  billing: { baseFee: number; feePct?: number; currency?: Currency } | null,
  mix: Mix,
  displayCurrency: Currency,
): RowMetrics {
  const normalized = toBilling(billing);
  if (normalized === null) {
    // Pay-as-you-go: no pool, no fixed bill, no quota.
    return { quotaM: null, monthlyFee: null, mPerCur: null, curPerM: null };
  }

  // The provider's own listing currency (billing.currency ?? 'USD').
  const providerCurrency = normalized.currency ?? 'USD';
  const vm = valueMetrics(price, mix, credits ?? 0, normalized, providerCurrency);

  if (credits === null || credits <= 0 || vm.quotaM === null) {
    return { quotaM: null, monthlyFee: null, mPerCur: null, curPerM: null };
  }

  // vm.actualMonthly is in providerCurrency; re-express in displayCurrency.
  const monthlyFee = toDisplayCurrency(
    vm.actualMonthly,
    providerCurrency,
    displayCurrency,
  );
  const quotaM = vm.quotaM; // non-null after the guard above.
  const curPerM = monthlyFee / quotaM;
  return { quotaM, monthlyFee, mPerCur: quotaM / monthlyFee, curPerM };
}

/**
 * All providers with their model rows, joined to the models collection
 * (model display name + official ¥ CNY prices). Sorted by provider id for
 * deterministic output.
 */
export async function getProvidersWithModels(): Promise<ProviderWithModels[]> {
  const [providerEntries, modelEntries] = await Promise.all([
    getCollection('providers'),
    getCollection('models'),
  ]);

  const modelIndex = new Map(
    modelEntries.map((m) => [m.data.id, m.data] as const),
  );

  return providerEntries
    .map(({ data: p }) => {
      const billing =
        p.billing === undefined
          ? null
          : {
              baseFee: p.billing.baseFee,
              ...(p.billing.feePct !== undefined ? { feePct: p.billing.feePct } : {}),
              ...(p.billing.currency !== undefined
                ? { currency: p.billing.currency }
                : {}),
              ...(p.billing.poolNote !== undefined
                ? { poolNote: p.billing.poolNote }
                : {}),
            };

      const modelRows = (p.models ?? []).map((row) => {
        const model = modelIndex.get(row.modelId);
        const officialPrice = model?.official ? officialToPrice(model.official) : null;
        return {
          modelId: row.modelId,
          modelName: model?.name ?? row.modelId,
          price: {
            input: row.input,
            output: row.output,
            cacheRead: row.cacheRead,
            cacheWrite: row.cacheWrite,
          },
          officialPrice,
          credits: row.credits ?? null,
          quota90: row.quota90 ?? null,
          quota95: row.quota95 ?? null,
        } satisfies ProviderModelRow;
      });

      return {
        id: p.id,
        name: p.name,
        ...(p.nameZh !== undefined ? { nameZh: p.nameZh } : {}),
        kind: p.kind,
        currency: p.currency,
        ...(p.description !== undefined ? { description: p.description } : {}),
        billing,
        modelRows,
      } satisfies ProviderWithModels;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * A single model's channels: every provider carrying it, with derived metrics
 * for `mix` expressed in `displayCurrency`. Sorted by raw curPerM ascending;
 * pay-as-you-go channels (null curPerM) sort last.
 */
export async function getModelChannels(
  modelId: string,
  mix: Mix,
  displayCurrency: Currency,
): Promise<ModelChannel[]> {
  const providers = await getProvidersWithModels();

  return providers
    .flatMap((p) => {
      const row = p.modelRows.find((r) => r.modelId === modelId);
      if (!row) return [];
      const metrics = computeRowMetrics(
        row.price,
        row.credits,
        p.billing,
        mix,
        displayCurrency,
      );
      return [
        {
          providerId: p.id,
          providerName: p.name,
          kind: p.kind,
          monthlyFee: metrics.monthlyFee,
          quotaM: metrics.quotaM,
          mPerCur: metrics.mPerCur,
          curPerM: metrics.curPerM,
        } satisfies ModelChannel,
      ];
    })
    .sort(
      (a, b) =>
        (a.curPerM === null ? Number.POSITIVE_INFINITY : a.curPerM) -
        (b.curPerM === null ? Number.POSITIVE_INFINITY : b.curPerM),
    );
}

/**
 * Global value leaderboard: every (provider, model) combo whose quota is
 * computable under `mix`, ranked by RAW curPerM ascending. Combos without a
 * computable quota (pay-as-you-go rows, missing/zero credits) are excluded.
 * Returns at most `limit` entries when given.
 */
export async function getGlobalLeaderboard(
  mix: Mix,
  displayCurrency: Currency,
  limit?: number,
): Promise<LeaderboardEntry[]> {
  const providers = await getProvidersWithModels();

  const combos: Array<LeaderboardEntry & { _curPerM: number }> = [];
  for (const p of providers) {
    for (const row of p.modelRows) {
      const metrics = computeRowMetrics(
        row.price,
        row.credits,
        p.billing,
        mix,
        displayCurrency,
      );
      if (metrics.curPerM === null || metrics.mPerCur === null) continue;
      combos.push({
        modelId: row.modelId,
        modelName: row.modelName,
        providerId: p.id,
        providerName: p.name,
        providerKind: p.kind,
        curPerM: metrics.curPerM,
        mPerCur: metrics.mPerCur,
        rank: 0,
        _curPerM: metrics.curPerM,
      });
    }
  }

  combos.sort((a, b) => a._curPerM - b._curPerM);
  const ranked = combos.map((entry, i) => ({ ...entry, rank: i + 1 }));

  return limit !== undefined ? ranked.slice(0, limit) : ranked;
}
