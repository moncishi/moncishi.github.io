export type Modality = 'text' | 'image' | 'video';
export type Currency = 'USD' | 'CNY';

export interface TextOfficialPricing {
  input: number;
  output: number;
  cacheRead: number | null;
  cacheWrite: number | null;
  currency: Currency;
}

export interface ImageOfficialPricing {
  pricing: {
    '1k': number;
    '2k': number;
  };
  currency: Currency;
}

export type OfficialPricing = TextOfficialPricing | ImageOfficialPricing;

export interface ExtractedModel {
  /** Canonical slug, e.g. "glm-5.2", "deepseek-flash", "cogview-3-plus" */
  id: string;
  /** Display name, e.g. "GLM-5.2", "DeepSeek-V4.1-Flash" */
  name: string;
  modality: Modality;
  official: OfficialPricing;
  description?: string;
}

export interface VendorConfig {
  vendorId: string;
  vendorName: string;
  officialProviderId: string;
  url: string;
  description?: string;
}

export interface ExtractedProviderPlan {
  id: string;
  name: string;
  baseFee: number;
  currency: 'USD' | 'CNY';
  feePct?: number;
  quotaType: 'currency' | 'credits';
  quotaAmount: number;
  quotaCurrency?: 'USD' | 'CNY';
  rateLimit?: {
    hasLimit: 'yes' | 'no' | 'unknown';
    rolling5h?: string | null;
    weekly?: string | null;
    monthly?: string | null;
  };
  poolNote?: string;
}

export interface ProviderPlanConfig {
  providerId: string;
  providerName: string;
  providerNameZh?: string;
  planId: string;
  url: string;
  description?: string;
}

export interface ExtractedProviderModel {
  modelId: string;
  modelName: string;
  input: number;
  output: number;
  cacheRead: number | null;
  cacheWrite: number | null;
  modelQuota?: number | null; // e.g. 20 (USD)
  multiplier?: number | null; // e.g. 70 / 20 = 3.5
}

export interface ExtractedProviderData {
  providerId: string;
  providerName: string;
  providerNameZh?: string;
  kind: 'subscription';
  currency: 'USD' | 'CNY';
  description?: string;
  plan?: ExtractedProviderPlan;
  plans?: ExtractedProviderPlan[];
  models: ExtractedProviderModel[];
}

export type LlmEngineType = 'deepseek' | 'agy';
