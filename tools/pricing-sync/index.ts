#!/usr/bin/env node

import * as path from 'node:path';
import { VENDORS, PROVIDERS } from './config.ts';
import { fetchUrlToMarkdown } from './1-fetch-markdown.ts';
import { parsePricingMarkdown, parseProviderMarkdown } from './2-llm-parse.ts';
import { applyExtractedPricing, applyProviderUpdates } from './3-apply-updates.ts';
import type { LlmEngineType, ExtractedModel, ExtractedProviderData } from './types.ts';

interface CliArgs {
  vendor?: string;
  provider?: string;
  url?: string;
  type?: 'vendor' | 'provider';
  engine: LlmEngineType;
  dryRun: boolean;
  help: boolean;
}

function parseArgs(args: string[]): CliArgs {
  const result: CliArgs = {
    engine: 'deepseek',
    dryRun: false,
    help: false,
  };

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      result.help = true;
    } else if (arg === '--dry-run') {
      result.dryRun = true;
    } else if (arg.startsWith('--vendor=')) {
      result.vendor = arg.slice('--vendor='.length);
    } else if (arg.startsWith('--provider=')) {
      result.provider = arg.slice('--provider='.length);
    } else if (arg.startsWith('--type=')) {
      result.type = arg.slice('--type='.length) as 'vendor' | 'provider';
    } else if (arg.startsWith('--url=')) {
      result.url = arg.slice('--url='.length);
    } else if (arg.startsWith('--engine=')) {
      result.engine = arg.slice('--engine='.length) as LlmEngineType;
    }
  }

  return result;
}

function printHelp() {
  console.log(`
Pricing Sync Tool (AI 官方定价与第三方服务商同步工具)

Usage:
  npm run sync:pricing -- [options]

Options:
  --vendor=<id>       同步官方厂商: deepseek | glm | all
  --provider=<id>     同步第三方服务商: command-code-goat | opencode-go | all
  --url=<url>         指定任意自定义网页链接进行提取
  --type=<type>       自定义链接类型: vendor (默认) | provider
  --engine=<engine>   指定 LLM 引擎: deepseek | agy (默认: deepseek，未设 KEY 时自动切换 agy)
  --dry-run           仅输出提取结果 JSON，不更新文件
  --help, -h          显示帮助信息

Examples:
  npm run sync:pricing -- --vendor=deepseek
  npm run sync:pricing -- --provider=command-code-goat
  npm run sync:pricing -- --provider=opencode-go --dry-run
  npm run sync:pricing -- --provider=all
`);
}

async function syncVendor(
  vendorId: string,
  url: string,
  officialProviderId: string,
  engine: LlmEngineType,
  dryRun: boolean,
) {
  console.log(`\n========================================`);
  console.log(`🚀 开始同步官方厂商 [${vendorId}]`);
  console.log(`🔗 来源链接: ${url}`);
  console.log(`🤖 LLM 引擎: ${engine}`);
  console.log(`========================================`);

  console.log(`⏳ 步骤 1/3: 抓取页面并提取 Markdown...`);
  const markdown = await fetchUrlToMarkdown(url, { vendorId });
  console.log(`✅ Markdown 提取完成 (共 ${markdown.length} 字符，已缓存至 .scratch/pricing-raw/${vendorId}.md)`);

  console.log(`⏳ 步骤 2/3: 启动 LLM 智能结构化抽取...`);
  const models = await parsePricingMarkdown(markdown, engine);
  console.log(`✅ LLM 抽取成功，发现 ${models.length} 个模型:`);
  for (const m of models) {
    const p = m.official;
    const priceStr =
      'input' in p
        ? `输入: ${p.input} / 输出: ${p.output} / 缓存: ${p.cacheRead ?? '—'} (${p.currency}/M)`
        : `1K: ${p.pricing['1k']} / 2K: ${p.pricing['2k']} (${p.currency}/张)`;
    console.log(`  - [${m.id}] ${m.name} (${m.modality}): ${priceStr}`);
  }

  if (dryRun) {
    console.log(`\n🔍 [Dry Run 模式] 提取结果 JSON:`);
    console.log(JSON.stringify(models, null, 2));
    return;
  }

  console.log(`⏳ 步骤 3/3: 应用更新至 src/content 目录...`);
  const summary = applyExtractedPricing(models, vendorId, officialProviderId);
  console.log(`🎉 同步完成!`);
  if (summary.createdModels.length > 0) {
    console.log(`  ✨ 新建模型 (${summary.createdModels.length}): ${summary.createdModels.join(', ')}`);
  }
  if (summary.updatedModels.length > 0) {
    console.log(`  📝 更新模型 (${summary.updatedModels.length}): ${summary.updatedModels.join(', ')}`);
  }
  console.log(`  🏢 官方 Provider 更新状态: ${summary.providerUpdated ? '已同步' : '未变更'}`);
}

