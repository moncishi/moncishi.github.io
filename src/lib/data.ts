/**
 * data.ts — data-assembly helpers for the AI price-comparison site.
 *
 * Pages (/, /providers, /providers/[id], /models, /models/[id]) import these
 * functions to (a) read the `providers` / `models` collections once and
 * (b) compute the derived comparison metrics they all render. All collection
 * reads and metric assembly live here so the pages stay consistent.
 */

import { getCollection } from 'astro:content';

import {
  isImageOfficial,
  isTextOfficial,
  planActualMonthly,
  planValueMetrics,
  toDisplayCurrency,
  valueMetrics,
  type Billing,
  type Currency,
  type ImagePricing,
  type Kind,
  type Mix,
  type OfficialModelPricing,
  type Plan,
  type Price,
  type QuotaType,
  type RateLimit,
} from './pricing';

/** One display row of a provider's model (provider detail page / cards). */
export interface ProviderModelRow {
  modelId: string;
  modelName: string;
  modality?: 'text' | 'image' | 'video';
  /** Provider's own price per 1M tokens, in the provider's currency. */
  price: Price;
  /** Official ¥ CNY price block from the models collection, if any. */
  officialPrice: Price | null;
  /** Official image/video pricing tiers (e.g. { '1k': 0.08, '2k': 0.15 }) */
  officialPricing?: Record<string, number> | null;
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
  /** All available subscription/pricing plans. */
  plans: Plan[];
  /** Legacy billing plan as authored; null → official pay-as-you-go (按量). */
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

/** A single model's channels across every provider and plan carrying it. */
export interface ModelChannel {
  providerId: string;
  providerName: string;
  kind: Kind;
  planId?: string;
  planName?: string;
  planRateLimit?: RateLimit;
  quotaType?: QuotaType;
  /** Effective monthly bill in display currency. null = pay-as-you-go. */
  monthlyFee: number | null;
  /** Monthly quota in M tokens. null when not computable. */
  quotaM: number | null;
  /** M tokens per display-currency unit (raw, unrounded). */
  mPerCur: number | null;
  /** Display-currency cost per M token (raw, unrounded). */
  curPerM: number | null;
}

/** One (provider, plan, model) combo on the global value leaderboard. */
export interface LeaderboardEntry {
  modelId: string;
  modelName: string;
  providerId: string;
  providerName: string;
  providerKind: Kind;
  planId?: string;
  planName?: string;
  planRateLimit?: RateLimit;
  quotaType?: QuotaType;
  /** Raw cost per M token in display currency. null for non-pool combos. */
  curPerM: number | null;
  /** Raw M tokens per display-currency unit. null for non-pool combos. */
  mPerCur: number | null;
  /** 1-based rank by raw curPerM ascending. Non-pool combos are excluded from the ranking. */
  rank: number;
}

/** Official ¥ CNY price block from the models collection, reshaped to a `Price`. */
function officialToPrice(official: unknown): Price | null {
  if (isTextOfficial(official)) {
    return {
      input: official.input,
      output: official.output,
      cacheRead: official.cacheRead ?? null,
      cacheWrite: official.cacheWrite ?? null,
    };
  }
  return null;
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
 * Derived value metrics for ONE (provider modelRow, mix) pair using legacy billing.
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
    return { quotaM: null, monthlyFee: null, mPerCur: null, curPerM: null };
  }

  const providerCurrency = normalized.currency ?? 'USD';
  const vm = valueMetrics(price, mix, credits ?? 0, normalized, providerCurrency);

  if (credits === null || credits <= 0 || vm.quotaM === null) {
    return { quotaM: null, monthlyFee: null, mPerCur: null, curPerM: null };
  }

  const monthlyFee = toDisplayCurrency(
    vm.actualMonthly,
    providerCurrency,
    displayCurrency,
  );
  const quotaM = vm.quotaM;
  const curPerM = monthlyFee / quotaM;
  return { quotaM, monthlyFee, mPerCur: quotaM / monthlyFee, curPerM };
}

/**
 * Derived value metrics for ONE (plan, model price, mix) pair.
 */
