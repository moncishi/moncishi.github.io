import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { ExtractedModel, ExtractedProviderData, LlmEngineType } from './types.ts';

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load the system prompt template for vendor models.
 */
function getSystemPrompt(): string {
  const promptPath = path.resolve(__dirname, 'prompts/extract-pricing.txt');
  return fs.readFileSync(promptPath, 'utf-8');
}

/**
 * Load the system prompt template for provider plans.
 */
function getProviderPrompt(): string {
  const promptPath = path.resolve(__dirname, 'prompts/extract-provider-plan.txt');
  return fs.readFileSync(promptPath, 'utf-8');
}

/**
 * Clean and extract JSON array from raw LLM text response.
 */
function cleanAndParseJson<T = ExtractedModel[]>(text: string): T {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }

  const firstBracket = cleaned.indexOf('[');
  const firstBrace = cleaned.indexOf('{');

  if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
    const endIdx = cleaned.lastIndexOf(']');
    if (endIdx !== -1 && endIdx > firstBracket) {
      cleaned = cleaned.slice(firstBracket, endIdx + 1);
    }
  } else if (firstBrace !== -1) {
    const endIdx = cleaned.lastIndexOf('}');
    if (endIdx !== -1 && endIdx > firstBrace) {
      cleaned = cleaned.slice(firstBrace, endIdx + 1);
    }
  }

  return JSON.parse(cleaned) as T;
}

/**
 * Engine A: Call DeepSeek official API for array.
 */
export async function callDeepSeekApi(
  markdown: string,
  apiKey?: string,
): Promise<ExtractedModel[]> {
  const key = apiKey || process.env.DEEPSEEK_API_KEY;
  if (!key) {
    throw new Error('DeepSeek API Key is missing. Set DEEPSEEK_API_KEY environment variable');
  }

  const systemPrompt = getSystemPrompt();
  const url = process.env.DEEPSEEK_API_BASE || 'https://api.deepseek.com/chat/completions';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `以下是待分析的定价 Markdown 文档：\n\n${markdown}\n\n请按上述契约提取出所有大模型定价 JSON。`,
        },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepSeek API request failed: ${res.status} ${errText}`);
  }

  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('DeepSeek API returned empty message content');
  }

  return cleanAndParseJson<ExtractedModel[]>(content);
}

/**
 * Call local agy CLI with custom prompt.
 */
async function callAgyWithPrompt<T>(prompt: string): Promise<T> {
  const agyPath = process.env.AGY_PATH || '/home/monci/.local/bin/agy';

  const env = {
    ...process.env,
    http_proxy: process.env.http_proxy || 'http://127.0.0.1:7890',
    https_proxy: process.env.https_proxy || 'http://127.0.0.1:7890',
    all_proxy: process.env.all_proxy || 'http://127.0.0.1:7890',
  };

  const { stdout, stderr } = await execFileAsync(
    agyPath,
    ['--print', prompt, '--output-format', 'text', '--dangerously-skip-permissions'],
    {
      env,
      maxBuffer: 10 * 1024 * 1024,
      timeout: 3 * 60 * 1000,
    },
  );

  if (!stdout && stderr) {
    throw new Error(`agy CLI error: ${stderr}`);
  }

  return cleanAndParseJson<T>(stdout);
}

/**
 * Engine B: Call local agy CLI non-interactively for model list.
 */
export async function callAgyCli(markdown: string): Promise<ExtractedModel[]> {
  const systemPrompt = getSystemPrompt();
  const fullPrompt = `${systemPrompt}\n\n以下是待分析的定价 Markdown 文档：\n\n${markdown}\n\n请按契约输出纯 JSON 数组：`;
  return callAgyWithPrompt<ExtractedModel[]>(fullPrompt);
}

/**
 * Main parser dispatcher for vendor models.
 */
export async function parsePricingMarkdown(
  markdown: string,
  engine: LlmEngineType = 'deepseek',
  opts?: { apiKey?: string },
): Promise<ExtractedModel[]> {
  if (engine === 'deepseek') {
    const key = opts?.apiKey || process.env.DEEPSEEK_API_KEY;
    if (!key) {
      console.warn('DEEPSEEK_API_KEY not found; falling back to local agy CLI engine...');
      return callAgyCli(markdown);
    }
    return callDeepSeekApi(markdown, key);
  }

  if (engine === 'agy') {
    return callAgyCli(markdown);
  }

  throw new Error(`Unsupported LLM engine: ${engine}`);
}

/**
 * Main parser dispatcher for provider plans and model multipliers.
 */
export async function parseProviderMarkdown(
  markdown: string,
  engine: LlmEngineType = 'deepseek',
  opts?: { apiKey?: string },
): Promise<ExtractedProviderData> {
  const prompt = getProviderPrompt();
  const fullPrompt = `${prompt}\n\n以下是待分析的第三方服务商套餐介绍 Markdown 文档：\n\n${markdown}\n\n请按契约输出纯 JSON 对象：`;

  if (engine === 'deepseek') {
    const key = opts?.apiKey || process.env.DEEPSEEK_API_KEY;
    if (!key) {
      console.warn('DEEPSEEK_API_KEY not found; falling back to local agy CLI engine...');
      return callAgyWithPrompt<ExtractedProviderData>(fullPrompt);
    }

    const url = process.env.DEEPSEEK_API_BASE || 'https://api.deepseek.com/chat/completions';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: `以下是待分析的第三方服务商套餐介绍 Markdown 文档：\n\n${markdown}\n\n请按契约输出纯 JSON 对象。` },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      throw new Error(`DeepSeek API request failed: ${res.status}`);
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('DeepSeek API returned empty content');
    }
    const parsed = cleanAndParseJson<ExtractedProviderData>(content);
    if (!parsed.plans && parsed.plan) {
      parsed.plans = [parsed.plan];
    } else if (parsed.plans && parsed.plans.length > 0 && !parsed.plan) {
      parsed.plan = parsed.plans[0];
    }
    return parsed;
  }

  const result = await callAgyWithPrompt<ExtractedProviderData>(fullPrompt);
  if (!result.plans && result.plan) {
    result.plans = [result.plan];
  } else if (result.plans && result.plans.length > 0 && !result.plan) {
    result.plan = result.plans[0];
  }
  return result;
}
