import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'yaml';
import type { ExtractedModel } from './types.ts';

export interface UpdateSummary {
  createdModels: string[];
  updatedModels: string[];
  providerUpdated: boolean;
}

export function applyExtractedPricing(
  models: ExtractedModel[],
  vendorId: string,
  officialProviderId: string,
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

      // Ensure official provider is included
      const providersNode = doc.get('providers') as any;
      const providers: string[] = providersNode?.toJSON ? providersNode.toJSON() : [];
      if (!providers.includes(officialProviderId)) {
        providers.push(officialProviderId);
        doc.set('providers', providers);
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
        providers: [officialProviderId],
      });

      fs.writeFileSync(modelPath, doc.toString(), 'utf-8');
      summary.createdModels.push(m.id);
    }
  }

  // 2. Update official provider file if it exists
  const providerPath = path.join(providersDir, `${officialProviderId}.yaml`);
  if (fs.existsSync(providerPath)) {
    const raw = fs.readFileSync(providerPath, 'utf-8');
    const doc = yaml.parseDocument(raw);

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

  return summary;
}
