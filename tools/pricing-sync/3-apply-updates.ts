import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'yaml';
import type { ExtractedModel, ExtractedProviderData } from './types.ts';

export interface UpdateSummary {
  createdModels: string[];
  updatedModels: string[];
  providerUpdated: boolean;
}

export function applyExtractedPricing(
  models: ExtractedModel[],
  vendorId: string,
  officialProviderId?: string,
  vendorConfig?: VendorConfig,
): UpdateSummary {
  const modelsDir = path.resolve(process.cwd(), 'src/content/models');
  const providersDir = path.resolve(process.cwd(), 'src/content/providers');

  const summary: UpdateSummary = {
    createdModels: [],
    updatedModels: [],
    providerUpdated: false,
  };

  fs.mkdirSync(modelsDir, { recursive: true });

  // 1. Update or create models collection files
  for (const m of models) {
    if (!m.id || !m.name || !m.official) continue;

    const modelPath = path.join(modelsDir, `${m.id}.yaml`);
    if (fs.existsSync(modelPath)) {
      const raw = fs.readFileSync(modelPath, 'utf-8');
      const doc = yaml.parseDocument(raw);

      doc.set('name', m.name);
      if (m.modality) doc.set('modality', m.modality);
      doc.set('official', m.official);
      if (m.description && !doc.get('description')) {
        doc.set('description', m.description);
      }

      // Ensure official provider is included
      if (officialProviderId) {
        const providersNode = doc.get('providers') as any;
        const providers: string[] = providersNode?.toJSON ? providersNode.toJSON() : [];
        if (!providers.includes(officialProviderId)) {
          providers.push(officialProviderId);
          doc.set('providers', providers);
        }
      }

      fs.writeFileSync(modelPath, doc.toString(), 'utf-8');
      summary.updatedModels.push(m.id);
    } else {
      const doc = new yaml.Document({
        id: m.id,
        name: m.name,
        modality: m.modality || 'text',
        description: m.description || `${m.name} 官方模型`,
        official: m.official,
        providers: officialProviderId ? [officialProviderId] : [],
      });

      fs.writeFileSync(modelPath, doc.toString(), 'utf-8');
      summary.createdModels.push(m.id);
    }
  }

  // 2. Update official provider file if it exists
  if (officialProviderId) {
    const providerPath = path.join(providersDir, `${officialProviderId}.yaml`);
    if (fs.existsSync(providerPath)) {
      const raw = fs.readFileSync(providerPath, 'utf-8');
      const doc = yaml.parseDocument(raw);

      if (vendorConfig?.websiteUrl) doc.set('websiteUrl', vendorConfig.websiteUrl);
      if (vendorConfig?.pricingUrl) doc.set('pricingUrl', vendorConfig.pricingUrl);
      if (vendorConfig?.docUrl) doc.set('docUrl', vendorConfig.docUrl);

      const modelsNode = doc.get('models') as any;
      const providerModels: Array<Record<string, any>> = modelsNode?.toJSON
        ? modelsNode.toJSON()
        : [];
      const modelMap = new Map(providerModels.map((item) => [item.modelId, item]));

      for (const m of models) {
        if (m.modality !== 'text' || !('input' in m.official)) continue;

        const existing = modelMap.get(m.id);
        if (existing) {
          existing.input = m.official.input;
          existing.output = m.official.output;
          existing.cacheRead = m.official.cacheRead;
          existing.cacheWrite = m.official.cacheWrite;
        } else {
          providerModels.push({
            modelId: m.id,
            input: m.official.input,
            output: m.official.output,
            cacheRead: m.official.cacheRead,
            cacheWrite: m.official.cacheWrite,
          });
        }
      }

      doc.set('models', providerModels);
      fs.writeFileSync(providerPath, doc.toString(), 'utf-8');
      summary.providerUpdated = true;
    }
  }

  return summary;
}

