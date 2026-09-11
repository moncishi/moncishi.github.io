import type { VendorConfig, ProviderPlanConfig } from './types.ts';

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

export const PROVIDERS: Record<string, ProviderPlanConfig> = {
  'command-code-goat': {
    providerId: 'command-code-goat',
    providerName: 'Command Code',
    planId: 'goat',
    url: 'https://commandcode.ai/docs/plans/goat',
    description: 'Command Code Goat 套餐与模型配额倍率文档',
  },
  'opencode-go': {
    providerId: 'opencode-go',
    providerName: 'OpenCode',
    planId: 'go',
    url: 'https://opencode.ai/docs/zh-cn/go',
    description: 'OpenCode Go 套餐与模型配额倍率文档',
  },
  'glm-coding': {
    providerId: 'glm-coding',
    providerName: 'GLM Coding Plan',
    providerNameZh: '智谱 GLM 编码套餐',
    planId: 'pro',
    url: 'https://docs.bigmodel.cn/cn/coding-plan/overview',
    description: '智谱 GLM Coding Plan 积分制套餐与模型抵扣规则',
  },
};
