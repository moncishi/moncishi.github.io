import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { ExtractedModel, LlmEngineType } from './types.ts';

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load the system prompt template.
 */
function getSystemPrompt(): string {
  const promptPath = path.resolve(__dirname, 'prompts/extract-pricing.txt');
  return fs.readFileSync(promptPath, 'utf-8');
}

/**
 * Clean and extract JSON array from raw LLM text response.
 */
function cleanAndParseJson(text: string): ExtractedModel[] {
  let cleaned = text.trim();
  // Strip ```json ... ``` fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }

  // Find opening '[' and closing ']'
  const startIdx = cleaned.indexOf('[');
  const endIdx = cleaned.lastIndexOf(']');
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.slice(startIdx, endIdx + 1);
  }

  const parsed = JSON.parse(cleaned);
  if (!Array.isArray(parsed)) {
    throw new Error('LLM output is not a JSON array');
  }
  return parsed as ExtractedModel[];
}

/**
 * Engine A: Call DeepSeek official API (OpenAI compatible).
 */
export async function callDeepSeekApi(
  markdown: string,
  apiKey?: string,
): Promise<ExtractedModel[]> {
  const key = apiKey || process.env.DEEPSEEK_API_KEY;
  if (!key) {
    throw new Error(
      'DeepSeek API Key is missing. Set DEEPSEEK_API_KEY environment variable or pass --key=<apiKey>',
    );
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

  return cleanAndParseJson(content);
}

/**
 * Engine B: Call local agy CLI non-interactively.
 */
export async function callAgyCli(markdown: string): Promise<ExtractedModel[]> {
  const systemPrompt = getSystemPrompt();
  const fullPrompt = `${systemPrompt}\n\n以下是待分析的定价 Markdown 文档：\n\n${markdown}\n\n请按契约输出纯 JSON 数组：`;

  // Find agy binary
  const agyPath = process.env.AGY_PATH || '/home/monci/.local/bin/agy';

  const env = {
    ...process.env,
    http_proxy: process.env.http_proxy || 'http://127.0.0.1:7890',
    https_proxy: process.env.https_proxy || 'http://127.0.0.1:7890',
    all_proxy: process.env.all_proxy || 'http://127.0.0.1:7890',
  };

  const { stdout, stderr } = await execFileAsync(
    agyPath,
    ['--print', fullPrompt, '--output-format', 'text'],
    {
      env,
      maxBuffer: 10 * 1024 * 1024,
      timeout: 3 * 60 * 1000,
    },
  );

  if (!stdout && stderr) {
    throw new Error(`agy CLI error: ${stderr}`);
  }

  return cleanAndParseJson(stdout);
}

/**
 * Main parser dispatcher: routes to DeepSeek API or local AGY CLI.
 */
export async function parsePricingMarkdown(
  markdown: string,
  engine: LlmEngineType = 'deepseek',
  opts?: { apiKey?: string },
): Promise<ExtractedModel[]> {
  if (engine === 'deepseek') {
    // If DEEPSEEK_API_KEY is not configured, automatically fallback to agy
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