export function applyProviderUpdates(providerData: ExtractedProviderData): {
  providerId: string;
  planUpdated: boolean;
  modelsCount: number;
} {
  const modelsDir = path.resolve(process.cwd(), 'src/content/models');
  const providersDir = path.resolve(process.cwd(), 'src/content/providers');

  const providerPath = path.join(providersDir, `${providerData.providerId}.yaml`);
  let doc: yaml.Document;

  if (!fs.existsSync(providerPath)) {
    doc = new yaml.Document({
      id: providerData.providerId,
      name: providerData.providerName,
      nameZh: providerData.providerNameZh ?? providerData.providerName,
      kind: providerData.kind,
      currency: providerData.currency,
      description:
        providerData.description ??
        `${providerData.providerName} 订阅套餐，提供额度池与主流模型支持。`,
      plans: [],
      models: [],
    });
  } else {
    const raw = fs.readFileSync(providerPath, 'utf-8');
    doc = yaml.parseDocument(raw);
  }

  if (providerData.websiteUrl) doc.set('websiteUrl', providerData.websiteUrl);
  if (providerData.pricingUrl) doc.set('pricingUrl', providerData.pricingUrl);
  if (providerData.docUrl) doc.set('docUrl', providerData.docUrl);

  // 1. Update plans
  const plansNode = doc.get('plans') as any;
  const plans: Array<Record<string, any>> = plansNode?.toJSON ? plansNode.toJSON() : [];
  const incomingPlans = providerData.plans && providerData.plans.length > 0
    ? providerData.plans
    : providerData.plan
      ? [providerData.plan]
      : [];

  for (const pl of incomingPlans) {
    const planIdx = plans.findIndex((p) => p.id === pl.id);
    if (planIdx !== -1) {
      plans[planIdx] = {
        ...plans[planIdx],
        name: pl.name,
        baseFee: pl.baseFee,
        currency: pl.currency,
        feePct: pl.feePct ?? plans[planIdx].feePct ?? 0,
        quotaType: pl.quotaType,
        quotaAmount: pl.quotaAmount,
        quotaCurrency: pl.quotaCurrency ?? pl.currency,
        rateLimit: pl.rateLimit ?? plans[planIdx].rateLimit,
        poolNote: pl.poolNote ?? plans[planIdx].poolNote,
        ...(pl.planUrl ? { planUrl: pl.planUrl } : {}),
      };
    } else {
      plans.push(pl);
    }
  }
  doc.set('plans', plans);

  // 2. Update models
  const modelsNode = doc.get('models') as any;
  const currentModels: Array<Record<string, any>> = modelsNode?.toJSON
    ? modelsNode.toJSON()
    : [];
  const modelMap = new Map(currentModels.map((item) => [item.modelId, item]));

  for (const pm of providerData.models) {
    const existing = modelMap.get(pm.modelId);
    if (existing) {
      existing.input = pm.input;
      existing.output = pm.output;
      existing.cacheRead = pm.cacheRead;
      existing.cacheWrite = pm.cacheWrite;
      if (pm.multiplier !== undefined) existing.multiplier = pm.multiplier;
      if (pm.modelQuota !== undefined) existing.modelQuota = pm.modelQuota;
    } else {
      currentModels.push({
        modelId: pm.modelId,
        input: pm.input,
        output: pm.output,
        cacheRead: pm.cacheRead,
        cacheWrite: pm.cacheWrite,
        ...(pm.multiplier !== undefined ? { multiplier: pm.multiplier } : {}),
        ...(pm.modelQuota !== undefined ? { modelQuota: pm.modelQuota } : {}),
      });
    }

    // Ensure model exists in models collection
    const modelFilePath = path.join(modelsDir, `${pm.modelId}.yaml`);
    if (!fs.existsSync(modelFilePath)) {
      const newModelDoc = new yaml.Document({
        id: pm.modelId,
        name: pm.modelName,
        modality: 'text',
        description: `${pm.modelName} 模型（由 ${providerData.providerName} 提供接入）`,
        official: {
          input: pm.input,
          output: pm.output,
          cacheRead: pm.cacheRead,
          cacheWrite: pm.cacheWrite,
          currency: providerData.currency,
        },
        providers: [providerData.providerId],
      });
      fs.writeFileSync(modelFilePath, newModelDoc.toString(), 'utf-8');
    } else {
      const mRaw = fs.readFileSync(modelFilePath, 'utf-8');
      const mDoc = yaml.parseDocument(mRaw);
      const provNode = mDoc.get('providers') as any;
      const provList: string[] = provNode?.toJSON ? provNode.toJSON() : [];
      if (!provList.includes(providerData.providerId)) {
        provList.push(providerData.providerId);
        mDoc.set('providers', provList);
        fs.writeFileSync(modelFilePath, mDoc.toString(), 'utf-8');
      }
    }
  }

  doc.set('models', currentModels);
  fs.writeFileSync(providerPath, doc.toString(), 'utf-8');

  return {
    providerId: providerData.providerId,
    planUpdated: true,
    modelsCount: currentModels.length,
  };
}

