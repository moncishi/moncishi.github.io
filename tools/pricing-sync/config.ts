import type { VendorConfig } from './types.ts';

export const VENDORS: Record<string, VendorConfig> = {
  deepseek: {
    vendorId: 'deepseek',
    vendorName: 'DeepSeek',
    officialProviderId: 'deepseek-official',
    url: 'https://api-docs.deepseek.com/zh-cn/quick_start/pricing/',
    description: 'DeepSeek 官方 API 模型与定价页面',
  },
  glm: {
    vendorId: 'glm',
    vendorName: '智谱 GLM',
    officialProviderId: 'glm-official',
    url: 'https://bigmodel.cn/pricing',
    description: '智谱开放平台 BigModel API 定价页面',
  },
};