export function computePlanMetrics(
  price: Price,
  plan: Plan,
  mix: Mix,
  displayCurrency: Currency,
  priceCurrency: Currency = 'USD',
): RowMetrics {
  if (plan.baseFee === 0 && plan.quotaAmount === 0) {
    return { quotaM: null, monthlyFee: null, mPerCur: null, curPerM: null };
  }

  const vm = planValueMetrics(price, mix, plan, displayCurrency, priceCurrency);
  if (vm.quotaM === null || vm.actualMonthly === null) {
    return { quotaM: null, monthlyFee: null, mPerCur: null, curPerM: null };
  }

  const monthlyFee = vm.actualMonthly;
  const quotaM = vm.quotaM;
  const curPerM = quotaM > 0 ? monthlyFee / quotaM : null;
  const mPerCur = monthlyFee > 0 && quotaM > 0 ? quotaM / monthlyFee : null;
  return { quotaM, monthlyFee, mPerCur, curPerM };
}

/**
 * All providers with their model rows, joined to the models collection
 * (model display name + official prices). Sorted by provider id for
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
      const plans: Plan[] =
        p.plans && p.plans.length > 0
          ? p.plans.map((pl) => ({
              id: pl.id,
              name: pl.name,
              baseFee: pl.baseFee,
              currency: pl.currency,
              feePct: pl.feePct ?? 0,
              quotaType: pl.quotaType,
              quotaAmount: pl.quotaAmount,
              quotaCurrency: pl.quotaCurrency,
              rateLimit: pl.rateLimit
                ? {
                    hasLimit: pl.rateLimit.hasLimit,
                    rolling5h: pl.rateLimit.rolling5h ?? null,
                    weekly: pl.rateLimit.weekly ?? null,
                    monthly: pl.rateLimit.monthly ?? null,
                  }
                : undefined,
              poolNote: pl.poolNote,
            }))
          : p.billing
          ? [
              {
                id: 'default',
                name: '默认套餐',
                baseFee: p.billing.baseFee,
                feePct: p.billing.feePct ?? 0,
                currency: p.billing.currency ?? p.currency,
                quotaType: 'credits' as const,
                quotaAmount: 0,
                poolNote: p.billing.poolNote,
              },
            ]
          : [];

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
        const officialPricing = isImageOfficial(model?.official)
          ? model.official.pricing
          : null;

        return {
          modelId: row.modelId,
          modelName: model?.name ?? row.modelId,
          modality: model?.modality ?? 'text',
          price: {
            input: row.input,
            output: row.output,
            cacheRead: row.cacheRead,
            cacheWrite: row.cacheWrite,
          },
          officialPrice,
          officialPricing,
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
        plans,
        billing,
        modelRows,
      } satisfies ProviderWithModels;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * A single model's channels: every provider and plan carrying it, with derived metrics
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

      if (p.plans && p.plans.length > 0) {
        return p.plans.map((plan) => {
          const metrics = computePlanMetrics(
            row.price,
            plan,
            mix,
            displayCurrency,
            p.currency,
          );
          return {
            providerId: p.id,
            providerName: p.name,
            kind: p.kind,
            planId: plan.id,
            planName: plan.name,
            planRateLimit: plan.rateLimit,
            quotaType: plan.quotaType,
            monthlyFee: metrics.monthlyFee,
            quotaM: metrics.quotaM,
            mPerCur: metrics.mPerCur,
            curPerM: metrics.curPerM,
          } satisfies ModelChannel;
        });
      }

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
 * Global value leaderboard: every (provider, plan, model) combo whose quota is
 * computable under `mix`, ranked by RAW curPerM ascending. Combos without a
 * computable quota (pay-as-you-go rows, missing/zero credits/quota) are excluded.
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
      if (p.plans && p.plans.length > 0) {
        for (const plan of p.plans) {
          const metrics = computePlanMetrics(
            row.price,
            plan,
            mix,
            displayCurrency,
            p.currency,
          );
          if (metrics.curPerM === null || metrics.mPerCur === null) continue;
          combos.push({
            modelId: row.modelId,
            modelName: row.modelName,
            providerId: p.id,
            providerName: p.name,
            providerKind: p.kind,
            planId: plan.id,
            planName: plan.name,
            planRateLimit: plan.rateLimit,
            quotaType: plan.quotaType,
            curPerM: metrics.curPerM,
            mPerCur: metrics.mPerCur,
            rank: 0,
            _curPerM: metrics.curPerM,
          });
        }
      } else {
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
  }

  combos.sort((a, b) => a._curPerM - b._curPerM);
  const ranked = combos.map((entry, i) => ({ ...entry, rank: i + 1 }));

  return limit !== undefined ? ranked.slice(0, limit) : ranked;
}