async function syncProvider(
  providerId: string,
  url: string,
  engine: LlmEngineType,
  dryRun: boolean,
) {
  console.log(`\n========================================`);
  console.log(`🚀 开始同步第三方服务商 [${providerId}]`);
  console.log(`🔗 来源链接: ${url}`);
  console.log(`🤖 LLM 引擎: ${engine}`);
  console.log(`========================================`);

  console.log(`⏳ 步骤 1/3: 抓取页面并提取 Markdown...`);
  const markdown = await fetchUrlToMarkdown(url, { vendorId: providerId });
  console.log(`✅ Markdown 提取完成 (共 ${markdown.length} 字符，已缓存至 .scratch/pricing-raw/${providerId}.md)`);

  console.log(`⏳ 步骤 2/3: 启动 LLM 智能结构化抽取...`);
  const providerData = await parseProviderMarkdown(markdown, engine);
  const plans = providerData.plans && providerData.plans.length > 0
    ? providerData.plans
    : providerData.plan
      ? [providerData.plan]
      : [];

  console.log(`✅ LLM 抽取成功:`);
  for (const pl of plans) {
    const unit = pl.quotaType === 'credits' ? '积分' : pl.currency;
    console.log(`  📦 套餐 [${pl.id}]: ${pl.name} (${pl.currency}${pl.baseFee}/月) · 总额度: ${pl.quotaAmount} ${unit}`);
    if (pl.rateLimit) {
      console.log(`     ⏱️ 限额规则: 5h: ${pl.rateLimit.rolling5h || '无'} | 周: ${pl.rateLimit.weekly || '无'} | 月: ${pl.rateLimit.monthly || '无'}`);
    }
  }

  console.log(`  🤖 包含模型 (${providerData.models.length} 个):`);
  for (const m of providerData.models.slice(0, 10)) {
    const quotaStr = m.modelQuota ? `额度: ${m.modelQuota}` : '统一扣费';
    const multStr = m.multiplier ? `倍率: ${m.multiplier}x` : '1.0x';
    console.log(`    - [${m.modelId}] ${m.modelName}: 输入 ${m.input}, 输出 ${m.output} (${quotaStr}, ${multStr})`);
  }
  if (providerData.models.length > 10) {
    console.log(`    ... 及其余 ${providerData.models.length - 10} 个模型`);
  }

  if (dryRun) {
    console.log(`\n🔍 [Dry Run 模式] 提取结果 JSON:`);
    console.log(JSON.stringify(providerData, null, 2));
    return;
  }

  console.log(`⏳ 步骤 3/3: 应用更新至 src/content 目录...`);
  const summary = applyProviderUpdates(providerData);
  console.log(`🎉 同步完成!`);
  console.log(`  🏢 Provider [${summary.providerId}] 已成功更新套餐与 ${summary.modelsCount} 个模型配置`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  try {
    if (args.url) {
      if (args.type === 'provider') {
        const pId = args.provider || 'custom-provider';
        await syncProvider(pId, args.url, args.engine, args.dryRun);
      } else {
        const vendorId = args.vendor || 'custom';
        await syncVendor(vendorId, args.url, `${vendorId}-official`, args.engine, args.dryRun);
      }
      return;
    }

    if (args.provider) {
      if (args.provider === 'all') {
        for (const [pId, pConfig] of Object.entries(PROVIDERS)) {
          await syncProvider(pId, pConfig.url, args.engine, args.dryRun);
        }
      } else {
        const pConfig = PROVIDERS[args.provider];
        if (!pConfig) {
          console.error(`❌ 未知服务商: ${args.provider}。可选: ${Object.keys(PROVIDERS).join(', ')}`);
          process.exit(1);
        }
        await syncProvider(pConfig.providerId, pConfig.url, args.engine, args.dryRun);
      }
      return;
    }

    const targetVendor = args.vendor || 'all';

    if (targetVendor === 'all') {
      for (const [vId, vConfig] of Object.entries(VENDORS)) {
        await syncVendor(vId, vConfig.url, vConfig.officialProviderId, args.engine, args.dryRun);
      }
    } else {
      const vConfig = VENDORS[targetVendor];
      if (!vConfig) {
        console.error(`❌ 未知厂商: ${targetVendor}。可选厂商: ${Object.keys(VENDORS).join(', ')}`);
        process.exit(1);
      }
      await syncVendor(vConfig.vendorId, vConfig.url, vConfig.officialProviderId, args.engine, args.dryRun);
    }
  } catch (err) {
    console.error(`\n❌ 同步流程执行失败:`, err);
    process.exit(1);
  }
}

main();
