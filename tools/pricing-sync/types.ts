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

export type LlmEngineType = 'deepseek' | 'agy';
