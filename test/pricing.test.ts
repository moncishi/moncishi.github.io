import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FX_CNY_PER_USD,
  planActualMonthly,
  planQuotaMillion,
  planValueMetrics,
  fmtMoney,
  round1,
  formatRateLimitNote,
  isImageOfficial,
  isTextOfficial,
  type Plan,
  type Price,
  type Mix,
  type ImagePricing,
} from '../src/lib/pricing.ts';

test('planActualMonthly calculates monthly fee with feePct and currency conversion', () => {
  // Command Code Go: 8 CNY / month, no extra fee
  const planGo: Plan = {
    id: 'go',
    name: 'Go 套餐',
    baseFee: 8,
    currency: 'CNY',
    quotaType: 'currency',
    quotaAmount: 10,
    quotaCurrency: 'USD',
  };

  assert.equal(planActualMonthly(planGo, 'CNY'), 8);
  assert.equal(round1(planActualMonthly(planGo, 'USD')), round1(8 / 7.0));

  // Command Code Goat: 10 USD / month, 7% fee
  const planGoat: Plan = {
    id: 'goat',
    name: 'Goat 套餐',
    baseFee: 10,
    feePct: 7,
    currency: 'USD',
    quotaType: 'currency',
    quotaAmount: 60,
    quotaCurrency: 'USD',
  };

  assert.equal(round1(planActualMonthly(planGoat, 'USD')), 10.7);
  assert.equal(round1(planActualMonthly(planGoat, 'CNY')), round1(10.7 * 7.0));
});

test('planQuotaMillion calculates quota for credits vs currency quota', () => {
  // GLM Lite: 20000 credits, weighted cost is 50 credits/M
  const planLite: Plan = {
    id: 'lite',
    name: 'Lite 套餐',
    baseFee: 49,
    currency: 'CNY',
    quotaType: 'credits',
    quotaAmount: 20000,
  };
  assert.equal(planQuotaMillion(planLite, 50), 400);

  // Command Code Goat: 60 USD quota, weighted cost is 0.5 USD/M
  const planGoat: Plan = {
    id: 'goat',
    name: 'Goat 套餐',
    baseFee: 10,
    currency: 'USD',
    quotaType: 'currency',
    quotaAmount: 60,
    quotaCurrency: 'USD',
  };
  assert.equal(planQuotaMillion(planGoat, 0.5, 'USD'), 120);

  // Currency mismatch: quota is 10 USD, price is in CNY (7.0 CNY/M) -> 10 USD = 70 CNY -> 10M
  assert.equal(planQuotaMillion(planGoat, 7.0, 'CNY'), 60);
});

test('planValueMetrics produces complete metrics for a plan and model price', () => {
  const mix: Mix = { cacheRead: 0.9, input: 0.09, output: 0.01 };
  const price: Price = {
    input: 0.5,
    output: 1.5,
    cacheRead: 0.05,
    cacheWrite: null,
  };
  const plan: Plan = {
    id: 'goat',
    name: 'Goat 套餐',
    baseFee: 10,
    feePct: 0,
    currency: 'USD',
    quotaType: 'currency',
    quotaAmount: 50,
    quotaCurrency: 'USD',
    rateLimit: {
      hasLimit: 'yes',
      rolling5h: '20次或$5',
    },
  };

  // Weighted cost = 0.9*0.05 + 0.09*0.5 + 0.01*1.5 = 0.045 + 0.045 + 0.015 = 0.105
  // Quota = 50 / 0.105 ≈ 476.19 M
  // Actual monthly = $10
  // mPerCur = 476.2 / 10 = 47.6
  // curPerM = 10 / 476.2 = 0.02
  const metrics = planValueMetrics(price, mix, plan, 'USD', 'USD');
  assert.ok(metrics.quotaM !== null);
  assert.equal(round1(metrics.quotaM), 476.2);
  assert.equal(metrics.actualMonthly, 10);
  assert.equal(metrics.mPerCur, 47.6);
  assert.equal(metrics.curPerM, 0.0);
});

test('formatRateLimitNote formats note according to domain rules', () => {
  assert.equal(formatRateLimitNote(undefined), undefined);
  assert.equal(formatRateLimitNote({ hasLimit: 'no' }), '无限制');
  assert.equal(formatRateLimitNote({ hasLimit: 'unknown' }), '限额未知');
  assert.equal(formatRateLimitNote({ hasLimit: 'yes', rolling5h: '20次或$5' }), '5h 20次或$5');
  assert.equal(formatRateLimitNote({ hasLimit: 'yes', rolling5h: null }), '有限额');
  assert.equal(
    formatRateLimitNote({
      hasLimit: 'yes',
      rolling5h: '20次或$5',
      monthly: '60美元',
    }),
    '5h 20次或$5 · monthly 60美元',
  );
  assert.equal(
    formatRateLimitNote({
      hasLimit: 'yes',
      weekly: '100次',
    }),
    'weekly 100次',
  );
  assert.equal(
    formatRateLimitNote({
      hasLimit: 'yes',
      rolling5h: '5小时限额 $14',
      weekly: '周限额 $35',
      monthly: '月限额 $70',
    }),
    '5h $14 · weekly $35 · monthly $70',
  );
});

test('ImagePricing and type guards correctly distinguish image vs text pricing', () => {
  const imagePricing: ImagePricing = {
    '1k': 0.08,
    '2k': 0.15,
  };
  assert.equal(imagePricing['1k'], 0.08);
  assert.equal(imagePricing['2k'], 0.15);
  assert.equal(fmtMoney(imagePricing['1k'], 'CNY', { decimals: 2 }), '¥0.08');

  const imageOfficial = {
    pricing: { '1k': 0.08, '2k': 0.15 },
    currency: 'CNY' as const,
  };
  const textOfficial = {
    input: 10,
    output: 40,
    cacheRead: 1,
    cacheWrite: 0,
    currency: 'CNY' as const,
  };

  assert.equal(isImageOfficial(imageOfficial), true);
  assert.equal(isTextOfficial(imageOfficial), false);
  assert.equal(isImageOfficial(textOfficial), false);
  assert.equal(isTextOfficial(textOfficial), true);
  assert.equal(isImageOfficial(null), false);
  assert.equal(isTextOfficial(undefined), false);
});
